<script setup>
import { computed } from 'vue'
import { useSiteContent } from '../composables/useSiteContent'

const { content } = useSiteContent()
const bestSellers = computed(() => content.value.bestSellers)
</script>

<template>
  <!-- BEST SELLER (informasi umum, tidak perlu update) -->
  <section id="best-seller" class="section-soft py-16 md:py-20" style="background:var(--pink-soft);">
    <div class="container-mm">
      <p class="eyebrow" data-reveal>Best Seller</p>
      <h2 class="section-title" data-reveal>Kategori Paling Laris</h2>
      <p class="text-[var(--muted)] mt-3 max-w-lg" data-reveal>
        Kategori produk yang paling sering dicari ulang oleh pelanggan mino.mi store.
      </p>

      <div class="grid md:grid-cols-3 gap-6 mt-10">
        <article v-for="item in bestSellers" :key="item.title" class="card relative" data-reveal>
          <div class="ribbon-wrap">
            <span class="stamp stamp-sm stamp-ribbon" aria-hidden="true">
              <span class="stamp-core" style="font-size:9px;">BEST<span>SELLER</span></span>
            </span>
          </div>
          <div class="media media-product-photo media-product-photo--best">
            <img :src="item.image" :alt="item.imageAlt" class="product-card-image" loading="lazy" />
          </div>
          <div class="p-4">
            <span class="tag-cat">{{ item.category }}</span>
            <h3 class="font-display text-lg font-semibold">{{ item.title }}</h3>
            <p class="text-xs text-[var(--muted)] mt-1">{{ item.description }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
