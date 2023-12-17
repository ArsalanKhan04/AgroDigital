from django.urls import path
from . import views

urlpatterns = [
    path('getdistricts', views.GetDistricts.as_view(), name='getdistricts')
]