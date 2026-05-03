"""
Modelos de la app 'events' para El Chuy Fest.

Cada clase aquí es una tabla en la base de datos.
Django se encarga de crearlas cuando corro:
  python manage.py makemigrations
  python manage.py migrate
"""

from django.db import models


class RSVP(models.Model):
    """
    Guarda las confirmaciones de asistencia al evento.
    Cada vez que alguien llena el formulario del frontend, se crea un registro aquí.
    """

    # Nombre de quien confirma
    name = models.CharField(max_length=120, verbose_name='Nombre')

    # Correo para mandarle la confirmación
    email = models.EmailField(verbose_name='Correo electrónico')

    # True = sí va, False = no puede ir
    attending = models.BooleanField(verbose_name='¿Asistirá?')

    # Se llena automáticamente cuando se crea el registro
    created = models.DateTimeField(auto_now_add=True, verbose_name='Registrado el')

    class Meta:
        verbose_name        = 'Confirmación de asistencia'
        verbose_name_plural = 'Confirmaciones de asistencia'
        ordering            = ['-created']  # los más recientes primero

    def __str__(self):
        estado = 'Sí va' if self.attending else 'No puede ir'
        return f'{self.name} — {estado}'


class Message(models.Model):
    """
    Mensajes que los invitados le dejan al cumpleañero.
    Se muestran en la sección 'Mensajes para Chuy' del frontend.
    """

    # Nombre de quien escribe el mensaje
    name = models.CharField(max_length=80, verbose_name='Nombre')

    # El mensaje en sí (máximo 280 caracteres, como un tweet)
    text = models.TextField(max_length=280, verbose_name='Mensaje')

    # Contador de likes. El frontend lo incrementa con un POST a /api/messages/<id>/like/
    likes = models.PositiveIntegerField(default=0, verbose_name='Likes')

    created = models.DateTimeField(auto_now_add=True, verbose_name='Enviado el')

    class Meta:
        verbose_name        = 'Mensaje'
        verbose_name_plural = 'Mensajes'
        ordering            = ['-created']

    def __str__(self):
        # Muestro los primeros 40 caracteres para que se vea bonito en el admin
        return f'{self.name}: {self.text[:40]}'


class Song(models.Model):
    """
    Canciones que los invitados quieren que suenen en la fiesta.
    Se agregan desde el modal 'Agrega tu canción' del frontend.
    """

    # Nombre de la canción o del artista
    name = models.CharField(max_length=200, verbose_name='Canción / Artista')

    # Link de Spotify (opcional, por eso blank=True)
    link = models.URLField(blank=True, verbose_name='Link de Spotify')

    # Quién la está pidiendo
    requester = models.CharField(max_length=80, verbose_name='La pide')

    created = models.DateTimeField(auto_now_add=True, verbose_name='Pedida el')

    class Meta:
        verbose_name        = 'Canción'
        verbose_name_plural = 'Canciones'
        ordering            = ['-created']

    def __str__(self):
        return f'{self.name} (pedida por {self.requester})'


class GalleryPhoto(models.Model):
    """
    Fotos de la galería del evento.
    Cualquier asistente puede subir fotos desde el frontend.
    Las imágenes se guardan en la carpeta media/gallery/ del servidor.
    """

    # ImageField requiere que esté instalada la librería Pillow
    # La instalé con: pip install pillow
    # upload_to='gallery/' significa que las fotos van a media/gallery/
    image = models.ImageField(
        upload_to='gallery/',
        verbose_name='Foto'
    )

    # Descripción opcional de la foto
    caption = models.CharField(
        max_length=200,
        blank=True,
        verbose_name='Descripción'
    )

    created = models.DateTimeField(auto_now_add=True, verbose_name='Subida el')

    class Meta:
        verbose_name        = 'Foto de galería'
        verbose_name_plural = 'Fotos de galería'
        ordering            = ['-created']

    def __str__(self):
        return f'Foto del {self.created.strftime("%d/%m/%Y %H:%M")}'