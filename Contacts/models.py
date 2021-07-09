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

class ContactEmail(models.Model):
	uuid			= models.TextField(max_length=5, primary_key=True, default=uniqueID, editable=False)
	contact			= models.ForeignKey(Contact, on_delete=models.CASCADE)
	home			= models.EmailField(blank=True)
	work			= models.EmailField(blank=True)

class ContactPhone(models.Model):
	uuid			= models.TextField(max_length=5, primary_key=True, default=uniqueID, editable=False)
	contact			= models.ForeignKey(Contact, on_delete=models.CASCADE)
	home			= models.CharField(max_length=20, blank=True)
	work			= models.CharField(max_length=20, blank=True)