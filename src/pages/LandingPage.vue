<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import Header from '../components/Header.vue'
import HeroSection from '../components/HeroSection.vue'
import BrandMarquee from '../components/BrandMarquee.vue'
import ProductSection from '../components/ProductSection.vue'
import BestSellerSection from '../components/BestSellerSection.vue'
import AboutSection from '../components/AboutSection.vue'
import TrustSection from '../components/TrustSection.vue'
import WhyShopSection from '../components/WhyShopSection.vue'
import TestimonialSection from '../components/TestimonialSection.vue'
import FaqSection from '../components/FaqSection.vue'
import LocationSection from '../components/LocationSection.vue'
import FooterSection from '../components/FooterSection.vue'
import FloatingButtons from '../components/FloatingButtons.vue'

/*
  ====================================================================
  CATATAN UNTUK NADIA - KONTEN YANG MASIH DUMMY, WAJIB DIGANTI:
  1. Jam operasional (cari: dummy-flag di info jam) -> konfirmasi ke mitra
  2. Cerita/profil toko (cari: DUMMY-CERITA)     -> tanya langsung ke mitra
  3. Testimoni pelanggan, 3 item (cari: DUMMY-TESTIMONI)
  Foto toko SUDAH data asli.
  Nomor WhatsApp, Instagram, dan TikTok SUDAH data asli.
  Section "Produk Andalan" & "Best Seller" SUDAH final berupa
  informasi kategori umum (bukan produk spesifik), jadi TIDAK perlu
  diganti/diupdate tiap bulan.
  Alamat toko & peta lokasi SUDAH data asli, tidak perlu diganti.
  Badge kuning "DUMMY" di halaman ini murni penanda, hapus class
  "dummy-flag" dari elemen terkait setelah datanya kamu ganti.
  ====================================================================
*/

const revealObserver = ref(null)

onMounted(() => {
  const revealTargets = document.querySelectorAll('[data-reveal]')

  if ('IntersectionObserver' in window && revealTargets.length) {
    revealObserver.value = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.15 })

    revealTargets.forEach((target) => revealObserver.value.observe(target))
    return
  }

  revealTargets.forEach((target) => target.classList.add('is-visible'))
})

onUnmounted(() => {
  revealObserver.value?.disconnect()
})
</script>

<template>
  <Header />
  <HeroSection />
  <BrandMarquee />
  <ProductSection />
  <BestSellerSection />
  <AboutSection />
  <TrustSection />
  <WhyShopSection />
  <TestimonialSection />
  <FaqSection />
  <LocationSection />
  <FooterSection />
  <FloatingButtons />
</template>
