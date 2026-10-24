import { useEffect, useRef, useState } from 'react';
const links = [['about', 'Tentang'], ['missions', 'Misi'], ['arsenal', 'Keahlian'], ['contact', 'Kontak']];
export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const toggle = useRef(null);
  useEffect(() => {
    const close = event => { if (!event.target.closest('.site-header')) setOpen(false); };
    const escape = event => { if (event.key === 'Escape' && open) { setOpen(false); toggle.current?.focus(); } };
    const media = matchMedia('(min-width: 681px)');
    const resize = event => { if (event.matches) setOpen(false); };
    document.addEventListener('click', close); document.addEventListener('keydown', escape); media.addEventListener('change', resize);
    return () => { document.removeEventListener('click', close); document.removeEventListener('keydown', escape); media.removeEventListener('change', resize); };
  }, [open]);
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); }), { rootMargin: '-15% 0px -55% 0px' });
    document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  return <header className="site-header"><div className="nav-shell">
    <a className="brand" href="#home" aria-label="Gibran Rais — beranda"><img src={import.meta.env.BASE_URL + "assets/emblem.svg"} width="33" height="37" alt="" /><span>GIBRAN<span className="brand-dot">.</span><small>THE GALACTIC ARCHIVE</small></span></a>
    <nav id="navigation" className={open ? 'open' : ''} aria-label="Navigasi utama">{links.map(([id, label], index) => <a key={id} href={'#' + id} className={active === id ? 'active' : ''} aria-current={active === id ? 'location' : undefined} onClick={() => setOpen(false)}><span>0{index + 1}</span> {label}</a>)}</nav>
    <div className="nav-actions"><button ref={toggle} className="menu-toggle" aria-expanded={open} aria-controls="navigation" aria-label={open ? 'Tutup menu' : 'Buka menu'} onClick={() => setOpen(!open)}><span /><span /></button></div>
  </div></header>;
}
