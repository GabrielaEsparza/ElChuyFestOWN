"""
Configuración principal del proyecto chuyfest.

Generado con 'django-admin startproject', modificado para El Chuy Fest.
Documentación: https://docs.djangoproject.com/en/6.0/topics/settings/
"""

from pathlib import Path

# La ruta base del proyecto (la carpeta que contiene manage.py)
BASE_DIR = Path(__file__).resolve().parent.parent


# ─────────────────────────────────────────────
# SEGURIDAD
# ─────────────────────────────────────────────

SECRET_KEY = 'django-insecure-y&8=k3y$z#pw3n9qj=q@9-b%7asy9q7-vnss&o1zl7u^@ub-k_'

DEBUG = True

ALLOWED_HOSTS = []


# ─────────────────────────────────────────────
# APPS INSTALADAS
# ─────────────────────────────────────────────

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Librería para crear APIs REST fácilmente
    'rest_framework',

    # Para que el frontend pueda hacer peticiones sin errores de CORS
    'corsheaders',

    # Nuestra app con los modelos del evento
    'events',
]


# ─────────────────────────────────────────────
# MIDDLEWARE
# ─────────────────────────────────────────────

MIDDLEWARE = [
    # CorsMiddleware DEBE ir al inicio
    'corsheaders.middleware.CorsMiddleware',

    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'chuyfest.urls'


# ─────────────────────────────────────────────
# TEMPLATES
# ─────────────────────────────────────────────

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        # BASE_DIR es la carpeta con manage.py.
        # Dentro de ella creamos 'templates/' y ponemos el index.html ahí.
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'chuyfest.wsgi.application'


# ─────────────────────────────────────────────
# BASE DE DATOS
# ─────────────────────────────────────────────

# SQLite para desarrollo. Django crea el archivo db.sqlite3 solo.
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# ─────────────────────────────────────────────
# VALIDACIÓN DE CONTRASEÑAS
# ─────────────────────────────────────────────

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]


# ─────────────────────────────────────────────
# IDIOMA Y ZONA HORARIA
# ─────────────────────────────────────────────

LANGUAGE_CODE = 'es-mx'
TIME_ZONE     = 'America/Mexico_City'
USE_I18N      = True
USE_TZ        = True


# ─────────────────────────────────────────────
# ARCHIVOS ESTÁTICOS (CSS, JS)
# ─────────────────────────────────────────────

STATIC_URL = '/static/'

# Donde están mis archivos estáticos (styles.css, main.js).
# Creamos una carpeta 'static/' junto al manage.py y los ponemos ahí.
STATICFILES_DIRS = [BASE_DIR / 'static']

# Para cuando haga deploy (collectstatic junta todo aquí)
STATIC_ROOT = BASE_DIR / 'staticfiles'


# ─────────────────────────────────────────────
# ARCHIVOS DE MEDIA (fotos subidas por usuarios)
# ─────────────────────────────────────────────

MEDIA_URL  = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'


# ─────────────────────────────────────────────
# CORS
# ─────────────────────────────────────────────

CORS_ALLOW_ALL_ORIGINS = True


# ─────────────────────────────────────────────
# DJANGO REST FRAMEWORK
# ─────────────────────────────────────────────

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
    ],
    # Esto desactiva la autenticación por sesión que es la que
    # activa la validación CSRF en DRF
    'DEFAULT_AUTHENTICATION_CLASSES': [],
}

# ─────────────────────────────────────────────
# CORREO ELECTRÓNICO
# ─────────────────────────────────────────────

# En desarrollo los correos se imprimen en la consola en vez de mandarse.
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

# Para producción:
# EMAIL_BACKEND       = 'django.core.mail.backends.smtp.EmailBackend'
# EMAIL_HOST          = 'smtp.gmail.com'
# EMAIL_PORT          = 587
# EMAIL_USE_TLS       = True
# EMAIL_HOST_USER     = 'micorreo@gmail.com'
# EMAIL_HOST_PASSWORD = 'mi_app_password_de_google'
# DEFAULT_FROM_EMAIL  = 'El Chuy Fest <micorreo@gmail.com>'


DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'