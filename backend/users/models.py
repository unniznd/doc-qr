from django.db import models
from django.contrib.auth.models import User

def user_directory_path(instance, filename):

    user = User.objects.filter(username=instance.user.username).first()
    return '{0}/{1}'.format(user.id, filename)

class Profile(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    bio = models.CharField(max_length=10000)
    token = models.CharField(max_length=16, blank=True)
    qr = models.FileField(upload_to=user_directory_path, blank=True)