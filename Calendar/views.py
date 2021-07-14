from django.shortcuts import render

from rest_framework import status as rest_status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import *

from datetime import datetime, time
from dateutil.relativedelta import *

def successRequest(data):
	"""
	Returns a dict and code 200
	"""
	return Response(data, status=rest_status.HTTP_200_OK)

def format_time(time):
	ftime	= list(str(time))
	ftime	= "".join(ftime[:-6])
	ftime	= int(ftime)

	if ftime == 0:
		ftime = "12 AM"
	elif ftime >= 1 and ftime <= 11:
		ftime = f"{ftime} AM"
	elif ftime == 12:
		ftime = "12 PM"
	elif ftime >= 13 and ftime <= 23:
		ftime = f"{ftime} PM"

	return ftime

def format_date(date):
	fdate	= datetime.combine(date, time.min)
	fdate	= fdate.strftime("%B %d, %Y")
	return fdate

def match_dates(e_date, s_date):
	e_date = datetime.fromtimestamp(e_date)
	e_date = e_date + relativedelta(days=+1)
	e_date = e_date + relativedelta(months=-1)
	s_date	= datetime.combine(s_date, time.min)

	if e_date.date() == s_date.date():
		return True
	return False

class GetEvents(APIView):
	def post(self, request, format=None):
		user	= request.user
		events	= Event.objects.filter(owner=user)

		event_list = []
		for event in events:
			e = {}
			e["uuid"]	= event.uuid
			e["with"]	= "Somebody"
			e["title"]	= event.title
			e["time"]	= format_time(event.start_time)
			e["date"]	= format_date(event.date)
			event_list.append(e)

		data = {
			"events": event_list
		}

		return successRequest(data)

class GetEventByDate(APIView):
	def post(self, request, format=None):
		user	= request.user
		events	= Event.objects.filter(owner=user)
		date	= request.data.get("date")

		event_list = []
		for event in events:
			if match_dates(date, event.date):
				e = {}
				e["uuid"]	= event.uuid
				e["with"]	= "Somebody"
				e["title"]	= event.title
				e["time"]	= format_time(event.start_time)
				e["date"]	= format_date(event.date)
				event_list.append(e)

		data = {
			"events": event_list
		}

		return successRequest(data)