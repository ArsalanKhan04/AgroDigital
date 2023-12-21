'''
Getting modis data in this file
I will write the relevant functions to get NDVI values and other relevant values from the data gained from modis satelites

get_ndvi(long, lat) takes longitude and latitude values and gives the ndvi value


'''
# importing numpy to get the data
import os
import sys
import numpy as np
from data.scripts.coordconv import return_coordinates, day_of_year

# keeping the file_path while keeping empty space to get data later
ndvi_dest_path = "data/ndvi/refined/ndvi_{}_{}.npy"
lst_dest_path = "data/landsurftemp/refined/lst_{}_{}.npy"
lc_dest_path = "data/leafcover/refined/leafcover_{}_{}.npy"
NDVI_end = 321
LST_end = 337
LC_end = 345

NDVI_nums = [num for num in range(1, NDVI_end+1, 16)]
LST_nums = [num for num in range(1, LST_end+1, 8)]
LC_nums = [num for num in range(9, LC_end+1, 4)]

def get_ndvi_xy(x, y, file_index, day):
    if not (0 < x < 2400 and 0 < y < 2400):
        raise ValueError("Invalid range of coordinates provided")
    day = f"{day:03d}"
    ndvi_data = np.load(ndvi_dest_path.format(day, file_index))
    return ndvi_data[x, y]*0.0001

def get_lc_xy(x, y, file_index, day):
    if not (0 < x < 2400 and 0 < y < 2400):
        raise ValueError("Invalid range of coordinates provided")
    day = f"{day:03d}"
    lc_data = np.load(lc_dest_path.format(day, file_index))
    return lc_data[x, y]*0.1

def get_lst_xy(x, y, file_index, day):
    if not (0 < x < 1200 and 0 < y < 1200):
        raise ValueError("Invalid range of coordinates provided")
    day = f"{day:03d}"
    lst_data = np.load(lst_dest_path.format(day, file_index))
    return (lst_data[x, y] * 0.021) - 273

def get_ndvi(long , lat, date):
    long = float(long)
    lat = float(lat)
    date = str(date)
    x, y, file_index = return_coordinates(long, lat, 0.5)
    day = day_of_year(date)
    print(day)
    day = NDVI_nums[np.searchsorted(NDVI_nums, int(day))-1]
    print(day)
    return get_ndvi_xy(x, y, file_index, day)

def get_lc(long, lat, date):
    long = float(long)
    lat = float(lat)
    date = str(date)
    x, y, file_index = return_coordinates(long, lat, 1)
    day = day_of_year(date)
    day = LC_nums[np.searchsorted(LC_nums, int(day))-1]
    return get_lc_xy(x, y, file_index, day)

def get_lst(long, lat, date):
    long = float(long)
    lat = float(lat)
    date = str(date)
    x, y, file_index = return_coordinates(long, lat, 1)
    day = day_of_year(date)
    day = LST_nums[np.searchsorted(LST_nums, int(day))-1]
    return get_lst_xy(x, y, file_index, day)