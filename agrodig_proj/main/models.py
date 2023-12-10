# Create your models here.
# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Address(models.Model):
    address_id = models.AutoField(primary_key=True)
    address = models.CharField(max_length=100, blank=True, null=True)
    city = models.CharField(max_length=30, blank=True, null=True)
    district = models.ForeignKey('Districts', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'Address'


class CropConditions(models.Model):
    crop = models.OneToOneField('Crops', models.DO_NOTHING, primary_key=True)
    temp_low = models.FloatField(blank=True, null=True)
    temp_high = models.FloatField(blank=True, null=True)
    plant_start = models.DateField(blank=True, null=True)
    plant_end = models.DateField(blank=True, null=True)
    harvest_start = models.DateField(blank=True, null=True)
    harvest_end = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'Crop_Conditions'


class CropPrices(models.Model):
    market = models.ForeignKey('Markets', models.DO_NOTHING)
    crop = models.ForeignKey('Crops', models.DO_NOTHING)
    time_start = models.DateField(blank=True, null=True)
    time_end = models.DateField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'Crop_Prices'
        unique_together = (('crop', 'market'))


class Crops(models.Model):
    crop_id = models.AutoField(primary_key=True)
    crop_name = models.CharField(max_length=30, blank=True, null=True)
    crop_season = models.CharField(max_length=30, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'Crops'


class Discussions(models.Model):
    discussion_id = models.AutoField(primary_key=True)
    user = models.ForeignKey('Users', models.DO_NOTHING, blank=True, null=True)
    content = models.CharField(max_length=2000, blank=True, null=True)
    topic = models.ForeignKey('Topic', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'Discussions'


class Districts(models.Model):
    district_id = models.AutoField(primary_key=True)
    district_name = models.CharField(max_length=30, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'Districts'


class Farms(models.Model):
    farm_id = models.AutoField(primary_key=True)
    address = models.ForeignKey(Address, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'Farms'


class FertilizerCompany(models.Model):
    company_id = models.AutoField(primary_key=True)
    address = models.ForeignKey(Address, models.DO_NOTHING, blank=True, null=True)
    company_name = models.CharField(max_length=25, blank=True, null=True)
    contact_no = models.CharField(max_length=25, blank=True, null=True)
    email = models.CharField(max_length=25, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'Fertilizer_Company'


class Fertilizers(models.Model):
    fertilizer_id = models.AutoField(primary_key=True)
    fertilizer_name = models.CharField(max_length=30, blank=True, null=True)
    nitrogencontent = models.DecimalField(db_column='NitrogenContent', max_digits=5, decimal_places=2, blank=True, null=True)  # Field name made lowercase.
    phosphoruscontent = models.DecimalField(db_column='PhosphorusContent', max_digits=5, decimal_places=2, blank=True, null=True)  # Field name made lowercase.
    potassiumcontent = models.DecimalField(db_column='PotassiumContent', max_digits=5, decimal_places=2, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Fertilizers'


class FertilizersRecommendations(models.Model):
    crop = models.ForeignKey(Crops, models.DO_NOTHING)
    fertilizer = models.ForeignKey(Fertilizers, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'Fertilizers_Recommendations'
        unique_together = (('crop', 'fertilizer'))


class FertilizersVendor(models.Model):
    fertilizer = models.ForeignKey(Fertilizers, models.DO_NOTHING)
    company = models.ForeignKey(FertilizerCompany, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'Fertilizers_Vendor'
        unique_together = (('fertilizer', 'company'))


class Managers(models.Model):
    user = models.OneToOneField('Users', models.DO_NOTHING, primary_key=True)
    district = models.ForeignKey(Districts, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'Managers'
        unique_together = (('user', 'district'))


class Markets(models.Model):
    market_id = models.AutoField(primary_key=True)
    address = models.ForeignKey(Address, models.DO_NOTHING, blank=True, null=True)
    market_name = models.CharField(max_length=40, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'Markets'


class Topic(models.Model):
    topic_id = models.AutoField(primary_key=True)
    topic_name = models.CharField(max_length=40, blank=True, null=True)
    total_messages = models.IntegerField(blank=True, null=True)
    date_created = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'Topic'


class Areacover(models.Model):
    farm = models.OneToOneField(Farms, models.DO_NOTHING, primary_key=True)
    long_start = models.FloatField(blank=True, null=True)
    long_end = models.FloatField(blank=True, null=True)
    lat_start = models.FloatField(blank=True, null=True)
    lat_end = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'areacover'


class FarmCrops(models.Model):
    crop = models.ForeignKey(Crops, models.DO_NOTHING, blank=True, null=True)
    farm = models.ForeignKey(Farms, models.DO_NOTHING, blank=True, null=True)
    planting_date = models.DateField(blank=True, null=True)
    harvest_prediction = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'farm_crops'
        unique_together = (('crop', 'farm'),)


class Farmers(models.Model):
    user = models.OneToOneField('Users', models.DO_NOTHING, primary_key=True)
    farm = models.ForeignKey(Farms, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'farmers'
        unique_together = (('user', 'farm'))



# This farmsauthorized usually refer to being under a specific district manager
class FarmsAuthorized(models.Model):
    manager = models.OneToOneField('Users', models.DO_NOTHING, primary_key=True)
    farm = models.ForeignKey(Farms, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'farms_authorized'
        unique_together = (('manager', 'farm'))


class MarketsAuthorized(models.Model):
    manager = models.OneToOneField('Users', models.DO_NOTHING, primary_key=True)
    market = models.ForeignKey(Markets, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'markets_authorized'
        unique_together = (('manager', 'market'))


class Users(models.Model):
    user_id = models.IntegerField(primary_key=True)
    password = models.CharField(max_length=25, blank=True, null=True)
    name = models.CharField(max_length=35, blank=True, null=True)
    address_id = models.IntegerField(blank=True, null=True)
    contact = models.CharField(max_length=35, blank=True, null=True)
    email = models.CharField(max_length=25, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'users'
