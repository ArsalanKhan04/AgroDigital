# Generated by Django 5.0 on 2023-12-17 19:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('farms', '0004_landconditions_date_alter_landconditions_farm'),
    ]

    operations = [
        migrations.AlterField(
            model_name='landconditions',
            name='soil_type',
            field=models.CharField(choices=[('clay_soil', 'Clay Soil'), ('sand_soil', 'Sand Soil'), ('silty_soil', 'Silty Soil'), ('peaty_soil', 'Peaty Soil'), ('chalky_soil', 'Chalky Soil'), ('loamy_soil', 'Loamy Soil')], max_length=20, null=True),
        ),
    ]