'''
Getting modis data in this file
I will write the relevant functions to get NDVI values and other relevant values from the data gained from modis satelites

get_ndvi(long, lat) takes longitude and latitude values and gives the ndvi value


'''
# importing numpy to get the data
import numpy as np
from coordconv import return_coordinates as rc

# keeping the file_path while keeping empty space to get data later
ndvi_dest_path = "../ndvi/ndvi_{}.npy"
lst_dest_path = "../landsurftemp/lst_{}.npy"

def get_ndvi_xy(x, y, file_index):
    if not (0 < x < 2400 and 0 < y < 2400):
        raise ValueError("Invalid range of coordinates provided")
    ndvi_data = np.load(ndvi_dest_path.format(file_index))
    return ndvi_data[x, y]*0.0001

def get_lst_xy(x, y, file_index):
    if not (0 < x < 1200 and 0 < y < 1200):
        raise ValueError("Invalid range of coordinates provided")
    lst_data = np.load(lst_dest_path.format(file_index))
    return lst_data[x, y] * 0.021

def get_ndvi(long , lat):
    x, y, file_index = rc(long, lat, 0.5)
    return get_ndvi_xy(x, y, file_index)


def get_lst(long, lat):
    x, y, file_index = rc(long, lat, 1)
    return get_lst_xy(x, y, file_index)


