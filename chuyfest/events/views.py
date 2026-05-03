from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.mail import send_mail
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from .models import RSVP, Message, Song, GalleryPhoto
from .serializers import RSVPSerializer, MessageSerializer, SongSerializer, GalleryPhotoSerializer


@method_decorator(csrf_exempt, name='dispatch')
class RSVPCreateView(generics.CreateAPIView):
    queryset         = RSVP.objects.all()
    serializer_class = RSVPSerializer

    def perform_create(self, serializer):
        rsvp = serializer.save()
        if rsvp.attending:
            send_mail(
                subject='¡Te esperamos en El Chuy Fest! 🎉',
                message=f'Hola {rsvp.name}, confirmamos tu asistencia. ¡Nos vemos el 15 de mayo!',
                from_email='noreply@chuyfest.com',
                recipient_list=[rsvp.email],
                fail_silently=True,
            )


@method_decorator(csrf_exempt, name='dispatch')
class MessageListCreateView(generics.ListCreateAPIView):
    queryset         = Message.objects.all()
    serializer_class = MessageSerializer


@api_view(['POST'])
@csrf_exempt
def like_message(request, pk):
    try:
        mensaje = Message.objects.get(pk=pk)
    except Message.DoesNotExist:
        return Response({'error': 'Mensaje no encontrado'}, status=status.HTTP_404_NOT_FOUND)
    mensaje.likes += 1
    mensaje.save()
    return Response({'likes': mensaje.likes}, status=status.HTTP_200_OK)


@method_decorator(csrf_exempt, name='dispatch')
class SongListCreateView(generics.ListCreateAPIView):
    queryset         = Song.objects.all()
    serializer_class = SongSerializer


@method_decorator(csrf_exempt, name='dispatch')
class GalleryListCreateView(generics.ListCreateAPIView):
    queryset         = GalleryPhoto.objects.all()
    serializer_class = GalleryPhotoSerializer