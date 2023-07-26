
from django.urls import re_path, path
from channels.routing import URLRouter
from api import routing

websocket_urlpatterns = [
    path('api/ws/', URLRouter(routing.websocket_urlpatterns))
]

