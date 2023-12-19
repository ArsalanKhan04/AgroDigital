from django.db import models

# Create your models here.
class Districts(models.Model):
    name = models.CharField(max_length=50)

class Address(models.Model):
    district = models.ForeignKey(Districts, on_delete=models.CASCADE)
    address = models.CharField(max_length=100)
    city = models.CharField(max_length=50)

class Markets(models.Model):
    address=models.ForeignKey(Address, on_delete=models.CASCADE)
    market_name=models.CharField(max_length=100)

class DistrictRate(models.Model):
    from farms.models import Crops
    crop=models.ForeignKey(Crops, on_delete=models.CASCADE)
    district=models.ForeignKey(Districts, on_delete=models.CASCADE)
    min_price=models.FloatField(default=0)
    max_price=models.FloatField()