from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    # Frontend
    path('', include('Ark.urls')),
    # Modules
    path('api/user-settings/', include('UserSettings.urls')),
    path('api/contacts/', include('Contacts.urls'))
]