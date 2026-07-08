<script setup>
import { computed } from 'vue'
import { useSiteContent } from '../composables/useSiteContent'

const { content } = useSiteContent()
const footer = computed(() => content.value.footer)
const location = computed(() => content.value.location)
</script>

<template>
  <footer class="site-footer">
    <div class="container-mm footer-grid">
      <div class="footer-brand">
        <p class="footer-title">{{ footer.title }}</p>
        <p class="footer-description">
          {{ footer.description }}
        </p>
      </div>

      <nav class="footer-column footer-pages" aria-label="Navigasi footer">
        <h3 class="footer-heading">Halaman</h3>
        <ul class="footer-list">
          <li v-for="link in footer.links" :key="link.href">
            <a :href="link.href">{{ link.label }}</a>
          </li>
        </ul>
      </nav>

      <div class="footer-column footer-contact">
        <h3 class="footer-heading">Kontak</h3>
        <ul class="footer-list footer-contact-list">
          <li>
            <a :href="location.whatsappUrl" target="_blank" rel="noopener">
              <i class="fa-brands fa-whatsapp"></i>
              <span>{{ location.whatsapp }}</span>
            </a>
          </li>
          <li>
            <a :href="location.instagramUrl" target="_blank" rel="noopener">
              <i class="fa-brands fa-instagram"></i>
              <span>{{ location.instagram }}</span>
            </a>
          </li>
          <li>
            <a :href="location.tiktokUrl" target="_blank" rel="noopener">
              <i class="fa-brands fa-tiktok"></i>
              <span>{{ location.tiktok }}</span>
            </a>
          </li>
          <li>
            <i class="fa-solid fa-location-dot"></i>
            <span>{{ location.address }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="container-mm footer-bottom">
      <p>{{ footer.copyright }}</p>
      <p>{{ footer.note }}</p>
    </div>
  </footer>
</template>
