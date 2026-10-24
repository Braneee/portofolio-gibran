import { createScope } from './scope';

// Scroll and pointer updates stay outside React's render cycle.
export function initEditorialMotion() {
  const scope = createScope();
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const root = document.documentElement;
  const observed = new Set();
  let scrollFrame = 0, pointerFrame = 0, tilted = null, pointer = null;
  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .08, rootMargin: '0px 0px -30px 0px' }) : null;

  function revealContent() {
    observed.forEach(element => { if (!element.isConnected) { observer?.unobserve(element); observed.delete(element); } });
    document.querySelectorAll('[data-reveal]').forEach(element => {
      if (media.matches || !observer) element.classList.add('is-visible');
      else if (!observed.has(element)) { observed.add(element); observer.observe(element); }
    });
  }
  function measureScroll() {
    scrollFrame = 0;
    const max = root.scrollHeight - innerHeight;
    root.style.setProperty('--scroll-progress', max > 0 ? Math.min(1, scrollY / max) : 0);
    root.style.setProperty('--hero-shift', media.matches ? '0px' : Math.min(scrollY, 800) * .12 + 'px');
    document.body.classList.toggle('is-scrolled', scrollY > 35);
  }
  function onScroll() { if (!scrollFrame) scrollFrame = scope.requestAnimationFrame(measureScroll); }
  function resetTilt() {
    if (!tilted) return;
    tilted.style.removeProperty('--tilt-x'); tilted.style.removeProperty('--tilt-y');
    tilted = null;
  }
  function onPointer(event) {
    if (media.matches || !finePointer.matches) return;
    const visual = event.target.closest('.project-visual');
    if (!visual) { resetTilt(); return; }
    if (tilted !== visual) resetTilt();
    tilted = visual; pointer = { x: event.clientX, y: event.clientY };
    if (pointerFrame) return;
    pointerFrame = scope.requestAnimationFrame(() => {
      pointerFrame = 0;
      if (!tilted || !pointer) return;
      const rect = tilted.getBoundingClientRect();
      const x = (pointer.x - rect.left) / rect.width, y = (pointer.y - rect.top) / rect.height;
      tilted.style.setProperty('--tilt-x', ((.5 - y) * 3).toFixed(2) + 'deg');
      tilted.style.setProperty('--tilt-y', ((x - .5) * 3).toFixed(2) + 'deg');
      tilted.style.setProperty('--shine-x', (x * 100).toFixed(1) + '%');
      tilted.style.setProperty('--shine-y', (y * 100).toFixed(1) + '%');
    });
  }
  root.classList.add('motion-ready');
  revealContent(); measureScroll();
  const mutations = new MutationObserver(() => { revealContent(); onScroll(); });
  mutations.observe(document.querySelector('main'), { childList: true, subtree: true });
  scope.listen(window, 'scroll', onScroll, { passive: true });
  scope.listen(window, 'resize', onScroll, { passive: true });
  scope.listen(document, 'pointermove', onPointer, { passive: true });
  scope.listen(document, 'pointerout', event => { if (!event.relatedTarget) resetTilt(); });
  scope.listen(window, 'blur', resetTilt);
  scope.listen(media, 'change', () => { resetTilt(); revealContent(); onScroll(); });
  return () => {
    mutations.disconnect(); observer?.disconnect(); scope.dispose(); resetTilt();
    root.classList.remove('motion-ready'); document.body.classList.remove('is-scrolled');
    root.style.removeProperty('--scroll-progress'); root.style.removeProperty('--hero-shift');
  };
}
