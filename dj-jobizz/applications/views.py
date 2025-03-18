from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status, viewsets
from .models import Application, ApplicationDocument
from .permissions import IsCandidateOwner, IsEmployerOwner
from .serializers import ApplicationSerializer, ApplicationCreateSerializer


class ApplicationViewSet(viewsets.ModelViewSet):
    serializer_class = ApplicationSerializer
    http_method_names = ['get', 'post', 'patch', 'delete']

    def get_serializer_class(self):
        if self.action == 'create':
            return ApplicationCreateSerializer
        return super().get_serializer_class()

    def get_permissions(self):
        if self.action in ['update', 'partial_update', 'destroy', 'withdraw']:
            return [IsCandidateOwner()]
        if self.action in ['update_status', 'stats']:
            return [IsEmployerOwner()]
        return [IsAuthenticated()]

    def get_queryset(self):
        user = self.request.user
        if user.user_type == 'candidate':
            return Application.objects.filter(candidate=user.candidate_profile)
        elif user.user_type == 'employer':
            return Application.objects.filter(job__employer=user.employer_profile)
        return Application.objects.none()

    def perform_create(self, serializer):
        candidate = self.request.user.candidate_profile
        serializer.save(candidate=candidate)

    @action(detail=True, methods=['post'])
    def withdraw(self, request, pk=None):
        """Withdraw an application (Candidate only)"""
        application = self.get_object()
        application.status = 'withdrawn'
        application.save()
        return Response({
            'message': 'Application withdrawn successfully',
            'data': self.get_serializer(application).data
        })


    @action(detail=True, methods=['post'])
    def upload_document(self, request, pk=None):
        application = self.get_object()
        document = request.FILES.get('document')

        if not document:
            return Response(
                {'error': 'No document provided'},
                status=status.HTTP_400_BAD_REQUEST
            )


        document = ApplicationDocument.objects.create(
            application=application,
            file=document,
            name=document.name
        )

        return Response({
            'message': 'Document uploaded successfully',
            'document_id': document.id
        }, status=status.HTTP_201_CREATED)


    @action(detail=True, methods=['post'], url_path='status')
    def update_status(self, request, pk=None):
        """Update application status (Employer only)"""
        application = self.get_object()
        new_status = request.data.get('status')

        if not new_status:
            return Response(
                {'error': 'Status field is required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        valid_statuses = [choice[0] for choice in Application.STATUS_CHOICES]
        if new_status not in valid_statuses:
            return Response(
                {'error': f'Invalid status. Valid choices: {valid_statuses}'},
                status=status.HTTP_400_BAD_REQUEST
            )

        application.status = new_status
        application.save()

        return Response({
            'message': 'Status updated successfully',
            'data': self.get_serializer(application).data
        })

    # Modified partial_update to handle employer status updates
    def partial_update(self, request, *args, **kwargs):
        if (request.user.user_type == 'employer' and
                not self.request.user.has_perm('jobs.change_application_status')):
            raise PermissionDenied("You can only update application status")

        return super().partial_update(request, *args, **kwargs)