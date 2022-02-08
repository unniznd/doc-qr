from rest_framework import serializers
from .models import Profile
from django.contrib.auth.models import User

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('bio',)
    
    def create(self,validated_data):
        username = validated_data['username']
        password = validated_data['password']
        user = User.objects.create(
            username=username,
            password=password
        )

        profile = Profile.objects.create(
            user=user,
            bio=validated_data.pop('bio')
        )
        return profile

