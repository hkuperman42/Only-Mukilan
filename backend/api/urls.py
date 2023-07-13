from django.urls import path
from . import views

urlpatterns = [
    path('profile/<int:id>/', views.ProfileView.as_view(), name="ProfileAPI"),
    path('profile/', views.ProfileListView.as_view(), name="ProfileListAPI"),
]