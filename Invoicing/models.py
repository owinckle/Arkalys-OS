from django.db import models
from django.contrib.auth.models import User

CURRENCY_CHOICES = [
	("EUR", "EUR"),
	("USD", "USD")
]

STATUS_CHOICES = [
	("Draft", "Draft"),
	("Pending", "Pending"),
	("Paid", "Paid")
]

def uniqueID():
	import uuid
	return uuid.uuid4().hex[:5]

class Invoice(models.Model):
	uuid			= models.TextField(max_length=5, primary_key=True, default=uniqueID, editable=False)
	owner			= models.ForeignKey(User, on_delete=models.CASCADE)
	description		= models.TextField(blank=True)
	org_street		= models.CharField(max_length=150, blank=True)
	org_city		= models.CharField(max_length=100, blank=True)
	org_zip			= models.CharField(max_length=10, blank=True)
	org_country		= models.CharField(max_length=100, blank=True)
	client_name		= models.CharField(max_length=100, blank=True)
	client_email	= models.EmailField(blank=True)
	client_street	= models.CharField(max_length=150, blank=True)
	client_city		= models.CharField(max_length=100, blank=True)
	client_zip		= models.CharField(max_length=10, blank=True)
	client_country	= models.CharField(max_length=100, blank=True)
	issued			= models.DateField(blank=True, null=True)
	due				= models.DateField(blank=True, null=True)
	tax				= models.DecimalField(max_digits=6, decimal_places=2, default=0)
	currency		= models.CharField(max_length=5, choices=CURRENCY_CHOICES, default="EUR")
	status			= models.CharField(max_length=50, choices=STATUS_CHOICES, default="Pending")

	def __str__(self):
		return f"[{self.uuid}] Invoice"

class InvoiceItem(models.Model):
	invoice			= models.ForeignKey(Invoice, on_delete=models.CASCADE)
	name			= models.CharField(max_length=200)
	quantity		= models.IntegerField(default=1)
	price			= models.DecimalField(max_digits=6, decimal_places=2)
	notes			= models.TextField(blank=True)

	def __str__(self):
		return f"{self.invoice} Item"
