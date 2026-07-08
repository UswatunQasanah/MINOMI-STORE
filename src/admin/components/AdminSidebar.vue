<script setup>
import { useRouter } from 'vue-router'
import { ADMIN_AUTH_KEY } from '../../router'

const router = useRouter()

const links = [
  { to: '/admin', label: 'Dashboard', icon: 'fa-solid fa-gauge' },
  { to: '/admin/hero', label: 'Hero Section', icon: 'fa-solid fa-wand-magic-sparkles' },
  { to: '/admin/products', label: 'Produk Andalan', icon: 'fa-solid fa-box-open' },
  { to: '/admin/best-seller', label: 'Best Seller', icon: 'fa-solid fa-star' },
  { to: '/admin/brands', label: 'Brand', icon: 'fa-solid fa-tags' },
  { to: '/admin/trust', label: 'Trust Section', icon: 'fa-solid fa-chart-simple' },
  { to: '/admin/about', label: 'Tentang Toko', icon: 'fa-solid fa-store' },
  { to: '/admin/why-shop', label: 'Alasan Pelanggan', icon: 'fa-solid fa-heart' },
  { to: '/admin/testimonials', label: 'Testimoni', icon: 'fa-solid fa-comments' },
  { to: '/admin/faq', label: 'FAQ', icon: 'fa-solid fa-circle-question' },
  { to: '/admin/location', label: 'Lokasi & Kontak', icon: 'fa-solid fa-location-dot' },
  { to: '/admin/footer', label: 'Footer', icon: 'fa-solid fa-shoe-prints' },
]

const logout = () => {
  window.localStorage.removeItem(ADMIN_AUTH_KEY)
  router.push('/admin/login')
}
</script>

<template>
  <aside class="admin-sidebar">
    <div class="admin-brand">
      <strong>mino.mi</strong>
      <span>Dashboard Admin Lokal</span>
    </div>

    <nav class="admin-nav" aria-label="Menu admin">
      <RouterLink v-for="link in links" :key="link.to" :to="link.to">
        <i :class="link.icon" aria-hidden="true"></i>
        <span>{{ link.label }}</span>
      </RouterLink>
    </nav>

    <button class="admin-logout" type="button" @click="logout">
      <i class="fa-solid fa-right-from-bracket" aria-hidden="true"></i>
      <span>Logout</span>
    </button>
  </aside>
</template>
