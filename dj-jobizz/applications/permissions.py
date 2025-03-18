from rest_framework.permissions import BasePermission

class IsEmployerOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.job.employer.user == request.user

class IsCandidateOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.candidate.user == request.user

class IsEmployerOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method in ['GET', 'HEAD', 'OPTIONS']:
            return True
        return request.user.user_type == 'employer'

class IsEmployer(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.user_type == 'employer'