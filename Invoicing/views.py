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

class GetInvoices(APIView):
	def post(self, request, format=None):
		user		= request.user
		invoices	= Invoice.objects.filter(owner=user)

		invoice_list = []
		for invoice in invoices:
			i				= {}
			i["uuid"]		= invoice.uuid
			i["issued"]		= invoice.issued
			i["due"]		= invoice.due
			i["client"]		= invoice.client
			i["status"]		= invoice.status
			i["currency"]	= invoice.currency

			items	= InvoiceItem.objects.filter(invoice=invoice)
			amount	= 0
			for item in items:
				amount += item.price * item.quantity
			i["amount"]	= amount
			invoice_list.append(i)

		data = {
			"invoices": invoice_list
		}
		return successRequest(data)