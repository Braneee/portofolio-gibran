import { useEffect } from 'react';
import { initForceCursor } from '../effects/force-cursor';
import { initVaderReveal } from '../effects/vader-hero';
import { initStarfield } from '../effects/starfield';
export function useGalacticEffects(announce, playTone) {
  useEffect(() => {
    const dispose = [initStarfield({ announce, playTone }), initForceCursor({ announce, playTone }), initVaderReveal()];
    return () => dispose.reverse().forEach(cleanup => cleanup?.());
  }, [announce, playTone]);
}
