"""
Serializers de la app 'events'.

Un serializer hace dos cosas:
  1. Convierte un objeto de la base de datos → JSON para mandarlo al frontend.
  2. Convierte JSON que llega del frontend → objeto para guardarlo en la BD.

Es básicamente el "traductor" entre Django y JavaScript.
"""

from rest_framework import serializers
from .models import RSVP, Message, Song, GalleryPhoto


class RSVPSerializer(serializers.ModelSerializer):
    """
    Serializer para las confirmaciones de asistencia.
    El frontend manda: { name, email, attending }
    Y esto lo convierte en un objeto RSVP para guardarlo.
    """

    class Meta:
        model  = RSVP
        # Incluyo 'created' para que el frontend pueda mostrarlo si quiere
        fields = ['id', 'name', 'attending', 'created']
        # 'created' solo se puede leer, no mandar desde el frontend
        read_only_fields = ['id', 'created']


class MessageSerializer(serializers.ModelSerializer):
    """
    Serializer para los mensajes al cumpleañero.
    El frontend manda: { name, text }
    Y esto genera un Message con likes=0 automáticamente.
    """

    class Meta:
        model  = Message
        fields = ['id', 'name', 'text', 'likes', 'created']
        read_only_fields = ['id', 'likes', 'created']


class SongSerializer(serializers.ModelSerializer):
    """
    Serializer para las canciones sugeridas.
    El frontend manda: { name, link, requester }
    El campo 'link' es opcional.
    """

    class Meta:
        model  = Song
        fields = ['id', 'name', 'link', 'requester', 'created']
        read_only_fields = ['id', 'created']


class GalleryPhotoSerializer(serializers.ModelSerializer):
    """
    Serializer para las fotos de la galería.
    Este es un poco especial porque maneja archivos (imágenes),
    no solo texto. El frontend manda el archivo en un FormData.
    """

    class Meta:
        model  = GalleryPhoto
        fields = ['id', 'image', 'caption', 'created']
        read_only_fields = ['id', 'created']