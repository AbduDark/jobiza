from rest_framework.permissions import BasePermission
from users.models import User

class IsAdminUser(BasePermission):
    def has_permission(self, request, view):
        return request.user.user_type == User.UserType.ADMIN

class IsCompanyAdmin(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.admin == request.user