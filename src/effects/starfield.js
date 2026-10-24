import { createScope } from './scope';
export function initStarfield({ announce, playTone }) {
const scope = createScope();
const { listen, setTimeout, clearTimeout, requestAnimationFrame, cancelAnimationFrame } = scope;
const canvas = document.getElementById('starfield');
const $ = selector => document.querySelector(selector);
const dialog = document.getElementById('project-dialog');
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
let reducedMotion = motionPreference.matches;
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
listen(window, 'resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(resizeStars, 100); });
listen(window, 'pointermove', event => { pointerX = (event.clientX / width - 0.5); pointerY = (event.clientY / height - 0.5); }, { passive: true });
listen(document, 'visibilitychange', () => {
  if (document.hidden) { cancelAnimationFrame(frameId); frameId = 0; } else resumeAnimation();
});
listen(motionPreference, 'change', event => {
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
listen($('#hyperspace'), 'click', jumpToHyperspace);
listen(document, 'keydown', event => {
  if (event.key.toLowerCase() !== 'h' || event.ctrlKey || event.metaKey || event.altKey || event.repeat || dialog.open) return;
  if (event.target.closest('input, textarea, select, [contenteditable="true"]')) return;
  jumpToHyperspace();
});

return () => { scope.dispose(); document.body.classList.remove('jumping'); };
}
