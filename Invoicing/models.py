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
	title			= models.CharField(max_length=200)
	client			= models.CharField(max_length=200)
	client_email	= models.EmailField()
	issued			= models.DateField()
	due				= models.DateField()
	currency		= models.CharField(max_length=5, choices=CURRENCY_CHOICES, default="EUR")
	tax				= models.DecimalField(max_digits=6, decimal_places=2, default=0)
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
