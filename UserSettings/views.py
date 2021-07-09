from django.shortcuts import render

from rest_framework import status as rest_status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import *
from .serializers import *

def successRequest(data):
	"""
	Returns a dict and code 200
	"""
	return Response(data, status=rest_status.HTTP_200_OK)

class Pins(APIView):
	def post(self, request, format=None):
		action	= request.data.get("action")
		user	= request.user

		if action == "get":
			pins		= Pin.objects.filter(owner=user).first()

			data		= {
				"pins": PinSerializer(pins).data
			}

		elif action == "edit":
			pins		= Pin.objects.filter(owner=user).first()
			module		= request.data.get("module")
			pin_state	= getattr(pins, module)
			setattr(pins, module, False if pin_state else True)
			pins.save()

			data = {}

		return successRequest(data)

class GetApps(APIView):
	def post(self, request, format=None):
		user	= request.user
		apps	= InstalledApp.objects.filter(owner=user).first()

		data = {
			"installed": InstalledAppSerializer(apps).data
		}

		return successRequest(data)