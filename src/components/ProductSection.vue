<script setup>
import { computed } from 'vue'
import { useSiteContent } from '../composables/useSiteContent'

const { content } = useSiteContent()
const products = computed(() => content.value.products)
</script>

<template>
  <!-- PRODUK ANDALAN (informasi kategori, tidak perlu update tiap bulan) -->
  <section id="produk-bulan-ini" class="container-mm py-16 md:py-20">
    <p class="eyebrow" data-reveal>Produk Andalan</p>
    <h2 class="section-title" data-reveal>Produk Andalan Setiap Bulan</h2>
    <p class="text-[var(--muted)] mt-3 max-w-lg" data-reveal>
      mino.mi store rutin menghadirkan pilihan produk andalan dari berbagai kategori berikut,
      disesuaikan dengan kebutuhan dan tren kecantikan yang sedang diminati pelanggan.
    </p>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6 mt-10">
      <article v-for="product in products" :key="product.title" class="card" data-reveal>
        <div class="media media-product-photo">
          <img :src="product.image" :alt="product.imageAlt" class="product-card-image" loading="lazy" />
        </div>
        <div class="p-4">
          <span class="tag-cat">{{ product.category }}</span>
          <h3 class="font-display text-lg font-semibold leading-snug">{{ product.title }}</h3>
          <p class="text-xs text-[var(--muted)] mt-1">{{ product.description }}</p>
        </div>
      </article>
    </div>
  </section>
</template>
