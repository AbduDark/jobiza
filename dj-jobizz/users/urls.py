from django.urls import re_path, include, path

from .views import (
    UserLoginView,
    UserRegistrationView,
    ProfileView,
    GoogleLoginView,
    GoogleLoginCallback,
    GithubLoginView,
    GithubLoginCallback,
)


urlpatterns = [
    re_path(r'^auth/login/?$', UserLoginView.as_view(), name='login'),
    re_path(r'^auth/register/?$', UserRegistrationView.as_view(), name='register'),
    re_path(r'^account/profile/?$', ProfileView.as_view(), name='profile'),

    path("api/auth/", include("dj_rest_auth.urls")),
    path("api/auth/registration/", include("dj_rest_auth.registration.urls")),
    path("api/auth/accounts/", include("allauth.urls")),

    re_path(r'^auth/google/login/?$', GoogleLoginView.as_view(), name='google_login'),
    re_path(r'^auth/google/login/callback/?$', GoogleLoginCallback.as_view(), name='google_login_callback'),

    re_path(r'^auth/github/login/?$', GithubLoginView.as_view(), name='github_login'),
    re_path(r'^auth/github/login/callback/?$', GithubLoginCallback.as_view(), name='github_login_callback'),
]