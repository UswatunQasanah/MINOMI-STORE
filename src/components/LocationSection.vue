<script setup>
import { computed } from 'vue'
import { useSiteContent } from '../composables/useSiteContent'

const { content } = useSiteContent()
const location = computed(() => content.value.location)
</script>

<template>
  <section id="lokasi" class="container-mm py-16 md:py-20">
    <p class="eyebrow" data-reveal>Lokasi Toko</p>
    <h2 class="section-title" data-reveal>Datang Langsung ke Toko Kami</h2>
    <div class="grid md:grid-cols-[0.9fr_1.1fr] gap-8 mt-8 items-stretch">
      <div class="card p-6 flex flex-col justify-between" data-reveal>
        <div>
          <p class="text-xs font-mono uppercase tracking-widest text-[var(--berry)] mb-2">Alamat</p>
          <p class="text-[var(--ink)] leading-relaxed">
            {{ location.address }}
          </p>
          <p class="text-xs font-mono uppercase tracking-widest text-[var(--berry)] mt-5 mb-2 dummy-flag">
            Jam Buka
          </p>
          <p class="text-[var(--ink)]">{{ location.hours }}</p>
        </div>
        <a :href="location.whatsappUrl" target="_blank" rel="noopener" class="btn-primary mt-6 justify-center">
          <i class="fa-brands fa-whatsapp"></i> Tanya Alamat via WhatsApp
        </a>
      </div>

      <div class="map-frame" data-reveal>
        <iframe
          :src="location.mapUrl"
          width="100%"
          height="100%"
          style="border:0; min-height:320px;"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          title="Lokasi mino.mi store"
        ></iframe>
      </div>
    </div>
  </section>
</template>
