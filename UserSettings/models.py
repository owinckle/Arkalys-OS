from django.db import models
from django.contrib.auth.models import User

def uniqueID():
	import uuid
	return uuid.uuid4().hex[:5]

class Pin(models.Model):
	uuid		= models.TextField(max_length=5, primary_key=True, default=uniqueID, editable=False)
	owner		= models.ForeignKey(User, on_delete=models.CASCADE)
	contacts	= models.BooleanField(default=True)

class InstalledApp(models.Model):
	owner		= models.ForeignKey(User, on_delete=models.CASCADE)
	contacts	= models.BooleanField(default=True)