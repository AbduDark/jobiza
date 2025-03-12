import os
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
import requests
from django.urls import reverse
from urllib.parse import urljoin
from rest_framework.views import APIView

from companies.serializers import EmployerProfileSerializer
from .models import User, CandidateProfile, CompanyHeadProfile
from .serializers import (
    CustomTokenObtainPairSerializer,
    UserRegistrationSerializer,
    CandidateProfileSerializer,
)
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
from users.adapters import CustomGoogleOAuth2Adapter
from allauth.socialaccount.providers.github.views import GitHubOAuth2Adapter
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator



class UserLoginView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer



class UserRegistrationView(generics.CreateAPIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # Create profile based on user type
        if user.user_type == User.UserType.CANDIDATE:
            CandidateProfile.objects.create(user=user)

        #only admin can create company head
        if user.user_type == User.UserType.COMPANY_HEAD:
            CompanyHeadProfile.objects.create(user=user)


        return Response({
            'message': 'User registered successfully',
            'user': serializer.data
        }, status=status.HTTP_201_CREATED)


class ProfileView(generics.RetrieveUpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        if self.request.user.user_type == User.UserType.CANDIDATE:
            return CandidateProfileSerializer
        elif self.request.user.user_type == User.UserType.COMPANY_HEAD:
            return EmployerProfileSerializer
        return UserRegistrationSerializer
    
    def get_object(self):
        if self.request.user.user_type == User.UserType.CANDIDATE:
            return self.request.user.candidate_profile
        elif self.request.user.user_type == User.UserType.COMPANY_HEAD:
            return self.request.user.company_head_profile
        return User.objects.get(id=self.request.user.id)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response({
            'message': 'Profile retrieved successfully',
            'data': serializer.data
        })

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(
            instance,
            data=request.data,
            partial=partial
        )
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response({
            'message': 'Profile updated successfully',
            'data': serializer.data
        })
    

class GoogleLoginView(SocialLoginView):
    adapter_class = CustomGoogleOAuth2Adapter
    client_class = OAuth2Client
    callback_url = "http://127.0.0.1:8000/api/auth/google/login/callback/"



class GoogleLoginCallback(APIView):
    def get(self, request, *args, **kwargs):
        code = request.GET.get("code")

        if code is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        token_endpoint_url = urljoin("http://localhost:8000", reverse("google_login"))
        response = requests.post(url=token_endpoint_url, data={"code": code})

        return Response(response.json(), status=status.HTTP_200_OK)
    

class GithubLoginView(SocialLoginView):
    adapter_class = GitHubOAuth2Adapter
    client_class = OAuth2Client
    callback_url = "http://127.0.0.1:8000/api/auth/github/login/callback/"



@method_decorator(csrf_exempt, name='dispatch')
class GithubLoginCallback(APIView):
    def get(self, request, *args, **kwargs):
        code = request.GET.get("code")
        if not code:
            return Response({"error": "No code provided."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Exchange the authorization code for an access token
        token_url = "https://github.com/login/oauth/access_token"
        payload = {
            "client_id": os.getenv("GITHUB_CLIENT_ID"),
            "client_secret": os.getenv("GITHUB_CLIENT_SECRET"),
            "code": code,
            "redirect_uri": "http://127.0.0.1:8000/api/auth/github/login/callback/",
        }
        headers = {"Accept": "application/json"}
        token_response = requests.post(token_url, data=payload, headers=headers)
        try:
            token_data = token_response.json()
        except Exception:
            return Response({
                "error": "Failed to parse token response from GitHub.",
                "details": token_response.text
            }, status=status.HTTP_400_BAD_REQUEST)
        
        access_token = token_data.get("access_token")
        if not access_token:
            return Response({
                "error": "Failed to exchange code for access token",
                "details": token_data
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Use the access token to complete social login via your local endpoint
        social_endpoint = "http://127.0.0.1:8000/api/auth/github/login/"
        social_response = requests.post(social_endpoint, json={"access_token": access_token})
        try:
            social_data = social_response.json()
        except Exception:
            return Response({
                "error": "Failed to parse response from social login endpoint.",
                "details": social_response.text
            }, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(social_data, status=status.HTTP_200_OK)