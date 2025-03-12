from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import User, CandidateProfile, CompanyHeadProfile

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'email'

    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user

        data = {
            'message': 'User logged in successfully',
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'user_type': user.user_type,
            },

            'access': data['access'],
            'refresh': data['refresh']
        }
        return data

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    user_type = serializers.ChoiceField(choices=User.UserType.choices)

    class Meta:
        model = User
        fields = ('email', 'username','first_name', 'last_name' , 'password', 'user_type')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            password=validated_data['password'],
            user_type=validated_data['user_type'],
        )

        return user

class CandidateProfileSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='user.email', read_only=True)
    user_type = serializers.CharField(source='user.user_type', read_only=True)

    class Meta:
        model = CandidateProfile
        fields = '__all__'
        read_only_fields = ('user', 'created_at')



class CompanyHeadSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='user.email', read_only=True)
    Username = serializers.CharField(source='user.username', read_only=True)
    user_type = serializers.CharField(source='user.user_type', read_only=True)

    class Meta:
        model = CompanyHeadProfile
        fields = '__all__'
        read_only_fields = ('user', 'created_at')

