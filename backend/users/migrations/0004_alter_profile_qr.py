# Generated by Django 3.2.9 on 2022-02-11 00:35

from django.db import migrations, models
import users.models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_alter_profile_qr'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='qr',
            field=models.ImageField(blank=True, max_length=500, storage=users.models.OverwriteStorage(), upload_to=users.models.user_directory_path),
        ),
    ]
