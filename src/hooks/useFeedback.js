import { useCallback, useEffect, useRef, useState } from 'react';
export function useFeedback() {
  const [sound, setSound] = useState(false);
  const [message, setMessage] = useState('');
  const enabled = useRef(false), audio = useRef(null), timer = useRef(null);
  const announce = useCallback(text => {
    setMessage(text); clearTimeout(timer.current);
    timer.current = setTimeout(() => setMessage(''), 3200);
  }, []);
  const playTone = useCallback((frequency = 550, duration = .07) => {
    if (!enabled.current) return;
    try {
      audio.current ??= new (window.AudioContext || window.webkitAudioContext)();
      const context = audio.current;
      if (context.state === 'suspended') context.resume().catch(() => {});
      const oscillator = context.createOscillator(), gain = context.createGain();
      oscillator.frequency.setValueAtTime(frequency, context.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(frequency / 2, context.currentTime + duration);
      gain.gain.setValueAtTime(.035, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(.001, context.currentTime + duration);
      oscillator.connect(gain).connect(context.destination); oscillator.start(); oscillator.stop(context.currentTime + duration);
    } catch { announce('Audio tidak tersedia di browser ini.'); }
  }, [announce]);
  const toggleSound = () => { enabled.current = !enabled.current; setSound(enabled.current); playTone(700); announce(enabled.current ? 'Efek suara aktif. May the code be with you.' : 'Efek suara dinonaktifkan.'); };
  useEffect(() => () => { clearTimeout(timer.current); audio.current?.close().catch(() => {}); audio.current = null; }, []);
  return { sound, message, announce, playTone, toggleSound };
}
