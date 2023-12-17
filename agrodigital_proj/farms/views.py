from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db import connection
from farms.landconditions import MakeNasaConditions





# Create your views here.

# Making a new farm
class MakeFarm(APIView):
    def post(self, request):
        longitude = request.data.get("longitude", 0.0)
        latitude = request.data.get("latitude", 0.0)
        user_id = request.user.id
        farm_name = request.data.get("farm_name", "")
        farm_size = request.data.get("farm_size", 0.0)
        district_id = request.data.get("district_id", 0)
        address = request.data.get("address", "")
        city = request.data.get("city", "")
        landtype = request.data.get("landtype", "")
        try:
            with connection.cursor() as cursor:
                # Executing the making complete Farm stored procedure
                cursor.callproc('MakeCompleteFarm',
                                [
                                    longitude,
                                    latitude,
                                    user_id,
                                    farm_name,
                                    farm_size,
                                    district_id,
                                    address,
                                    city,
                                    landtype,
                                    0
                                ])
                out_param = cursor.fetchone()[0]
                print(out_param)
                MakeNasaConditions(out_param)
            return Response({'success': 'Stored Procedure executed successfully',
                             'farm_id': out_param})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Getting Crops
class GetCrop(APIView):
    def get(self, request):
        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT * FROM farms_crops")
                result = cursor.fetchall()
                res = [{
                    "id":each[0],
                    "crop_name":each[1]
                } for each in result]
                return Response(res, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                "error":str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Adding Crops
class AddCrop(APIView):
    def post(self, request):
        try:
            crop_id = request.data.get('crop_id', 0)
            farm_id = request.data.get('farm_id', 0)
            plant_date = request.data.get('plant_date', "")
            with connection.cursor() as cursor:
                cursor.callproc('AddCrop', [farm_id,
                                            crop_id,
                                            plant_date])
            return Response(status=status.HTTP_200_OK)

        except Exception as e:
            return Response({
                "error":str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Getting all the farms
class GetFarms(APIView):
    # Make sure to update view
    pass