# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db import connection


class GetDistricts(APIView):
    def get(self, request):
        user_id = request.user.id
        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT * FROM districts_districts")
                districts = cursor.fetchall()
                json_res = [{'id': each[0], 'name': each[1]} for each in districts]
                return Response(json_res, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error':str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class GetMarkets(APIView):
    def get(self, request):
        try: 
            with connection.cursor() as cursor:
                cursor.callproc("GetMarkets", [])
                results = cursor.fetchall()
                res = [
                    {
                        "district_id":each[0],
                        "market_name":each[1],
                        "address":each[2],
                        "city":each[3]
                    }
                    for each in results
                ]
                return Response(res, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error':str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class GetMarketRates(APIView):
    def get(self, request):
        try:
            district_id=request.GET.get("district_id")
            print(district_id)
            with connection.cursor() as cursor:
                
                cursor.callproc("GetMarketsRate", [district_id])
                results = cursor.fetchall()
                print(len(results))
                res = [
                    {
                        "crop_name":each[0],
                        "min_price":each[1],
                        "max_price":each[2],
                        "crop_id":each[3],
                    }
                    for each in results
                ]
                return Response(res, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error':str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)