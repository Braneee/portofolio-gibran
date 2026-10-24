'use strict';

(() => {
  const layer = document.getElementById('force-layer');
  const reticle = document.getElementById('force-reticle');
  const holograms = document.getElementById('force-holograms');
  const tethers = document.getElementById('force-tethers');
  const toggle = document.getElementById('force-toggle');
  if (!layer || !reticle || !holograms || !tethers || !toggle) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const coarse = window.matchMedia('(hover: none), (pointer: coarse)');
  const blocked = 'a,button,input,textarea,select,summary,dialog,.site-header,.force-controls,.sound-toggle,.toast,[contenteditable],[role="button"]';
  const readable = 'h1,h2,h3,h4,p,li,.hero-identity,.eyebrow,.mono,.project-info';
  const phrases = ['HELLO THERE!', 'USE THE FORCE!', 'PEW! PEW!', 'THIS IS THE WAY.', 'VWOOM!', 'DO. OR DO NOT.'];
  const cards = new Map();
  const transientTimers = new Map();
  let enabled = true, sequence = 0, active = null, cursorFrame = 0;
  let pointer = { x: -100, y: -100 };
  let lastSpark = 0;
  try { enabled = localStorage.getItem('gibran-force-fx') !== 'off'; } catch { /* Optional storage. */ }

  const clamp = (value, min, max) => Math.min(Math.max(value, min), Math.max(min, max));
  const svgElement = name => document.createElementNS('http://www.w3.org/2000/svg', name);
  function feedback(message) { if (typeof announce === 'function') announce(message); }
  function sound() { if (typeof playTone === 'function') playTone(document.body.dataset.side === 'dark' ? 220 : 860, .09); }
  function laterRemove(node, duration) {
    const timer = setTimeout(() => { transientTimers.delete(node); node.remove(); }, duration);
    transientTimers.set(node, timer);
  }
  function removeCard(card) {
    const state = cards.get(card);
    if (!state) return;
    clearTimeout(state.expiry); clearTimeout(state.removal);
    cards.delete(card); card.remove();
  }
  function scheduleExpiry(card) {
    const state = cards.get(card);
    if (!state) return;
    clearTimeout(state.expiry); clearTimeout(state.removal);
    card.classList.remove('retiring');
    state.expiry = setTimeout(() => {
      card.classList.add('retiring');
      state.removal = setTimeout(() => removeCard(card), reduced.matches ? 0 : 250);
    }, 9000);
  }
  function place(card, x, y) {
    const halfWidth = card.offsetWidth / 2, halfHeight = card.offsetHeight / 2;
    const header = document.querySelector('.site-header')?.getBoundingClientRect().bottom || 0;
    const safeTop = Math.max(14, Math.min(header, window.innerHeight / 3));
    card.style.left = clamp(x, halfWidth + 14, window.innerWidth - halfWidth - 14) + 'px';
    card.style.top = clamp(y, safeTop + halfHeight + 12, window.innerHeight - halfHeight - 55) + 'px';
  }
  function createCard(x, y) {
    while (cards.size >= 6) removeCard(cards.keys().next().value);
    const card = document.createElement('div');
    card.className = 'force-hologram';
    const id = document.createElement('span'); id.className = 'holo-id';
    id.textContent = 'HOLO TRANSMISSION // ' + String(++sequence).padStart(3, '0');
    const text = document.createElement('strong'); text.textContent = phrases[(sequence - 1) % phrases.length];
    const grip = document.createElement('span'); grip.className = 'holo-grip'; grip.textContent = '⠿ HOLD TO FORCE PULL';
    card.append(id, text, grip); holograms.append(card); cards.set(card, {});
    place(card, x, y); scheduleExpiry(card); ripple(x, y); sound();
    return card;
  }
  function ripple(x, y) {
    if (reduced.matches || transientTimers.size >= 32) return;
    const node = document.createElement('span'); node.className = 'force-ripple';
    node.style.left = x + 'px'; node.style.top = y + 'px'; layer.append(node); laterRemove(node, 650);
  }
  function spark(x, y) {
    if (reduced.matches || transientTimers.size >= 32) return;
    const node = document.createElement('span'); node.className = 'force-spark'; node.textContent = sequence % 2 ? '✧' : '+';
    node.style.left = x + 'px'; node.style.top = y + 'px'; layer.append(node); laterRemove(node, 500);
  }
  function makeTether(x, y) {
    const group = svgElement('g'); group.classList.add('force-tether-group');
    const line = svgElement('line'); line.classList.add('force-tether');
    const core = svgElement('line'); core.classList.add('force-tether-core');
    [line, core].forEach(element => { element.setAttribute('x1', x); element.setAttribute('y1', y); element.setAttribute('x2', x); element.setAttribute('y2', y); group.append(element); });
    tethers.append(group); return group;
  }
  function releasePointer() {
    if (!active) return;
    const previous = active; active = null;
    if (previous.card && cards.has(previous.card)) { previous.card.classList.remove('held'); scheduleExpiry(previous.card); }
    if (previous.tether) { previous.tether.classList.add('released'); laterRemove(previous.tether, reduced.matches ? 0 : 700); }
    document.body.classList.remove('force-pulling'); reticle.classList.remove('holding');
    if (document.documentElement.hasPointerCapture(previous.id)) document.documentElement.releasePointerCapture(previous.id);
  }
  function clearEffects() {
    releasePointer();
    [...cards.keys()].forEach(removeCard);
    transientTimers.forEach((timer, node) => { clearTimeout(timer); node.remove(); }); transientTimers.clear();
    tethers.replaceChildren();
  }
  function hideCursor() { reticle.classList.remove('visible'); document.body.classList.remove('force-cursor-active'); }
  function updateToggle() {
    toggle.setAttribute('aria-pressed', String(enabled));
    toggle.setAttribute('aria-label', enabled ? 'Nonaktifkan efek cursor Force' : 'Aktifkan efek cursor Force');
    document.getElementById('force-toggle-label').textContent = enabled ? 'FORCE ON' : 'FORCE OFF';
    toggle.parentElement.classList.toggle('disabled', !enabled);
  }
  function updateHelp() {
    const help = document.getElementById('force-help');
    if (coarse.matches) help.textContent = 'Ketuk area kosong. Tarik teks hologramnya.';
    else { help.replaceChildren(document.createTextNode('Klik & tarik area kosong. Pegang hologramnya. ')); const key = document.createElement('kbd'); key.textContent = 'ESC'; help.append(key, ' bersihkan'); }
  }
  updateToggle(); updateHelp(); coarse.addEventListener('change', updateHelp);
  toggle.addEventListener('click', () => {
    enabled = !enabled; updateToggle(); clearEffects(); hideCursor();
    try { localStorage.setItem('gibran-force-fx', enabled ? 'on' : 'off'); } catch { /* Optional storage. */ }
    feedback(enabled ? 'FORCE FX ON / Klik dan tarik area kosong.' : 'FORCE FX OFF / Cursor standar aktif.');
  });

  document.addEventListener('pointerdown', event => {
    if (!enabled || !event.isPrimary || event.button !== 0 || event.target.closest(blocked) || document.querySelector('dialog[open]')) return;
    const existing = event.target.closest('.force-hologram');
    if (active) releasePointer();
    const isReadable = !existing && !!event.target.closest(readable);
    const card = existing || (event.pointerType !== 'touch' && !isReadable ? createCard(event.clientX, event.clientY) : null);
    let offsetX = 0, offsetY = 0;
    if (existing) {
      const bounds = existing.getBoundingClientRect(); offsetX = event.clientX - (bounds.left + bounds.width / 2); offsetY = event.clientY - (bounds.top + bounds.height / 2);
      const state = cards.get(existing); clearTimeout(state?.expiry); clearTimeout(state?.removal); existing.classList.remove('retiring');
      holograms.append(existing);
    }
    active = { id: event.pointerId, startX: event.clientX, startY: event.clientY, card, offsetX, offsetY, moved: false, canDrag: !!existing || (event.pointerType !== 'touch' && !isReadable), tether: null };
    if (existing) { event.preventDefault(); document.documentElement.setPointerCapture(event.pointerId); }
  });
  document.addEventListener('pointermove', event => {
    if (!enabled) return;
    pointer = { x: event.clientX, y: event.clientY };
    const showCursor = event.pointerType !== 'touch' && !reduced.matches && !event.target.closest(blocked) && !document.querySelector('dialog[open]');
    reticle.classList.toggle('visible', showCursor); document.body.classList.toggle('force-cursor-active', showCursor);
    if (showCursor && !cursorFrame) cursorFrame = requestAnimationFrame(() => { reticle.style.transform = `translate3d(${pointer.x}px,${pointer.y}px,0)`; cursorFrame = 0; });
    if (!active || active.id !== event.pointerId) return;
    const distance = Math.hypot(event.clientX - active.startX, event.clientY - active.startY);
    if (distance > 6) active.moved = true;
    if (!active.moved || !active.canDrag || !active.card) return;
    if (!active.tether) {
      active.tether = makeTether(active.startX, active.startY); document.documentElement.setPointerCapture(event.pointerId);
      active.card.classList.add('held'); document.body.classList.add('force-pulling'); reticle.classList.add('holding');
      const state = cards.get(active.card); clearTimeout(state?.expiry);
      ripple(active.startX, active.startY);
    }
    place(active.card, event.clientX - active.offsetX, event.clientY - active.offsetY);
    [...active.tether.children].forEach(line => { line.setAttribute('x2', event.clientX); line.setAttribute('y2', event.clientY); });
    if (performance.now() - lastSpark > 38) { spark(event.clientX, event.clientY); lastSpark = performance.now(); }
  }, { passive: true });
  document.addEventListener('pointerup', event => {
    if (!active || active.id !== event.pointerId) return;
    if (!active.card && !active.moved && !window.getSelection()?.toString()) createCard(event.clientX, event.clientY);
    releasePointer();
  });
  document.addEventListener('pointercancel', releasePointer);
  document.addEventListener('lostpointercapture', releasePointer);
  document.addEventListener('pointerout', event => { if (!event.relatedTarget) { hideCursor(); releasePointer(); } });
  window.addEventListener('blur', () => { hideCursor(); releasePointer(); });
  window.addEventListener('scroll', () => { clearEffects(); hideCursor(); }, { passive: true });
  window.addEventListener('resize', () => { clearEffects(); hideCursor(); }, { passive: true });
  document.addEventListener('visibilitychange', () => { if (document.hidden) { clearEffects(); hideCursor(); } });
  reduced.addEventListener('change', () => { clearEffects(); hideCursor(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') { clearEffects(); hideCursor(); }
    if (event.key === 'Tab') hideCursor();
  });
  // A native dialog occupies the top layer; drop cosmetic drag state before it opens.
  const projectDialog = document.getElementById('project-dialog');
  if (projectDialog) new MutationObserver(() => { if (projectDialog.open) { clearEffects(); hideCursor(); } }).observe(projectDialog, { attributes: true, attributeFilter: ['open'] });
})();
