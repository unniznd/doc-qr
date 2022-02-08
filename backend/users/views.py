from django.contrib.auth.models import User


from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import IsAuthenticated

from .permission import OwnProfilePermission
from .models import Profile
from .serializers import ProfileSerializer
from .util import get_qr_token, get_qr_code

class QRView(APIView):
    premission_classes = (IsAuthenticated, OwnProfilePermission)
    def get(self,request):
        profile = Profile.objects.filter(user = request.user).first()
        return Response({"qr":profile.qr.url})


class ProfileView(APIView):
    premission_classes = (IsAuthenticated, OwnProfilePermission)
    
    def get(self, request):
        try:
            profile = Profile.objects.filter(user = request.user).first()
            return Response({"bio":profile.bio})
        except:
            return Response({"status":"error"},status=status.HTTP_400_BAD_REQUEST) 
    
    
    def post(self, request):
        try:
            profile = Profile.objects.filter(user=request.user).first()
            if request.data.get('bio'):
                profile.bio = request.data['bio']
                profile.save()
            
            profile.qr_token = get_qr_token()
            profile.qr = get_qr_code(profile=profile)
            profile.save()

            return Response({"status":"success"},status=status.HTTP_200_OK)
        except:
            return Response({"status":"error"},status=status.HTTP_400_BAD_REQUEST) 

class CreateProfile(APIView):
    def post(self,request):
        try:
            user = User.objects.create(username=request.data['username'],password=request.data['password'])
            user.save()
            profile = Profile.objects.create(user=user,bio=request.data['bio'])
            profile.save()
        
            token, created = Token.objects.get_or_create(user=user)
            return Response(
                {"token":token.key,"user_id":user.pk},
                status=status.HTTP_200_OK
            )
        except:
            return Response({"error":"Username already exists"},status=status.HTTP_400_BAD_REQUEST)

class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
        })

class Logout(APIView):
    permission_classes = (IsAuthenticated,) 
    def post(self, request, format=None):
        
        # simply delete the token to force a login
        request.user.auth_token.delete()
        return Response({"status":"success"},status=status.HTTP_200_OK)