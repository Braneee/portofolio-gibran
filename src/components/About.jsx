export default function About() {
  return <section className="about container section-space" id="about" aria-labelledby="about-title">
    <div className="section-index mono"><span>01 / TENTANG SAYA</span><span>THE PERSON BEHIND THE CODE</span></div>
    <div className="about-grid">
      <div className="about-heading" data-reveal=""><h2 id="about-title">Saya suka<br />membuat hal<br /><em>yang berguna.</em></h2><a className="text-link" href="https://www.linkedin.com/in/gibranrais/" target="_blank" rel="noopener noreferrer">Kenali saya di LinkedIn <svg><use href="#i-arrow" /></svg></a></div>
      <div className="about-detail" data-reveal=""><p className="about-lead">Halo, saya Gibran.<br />Software engineer dengan fokus pada pengembangan aplikasi mobile dan web.</p><p>Saya bekerja dengan Flutter untuk aplikasi mobile dan Laravel untuk web. Saya tertarik pada hubungan antara struktur kode yang jelas dan pengalaman pengguna yang terasa sederhana.</p><p>Di sini kamu bisa melihat beberapa proyek yang saya kerjakan, teknologi yang saya gunakan, dan kode di baliknya.</p><dl className="profile-facts"><div><dt>Fokus</dt><dd>Software engineering<br />Mobile development</dd></div><div><dt>Lokasi</dt><dd>Semarang, Indonesia</dd></div><div><dt>GitHub</dt><dd><a href="https://github.com/Braneee" target="_blank" rel="noopener noreferrer">@Braneee ↗</a></dd></div></dl></div>
    </div>
  </section>;
}
