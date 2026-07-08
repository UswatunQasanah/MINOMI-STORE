<script setup>
import { computed } from 'vue'
import { useSiteContent } from '../composables/useSiteContent'

const { content } = useSiteContent()
const reasons = computed(() => content.value.whyShop)
</script>

<template>
  <section class="py-16 md:py-20" style="background:var(--cream);">
    <div class="container-mm">
      <p class="eyebrow" data-reveal>Kenapa Belanja di Sini</p>
      <h2 class="section-title" data-reveal>Alasan Pelanggan Kembali Lagi</h2>
      <div class="grid md:grid-cols-3 gap-5 mt-10 dummy-flag dummy-outline" style="padding:6px;">
        <span class="dummy-tag" style="top:-4px;right:-4px;">Cek ulang klaim ini</span>
        <div v-for="reason in reasons" :key="reason.title" class="why-card" data-reveal>
          <div class="why-icon">
            <i :class="reason.icon"></i>
          </div>
          <h3 class="font-semibold">{{ reason.title }}</h3>
          <p class="text-sm text-[var(--muted)] mt-2">{{ reason.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
