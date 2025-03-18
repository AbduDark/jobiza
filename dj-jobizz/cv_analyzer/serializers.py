from rest_framework import serializers

class CVUploadSerializer(serializers.Serializer):
    file = serializers.FileField()
    job_id = serializers.CharField()