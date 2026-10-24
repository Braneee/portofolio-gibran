import { useEffect } from 'react';
import { initForceCursor } from '../effects/force-cursor';
import { initVaderReveal } from '../effects/vader-hero';
import { initStarfield } from '../effects/starfield';
import { initEditorialMotion } from '../effects/editorial-motion';
export function useGalacticEffects(announce, playTone) {
  useEffect(() => {
    const dispose = [initStarfield(), initForceCursor({ announce, playTone }), initVaderReveal(), initEditorialMotion()];
    return () => dispose.reverse().forEach(cleanup => cleanup?.());
  }, [announce, playTone]);
}
