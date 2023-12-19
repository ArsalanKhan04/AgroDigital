from django.urls import path
from . import views

urlpatterns = [
    path('getdistricts', views.GetDistricts.as_view(), name='getdistricts'),
    path('getmarkets', views.GetMarkets.as_view(), name='getmarkets'),
    path("getmarketrates", views.GetMarketRates.as_view(), name="getmarketrates")
]