# Gibran — Portfolio

Portfolio personal Gibran Rais Hilmy Iskandar, Software Engineer & Mobile Developer, dengan tema Star Wars Dark Side. HTML, CSS, dan JavaScript tanpa framework atau dependency runtime.

## Menjalankan lokal

Gunakan Node.js 20 atau lebih baru:

```sh
npm run dev
```

Buka http://127.0.0.1:4173. Untuk memeriksa sintaks JavaScript:

```sh
npm run check
```

## Hosting di Vercel

1. Import repository `Braneee/portofolio-gibran` di Vercel.
2. Gunakan root directory repository dan Framework Preset **Other**.
3. `vercel.json` sudah mengatur Build Command `npm run check` dan Output Directory `dist`.
4. Deploy. Tidak membutuhkan environment variable atau backend.

## Struktur project

```text
dist/
  index.html                 # Konten profil dan section
  styles.css                 # Layout dan komponen dasar
  vader-hero.css              # Hero dan palet Dark Side
  app.js                     # Navigasi, proyek, audio, dan starfield
  vader-hero.js               # Reveal portrait di helm
  force-cursor.css
  force-cursor.js             # Efek cursor dan hologram
  assets/                    # Aset yang digunakan website
server.mjs                   # Server preview lokal
package.json                 # Perintah dev dan check
vercel.json                  # Konfigurasi deploy statis
ASSET-CREDITS.md              # Sumber dan lisensi aset
```

## Mengedit

- Konten, tautan sosial, serta daftar teknologi: `dist/index.html`.
- Detail proyek: objek `projects` di `dist/app.js`.
- Foto masih placeholder. Tambahkan foto ke `dist/assets/`, ubah `src` pada `#gibran-portrait`, lalu hapus label `.portrait-caption` setelah foto asli terpasang. Sesuaikan `.vader-portrait` di `dist/vader-hero.css` jika perlu.
- Google Fonts digunakan dengan fallback font sistem. Suara sintetis bersifat opsional. Preferensi efek disimpan di browser.

Ringkasan proyek bersumber dari repository publik pemilik; ilustrasi kartu bukan screenshot aplikasi asli. Tidak ada klaim metrik, sertifikasi, atau pengalaman yang dibuat-buat.

Star Wars merupakan inspirasi fan tribute. Lihat [kredit aset](ASSET-CREDITS.md) untuk sumber dan ketentuan penggunaan gambar.
