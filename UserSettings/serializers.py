from rest_framework import serializers
from .models import *

class PinSerializer(serializers.ModelSerializer):
	class Meta:
		model	= Pin
		fields	= "__all__"

class InstalledAppSerializer(serializers.ModelSerializer):
	class Meta:
		model	= InstalledApp
		fields	= "__all__"
