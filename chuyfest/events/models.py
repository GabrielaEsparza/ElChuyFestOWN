"""
Modelos de la app 'events' para El Chuy Fest.

Cada clase aquí es una tabla en la base de datos.
Django se encarga de crearlas cuando corro:
  python manage.py makemigrations
  python manage.py migrate
"""

from django.db import models


class RSVP(models.Model):
    name      = models.CharField(max_length=120, verbose_name='Nombre')
    attending = models.BooleanField(verbose_name='¿Asistirá?')
    created   = models.DateTimeField(auto_now_add=True, verbose_name='Registrado el')

    class Meta:
        verbose_name        = 'Confirmación de asistencia'
        verbose_name_plural = 'Confirmaciones de asistencia'
        ordering            = ['-created']

    def __str__(self):
        estado = 'Sí va' if self.attending else 'No puede ir'
        return f'{self.name} — {estado}'


class Message(models.Model):
    """
    Mensajes que los invitados le dejan al cumpleañero.
    Se muestran en la sección 'Mensajes para Chuy' del frontend.
    """
    name    = models.CharField(max_length=80, verbose_name='Nombre')
    text    = models.TextField(max_length=280, verbose_name='Mensaje')
    likes   = models.PositiveIntegerField(default=0, verbose_name='Likes')
    created = models.DateTimeField(auto_now_add=True, verbose_name='Enviado el')

    class Meta:
        verbose_name        = 'Mensaje'
        verbose_name_plural = 'Mensajes'
        ordering            = ['-created']

    def __str__(self):
        return f'{self.name}: {self.text[:40]}'


class Song(models.Model):
    """
    Canciones que los invitados quieren que suenen en la fiesta.
    Se agregan desde el modal 'Agrega tu canción' del frontend.
    """

    PURPOSE_CHOICES = [
        ('cantar', 'Cantar'),
        ('bailar', 'Bailar'),
    ]

    name      = models.CharField(max_length=200, verbose_name='Canción / Artista')
    link      = models.URLField(blank=True, verbose_name='Link de Spotify')
    requester = models.CharField(max_length=80, verbose_name='La pide')
    purpose   = models.CharField(
                    max_length=10,
                    choices=PURPOSE_CHOICES,
                    default='cantar',
                    verbose_name='¿Para qué?'
                )
    created   = models.DateTimeField(auto_now_add=True, verbose_name='Pedida el')

    class Meta:
        verbose_name        = 'Canción'
        verbose_name_plural = 'Canciones'
        ordering            = ['-created']

    def __str__(self):
        return f'{self.name} (pedida por {self.requester} — {self.get_purpose_display()})'


class GalleryPhoto(models.Model):
    """
    Fotos de la galería del evento.
    Cualquier asistente puede subir fotos desde el frontend.
    Las imágenes se guardan en la carpeta media/gallery/ del servidor.
    """
    image   = models.ImageField(upload_to='gallery/', verbose_name='Foto')
    caption = models.CharField(max_length=200, blank=True, verbose_name='Descripción')
    created = models.DateTimeField(auto_now_add=True, verbose_name='Subida el')

    class Meta:
        verbose_name        = 'Foto de galería'
        verbose_name_plural = 'Fotos de galería'
        ordering            = ['-created']

    def __str__(self):
        return f'Foto del {self.created.strftime("%d/%m/%Y %H:%M")}'