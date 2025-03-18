from rest_framework import serializers
from .models import Job
from companies.serializers import EmployerProfileSerializer

class JobSerializer(serializers.ModelSerializer):
    employer = EmployerProfileSerializer(read_only=True)
    days_since_posted = serializers.SerializerMethodField()
    is_expired = serializers.SerializerMethodField()

    class Meta:
        model = Job
        fields = [
            'id', 'title', 'description', 'requirements',
            'location', 'salary_range', 'job_type',
            'application_deadline', 'is_active',
            'created_at', 'updated_at', 'employer',
            'days_since_posted', 'is_expired'
        ]
        read_only_fields = [
            'created_at',
            'updated_at', 'employer', 'days_since_posted',
            'is_expired'
        ]

    def get_days_since_posted(self, obj):
        from django.utils.timezone import now
        return (now() - obj.created_at).days

    def get_is_expired(self, obj):
        from django.utils.timezone import now
        return now().date() > obj.application_deadline

class JobCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = [
            'title', 'description', 'requirements',
            'location', 'salary_range', 'job_type',
            'category', 'application_deadline'
        ]
        extra_kwargs = {
            'application_deadline': {'required': True}
        }