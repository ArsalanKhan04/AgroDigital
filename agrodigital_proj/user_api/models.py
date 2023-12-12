# Create your models here.
# Create your models here.
# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

class AppUserManager(BaseUserManager):
    def create_user(self, email, password=None):
        if not email:
            raise ValueError("An email is required")
        if not password:
            raise ValueError("A password is required")
        email = self.normalize_email(email)
        user = self.model(email=email)
        user.set_password(password)
        user.save()
        return user
    def create_superuser(self, email, password):
        if not email:
            raise ValueError("An email is required")
        if not password:
            raise ValueError("A password is required")
        user = self.create_user(email, password)
        user.is_superuser = True
        user.save()
        return user

class AgroUsers(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=25, blank=True, null=True)
    name = models.CharField(max_length=35, blank=True, null=True)
    address_id = models.IntegerField(blank=True, null=True)
    contact = models.CharField(max_length=35, blank=True, null=True)
    email = models.EmailField(max_length=255, unique=True, blank=True, null=True)



    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = AppUserManager()
    def __str__(self):
        return self.email



