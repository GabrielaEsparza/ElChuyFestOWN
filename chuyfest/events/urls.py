"""
URLs de la app 'events'.

Estas rutas se conectan al proyecto principal en chuyfest/urls.py
bajo el prefijo /api/, entonces las URLs completas quedan así:

  POST /api/rsvp/                   → confirmar asistencia
  GET  /api/messages/               → ver todos los mensajes
  POST /api/messages/               → dejar un mensaje nuevo
  POST /api/messages/<id>/like/     → darle like a un mensaje
  GET  /api/songs/                  → ver lista de canciones
  POST /api/songs/                  → agregar una canción
  GET  /api/gallery/                → ver fotos de la galería
  POST /api/gallery/                → subir una foto
"""

from django.urls import path
from . import views

urlpatterns = [
    # Confirmaciones de asistencia (solo POST, no queremos listar correos)
    path('rsvp/', views.RSVPCreateView.as_view(), name='rsvp-create'),

    # Mensajes para el cumpleañero (GET para leerlos, POST para crearlos)
    path('messages/', views.MessageListCreateView.as_view(), name='message-list-create'),

    # Like a un mensaje específico (el <int:pk> es el ID del mensaje)
    path('messages/<int:pk>/like/', views.like_message, name='message-like'),

    # Canciones sugeridas para la fiesta
    path('songs/', views.SongListCreateView.as_view(), name='song-list-create'),

    # Galería de fotos del evento
    path('gallery/', views.GalleryListCreateView.as_view(), name='gallery-list-create'),
]