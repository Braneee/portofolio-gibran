export function createScope() {
  const cleanups = [], timers = new Set(), frames = new Set();
  const listen = (target, type, fn, options) => {
    target.addEventListener(type, fn, options);
    cleanups.push(() => target.removeEventListener(type, fn, options));
  };
  const later = (fn, delay) => { const id = window.setTimeout(() => { timers.delete(id); fn(); }, delay); timers.add(id); return id; };
  const cancelLater = id => { timers.delete(id); window.clearTimeout(id); };
  const frame = fn => { const id = window.requestAnimationFrame(time => { frames.delete(id); fn(time); }); frames.add(id); return id; };
  const cancelFrame = id => { frames.delete(id); window.cancelAnimationFrame(id); };
  return { listen, setTimeout: later, clearTimeout: cancelLater, requestAnimationFrame: frame, cancelAnimationFrame: cancelFrame,
    dispose() { cleanups.reverse().forEach(fn => fn()); timers.forEach(window.clearTimeout); frames.forEach(window.cancelAnimationFrame); }
  };
}
