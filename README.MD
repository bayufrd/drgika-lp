# Dentics Landing Page - Drg. Ika Kiromin

Landing page untuk praktik **Drg. Ika Kiromin**, dokter gigi profesional di Solo, Surakarta, dan Sukoharjo.  
Website ini dibangun menggunakan **Next.js 13**, **React 18**, **TailwindCSS**, dan sudah dilengkapi dengan **SEO metadata, manifest.json untuk PWA, serta struktur komponen modular**.

---

## 🚀 Fitur Utama

- **Landing Page Modern** dengan TailwindCSS dan React
- **SEO Optimized** (OpenGraph, Twitter Card, Metadata, Canonical URL, dsb.)
- **Progressive Web App (PWA)** siap dipasang di perangkat mobile
- **Responsive Design** (desktop, tablet, mobile)
- **Komponen Modular**: Header, Hero, Services, Benefits, Booking, dll.
- **Integrasi Animasi** dengan Framer Motion
- **Dukungan Gambar Carousel** (react-slick & slick-carousel)
- **Ikon Profesional** dengan React Icons
- **Offline Ready** (manifest.json sudah siap, dapat ditambah service worker)

---

## 📂 Struktur Proyek

```bash
dentics-landing/
├── app/ or pages/         # Routing Next.js (tergantung struktur)
├── components/            # Semua komponen (Hero, Services, Booking, dll.)
├── public/                # Asset publik (ikon, gambar, manifest.json)
│   ├── android-chrome-192x192.png
│   ├── android-chrome-512x512.png
│   ├── apple-touch-icon.png
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── favicon.ico
│   └── manifest.json
├── styles/                # File CSS global / Tailwind config
├── package.json           # Konfigurasi npm/yarn
├── tailwind.config.js     # Konfigurasi Tailwind
└── tsconfig.json          # Konfigurasi TypeScript
```

---

## ⚙️ Teknologi yang Digunakan

- [Next.js 13](https://nextjs.org/) - Framework React
- [React 18](https://reactjs.org/) - Library UI
- [TailwindCSS](https://tailwindcss.com/) - Styling cepat & modern
- [Framer Motion](https://www.framer.com/motion/) - Animasi halus
- [React Slick](https://react-slick.neostack.com/) - Carousel / slider
- [React Icons](https://react-icons.github.io/react-icons/) - Ikon siap pakai
- [TypeScript](https://www.typescriptlang.org/) - Superset JavaScript
- [ESLint](https://eslint.org/) - Linter untuk menjaga kualitas kode

---

## 📦 Instalasi & Menjalankan Proyek

Clone repo ini dan jalankan:

```bash
# Clone repository
git clone https://github.com/username/dentics-landing.git

# Masuk ke folder proyek
cd dentics-landing

# Install dependencies
npm install

# Jalankan development server
npm run dev

# Build untuk production
npm run build

# Jalankan build production
npm start
```

Aplikasi akan berjalan di:  
👉 http://localhost:3000

---

## 📱 PWA (Progressive Web App)

Proyek ini sudah dilengkapi dengan **manifest.json** dan ikon aplikasi.  
Untuk mengaktifkan full **offline support**, tambahkan `service-worker.js` dan integrasikan dengan Next.js.  

File `manifest.json` (lokasi: `/public/manifest.json`) sudah berisi:

- Nama aplikasi & short_name
- Start URL
- Scope & display mode (standalone)
- Background & theme color
- Icon berbagai ukuran

---

## 🛠️ Scripts Tersedia

Dari `package.json`, skrip yang bisa dijalankan:

- `npm run dev` → Jalankan development server
- `npm run build` → Build aplikasi untuk production
- `npm run start` → Jalankan build production
- `npm run lint` → Linting kode

---

## 📑 Metadata & SEO

Metadata sudah ditambahkan melalui Next.js `metadata` API:  

- **Title & Description** sesuai praktik Drg. Ika Kiromin
- **Keywords** untuk SEO lokal (Solo, Surakarta, Sukoharjo)
- **OpenGraph** untuk sharing di Facebook & WhatsApp
- **Twitter Card** untuk preview di Twitter/X
- **Canonical URL** untuk menghindari duplikasi
- **Google Site Verification** (opsional)

---

## 👩‍⚕️ Tentang Drg. Ika Kiromin

Website ini ditujukan sebagai landing page resmi untuk praktik dokter gigi:  
- Lokasi: Solo, Surakarta, Sukoharjo  
- Layanan: Perawatan gigi umum, estetika, pembersihan karang gigi, tambal gigi, dll.  
- Target: Pasien keluarga & individu yang mencari dokter gigi terpercaya  

---

## 📄 Lisensi

Proyek ini bersifat **private**. Semua hak cipta konten, gambar, dan brand terkait **Drg. Ika Kiromin** dilindungi.  
Jangan mendistribusikan ulang tanpa izin.

---

## ✨ Catatan Tambahan

- Pastikan mengganti link domain di `metadata` (`https://drg.ikakiromin.com`) dengan domain resmi.  
- Sesuaikan gambar di `public/images/` agar lebih relevan dengan klinik.  
- Jika ingin SEO lebih optimal, tambahkan **schema.org LocalBusiness JSON-LD** di `<head>`.  
