const groups = [
  { label: 'Mobile development', detail: 'Aplikasi lintas platform.', tools: ['Flutter', 'Dart', 'Provider'], icon: 'mobile' },
  { label: 'Web development', detail: 'Antarmuka dan logika aplikasi web.', tools: ['Laravel', 'PHP', 'Blade'], icon: 'code' },
  { label: 'Database & workflow', detail: 'Data, layanan backend, dan version control.', tools: ['Supabase', 'PostgreSQL', 'Git', 'GitHub'], icon: 'data' },
];
export default function Skills() {
  return <section className="arsenal section-space" id="arsenal" aria-labelledby="arsenal-title"><div className="container">
    <div className="section-index mono"><span>KEAHLIAN</span></div>
    <div className="arsenal-grid"><div data-reveal=""><h2 id="arsenal-title">Keahlian &amp;<br /><em>Teknologi.</em></h2><p>Teknologi yang saya gunakan untuk membawa ide menjadi aplikasi.</p></div>
      <div className="arsenal-list">{groups.map((group, index) => <div className="arsenal-item" key={group.label} data-reveal=""><span className="arsenal-number mono">0{index + 1}</span><div><h3>{group.label}</h3><p>{group.detail}</p><div className="skill-tags">{group.tools.map(tool => <span key={tool}>{tool}</span>)}</div></div><svg className="skill-icon"><use href={'#i-' + group.icon} /></svg></div>)}</div>
    </div>
  </div></section>;
}
