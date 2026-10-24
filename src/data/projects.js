export const projects = {
  warungku: {
    title: 'WarungKu', label: '01 / MOBILE APPLICATION',
    description: 'Aplikasi point of sale berbasis Flutter untuk warung kelontong dan warung makan. README proyek mendeskripsikan pengelolaan produk, transaksi, inventori, dan laporan dengan backend Supabase.',
    tags: ['Flutter', 'Dart', 'Provider', 'Supabase', 'PostgreSQL'],
    features: ['Fokus: menyederhanakan aktivitas kasir dan pengelolaan stok warung.', 'README mencantumkan role Admin dan Guest, pengelolaan produk, serta alur transaksi.', 'Fondasi teknologi: Flutter, Provider, dan layanan Auth, Database, serta Storage dari Supabase.'],
    source: 'Sumber: README final-capstone-project. Fitur dirangkum dari dokumentasi; implementasi belum diaudit. Visual kartu adalah konsep antarmuka.',
    url: 'https://github.com/Braneee/final-capstone-project'
  },
  stpi: {
    title: 'STPI Mobile', label: '02 / MOBILE APPLICATION',
    description: 'Repository aplikasi Flutter milik Gibran. Struktur proyek memuat target Android, iOS, web, dan desktop serta direktori aset.',
    tags: ['Flutter', 'Dart'],
    features: ['Pengembangan mobile dengan Flutter dan bahasa Dart.', 'Kode aplikasi tersedia pada direktori lib di repository publik.', 'README saat ini masih singkat; rincian tujuan, fitur, dan kontribusi dapat dilengkapi oleh pemilik proyek.'],
    source: 'Sumber: struktur repository dan README stpi-mobile. Keberadaan target platform tidak berarti aplikasi telah dirilis di semua platform.',
    url: 'https://github.com/Braneee/stpi-mobile'
  },
  poliklinik: {
    title: 'Poliklinik App', label: '03 / WEB APPLICATION',
    description: 'Repository aplikasi web poliklinik dengan struktur Laravel. Profil GitHub menampilkan Blade sebagai bahasa utamanya.',
    tags: ['Laravel', 'PHP', 'Blade'],
    features: ['Fondasi aplikasi web menggunakan Laravel dan template Blade.', 'Repository mencakup direktori app, database, resources, dan routes.', 'Detail fitur dan peran dalam proyek dapat dilengkapi setelah dikonfirmasi oleh pemilik.'],
    source: 'Sumber: repository poliklinik-app dan profil GitHub. README masih berupa dokumentasi bawaan Laravel; tidak ada klaim fitur klinis atau hasil penggunaan.',
    url: 'https://github.com/Braneee/poliklinik-app'
  }
};

export const projectCards = [
  { id: 'warungku', category: 'mobile', featured: true, label: '01 / MOBILE APPLICATION', summary: 'Aplikasi point of sale berbasis Flutter untuk membantu pengelolaan kasir, stok, dan laporan penjualan warung.', tags: ['Flutter', 'Dart', 'Supabase'] },
  { id: 'stpi', category: 'mobile', label: '02 / MOBILE APPLICATION', summary: 'Eksplorasi pengembangan aplikasi mobile dengan Flutter. Kode dan struktur proyek tersedia di repository publik.', tags: ['Flutter', 'Dart'] },
  { id: 'poliklinik', category: 'web', label: '03 / WEB APPLICATION', summary: 'Proyek aplikasi web poliklinik dengan fondasi Laravel dan Blade. Jelajahi implementasinya langsung melalui kode sumber.', tags: ['Laravel', 'PHP', 'Blade'] }
];
