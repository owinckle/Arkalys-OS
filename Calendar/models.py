from django.db import models
from django.contrib.auth.models import User

def uniqueID():
	import uuid
	return uuid.uuid4().hex[:5]

CUSTOM_COLORS = [
	("0", "0"),
	("1", "1"),
	("2", "2"),
	("3", "3"),
	("4", "4"),
	("5", "5"),
	("6", "6"),
]

DATE_INPUT_FORMATS = ['%d-%m-%Y']

class Event(models.Model):
	uuid		= models.TextField(max_length=5, primary_key=True, default=uniqueID, editable=False)
	owner		= models.ForeignKey(User, on_delete=models.CASCADE)
	title		= models.CharField(max_length=60)
	color		= models.CharField(max_length=7, choices=CUSTOM_COLORS, default=0)
	start_time	= models.TimeField()
	end_time	= models.TimeField()
	date		= models.DateField()

	def __str__(self):
		return f"[{self.uuid}] {self.owner}'s Event" 