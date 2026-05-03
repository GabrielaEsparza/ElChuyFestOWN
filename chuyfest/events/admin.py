"""
Registro de modelos en el panel de administración de Django.

Una vez que corro el servidor y entro a http://localhost:8000/admin/,
puedo ver y editar todos los datos del evento desde una interfaz web bonita.
Para crear el usuario admin corro: python manage.py createsuperuser
"""

from django.contrib import admin
from .models import RSVP, Message, Song, GalleryPhoto


@admin.register(RSVP)
class RSVPAdmin(admin.ModelAdmin):
    # Columnas que aparecen en la lista del admin
    list_display  = ['name', 'email', 'attending', 'created']
    # Filtro lateral para ver solo los que van o los que no van
    list_filter   = ['attending']
    # Barra de búsqueda por nombre o correo
    search_fields = ['name', 'email']
    # No se puede modificar la fecha de creación
    readonly_fields = ['created']


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display  = ['name', 'text', 'likes', 'created']
    search_fields = ['name', 'text']
    readonly_fields = ['likes', 'created']


@admin.register(Song)
class SongAdmin(admin.ModelAdmin):
    list_display  = ['name', 'requester', 'link', 'created']
    search_fields = ['name', 'requester']
    readonly_fields = ['created']


@admin.register(GalleryPhoto)
class GalleryPhotoAdmin(admin.ModelAdmin):
    list_display  = ['id', 'caption', 'created']
    readonly_fields = ['created']