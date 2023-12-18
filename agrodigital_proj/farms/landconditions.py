import sys

from datetime import datetime
from data.scripts.get_modis import get_ndvi, get_lc, get_lst
from data.scripts.soilmoisture import get_evapotrans, get_soilmoisture
from django.db import connection
from io import BytesIO
import base64
import matplotlib.pyplot as plt
import numpy as np

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

def MakeBarGraph(farm_id, crop_id):
    with connection.cursor() as cursor:
        print("came here ig")
        cursor.callproc('GetNasaChart', [farm_id, crop_id])
        results = cursor.fetchall()
        labels = [each[2] + "\n" + str(each[3]) for each in results]
        print("came here first")
        ndvi = [get_ndvi(each[0], each[1], each[3]) for each in results]
        lc = [get_lc(each[0], each[1], each[3]) for each in results]
        lst = [get_lst(each[0], each[1], each[3]) for each in results]

        print("Came here")

        # Creating a bar chart
        fig, axes = plt.subplots(nrows=3, ncols=1, figsize=(8, 16))  # Adjust the figure size as needed
        bar_width = 0.6  # Adjust the bar width as needed
        index = np.arange(len(labels))

        axes[0].bar(labels, ndvi, width=bar_width, color='blue')
        axes[0].set_title('Vegetable Index')
                
        
        axes[1].bar(labels, lc, width=bar_width, color='orange')
        axes[1].set_title('Leaf Cover')

        axes[2].bar(labels, lst, width=bar_width, color='green')
        axes[2].set_title("Land Surface Temperature")

        # Adding labels and title to the overall figure
        fig.suptitle('Crop health Stats', fontsize=16)
        plt.xlabel('Time Passed Since Plantation')
        plt.ylabel('NASA Values')
        
        # Creating barchart for these values now
        img_data = BytesIO()
        plt.savefig(img_data, format='png')
        img_data.seek(0)
        plt.savefig('check.png')
        plt.close()


        # Saving the image to django's default storage
        img_base64 = base64.b64encode(img_data.getvalue()).decode('utf-8')

        return img_base64






