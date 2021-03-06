from django.urls import path

from . import views

urlpatterns = [
	path("get", views.GetInvoices.as_view()),
	path("create", views.CreateInvoice.as_view()),
	path("load", views.GetInvoice.as_view()),
	path("view-invoice/<str:uuid>", views.view_invoice)
]