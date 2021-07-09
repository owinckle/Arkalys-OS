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

class GetContacts(APIView):
	def post(self, request, format=None):
		user		= request.user
		contacts	= Contact.objects.filter(owner=user)

		contact_list = []
		for contact in contacts:
			emails				= ContactEmail.objects.filter(contact=contact).first()
			phones				= ContactPhone.objects.filter(contact=contact).first()
			c = {}
			c["uuid"]			= contact.uuid
			c["name"]			= f"{contact.first_name} {contact.middle_name} {contact.last_name}"
			c["emails"]			= {
				"home": emails.home,
				"work": emails.work
			}
			c["phones"]			= {
				"home": phones.home,
				"work": phones.work
			}
			c["organization"]	= contact.organization
			c["title"]			= contact.title
			contact_list.append(c)

		data = {
			"contacts": contact_list
		}

		return successRequest(data)