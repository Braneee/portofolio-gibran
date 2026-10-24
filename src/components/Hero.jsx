export default function Hero() { return (<>
<section className="vader-hero" id="home" aria-labelledby="hero-title">
      <div className="poster-sky" aria-hidden="true"><span className="poster-sun sun-primary"></span><span className="poster-sun sun-secondary"></span><span className="poster-orbit"></span><div className="dune dune-far"></div><div className="dune dune-mid"></div><div className="dune dune-near"></div></div>
      <div className="poster-topline mono"><span>EPISODE 01 / THE BUILDER</span><span>IN A GALAXY NOT SO FAR AWAY.</span></div>
      <div className="poster-headline"><h1 id="hero-title">A NEW<br />BUILDER<span>.</span></h1><p className="mono">IDEAS BECOME REAL. ONE LINE AT A TIME.</p></div>
      <button className="vader-figure" id="vader-figure" type="button" aria-label="Lihat identitas di balik helm Darth Vader. Arahkan cursor ke helm, atau gunakan Enter untuk menampilkan dan menyembunyikan portrait." aria-pressed="false" aria-describedby="vader-hint">
        <img className="vader-art" src={import.meta.env.BASE_URL + "assets/darth-vader-front.png"} width="480" height="823" alt="Darth Vader berdiri menghadap ke depan dengan helm hitam dan jubah" fetchPriority="high" draggable="false" />
        <span className="vader-portrait" id="vader-portrait" aria-hidden="true"><img id="gibran-portrait" src={import.meta.env.BASE_URL + "assets/gibran-portrait-placeholder.svg"} width="400" height="480" alt="" draggable="false" /><span className="portrait-caption">FOTO GIBRAN · PLACEHOLDER</span></span>
        <span className="helmet-marker" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
      </button>
      <div className="identity-reveal-note"><span className="reveal-note-line" aria-hidden="true"></span><span className="mono" id="vader-hint">ARAHKAN CURSOR KE HELM</span><span className="reveal-note-sub">THERE IS MORE BEHIND THE MASK.</span></div>
      <div className="poster-identity"><p className="poster-name">GIBRAN RAIS<span>.</span></p><p className="poster-role">Software Engineer & Mobile Developer</p><p className="poster-fullname">Gibran Rais Hilmy Iskandar</p></div>
      <div className="poster-actions"><a className="button poster-cta" href="#missions">JELAJAHI PROYEK <svg><use href="#i-arrow" /></svg></a><a className="poster-github text-link" href="https://github.com/Braneee" target="_blank" rel="noopener noreferrer">GitHub <svg><use href="#i-github" /></svg></a></div>
      <div className="poster-footer mono"><span>MAY THE CODE BE WITH YOU.</span><button className="hyperspace-button mono" id="hyperspace"><span className="jump-icon" aria-hidden="true">⟫</span> JUMP TO HYPERSPACE <span className="keycap">H</span></button><a href="#about">CONTINUE THE STORY ↓</a></div>
    </section>
</>); }
