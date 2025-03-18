from rest_framework.permissions import BasePermission


class IsCompanyHead(BasePermission):
    def has_permission(self, request, view):
        return hasattr(request.user, 'company_head') and request.user.company_head is not None