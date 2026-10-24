import { projects, projectCards } from '../data/projects';
import ProjectCard from './ProjectCard';
export default function Projects({ category, onFilter, onProject }) {
  const visible = projectCards.filter(card => category === 'all' || card.category === category);
  return <section className="missions container section-space" id="missions" aria-labelledby="missions-title">
    <div className="section-index mono"><span>02 / SELECTED WORK</span><span className="section-cross">+</span></div>
    <div className="section-title-row" data-reveal="" data-reveal=""><div><div className="eyebrow">DARI IDE KE IMPLEMENTASI</div><h2 id="missions-title">Proyek <em>pilihan.</em></h2></div><a className="text-link" href="https://github.com/Braneee?tab=repositories" target="_blank" rel="noopener noreferrer">Semua repository <svg><use href="#i-arrow" /></svg></a></div>
    <div className="mission-toolbar"><div className="filters" role="group" aria-label="Filter proyek">{[['all', 'Semua'], ['mobile', 'Mobile'], ['web', 'Web']].map(([value, label]) => <button key={value} className={category === value ? 'filter active' : 'filter'} aria-pressed={category === value} onClick={() => onFilter(value)}>{label} <span>{String(projectCards.filter(card => value === 'all' || card.category === value).length).padStart(2, '0')}</span></button>)}</div><span className="mono archive-count" aria-live="polite">{String(visible.length).padStart(2, '0')} PROYEK</span></div>
    <div className="project-grid">{visible.map(card => <ProjectCard key={card.id} card={card} project={projects[card.id]} onOpen={onProject} />)}</div>
    <p className="source-note mono">Ringkasan berdasarkan repository publik. Visual proyek merupakan ilustrasi, bukan screenshot aplikasi.</p>
  </section>;
}
