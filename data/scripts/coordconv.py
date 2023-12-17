## Always remember the resolution of each granule
# For now NDVI is 500m while LST is 1km
# Hence NDVI resolution is 0.5 while LST is 1
from math import floor

TILEVH = {
    'h23v05': [(57.7350,    78.3353),   (30.0000,   40.0000)],
    'h23v06': [(53.2089,    69.2917),   (20.0000,   30.0000)],
    'h24v05': [(69.2820,    91.3894),   (30.0000,   40.0000)],
    'h24v06': [(63.8507,    80.8387),   (20.0000,   30.0000)],
}


from math import floor

# Function to return coordinates from the long and latitude for our modis data tiles

def return_coordinates(long, lat, resolution):
    
    total_points = 1200/resolution

    tile = ""

    for each in TILEVH.keys():
        if long > TILEVH[each][0][0] and long < TILEVH[each][0][1] and lat > TILEVH[each][1][0] and lat < TILEVH[each][1][1]:
            tile = each
            break
    
    if tile == "":
        raise ValueError("Long and Latitudes are incorrect please provide again in order (long, lat)")

    rel_long = long - TILEVH[tile][0][0]
    rel_lat = lat - TILEVH[tile][1][0]
    long_dist = TILEVH[tile][0][1] - TILEVH[tile][0][0]
    lat_dist = TILEVH[tile][1][1] - TILEVH[tile][1][0]

    x = floor((rel_long/long_dist) * total_points)
    y = floor((rel_lat/lat_dist) * total_points)

    return (x, y, tile)