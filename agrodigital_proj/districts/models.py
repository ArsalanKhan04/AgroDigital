from django.db import models

# Create your models here.
class Districts(models.Model):
    name = models.CharField(max_length=50)

class Address(models.Model):
    district = models.ForeignKey(Districts, on_delete=models.CASCADE)
    address = models.CharField(max_length=100)
    city = models.CharField(max_length=50)

