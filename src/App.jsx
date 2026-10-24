import { useRef, useState } from 'react';
import Icons from './components/Icons';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import DisciplineStrip from './components/DisciplineStrip';
import ProjectDialog from './components/ProjectDialog';
import { projects } from './data/projects';
import { useFeedback } from './hooks/useFeedback';
import { useGalacticEffects } from './hooks/useGalacticEffects';
export default function App() {
  const [category, setCategory] = useState('all');
  const [projectId, setProjectId] = useState(null);
  const trigger = useRef(null);
  const { sound, message, announce, playTone, toggleSound } = useFeedback();
  useGalacticEffects(announce, playTone);
  return <>
    <a className="skip-link" href="#main">Langsung ke konten</a>
    <canvas id="starfield" aria-hidden="true" /><div className="noise" aria-hidden="true" /><Icons /><Header />
    <main id="main"><Hero /><DisciplineStrip /><About />
      <Projects category={category} onFilter={value => { setCategory(value); playTone(450); }} onProject={(id, button) => { trigger.current = button; setProjectId(id); playTone(620); }} />
      <Skills /><Contact />
    </main><Footer />
    <button className="sound-toggle" id="sound-toggle" aria-pressed={sound} aria-label={sound ? 'Nonaktifkan suara efek' : 'Aktifkan suara efek'} onClick={toggleSound}><svg><use href="#i-sound" /></svg><span>{sound ? 'SOUND ON' : 'SOUND OFF'}</span></button>
    <div className={'toast mono' + (message ? ' show' : '')} role="status" aria-live="polite">{message}</div>
    <div className="force-layer" id="force-layer" aria-hidden="true"><div className="force-reticle" id="force-reticle"><span /><i /></div><svg className="force-tethers" id="force-tethers" /><div id="force-holograms" /></div>
    <div className="force-controls"><span className="force-help" id="force-help" /><button id="force-toggle" className="force-toggle" aria-pressed="true" aria-label="Nonaktifkan efek cursor Force"><span aria-hidden="true">✧</span><span id="force-toggle-label">FORCE ON</span></button></div>
    <ProjectDialog project={projects[projectId]} onClose={() => setProjectId(null)} trigger={trigger} />
  </>;
}
