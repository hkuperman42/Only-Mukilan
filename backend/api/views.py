from django.shortcuts import render
from rest_framework import views
from rest_framework import response
from rest_framework import status
from . import serializer
from . import models

# Create your views here.

class ProfileListView(views.APIView):
    serializer_class = serializer.ProfileSerializer
    
    def get(self, request):
        profiles = models.Profile.objects.all()
        ser = serializer.ProfileSerializer(profiles, context={"request": request}, many=True)
        return response.Response(ser.data)

    def post(self, request):
        ser = serializer.ProfileSerializer(data=request.data)
        if ser.is_valid(raise_exception=True):
            ser.save()
            return response.Response(status=status.HTTP_204_NO_CONTENT)

class ProfileView(views.APIView):
    serializer_class = serializer.ProfileSerializer

    def get(self, request, id):
        try:
            profile = models.Profile.objects.get(pk=id)
        except models.Profile.DoesNotExist:
            return response.Response(status=status.HTTP_404_NOT_FOUND)
        ser = serializer.ProfileSerializer(profile, context={"request": request})
        return response.Response(ser.data)
    