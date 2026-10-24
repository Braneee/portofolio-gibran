import ProjectVisual from './ProjectVisual';

export default function ProjectCard({ card, project, onOpen }) {
  return <article data-reveal="" className={'project-card' + (card.featured ? ' featured' : '')}>
    <ProjectVisual id={card.id} onOpen={onOpen} />
    <div className="project-info">
      <div className="project-type mono"><span>{card.label}</span><span aria-hidden="true">↗</span></div>
      <h3><button onClick={event => onOpen(card.id, event.currentTarget)}>{project.title}</button></h3>
      <p>{card.summary}</p>
      <div className="project-tags">{card.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
      <button className="project-details text-link" onClick={event => onOpen(card.id, event.currentTarget)}>Lihat proyek <svg><use href="#i-arrow" /></svg></button>
    </div>
  </article>;
}
