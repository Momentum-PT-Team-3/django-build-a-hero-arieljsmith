from django.shortcuts import render
# from myapi.models import Hero


# Create your views here.
def index(request):
    # heroes = Hero.objects.all()
    # Now solely using views in frontend to deliver the page--api talks to database
    return render(request, 'home.html')
