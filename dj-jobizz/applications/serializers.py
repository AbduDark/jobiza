from rest_framework import serializers

from jobs.serializers import JobSerializer
from .models import Application, ApplicationDocument
from users.serializers import CandidateProfileSerializer


class ApplicationSerializer(serializers.ModelSerializer):
    candidate = CandidateProfileSerializer(read_only=True)
    job = JobSerializer(read_only=True)

    class Meta:
        model = Application
        fields = '__all__'
        read_only_fields = ('candidate', 'applied_at', 'updated_at')


class ApplicationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ('job', 'cover_letter')

class ApplicationDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApplicationDocument
        fields = ['id', 'name', 'file', 'uploaded_at']
        read_only_fields = ['uploaded_at']