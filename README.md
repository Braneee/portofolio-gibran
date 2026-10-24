# Gibran — Portfolio

Portfolio personal Gibran Rais Hilmy Iskandar, Software Engineer & Mobile Developer, dengan tema Star Wars Dark Side. Dibangun ulang menggunakan React + Vite dengan komponen JSX, state React, dan efek browser yang dikelola melalui hooks.

## Menjalankan lokal

Gunakan Node.js 22.12+ (atau 20.19+):

```sh
npm ci
npm run dev
```

Buka URL lokal yang ditampilkan Vite (biasanya http://127.0.0.1:5173). Untuk memeriksa dan membangun versi produksi:

```sh
npm run build
```

## Hosting di Vercel

1. Import repository `Braneee/portofolio-gibran` di Vercel.
2. Gunakan root directory repository dan Framework Preset **Vite**.
3. `vercel.json` sudah mengatur Build Command `npm run build` dan Output Directory `dist`.
4. Deploy. Tidak membutuhkan environment variable atau backend.

## Hosting di GitHub Pages

Alamat setelah deployment berhasil: https://braneee.github.io/portofolio-gibran/

1. Buka repository `Braneee/portofolio-gibran` dan login sebagai pemilik.
2. Buka **Settings → Pages**.
3. Pada **Build and deployment → Source**, pilih **GitHub Actions**.
4. Commit dan push konfigurasi deployment ke branch `main`:

   ```sh
   git add .github/workflows/deploy.yml vite.config.js index.html src/components/Header.jsx src/components/Hero.jsx src/effects/vader-hero.js README.md
   git commit -m "ci: configure GitHub Pages deployment"
   git push origin main
   ```

5. Buka tab **Actions → Deploy portfolio to GitHub Pages**. Tunggu job `build` dan `deploy` berwarna hijau.
6. Jika push dilakukan sebelum Pages diaktifkan, buka workflow tersebut, pilih **Run workflow → main → Run workflow**, atau jalankan ulang deployment yang gagal setelah memperbaiki pengaturan Pages.
7. Buka URL portfolio dari hasil job deployment atau halaman Settings → Pages.

Workflow memasang dependency melalui `npm ci`, membangun website dengan base path nama repository, lalu memublikasikan `dist/`. Setiap push berikutnya ke `main` memperbarui website secara otomatis. Folder `dist/` tidak perlu di-commit.

Build Vercel dan development lokal tetap memakai base `/`; hanya workflow GitHub Pages yang memberikan `VITE_BASE_PATH`.

## Struktur project

```text
src/
  App.jsx                    # State filter proyek, dialog, dan komposisi halaman
  main.jsx                   # Entry React dengan StrictMode
  components/                # Header, Hero, About, Projects, Skills, Contact, Footer
  data/projects.js           # Data detail proyek
  hooks/                     # Feedback audio dan lifecycle efek
  effects/                   # Canvas, Force cursor, dan reveal portrait
  styles/                    # CSS responsif dan tema Dark Side
public/assets/               # Aset statis
index.html                   # HTML entry dan metadata
vite.config.js               # Konfigurasi React + Vite
package.json
package-lock.json            # Versi dependency yang terkunci
vercel.json                  # Deploy Vite ke Vercel
ASSET-CREDITS.md
```

## Mengedit

- Konten, tautan sosial, serta daftar teknologi: komponen di `src/components/`.
- Detail proyek: `src/data/projects.js`.
- Foto masih placeholder. Tambahkan foto ke `public/assets/`, ubah `src` pada `#gibran-portrait`, lalu hapus label `.portrait-caption` setelah foto asli terpasang. Sesuaikan `.vader-portrait` di `src/styles/vader-hero.css` jika perlu.
- Google Fonts digunakan dengan fallback font sistem. Suara sintetis bersifat opsional. Preferensi efek disimpan di browser.

Ringkasan proyek bersumber dari repository publik pemilik; ilustrasi kartu bukan screenshot aplikasi asli. Tidak ada klaim metrik, sertifikasi, atau pengalaman yang dibuat-buat.

Star Wars merupakan inspirasi fan tribute. Lihat [kredit aset](ASSET-CREDITS.md) untuk sumber dan ketentuan penggunaan gambar.

## Preview hasil build

Jalankan `npm run build`, lalu `npm run preview`. Folder `dist/` dihasilkan otomatis oleh Vite dan tidak disimpan ke Git.
