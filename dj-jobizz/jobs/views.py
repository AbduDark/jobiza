from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Job
from companies.models import EmployerProfile
from .serializers import JobSerializer
from .permissions import IsEmployerOrReadOnly

class JobViewSet(viewsets.ModelViewSet):
    serializer_class = JobSerializer
    permission_classes = [IsEmployerOrReadOnly]
    filterset_fields = ['job_type', 'location', 'salary_range']
    search_fields = ['title', 'description']

    def get_queryset(self):
        return Job.objects.filter(is_active=True).select_related('employer')

    def perform_create(self, serializer):
        employer = EmployerProfile.objects.get(user=self.request.user)
        serializer.save(employer=employer)

    @action(detail=True, methods=['patch'])
    def toggle_active(self, request, pk=None):
        job = self.get_object()
        job.is_active = not job.is_active
        job.save()
        return Response({'status': 'active' if job.is_active else 'inactive'})



