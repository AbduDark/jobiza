from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Company, EmployerProfile

User = get_user_model()

class CompanySerializer(serializers.ModelSerializer):
    # Validate the head field to ensure that the user is exists and is a company head.
    def validate_head(self, value):
        if not User.objects.filter(id=value.id, user_type=User.UserType.COMPANY_HEAD).exists():
            raise serializers.ValidationError("The selected user is not a company head.")
        
        if not User.objects.filter(id=value.id).exists():
            raise serializers.ValidationError("The selected user does not exist.")
        
        return value
    
    class Meta:
        model = Company
        fields = ['id', 'name', 'description', 'head', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']

class EmployerCreationSerializer(serializers.Serializer):
    email = serializers.EmailField()
    username = serializers.CharField(max_length=255)
    first_name = serializers.CharField(max_length=255)
    last_name = serializers.CharField(max_length=255)
    password = serializers.CharField(write_only=True)
    
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value
    
    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            password=validated_data['password'],
            username=validated_data['username'],
            user_type='employer'
        )
        return user

class EmployerProfileSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='user.email', read_only=True)
    Username = serializers.CharField(source='user.username', read_only=True)
    user_type = serializers.CharField(source='user.user_type', read_only=True)

    class Meta:
        model = EmployerProfile
        fields = '__all__'
