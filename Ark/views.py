from django.shortcuts import render
from django.contrib.auth.decorators import login_required

@login_required
def ark(request):
	return render(request, "frontend/ark.html")