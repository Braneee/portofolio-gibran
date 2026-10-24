import { useEffect, useRef } from 'react';
export default function ProjectDialog({ project, onClose, trigger }) {
  const ref = useRef(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!project) return;
    dialog.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { dialog.close(); document.body.style.overflow = previous; trigger.current?.focus(); };
  }, [project, trigger]);
  return <dialog ref={ref} id="project-dialog" aria-labelledby="dialog-title" onClose={onClose} onCancel={event => { event.preventDefault(); onClose(); }} onClick={event => {
    if (event.target !== event.currentTarget) return;
    const r = event.currentTarget.getBoundingClientRect();
    if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) onClose();
  }}>
    <button className="dialog-close" aria-label="Tutup detail proyek" onClick={onClose}><svg><use href="#i-close" /></svg></button>
    <span className="eyebrow">{project?.label}</span><h2 id="dialog-title">{project?.title}</h2><p>{project?.description}</p>
    <div className="dialog-tags project-tags">{project?.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
    <div className="dialog-section"><span className="mono">TENTANG PROYEK</span><ul>{project?.features.map(feature => <li key={feature}>{feature}</li>)}</ul></div>
    <p className="dialog-source">{project?.source}</p><a className="button primary" href={project?.url} target="_blank" rel="noopener noreferrer">LIHAT KODE DI GITHUB <svg><use href="#i-arrow" /></svg></a>
  </dialog>;
}
