'use strict';

// Konten proyek mengacu pada repository publik, bukan hasil eksperimen atau klaim performa.
const projects = {
  warungku: {
    title: 'WarungKu', label: 'MISSION 001 / MOBILE APPLICATION',
    description: 'Aplikasi point of sale berbasis Flutter untuk warung kelontong dan warung makan. README proyek mendeskripsikan pengelolaan produk, transaksi, inventori, dan laporan dengan backend Supabase.',
    tags: ['Flutter', 'Dart', 'Provider', 'Supabase', 'PostgreSQL'],
    features: ['Fokus: menyederhanakan aktivitas kasir dan pengelolaan stok warung.', 'README mencantumkan role Admin dan Guest, pengelolaan produk, serta alur transaksi.', 'Fondasi teknologi: Flutter, Provider, dan layanan Auth, Database, serta Storage dari Supabase.'],
    source: 'Sumber: README final-capstone-project. Fitur dirangkum dari dokumentasi; implementasi belum diaudit. Visual kartu adalah konsep antarmuka.',
    url: 'https://github.com/Braneee/final-capstone-project'
  },
  stpi: {
    title: 'STPI Mobile', label: 'MISSION 002 / MOBILE APPLICATION',
    description: 'Repository aplikasi Flutter milik Gibran. Struktur proyek memuat target Android, iOS, web, dan desktop serta direktori aset.',
    tags: ['Flutter', 'Dart'],
    features: ['Pengembangan mobile dengan Flutter dan bahasa Dart.', 'Kode aplikasi tersedia pada direktori lib di repository publik.', 'README saat ini masih singkat; rincian tujuan, fitur, dan kontribusi dapat dilengkapi oleh pemilik proyek.'],
    source: 'Sumber: struktur repository dan README stpi-mobile. Keberadaan target platform tidak berarti aplikasi telah dirilis di semua platform.',
    url: 'https://github.com/Braneee/stpi-mobile'
  },
  poliklinik: {
    title: 'Poliklinik App', label: 'MISSION 003 / WEB APPLICATION',
    description: 'Repository aplikasi web poliklinik dengan struktur Laravel. Profil GitHub menampilkan Blade sebagai bahasa utamanya.',
    tags: ['Laravel', 'PHP', 'Blade'],
    features: ['Fondasi aplikasi web menggunakan Laravel dan template Blade.', 'Repository mencakup direktori app, database, resources, dan routes.', 'Detail fitur dan peran dalam proyek dapat dilengkapi setelah dikonfirmasi oleh pemilik.'],
    source: 'Sumber: repository poliklinik-app dan profil GitHub. README masih berupa dokumentasi bawaan Laravel; tidak ada klaim fitur klinis atau hasil penggunaan.',
    url: 'https://github.com/Braneee/poliklinik-app'
  }
};

const $ = (selector) => document.querySelector(selector);
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
let reducedMotion = motionPreference.matches;
const storage = {
  get(key) { try { return localStorage.getItem(key); } catch { return null; } },
  set(key, value) { try { localStorage.setItem(key, value); } catch { /* Private mode remains usable. */ } }
};

let toastTimer;
function announce(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}

let soundEnabled = false;
let audioContext;
function playTone(frequency = 550, duration = 0.07) {
  if (!soundEnabled) return;
  try {
    audioContext ??= new (window.AudioContext || window.webkitAudioContext)();
    if (audioContext.state === 'suspended') audioContext.resume().catch(() => {});
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(frequency / 2, audioContext.currentTime + duration);
    gain.gain.setValueAtTime(0.035, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
    oscillator.connect(gain).connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration);
  } catch { announce('Audio tidak tersedia di browser ini.'); }
}
$('#sound-toggle').addEventListener('click', () => {
  soundEnabled = !soundEnabled;
  $('#sound-toggle').setAttribute('aria-pressed', String(soundEnabled));
  $('#sound-toggle').setAttribute('aria-label', soundEnabled ? 'Nonaktifkan suara efek' : 'Aktifkan suara efek');
  $('#sound-label').textContent = soundEnabled ? 'SOUND ON' : 'SOUND OFF';
  playTone(700);
  announce(soundEnabled ? 'Efek suara aktif. May the code be with you.' : 'Efek suara dinonaktifkan.');
});

// Dark Side is the permanent visual theme.
document.body.dataset.side = 'dark';

const navigation = $('#navigation');
const menuToggle = $('#menu-toggle');
function closeMenu() {
  navigation.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Buka menu');
}
menuToggle.addEventListener('click', () => {
  const open = !navigation.classList.contains('open');
  navigation.classList.toggle('open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
  playTone();
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('click', event => {
  if (navigation.classList.contains('open') && !event.target.closest('.site-header')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('open')) { closeMenu(); menuToggle.focus(); }
});
window.matchMedia('(min-width: 681px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navigation.querySelectorAll('a').forEach(link => {
        const active = link.hash === '#' + entry.target.id;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-15% 0px -55% 0px' });
  document.querySelectorAll('main section[id]').forEach(section => sectionObserver.observe(section));
}

document.querySelectorAll('.filter').forEach(filter => filter.addEventListener('click', () => {
  const category = filter.dataset.filter;
  let count = 0;
  document.querySelectorAll('.filter').forEach(button => {
    const active = button === filter;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  document.querySelectorAll('.project-card').forEach(card => {
    card.hidden = category !== 'all' && card.dataset.category !== category;
    if (!card.hidden) count++;
  });
  $('#archive-count').textContent = String(count).padStart(2, '0') + ' MISSIONS FOUND';
  playTone(450);
}));

const dialog = $('#project-dialog');
let dialogTrigger;
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
  const project = projects[button.dataset.project];
  if (!project) return;
  dialogTrigger = button;
  $('#dialog-label').textContent = project.label;
  $('#dialog-title').textContent = project.title;
  $('#dialog-description').textContent = project.description;
  $('#dialog-source').textContent = project.source;
  $('#dialog-repo').href = project.url;
  $('#dialog-tags').replaceChildren(...project.tags.map(tag => { const element = document.createElement('span'); element.textContent = tag; return element; }));
  $('#dialog-features').replaceChildren(...project.features.map(feature => { const element = document.createElement('li'); element.textContent = feature; return element; }));
  dialog.showModal();
  document.body.style.overflow = 'hidden';
  playTone(620);
}));
$('#dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
dialog.addEventListener('close', () => { document.body.style.overflow = ''; dialogTrigger?.focus(); });

// Canvas decoration runs only while visible; density and device pixel ratio are capped.
const canvas = $('#starfield');
const ctx = canvas.getContext('2d');
let width = 0, height = 0, stars = [], frameId = 0, lastFrame = 0, jumpStart = 0, jumping = false;
let pointerX = 0, pointerY = 0;
function resizeStars() {
  width = window.innerWidth;
  height = window.innerHeight;
  const ratio = Math.min(window.devicePixelRatio || 1, 1.75);
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  if (!ctx) return;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  stars = Array.from({ length: Math.min(220, Math.floor(width * height / 6000)) }, () => ({
    x: Math.random() * width, y: Math.random() * height,
    radius: Math.random() * 1 + 0.2, alpha: Math.random() * 0.4 + 0.12,
    phase: Math.random() * Math.PI * 2
  }));
  if (reducedMotion) drawStars(performance.now());
}
function drawStars(time) {
  if (!ctx) return;
  ctx.clearRect(0, 0, width, height);
  const progress = jumping ? Math.min((time - jumpStart) / 1900, 1) : 0;
  const warp = jumping ? Math.sin(progress * Math.PI) : 0;
  stars.forEach(star => {
    const x = star.x + pointerX * star.radius * 5;
    const y = star.y + pointerY * star.radius * 5;
    ctx.globalAlpha = jumping ? Math.min(1, star.alpha + warp) : star.alpha * (reducedMotion ? 1 : 0.75 + Math.sin(time * 0.00045 + star.phase) * 0.25);
    if (jumping && warp > 0.04) {
      const dx = x - width / 2, dy = y - height / 2;
      const stretch = warp * 1.1;
      ctx.strokeStyle = document.body.dataset.side === 'dark' ? '#e5b4af' : '#c6e4e9';
      ctx.lineWidth = star.radius;
      ctx.beginPath(); ctx.moveTo(x + dx * stretch * 0.3, y + dy * stretch * 0.3); ctx.lineTo(x + dx * stretch, y + dy * stretch); ctx.stroke();
    } else {
      ctx.fillStyle = '#c3d1c7';
      ctx.beginPath(); ctx.arc(x, y, star.radius, 0, Math.PI * 2); ctx.fill();
    }
  });
  ctx.globalAlpha = 1;
}
function animate(time) {
  frameId = 0;
  if (document.hidden || reducedMotion) return;
  if (time - lastFrame >= (jumping ? 16 : 40)) { drawStars(time); lastFrame = time; }
  frameId = requestAnimationFrame(animate);
}
function resumeAnimation() {
  if (!frameId && !document.hidden && !reducedMotion && ctx) frameId = requestAnimationFrame(animate);
}
resizeStars(); resumeAnimation();
let resizeTimer;
window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(resizeStars, 100); });
window.addEventListener('pointermove', event => { pointerX = (event.clientX / width - 0.5); pointerY = (event.clientY / height - 0.5); }, { passive: true });
document.addEventListener('visibilitychange', () => {
  if (document.hidden) { cancelAnimationFrame(frameId); frameId = 0; } else resumeAnimation();
});
motionPreference.addEventListener('change', event => {
  reducedMotion = event.matches;
  if (reducedMotion) { cancelAnimationFrame(frameId); frameId = 0; drawStars(performance.now()); }
  else resumeAnimation();
});
function jumpToHyperspace() {
  if (jumping) return;
  if (reducedMotion || !ctx) { announce('HYPERSPACE COMPLETE / Koordinat baru tercapai.'); playTone(220, .3); return; }
  jumping = true; jumpStart = performance.now();
  $('#hyperspace').disabled = true;
  document.body.classList.add('jumping');
  announce('HYPERDRIVE ENGAGED / Punch it!'); playTone(130, 1.3);
  setTimeout(() => {
    jumping = false; document.body.classList.remove('jumping'); $('#hyperspace').disabled = false;
    announce('WELCOME BACK, COMMANDER.');
  }, 1900);
}
$('#hyperspace').addEventListener('click', jumpToHyperspace);
document.addEventListener('keydown', event => {
  if (event.key.toLowerCase() !== 'h' || event.ctrlKey || event.metaKey || event.altKey || event.repeat || dialog.open) return;
  if (event.target.closest('input, textarea, select, [contenteditable="true"]')) return;
  jumpToHyperspace();
});
$('#year').textContent = new Date().getFullYear();
