import numpy as np
file_path = r"data/soilmoisture/evap_moisture.npz"

file = np.load(file_path)

lon = file['lon']
lat = file['lat']
evapotrans = file['evapotrans']
soilmoisture = file['soilmoisture']

def get_coords(lon_val, lat_val):


    if not (60 < lon_val < 78 and 23 < lat_val < 38):
        raise ValueError("Invalid Longitude or Latitude provided")
    
    lon_index = np.searchsorted(lon, lon_val)
    # Check the closest values (before and after the lon_index)
    before = lon[max(0, lon_index - 1)]
    after = lon[min(lon_index, len(lon) - 1)]
    # Determine which value is closer
    if abs(before - lon_val) < abs(after - lon_val):
        lon_index_of_closest = lon_index - 1
    else:
       lon_index_of_closest = lon_index

    
    lat_index = np.searchsorted(lat, lat_val)
    # Check the closest values (before and after the lat_index)
    before = lat[max(0, lat_index - 1)]
    after = lat[min(lat_index, len(lat) - 1)]
    # Determine which value is closer
    if abs(before - lat_val) < abs(after - lat_val):
        lat_index_of_closest = lat_index - 1
    else:
       lat_index_of_closest = lat_index

    return lon_index_of_closest, lat_index_of_closest

    

def get_evapotrans(lon, lat):
    return evapotrans[get_coords(lon, lat)]

def get_soilmoisture(lon, lat):
    return soilmoisture[get_coords(lon, lat)]
