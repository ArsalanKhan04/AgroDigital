from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db import connection
from farms.landconditions import MakeNasaConditions, MakeBarGraph
from render_images.gen_sat import get_static_map




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
        print(request.data)
        print(district_id)
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
    def get(self, request):
        try:
            user_id = request.user.id
            with connection.cursor() as cursor:
                cursor.callproc('getfarms', [user_id])
                results = cursor.fetchall()
                res = [{
                    'farm_id':each[1],
                    'longitude':each[2],
                    'latitude':each[3],
                    'farm_name':each[4],
                    'size_acres':each[5],
                    'soil_type':each[6],
                    'soil_ph':each[7],
                    'nitrogen':each[8],
                    'phosphorus':each[9],
                    'potassium':each[10],
                    'ndvi':each[11],
                    'lst':each[12],
                    'leafcover':each[13],
                    'evapotrans':each[14],
                    'date':each[15],
                    'image_url':get_static_map(each[2],each[3])
                } for each in results]
                return Response(res)
        except Exception as e:
            return Response({
                "error":str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class GetFarmCrops(APIView):
    # Getting each farm crops
    def get(self, request):
        try:
            farm_id = request.GET.get('farms_id')
            print(farm_id)
            with connection.cursor() as cursor:
                cursor.callproc('getcrops_details', [farm_id])
                results = cursor.fetchall()
                res = [{
                        'crop_id': each[0],
                        'crop_name': each[1],
                        'plant_date':each[2],
                        'farms_id':each[4],
                        'ideal_soil_type':each[3],
                        'soil_ph_min':each[5],
                        'soil_ph_max':each[6],
                        'nitrogen_min':each[7],
                        'nitrogen_max':each[8],
                        'phosphorus_min':each[9],
                        'phosphorus_max':each[10],
                        'potassium_min':each[11],
                        'potassium_max':each[12]
                    } for each in results]
            return Response(res)

        except Exception as e:
            return Response({
                "error":str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class GetEachFarm(APIView):
    def get(self, request):
        farm_id = request.GET.get("farm_id")

        try:
            with connection.cursor() as cursor:
                cursor.callproc("getfarm_ind", [farm_id])
                each = cursor.fetchone()
                res = {
                    'farm_id':each[1],
                    'longitude':each[2],
                    'latitude':each[3],
                    'farm_name':each[4],
                    'size_acres':each[5],
                    'soil_type':each[6],
                    'soil_ph':each[7],
                    'nitrogen':each[8],
                    'phosphorus':each[9],
                    'potassium':each[10],
                    'ndvi':each[11],
                    'lst':each[12],
                    'leafcover':each[13],
                    'evapotrans':each[14],
                    'soilmoisture':each[15],
                    'date':each[16],
                    'image_url':get_static_map(each[2],each[3])
                }
            return Response(res)
        except Exception as e:
                return Response({
                    "error":str(e)
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Sending images data
class GetFarmSatImage(APIView):
    def get(self,request):
        farm_id = request.GET.get('farm_id')
        try:
            with connection.cursor() as cursor:
                cursor.callproc('GetCoords', [farm_id])
                results = cursor.fetchone()
                farm_id = results[0]
                latitude = results[1]
                longitude = results[2]
                print(latitude, longitude)
            return Response({
                "farm_id":farm_id,
                "img_content":get_static_map(longitude, latitude)})
        except Exception as e:
            return Response({
                "error":str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class GetCropHistoryImage(APIView):
    def get(self, request):
        farm_id = request.GET.get('farm_id')
        crop_id = request.GET.get('crop_id')
        try:
            
            image_data = MakeBarGraph(farm_id, crop_id)

            res = {
                'image_data':image_data
            }
                

            return Response(res)
        except Exception as e:
            return Response({
                "error":str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UpdateNutriends(APIView):
    def post(self, request):
        pass


class GetPredictedYield(APIView):
    def get(self, request):
        try:
            user_id = request.user.id
            with connection.cursor() as cursor:
                cursor.callproc("GetYield", [user_id])
                results=cursor.fetchall()
            res = [
                {
                    "user_id":each[0],
                    "farm_id":each[1],
                    "crop_id":each[3],
                    "farm_name":each[2],
                    "crop_name":each[4],
                    "size_acres":each[5],
                    "pred_yield":each[6],
                    "pred_cost":each[7]
                } for each in results
            ]
            return Response(res)
        except Exception as e:
            return Response({
                "error":str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
