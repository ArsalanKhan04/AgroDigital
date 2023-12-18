import requests

def get_static_map(longitude, latitude, zoom=18, size='400x400'):
    base_url = "https://maps.googleapis.com/maps/api/staticmap"
    params = {
        'center': f'{latitude},{longitude}',
        'zoom': zoom,
        'size': size,
        'maptype': 'satellite',
        'key': 'AIzaSyALXR57opaTZTuNvbYYCjF7nDDHx8xXHpk',  # Replace with your API key
    }
    response = requests.get(base_url, params=params)
    return response.url

def get_history(datatypefunc, longitude, latitude, start_date, end_date):
    pass