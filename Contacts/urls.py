from django.urls import path

from . import views

urlpatterns = [
	path("get", views.GetContacts.as_view()),
]