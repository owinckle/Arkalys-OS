from django.urls import path

from . import views

urlpatterns = [
	path("get", views.GetEvents.as_view()),
	path("get/by-date", views.GetEventByDate.as_view()),
]