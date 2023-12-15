from django.db import models
from user_api.models import AgroUsers
from districts.models import Address
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.
# These are the only crops we will be using for now
CROP_CHOICES = [
    ('sugarcane', 'Sugarcane'),
    ('wheat', 'Wheat'),
    ('rice', 'Rice')
]

# Limiting the soil choices to the ones we will be using only
SOIL_CHOICES = [
    ('clay_soil', 'Clay Soil'),
    ('sand_soil', 'Sand Soil'),
    ('silty_soil', 'Silty Soil'),
    ('peaty_soil', 'Peaty Soil'),
    ('chalky_soil', 'Chalky Soil'),
    ('loamy_soil', 'Loamy Soil')
]

class LandConditions(models.Model):
    
    # Defining the different quanititative information of the land
    soil_type = models.CharField(max_length=20, choices=SOIL_CHOICES)
    soil_ph = models.FloatField()
    temperature = models.CharField(max_length=15)
    soil_ndvi = models.FloatField(validators=[
        MinValueValidator(-1), MaxValueValidator(1)
    ])





    
class Crops(models.Model):

    name = models.CharField(max_length=20, choices=CROP_CHOICES)
    landconditions = models.OneToOneField(LandConditions, on_delete=models.CASCADE)


class Farm(models.Model):

    user = models.ForeignKey(AgroUsers, on_delete=models.CASCADE)
    address = models.OneToOneField(Address, on_delete=models.CASCADE)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    crops = models.ManyToManyField(Crops)
    landconditions = models.OneToOneField(LandConditions)

