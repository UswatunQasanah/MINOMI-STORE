<script setup>
import { computed } from 'vue'
import { useSiteContent } from '../../composables/useSiteContent'

const { content, resetContent } = useSiteContent()

const stats = computed(() => [
  { label: 'Produk Andalan', value: content.value.products.length },
  { label: 'Best Seller', value: content.value.bestSellers.length },
  { label: 'Brand', value: content.value.brands.length },
  { label: 'FAQ', value: content.value.faqs.length },
])

const reset = () => {
  if (window.confirm('Reset semua data localStorage ke data awal?')) {
    resetContent()
  }
}
</script>

<template>
  <section class="admin-panel">
    <div class="admin-section-head">
      <div>
        <h2>Ringkasan Konten</h2>
        <p>Semua perubahan disimpan di localStorage browser ini.</p>
      </div>
      <button class="admin-btn admin-btn-danger" type="button" @click="reset">
        Reset Data
      </button>
    </div>

    <div class="admin-stat-grid">
      <article v-for="stat in stats" :key="stat.label" class="admin-card">
        <strong>{{ stat.value }}</strong>
        <span>{{ stat.label }}</span>
      </article>
    </div>
  </section>
</template>
