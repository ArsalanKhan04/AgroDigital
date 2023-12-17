from django.urls import path
from . import views

urlpatterns = [
    path('makefarm', views.MakeFarm.as_view(), name='makefarm'),
    path('getfarms', views.GetFarms.as_view(), name='getfarms')
]