from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from .serializers import CompanySerializer, EmployerCreationSerializer
from .models import Company, EmployerProfile
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .permissions import IsCompanyHead
from users.models import CompanyHeadProfile


class CompanyCreateView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):
        serializer = CompanySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            
            # Add the company to the company head profile.
            company_head = CompanyHeadProfile.objects.get(user=request.data['head'])
            company_head.company = serializer.instance
            company_head.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AddEmployerView(APIView):
    permission_classes = [IsCompanyHead]
    
    def post(self, request):
        serializer = EmployerCreationSerializer(data=request.data)
        if serializer.is_valid():
            # Get the company for which the current user is the head.
            try:
                company = request.user.company_head
            except Company.DoesNotExist:
                return Response(
                    {"error": "You are not assigned as a company head."},
                    status=status.HTTP_403_FORBIDDEN
                )
            # Create the new employer account.
            new_user = serializer.save()
            # Link the new user to the company.
            EmployerProfile.objects.create(user=new_user, company=company)
            return Response({
                "message": "Employer created successfully.",
                "employer_email": new_user.email
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class CompanyListView(generics.ListAPIView):
    serializer_class = CompanySerializer
    queryset = Company.objects.all()
