export default function Hero() {
  const asset = name => import.meta.env.BASE_URL + 'assets/' + name;
  return <section className="vader-hero" id="home" aria-labelledby="hero-title">
    <div className="hero-ambient" aria-hidden="true"><div className="hero-orbit" /></div>
    <div className="hero-editorial">
      <p className="hero-eyebrow mono"><span className="status-dot" /> SOFTWARE ENGINEERING & MOBILE DEVELOPMENT</p>
      <h1 id="hero-title"><span className="line-mask"><span>Gibran Rais</span></span><span className="line-mask"><span>Iskandar<span className="accent">.</span></span></span></h1>
      <p className="hero-intro">Saya membangun aplikasi mobile dan web, dari struktur di balik layar sampai detail yang kamu sentuh.</p>
      <div className="hero-links"><a className="button primary" href="#missions">Lihat karya saya <svg><use href="#i-arrow" /></svg></a><a className="text-link" href="https://github.com/Braneee" target="_blank" rel="noopener noreferrer">GitHub <svg><use href="#i-arrow" /></svg></a></div>

    </div>
    <div className="hero-portrait-stage">

      <button className="vader-figure" id="vader-figure" type="button" aria-label="Lihat identitas di balik helm Darth Vader. Arahkan cursor ke helm atau tekan Enter." aria-pressed="false" aria-describedby="vader-hint">
        <img className="vader-art" src={asset('darth-vader-front.png')} width="480" height="823" alt="Darth Vader dengan helm dan jubah hitam" fetchPriority="high" draggable="false" />
        <span className="vader-portrait" id="vader-portrait" aria-hidden="true"><img id="gibran-portrait" src={asset('gibran-portrait-placeholder.svg')} width="400" height="480" alt="" draggable="false" /><span className="portrait-caption">FOTO GIBRAN · PLACEHOLDER</span></span>
        <span className="helmet-marker" aria-hidden="true"><i /><i /><i /><i /></span>
      </button>
      <div className="identity-reveal-note"><span className="reveal-note-line" /><span className="mono" id="vader-hint">ARAHKAN CURSOR KE HELM</span></div>
    </div>
    <div className="hero-bottom-line mono"><a href="#missions" className="scroll-cue"><span>↓</span> LIHAT PROYEK</a></div>
  </section>;
}
