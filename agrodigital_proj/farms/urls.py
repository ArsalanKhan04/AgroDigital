from django.urls import path
from . import views

urlpatterns = [
    path('makefarm', views.MakeFarm.as_view(), name='makefarm'),
    path('getcrops', views.GetCrop.as_view(), name='getcrops'),
    path('addcrop', views.AddCrop.as_view(), name='addcrop'),
    path('getfarms', views.GetFarms.as_view(), name='getfarms'),
    path('geteachfarm', views.GetEachFarm.as_view(), name='geteachfarm'),
    path('getfarmcrops', views.GetFarmCrops.as_view(), name='getfarmcrops'),
    path('getfarmsatimage', views.GetFarmSatImage.as_view(), name='getfarmsatimage'),
    path('getcrophistoryimage', views.GetCropHistoryImage.as_view(), name='getcrophistoryimage'),
    path('getpredictedyield', views.GetPredictedYield.as_view(), name="getpredictedyield")
]