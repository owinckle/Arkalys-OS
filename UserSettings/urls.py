from django.urls import path

from . import views

urlpatterns = [
	path("pins", views.Pins.as_view()),
	path("apps/get", views.GetApps.as_view()),
]