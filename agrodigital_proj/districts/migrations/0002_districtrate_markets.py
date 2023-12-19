# Generated by Django 5.0 on 2023-12-19 01:02

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('districts', '0001_initial'),
        ('farms', '0009_alter_farm_address'),
    ]

    operations = [
        migrations.CreateModel(
            name='DistrictRate',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.FloatField()),
                ('crop', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='farms.crops')),
                ('district', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='districts.districts')),
            ],
        ),
        migrations.CreateModel(
            name='Markets',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('market_name', models.CharField(max_length=100)),
                ('address', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='districts.address')),
            ],
        ),
    ]
