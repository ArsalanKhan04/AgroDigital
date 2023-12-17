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
