from django.shortcuts import render

from rest_framework import status as rest_status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import *
from .serializers import *

from .utils import *

def successRequest(data):
	"""
	Returns a dict and code 200
	"""
	return Response(data, status=rest_status.HTTP_200_OK)

class GetInvoices(APIView):
	def post(self, request, format=None):
		user		= request.user
		invoices	= Invoice.objects.filter(owner=user).order_by('issued')

		invoice_list = []
		for invoice in invoices:
			i				= {}
			i["uuid"]		= invoice.uuid
			i["issued"]		= invoice.issued
			i["due"]		= invoice.due
			i["client"]		= invoice.client_name
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

class CreateInvoice(APIView):
	def post(self, request, format=None):
		user			= request.user
		invoice_type	= request.data.get("type")
		items			= request.data.get("items")
		org_street		= request.data.get("org_street")
		org_city		= request.data.get("org_city")
		org_zip			= request.data.get("org_zip")
		org_country		= request.data.get("org_country")
		client_name		= request.data.get("client_name")
		client_email	= request.data.get("client_email")
		client_street	= request.data.get("client_street")
		client_city		= request.data.get("client_city")
		client_zip		= request.data.get("client_zip")
		client_country	= request.data.get("client_country")
		issued			= request.data.get("issued")
		due				= request.data.get("due")
		description		= request.data.get("description")


		new_invoice = Invoice(
				owner=user,
				description=description,
				org_street=org_street,
				org_city=org_city,
				org_zip=org_zip,
				org_country=org_country,
				client_name=client_name,
				client_email=client_email,
				client_street=client_street,
				client_city=client_city,
				client_zip=client_zip,
				client_country=client_country,
			)

		if issued:
			new_invoice.issued = issued

		if due:
			new_invoice.due = due

		if invoice_type == "draft": 
			new_invoice.status = "Draft"

		new_invoice.save()

		for item in items:
			new_item = InvoiceItem(
				invoice=new_invoice,
				name=item["name"],
				quantity=item["qty"],
				price=item["price"]
			)

			new_item.save()

		data = {
			"success": True
		}
		return successRequest(data)

class GetInvoice(APIView):
	def post(self, request, format=None):
		user	= request.user
		uuid	= request.data.get("uuid")
		invoice	= Invoice.objects.filter(uuid=uuid).first()
		items	= InvoiceItem.objects.filter(invoice=invoice)

		total_price = 0
		for item in items:
			total_price += item.price * item.quantity

		data = {
			"invoice": InvoiceSerializer(invoice).data,
			"items": InvoiceItemSerializer(items, many=True).data,
			"total_price": total_price
		}

		return successRequest(data)

def view_invoice(request, uuid):
	invoice	= Invoice.objects.filter(uuid=uuid).first()
	items	= InvoiceItem.objects.filter(invoice=invoice)

	total_price = 0
	for item in items:
		total_price += item.price * item.quantity
	data = {
		"invoice": invoice,
		"items": items,
		"total_price": total_price
	}
	pdf	= generate_pdf("invoicing/default_template.html", data)
	return pdf
	# return render(request, "invoicing/default_template.html", data)
