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

# Defining the different time stages of crops
STAGE_CHOICES = [
    ('plant', 'Plant'),
    ('veg_growth','Vegetative Growth'),
    ('gran_growth', 'Grand Growth and Tillering'),
    ('ripen', 'Maturation and Ripening'),
    ('harvest', 'Harvesting')

]


    
class Crops(models.Model):

    name = models.CharField(max_length=20, choices=CROP_CHOICES)
    

class IdealCropConditions(models.Model):
    crop = models.OneToOneField(Crops, on_delete=models.CASCADE)
    soil_type = models.CharField(max_length=20, choices=SOIL_CHOICES)
    soil_ph_min = models.FloatField() # This is to be hardcoded
    soil_ph_max = models.FloatField() # This is to be hardcoded
    
    nitrogen_min = models.DecimalField(
        max_digits = 5,
        decimal_places = 2
    )
    nitrogen_max = models.DecimalField(
        max_digits = 5,
        decimal_places = 2
    )

    phosphorus_min = models.DecimalField(
        max_digits = 5,
        decimal_places = 2,
    )
    phosphorus_max = models.DecimalField(
        max_digits = 5,
        decimal_places = 2,
    )

    potassium_min = models.DecimalField(
        max_digits = 5,
        decimal_places = 2
    )
    potassium_max = models.DecimalField(
        max_digits = 5,
        decimal_places = 2
    )


class CropsTimeline(models.Model):
    crop = models.ForeignKey(Crops, on_delete=models.CASCADE)
    stage = models.CharField(max_length=30, choices=STAGE_CHOICES)
    date_start = models.DateField()
    date_end = models.DateField()

class CropConditionsTimed(models.Model):
    croptimestage = models.OneToOneField(CropsTimeline, on_delete=models.CASCADE)
    ndvi_min = models.FloatField(validators=[ # This is to be calculated using the NDVI data
        MinValueValidator(-1), MaxValueValidator(1)
    ])
    ndvi_max = models.FloatField(validators=[ # This is to be calculated using the NDVI data
        MinValueValidator(-1), MaxValueValidator(1)
    ])
    lst_min = models.FloatField(validators=[
        MinValueValidator(150), MaxValueValidator(1310)
    ])
    lst_max = models.FloatField(validators=[
        MinValueValidator(150), MaxValueValidator(1310)
    ])
    leafcover_min = models.FloatField()
    leafcover_max = models.FloatField()

class Farm(models.Model):

    user = models.ForeignKey(AgroUsers, on_delete=models.CASCADE)
    address = models.OneToOneField(Address, on_delete=models.CASCADE)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    crops = models.ManyToManyField(Crops)


class LandConditions(models.Model):
    
    # Defining the different quanititative information of the land
    farm = models.OneToOneField(Farm, on_delete=models.CASCADE)
    soil_type = models.CharField(max_length=20, choices=SOIL_CHOICES) # This is to be hardcoded
    soil_ph = models.FloatField() # This is to be hardcoded
    nitrogen = models.DecimalField(
        max_digits = 5,
        decimal_places = 2
    )
    phosphorus = models.DecimalField(
        max_digits = 5,
        decimal_places = 2,
    )
    potassium = models.DecimalField(
        max_digits = 5,
        decimal_places = 2
    )
    ndvi = models.FloatField(validators=[ # This is to be calculated using the NDVI data
        MinValueValidator(-1), MaxValueValidator(1)
    ])
    lst = models.FloatField(validators=[
        MinValueValidator(150), MaxValueValidator(1310)
    ])
    leafcover = models.FloatField()
