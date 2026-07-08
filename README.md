# mino.mi store - Landing Page Vue 3

Landing page `mino.mi store` sudah dikonversi dari HTML, CSS, dan JavaScript biasa menjadi project Vue 3 dengan Vite.

## Struktur folder

```text
mino-mi-store/
|-- index.html
|-- package.json
|-- vite.config.js
|-- src/
|   |-- main.js
|   |-- App.vue
|   |-- assets/
|   |   `-- style.css
|   `-- components/
|       |-- Header.vue
|       |-- HeroSection.vue
|       |-- InfoStrip.vue
|       |-- ProductSection.vue
|       |-- BestSellerSection.vue
|       |-- AboutSection.vue
|       |-- WhyShopSection.vue
|       |-- TestimonialSection.vue
|       |-- LocationSection.vue
|       |-- FooterSection.vue
|       `-- FloatingButtons.vue
`-- assets/
    `-- images/
```

## Cara menjalankan

```bash
npm install
npm run dev
```

Setelah server Vite aktif, buka URL yang muncul di terminal, biasanya `http://localhost:5173/`.

## Interaksi yang sudah dipindahkan ke Vue

- Menu mobile memakai `ref` dan `computed`, tombol hamburger berubah menjadi silang saat dibuka.
- Header memberi efek shadow saat halaman discroll.
- Navigasi desktop dan mobile menyorot section yang sedang aktif.
- Scroll reveal tetap berjalan saat elemen masuk layar.
- Tombol back to top muncul setelah scroll ke bawah dan kembali ke atas saat diklik.
- Tombol WhatsApp floating tetap tersedia.

## Konten yang masih perlu diganti (ditandai badge kuning "DUMMY")

1. Jam operasional - cek ke mitra, cari elemen dengan class `dummy-flag` di bagian info jam.
2. Cerita/profil toko - cari komentar `DUMMY-CERITA`.
3. Testimoni pelanggan - cari komentar `DUMMY-TESTIMONI`.
4. Foto toko - taruh file foto di `assets/images/`, lalu ganti placeholder di `AboutSection.vue`.

Nomor WhatsApp, Instagram, dan TikTok sudah memakai data asli.

Setelah kontennya diganti, hapus class `dummy-flag` pada elemen terkait supaya badge kuning "DUMMY" hilang.

Section "Produk Andalan" dan "Best Seller" sudah final sebagai informasi kategori umum, begitu juga alamat toko dan peta lokasi.
