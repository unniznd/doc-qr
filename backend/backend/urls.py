from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from users import views as user_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('create/',user_views.CreateProfile.as_view(),name="create-account"),
    path('login/',user_views.CustomAuthToken.as_view(),name="login"),
    path('logout/',user_views.Logout.as_view(), name="logout"),
    path('profile/',user_views.ProfileView.as_view(),name="profile")
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
