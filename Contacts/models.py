from django.db import models
from django.contrib.auth.models import User

def uniqueID():
	import uuid
	return uuid.uuid4().hex[:5]

class Contact(models.Model):
	uuid			= models.TextField(max_length=5, primary_key=True, default=uniqueID, editable=False)
	owner			= models.ForeignKey(User, on_delete=models.CASCADE)
	first_name		= models.CharField(max_length=200)
	middle_name		= models.CharField(max_length=200, blank=True)
	last_name		= models.CharField(max_length=200, blank=True)
	organization	= models.CharField(max_length=200, blank=True)
	title			= models.CharField(max_length=200, blank=True)

	def __str__(self):
		return f"[{self.uuid}] {self.owner}'s Contact"

class ContactEmail(models.Model):
	uuid			= models.TextField(max_length=5, primary_key=True, default=uniqueID, editable=False)
	contact			= models.ForeignKey(Contact, on_delete=models.CASCADE)
	home			= models.EmailField(blank=True)
	work			= models.EmailField(blank=True)

	def __str__(self):
		return f"[{self.uuid}] emails of {self.contact}"

class ContactPhone(models.Model):
	uuid			= models.TextField(max_length=5, primary_key=True, default=uniqueID, editable=False)
	contact			= models.ForeignKey(Contact, on_delete=models.CASCADE)
	home			= models.CharField(max_length=20, blank=True)
	work			= models.CharField(max_length=20, blank=True)

	def __str__(self):
		return f"[{self.uuid}] phone numbers of {self.contact}"