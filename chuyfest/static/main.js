/* =============================================
   EL CHUY FEST — main.js
   Conectado al backend Django en /api/
   ============================================= */

// =============================================
// DATOS DEL EVENTO (editar aquí fácilmente)
// =============================================
const EVENT_DATE = new Date('2026-05-15T17:00:00');  // 15 Mayo, 5 PM

const ACTIVITIES = [
  {
    id: 1,
    title: 'Conferencia "La pertenencia"',
    subtitle: 'Con Viry Vargas',
    desc: 'Una conferencia de tanatología para reflexionar sobre el sentido de pertenencia, los vínculos y la vida. Un momento especial para conectar con lo que realmente importa.',
    image: '/static/assets/conferenciapertenencia.png',
    cta: 'Haz clic para más información',
  },
  {
    id: 2,
    title: 'Karaoke y Comida',
    subtitle: 'Canta mientras disfrutas',
    desc: 'Karaoke tranquilo acompañado de deliciosa comida. Cantaremos Confieso, Yo te seguiré, El privilegio de Amar y muchas más canciones especiales.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80',
    cta: 'Haz clic para más información',
  },
  {
    id: 3,
    title: 'Balada romántica',
    subtitle: 'ReyToro1 en vivo',
    desc: 'Una hora de baladas románticas en vivo con ReyToro1. Setlist: A mi manera, Amor eterno, Mátalas, Como Quien Pierde Una Estrella, Lo Pasado Pasado, y más.',
    image: '/static/assets/musicaenvivo.png',
    cta: 'Haz clic para más información',
  },
  {
    id: 4,
    title: 'Mañanitas y Pastel',
    subtitle: 'El momento más especial',
    desc: 'Cantamos las mañanitas, partimos el pastel y hay rifa de premios. El momento que todos esperan para celebrar al homenajeado.',
    image: '/static/assets/pastel.png',
    cta: 'Haz clic para más información',
  },
  {
    id: 5,
    title: 'Rifa sorpresa',
    subtitle: 'En bolita hasta el final',
    desc: 'El cierre más esperado: quién será el afortunado?',
    image: '/static/assets/rifa.png',
    cta: 'Haz clic para más información',
  },
];

const ITINERARY = [
  {
    time: '05:00 – 05:30',
    title: 'Bienvenida',
    desc: 'Botana y Precopeo. El arranque perfecto para calentar motores y reencontrarse.',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1600&q=80',
  },
  {
    time: '05:30 – 06:00',
    title: 'Conferencia "La pertenencia"',
    desc: 'Con Viry Vargas. Una reflexión de tanatología sobre los vínculos y el sentido de pertenencia.',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1600&q=80',
  },
  {
    time: '06:00 – 06:30',
    title: 'Karaoke Tranquilitas y Comida',
    desc: 'Viry: Confieso · Chuy: Yo te seguiré · Todos: El privilegio de Amar',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1600&q=80',
  },
  {
    time: '06:30 – 07:00',
    title: '¡Mañanitas, Pastel y Rifa!',
    desc: 'El momento más esperado de la noche. Cantamos, partimos y sorprendemos.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80',
  },
  {
    time: '07:00 – 08:00',
    title: 'Balada Romántica · ReyToro1',
    desc: 'A mi manera · Amor eterno · Mátalas · Como Quien Pierde Una Estrella · Lo Pasado Pasado · y más...',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1600&q=80',
  },
  {
    time: '08:00 – 11:00',
    title: 'Karaoke y Bailongo',
    desc: 'En bolita. Chuy: Prefiero ser su amante · Martha A: ¿Y Qué Tal Si Funciona? · y muchas más.',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1600&q=80',
  },
  {
    time: '11:00 – ?',
    title: '¿Nos la seguimos en Chapú?',
    desc: 'Para los que aún tienen energía... ¡La noche apenas empieza! 🎉',
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1600&q=80',
  },
];

const FAQS = [
  { q: '¿Dónde es el evento?', a: 'C. José María Morelos 1520, Col. Americana, Zona Centro, 44600 Guadalajara, Jal.' },
  { q: '¿A qué hora empieza y termina?', a: 'Empieza a las 5:00 PM y el plan oficial termina a las 11:00 PM. ¡Aunque quién sabe cómo acaba la noche! 😉' },
  { q: '¿Cómo debo ir vestido?', a: 'Casual-elegante. ¡Lo importante es que estés cómodo para bailar!' },
  { q: '¿Qué habrá de comer?', a: 'Habrá botana de bienvenida, comida durante el karaoke y pastel de cumpleaños. ¡Ven con hambre!' },
  { q: '¿Dónde sugerir canciones?', a: 'Haz clic en el botón verde "Agrega tu canción" que aparece en la esquina. ¡Arma tu playlist!' },
];

// =============================================
// ESTADO GLOBAL
// =============================================
let heroIndex      = 0;
let carouselCenter = 0;
let itineraryIndex = 0;
let messages       = [];
let songs          = [];
let galleryPhotos  = [];

// =============================================
// INIT
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHero();
  initCountdown();
  initCarousel();
  initItinerary();
  initRSVP();
  initMessages();   // carga mensajes desde Django
  initGallery();    // carga fotos desde Django
  initFAQ();
  initSongModal();  // carga canciones desde Django
});

// =============================================
// NAVBAR
// =============================================
function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  hamburger.addEventListener('click', () => {
    const isOpen = navbar.classList.toggle('menu-open');
    // Cambiar el ícono: ☰ cuando cerrado, ✕ cuando abierto
    hamburger.innerHTML = isOpen ? '&#10005;' : '&#9776;';
  });

  // Cerrar al hacer click en un link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navbar.classList.remove('menu-open');
      hamburger.innerHTML = '&#9776;';
    });
  });

  // Cerrar al tocar fuera del menú
  document.addEventListener('click', (e) => {
    if (navbar.classList.contains('menu-open') &&
        !navbar.contains(e.target)) {
      navbar.classList.remove('menu-open');
      hamburger.innerHTML = '&#9776;';
    }
  });
}
// =============================================
// HERO SLIDESHOW
// =============================================
function initHero() {
  const slides        = document.querySelectorAll('.hero-slide');
  const dotsContainer = document.getElementById('hero-dots');

  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToHeroSlide(i));
    dotsContainer.appendChild(dot);
  });

  setInterval(() => goToHeroSlide((heroIndex + 1) % slides.length), 5000);
}

function goToHeroSlide(idx) {
  const slides = document.querySelectorAll('.hero-slide');
  const dots   = document.querySelectorAll('#hero-dots .dot');
  slides[heroIndex].classList.remove('active');
  dots[heroIndex].classList.remove('active');
  heroIndex = idx;
  slides[heroIndex].classList.add('active');
  dots[heroIndex].classList.add('active');
}

// =============================================
// COUNTDOWN
// =============================================
function initCountdown() {
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

function updateCountdown() {
  const diff = EVENT_DATE - new Date();
  if (diff <= 0) {
    document.getElementById('cd-days').textContent  = '0';
    document.getElementById('cd-hours').textContent = '0';
    document.getElementById('cd-mins').textContent  = '0';
    document.getElementById('cd-secs').textContent  = '0';
    return;
  }
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000)  / 60000);
  const s = Math.floor((diff % 60000)    / 1000);
  document.getElementById('cd-days').textContent  = String(d).padStart(2, '0');
  document.getElementById('cd-hours').textContent = String(h).padStart(2, '0');
  document.getElementById('cd-mins').textContent  = String(m).padStart(2, '0');
  document.getElementById('cd-secs').textContent  = String(s).padStart(2, '0');
}

// =============================================
// CAROUSEL (3D centered, infinite)
// =============================================
function initCarousel() {
  renderCarousel();

  document.getElementById('carousel-prev').addEventListener('click', () => {
    carouselCenter = (carouselCenter - 1 + ACTIVITIES.length) % ACTIVITIES.length;
    renderCarousel();
  });
  document.getElementById('carousel-next').addEventListener('click', () => {
    carouselCenter = (carouselCenter + 1) % ACTIVITIES.length;
    renderCarousel();
  });

  setInterval(() => {
    carouselCenter = (carouselCenter + 1) % ACTIVITIES.length;
    renderCarousel();
  }, 5000);
}

function renderCarousel() {
  const stage  = document.getElementById('carousel-stage');
  const dotsEl = document.getElementById('carousel-dots');
  const n      = ACTIVITIES.length;

  // Crear las cards solo la primera vez
  let existingCards = Array.from(stage.querySelectorAll('.carousel-card'));
  if (existingCards.length === 0) {
    ACTIVITIES.forEach((act, i) => {
      const card = document.createElement('div');
      card.className        = 'carousel-card';
      card.dataset.actIndex = i;
      card.innerHTML = `
        <img src="${act.image}" alt="${act.title}" loading="lazy" />
        <div class="card-info">
          <h3>${act.title}</h3>
          <p>${act.subtitle}</p>
          <p class="card-cta">${act.cta}</p>
        </div>
      `;
      stage.appendChild(card);
    });
    existingCards = Array.from(stage.querySelectorAll('.carousel-card'));
  }

  // Asignar posición relativa a cada card
  existingCards.forEach(card => {
    const actIdx = parseInt(card.dataset.actIndex);
    let dist     = actIdx - carouselCenter;
    if (dist > n / 2)  dist -= n;
    if (dist < -n / 2) dist += n;

    if (dist >= -2 && dist <= 2) {
      card.dataset.pos   = dist;
      card.style.display = '';
    } else {
      card.dataset.pos   = '99';
      card.style.display = 'none';
    }

    card.onclick = null;
    if (dist === 0) {
      card.addEventListener('click', () => openActivityModal(ACTIVITIES[actIdx]), { once: true });
    } else if (dist >= -2 && dist <= 2) {
      card.addEventListener('click', () => {
        carouselCenter = actIdx;
        renderCarousel();
      }, { once: true });
    }

    const cta = card.querySelector('.card-cta');
    if (cta) cta.style.display = dist === 0 ? '' : 'none';
  });

  // Dots
  dotsEl.innerHTML = '';
  ACTIVITIES.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === carouselCenter ? ' active' : '');
    dot.addEventListener('click', () => { carouselCenter = i; renderCarousel(); });
    dotsEl.appendChild(dot);
  });
}

// =============================================
// ACTIVITY MODAL
// =============================================
function openActivityModal(act) {
  document.getElementById('modal-img').src              = act.image;
  document.getElementById('modal-img').alt              = act.title;
  document.getElementById('modal-title').textContent    = act.title;
  document.getElementById('modal-subtitle').textContent = act.subtitle;
  document.getElementById('modal-desc').textContent     = act.desc;
  document.getElementById('activity-modal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}
function closeActivityModal() {
  document.getElementById('activity-modal').classList.add('hidden');
  document.body.style.overflow = '';
}
document.getElementById('activity-modal').addEventListener('click', e => {
  if (e.target === e.currentTarget) closeActivityModal();
});

// =============================================
// ITINERARY SLIDESHOW
// =============================================
function initItinerary() {
  const slidesEl = document.getElementById('itinerary-slides');
  const dotsEl   = document.getElementById('itinerary-dots');

  ITINERARY.forEach((item, i) => {
    const slide = document.createElement('div');
    slide.className            = 'itinerary-slide' + (i === 0 ? ' active' : '');
    slide.style.backgroundImage = `url('${item.image}')`;
    slidesEl.appendChild(slide);

    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToItinerarySlide(i));
    dotsEl.appendChild(dot);
  });

  renderItineraryContent();
  setInterval(() => {
    itineraryIndex = (itineraryIndex + 1) % ITINERARY.length;
    goToItinerarySlide(itineraryIndex);
  }, 5000);
}

function goToItinerarySlide(idx) {
  const slides = document.querySelectorAll('.itinerary-slide');
  const dots   = document.querySelectorAll('#itinerary-dots .dot');
  slides[itineraryIndex].classList.remove('active');
  dots[itineraryIndex].classList.remove('active');
  itineraryIndex = idx;
  slides[itineraryIndex].classList.add('active');
  dots[itineraryIndex].classList.add('active');
  renderItineraryContent();
}

function renderItineraryContent() {
  const item = ITINERARY[itineraryIndex];
  const el   = document.getElementById('itinerary-content');
  el.innerHTML = `
    <h2>Programa</h2>
    <span class="itin-time">${item.time}</span>
    <h3>${item.title}</h3>
    <p>${item.desc}</p>
  `;
}

// =============================================
// RSVP — conectado a POST /api/rsvp/
// =============================================
function initRSVP() {
  const form = document.getElementById('rsvp-form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const attendingValue = form.querySelector('input[name="attending"]:checked')?.value;
    if (!attendingValue) {
      alert('Por favor indica si asistirás');
      return;
    }

    const data = {
      name:      document.getElementById('rsvp-name').value.trim(),
      attending: attendingValue === 'true',
    };

    try {
      const res = await fetch('/api/rsvp/', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(data),
      });

      if (!res.ok) {
        console.error('Error RSVP:', await res.json());
        alert('Hubo un problema. Intenta de nuevo.');
        return;
      }

      form.classList.add('hidden');
      document.getElementById('rsvp-success').classList.remove('hidden');

    } catch (err) {
      console.error('Error de red RSVP:', err);
      alert('No se pudo conectar con el servidor.');
    }
  });
}

// =============================================
// MESSAGES — conectado a GET/POST /api/messages/
//            y POST /api/messages/<id>/like/
// =============================================
async function initMessages() {
  // Cargar mensajes existentes al abrir la página
  await cargarMensajes();

  document.getElementById('message-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('msg-name').value.trim();
    const text = document.getElementById('msg-text').value.trim();
    if (!name || !text) return;

    try {
      const res = await fetch('/api/messages/', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ name, text }),
      });

      if (!res.ok) {
        console.error('Error al enviar mensaje:', await res.json());
        alert('No se pudo enviar el mensaje. Intenta de nuevo.');
        return;
      }

      // Limpiar campos y recargar lista desde Django
      document.getElementById('msg-name').value = '';
      document.getElementById('msg-text').value = '';
      await cargarMensajes();

    } catch (err) {
      console.error('Error de red mensajes:', err);
    }
  });
}

async function cargarMensajes() {
  try {
    const res  = await fetch('/api/messages/');
    const data = await res.json();
    // Guardamos también si el usuario ya le dio like (solo en memoria)
    messages = data.map(m => ({ ...m, liked: false }));
    renderMessages();
  } catch (err) {
    console.error('Error al cargar mensajes:', err);
  }
}

function renderMessages() {
  const grid = document.getElementById('messages-grid');
  grid.innerHTML = '';
  messages.forEach(msg => {
    const card = document.createElement('div');
    card.className = 'message-card';
    card.innerHTML = `
      <div class="msg-header">
        <span class="msg-author">${escapeHtml(msg.name)}</span>
        <button class="msg-like ${msg.liked ? 'liked' : ''}" data-id="${msg.id}">
          ♡ <span>${msg.likes}</span>
        </button>
      </div>
      <p class="msg-text">${escapeHtml(msg.text)}</p>
    `;
    card.querySelector('.msg-like').addEventListener('click', () => toggleLike(msg.id));
    grid.appendChild(card);
  });
}

async function toggleLike(id) {
  const msg = messages.find(m => m.id === id);
  if (!msg) return;

  // Actualización optimista: cambio la UI antes de esperar al servidor
  msg.liked  = !msg.liked;
  msg.likes += msg.liked ? 1 : -1;
  renderMessages();

  if (msg.liked) {
    // Solo mando like al servidor si el usuario está dando like (no quitando)
    try {
      const res = await fetch(`/api/messages/${id}/like/`, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        // Sincronizo el conteo real que tiene Django
        msg.likes = data.likes;
        renderMessages();
      }
    } catch (err) {
      console.error('Error al dar like:', err);
    }
  }
}

// =============================================
// GALLERY — conectado a GET/POST /api/gallery/
// =============================================
async function initGallery() {
  // Cargar fotos existentes al abrir la página
  await cargarGaleria();

  const input = document.getElementById('gallery-input');
  input.addEventListener('change', async (e) => {
    const archivos = Array.from(e.target.files).filter(f => f.type.startsWith('image/'));

    for (const archivo of archivos) {
      // Usamos FormData porque los archivos no van en JSON
      const formData = new FormData();
      formData.append('image', archivo);

      try {
        const res = await fetch('/api/gallery/', {
          method: 'POST',
          body:   formData,
          // No pongas Content-Type: el navegador lo pone automáticamente
          // con el boundary correcto para multipart/form-data
        });

        if (!res.ok) {
          console.error('Error al subir foto:', await res.json());
          alert('No se pudo subir una foto. Verifica que sea JPG o PNG y pese menos de 10MB.');
        }
      } catch (err) {
        console.error('Error de red galería:', err);
      }
    }

    // Limpiar input y recargar galería desde Django
    input.value = '';
    await cargarGaleria();
  });
}

async function cargarGaleria() {
  try {
    const res  = await fetch('/api/gallery/');
    const data = await res.json();
    galleryPhotos = data;
    renderGallery();
  } catch (err) {
    console.error('Error al cargar galería:', err);
  }
}

function renderGallery() {
  const grid        = document.getElementById('gallery-grid');
  const placeholder = document.querySelector('.gallery-placeholder');
  grid.innerHTML    = '';

  if (galleryPhotos.length === 0) {
    placeholder.style.display = '';
    return;
  }

  // Ocultar el placeholder cuando hay fotos
  placeholder.style.display = 'none';

  galleryPhotos.forEach(photo => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    // photo.image viene de Django como URL relativa, ej: /media/gallery/foto.jpg
    item.innerHTML = `
      <img src="${photo.image}" alt="Foto del evento" loading="lazy" />
      <button class="remove-img" data-id="${photo.id}" title="Eliminar">✕</button>
    `;
    // Nota: el botón de eliminar en producción debería pedir confirmación
    // y llamar a DELETE /api/gallery/<id>/. Por ahora solo lo quita de la vista.
    item.querySelector('.remove-img').addEventListener('click', (e) => {
      e.stopPropagation();
      galleryPhotos = galleryPhotos.filter(p => p.id !== photo.id);
      renderGallery();
    });
    grid.appendChild(item);
  });
}

// =============================================
// FAQ
// =============================================
function initFAQ() {
  const list = document.getElementById('faq-list');
  FAQS.forEach(faq => {
    const item = document.createElement('div');
    item.className = 'faq-item';
    item.innerHTML = `
      <div class="faq-question">
        <span>${faq.q}</span>
        <span class="faq-chevron">▾</span>
      </div>
      <div class="faq-answer">${faq.a}</div>
    `;
    item.querySelector('.faq-question').addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
    list.appendChild(item);
  });
}

// =============================================
// SONG MODAL — conectado a GET/POST /api/songs/
// =============================================
async function initSongModal() {
  // Cargar canciones existentes
  await cargarCanciones();

  document.getElementById('song-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name      = document.getElementById('song-name').value.trim();
    const link      = document.getElementById('song-link').value.trim();
    const requester = document.getElementById('song-requester').value.trim();
    if (!name || !requester) return;

    try {
      const res = await fetch('/api/songs/', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ name, link, requester }),
      });

      if (!res.ok) {
        console.error('Error al agregar canción:', await res.json());
        alert('No se pudo agregar la canción. Intenta de nuevo.');
        return;
      }

      // Limpiar campos y recargar lista
      document.getElementById('song-name').value      = '';
      document.getElementById('song-link').value      = '';
      document.getElementById('song-requester').value = '';
      await cargarCanciones();

    } catch (err) {
      console.error('Error de red canciones:', err);
    }
  });
}

async function cargarCanciones() {
  try {
    const res = await fetch('/api/songs/');
    songs     = await res.json();
    renderSongs();
  } catch (err) {
    console.error('Error al cargar canciones:', err);
  }
}

function openSongModal() {
  document.getElementById('song-modal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  // Recargar canciones cada vez que se abre el modal
  cargarCanciones();
}
function closeSongModal() {
  document.getElementById('song-modal').classList.add('hidden');
  document.body.style.overflow = '';
}
document.getElementById('song-modal').addEventListener('click', e => {
  if (e.target === e.currentTarget) closeSongModal();
});

function renderSongs() {
  const list = document.getElementById('song-list');
  list.innerHTML = '';

  if (songs.length === 0) {
    list.innerHTML = '<p style="color:var(--gray-400);font-size:.82rem;text-align:center">Aún no hay canciones. ¡Sé el primero!</p>';
    return;
  }

  songs.forEach(s => {
    const item = document.createElement('div');
    item.className = 'song-item';
    item.innerHTML = `
      <div>
        <strong>${escapeHtml(s.name)}</strong><br>
        <span>Pedida por ${escapeHtml(s.requester)}</span>
        ${s.link ? `<br><a href="${escapeHtml(s.link)}" target="_blank" style="font-size:.78rem;color:var(--blue)">Ver en Spotify ↗</a>` : ''}
      </div>
    `;
    list.appendChild(item);
  });
}

// =============================================
// HELPERS
// =============================================

// Evita que alguien inyecte HTML malicioso en los mensajes
function escapeHtml(str) {
  return String(str)
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;');
}