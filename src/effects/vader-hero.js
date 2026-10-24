import { createScope } from './scope';
export function initVaderReveal({ announce, playTone } = {}) {
const scope = createScope();
const { listen, setTimeout, clearTimeout, requestAnimationFrame, cancelAnimationFrame } = scope;
  const figure = document.getElementById('vader-figure');
  const portrait = document.getElementById('vader-portrait');
  const hint = document.getElementById('vader-hint');
  if (!figure || !portrait || !hint) return;

  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const touch = matchMedia('(hover: none), (pointer: coarse)');
  let frame = 0, active = false, locked = false, keyboard = false;
  let x = 0, y = 0, targetX = 0, targetY = 0, radius = 0, targetRadius = 0, opacity = 0;
  let lastTime = 0;
  const idleHint = () => touch.matches ? 'KETUK VADER UNTUK REVEAL' : 'ARAHKAN CURSOR KE HELM';
  hint.textContent = idleHint();

  function write() {
    portrait.style.setProperty('--mask-x', x.toFixed(2) + 'px');
    portrait.style.setProperty('--mask-y', y.toFixed(2) + 'px');
    portrait.style.setProperty('--mask-radius', Math.max(0, radius).toFixed(2) + 'px');
    portrait.style.opacity = Math.max(0, Math.min(1, opacity)).toFixed(3);
  }
  function animate(time) {
    frame = 0;
    const delta = Math.min(50, time - lastTime || 16); lastTime = time;
    const ease = 1 - Math.exp(-delta / 65);
    x += (targetX - x) * ease; y += (targetY - y) * ease;
    radius += (targetRadius - radius) * ease;
    opacity += ((active ? 1 : 0) - opacity) * ease;
    write();
    if (Math.abs(targetRadius - radius) > .15 || Math.abs((active ? 1 : 0) - opacity) > .004 || Math.abs(targetX - x) > .2 || Math.abs(targetY - y) > .2) frame = requestAnimationFrame(animate);
    else { x = targetX; y = targetY; radius = targetRadius; opacity = active ? 1 : 0; write(); }
  }
  function render() {
    if (reduced.matches) { cancelAnimationFrame(frame); frame = 0; x = targetX; y = targetY; radius = targetRadius; opacity = active ? 1 : 0; write(); return; }
    if (!frame && !document.hidden) { lastTime = performance.now(); frame = requestAnimationFrame(animate); }
  }
  function reveal(show, full = false) {
    active = show;
    const width = portrait.getBoundingClientRect().width;
    targetRadius = show ? width * (full ? 1.3 : .7) : 0;
    figure.classList.toggle('is-revealing', show);
    figure.setAttribute('aria-pressed', String(show));
    hint.textContent = show ? 'BEHIND THE MASK / GIBRAN' : idleHint();
    render();
  }
  function center() {
    const bounds = portrait.getBoundingClientRect();
    targetX = bounds.width / 2; targetY = bounds.height * .46;
  }
  function reset() {
    locked = false; keyboard = false;
    reveal(false);
  }
  listen(figure, 'pointermove', event => {
    if (event.pointerType === 'touch' || locked) return;
    keyboard = false;
    const bounds = portrait.getBoundingClientRect();
    const px = event.clientX - bounds.left, py = event.clientY - bounds.top;
    const dx = (px - bounds.width / 2) / (bounds.width * .68), dy = (py - bounds.height * .45) / (bounds.height * .68);
    const nearHelmet = dx * dx + dy * dy < 1;
    targetX = Math.max(0, Math.min(bounds.width, px));
    targetY = Math.max(0, Math.min(bounds.height, py));
    reveal(nearHelmet);
  }, { passive: true });
  listen(figure, 'pointerleave', () => { if (!locked && !keyboard) reveal(false); });
  listen(figure, 'focus', () => {
    if (figure.matches(':focus-visible')) { keyboard = true; center(); reveal(true, true); }
  });
  listen(figure, 'blur', reset);
  listen(figure, 'click', event => {
    if (event.detail === 0 || touch.matches) {
      locked = !active; keyboard = false; center(); reveal(locked, true);
    }
  });
  listen(figure, 'keydown', event => { if (event.key === 'Escape') { reset(); event.preventDefault(); } });
  listen(document, 'pointerdown', event => { if (locked && !figure.contains(event.target)) reset(); }, { passive: true });
  listen(window, 'scroll', reset, { passive: true });
  listen(window, 'resize', () => { reset(); center(); }, { passive: true });
  listen(window, 'blur', reset);
  listen(document, 'visibilitychange', () => {
    if (document.hidden) { cancelAnimationFrame(frame); frame = 0; active = false; locked = false; keyboard = false; radius = 0; targetRadius = 0; opacity = 0; write(); figure.setAttribute('aria-pressed', 'false'); figure.classList.remove('is-revealing'); hint.textContent = idleHint(); }
  });
  listen(reduced, 'change', () => { reset(); render(); });
  listen(touch, 'change', () => { reset(); hint.textContent = idleHint(); });
  listen(document.getElementById('gibran-portrait'), 'error', event => {
    const image = event.currentTarget;
    if (!image.src.endsWith('gibran-portrait-placeholder.svg')) image.src = import.meta.env.BASE_URL + 'assets/gibran-portrait-placeholder.svg';
  });
  center(); write();

return () => { scope.dispose(); figure.classList.remove("is-revealing"); };
}
