import sys
sys.path.append('../../')
sys.path.append('../')

from datetime import datetime
from data.scripts.get_modis import get_ndvi, get_lc, get_lst
from data.scripts.soilmoisture import get_evapotrans, get_soilmoisture
from django.db import connection

def MakeNasaConditions(farm_id):
    with connection.cursor() as cursor:
        cursor.execute(f"SELECT longitude, latitude FROM farms_farm WHERE id = {farm_id}")

        row = cursor.fetchone()

        if row is not None:

            # Accessing values of longitude and latitude
            longitude, latitude = row
            latitude = float(latitude)
            longitude = float(longitude)
            print(longitude)
            print(latitude)
            # Get the current date
            current_date = datetime.now().strftime("%Y-%m-%d")

            ndvi = get_ndvi(longitude, latitude, current_date)
            lc = get_lc(longitude, latitude, current_date)
            lst = get_lst(longitude, latitude, current_date)

            evapotrans = get_evapotrans(longitude, latitude)
            soilmoisture = get_soilmoisture(longitude, latitude)

            cursor.callproc('UpdateNASA', [
                lst,
                ndvi,
                lc,
                soilmoisture,
                evapotrans,
                farm_id
            ])
        else:
            raise Exception("Could not do landconditions.py")




