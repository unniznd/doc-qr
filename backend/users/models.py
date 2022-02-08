from django.db import models
from django.contrib.auth.models import User
from django.core.files.storage import FileSystemStorage


class OverwriteStorage(FileSystemStorage):
    def _save(self, name, content):
        if self.exists(name):
            self.delete(name)
        return super(OverwriteStorage, self)._save(name, content)

    def get_available_name(self, name,max_length):
        return name


def user_directory_path(instance, filename):

    user = User.objects.filter(username=instance.user.username).first()
    return '{0}/{1}'.format(user.id, filename)

class Profile(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    bio = models.CharField(max_length=10000)
    qr_token = models.CharField(max_length=16, blank=True)
    qr = models.ImageField(
        upload_to=user_directory_path, 
        blank=True,
        storage=OverwriteStorage(),
        max_length=500,
    )