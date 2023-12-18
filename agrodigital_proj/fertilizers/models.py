from django.db import models
from districts.models import Address
from farms.models import Crops



# Create your models here.
class Fertilizers(models.Model):
    name = models.CharField(max_length=100, null=True)
    nitrogen = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        null=True
    )
    phosphorus = models.DecimalField(
        max_digits = 5,
        decimal_places = 2, 
        null=True
    )
    potassium = models.DecimalField(
        max_digits = 5,
        decimal_places = 2, 
        null=True
    )

class FertCompany(models.Model):
    name = models.CharField(max_length=100, null=True)
    address = models.ForeignKey(Address, on_delete=models.CASCADE)
    contact = models.CharField(max_length=20, null=True)

class FertVendors(models.Model):
    company = models.ForeignKey(FertCompany, on_delete=models.CASCADE)
    fertilizer = models.ForeignKey(Fertilizers, on_delete=models.CASCADE)
    price = models.FloatField(null = True)

class FertRecc(models.Model):
    crop = models.ForeignKey(Crops, on_delete=models.CASCADE)
    fertilizer = models.ForeignKey(Fertilizers, on_delete=models.CASCADE)