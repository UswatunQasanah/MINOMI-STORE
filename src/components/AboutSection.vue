<script setup>
import { computed } from 'vue'
import { useSiteContent } from '../composables/useSiteContent'

const { content } = useSiteContent()
const about = computed(() => content.value.about)
</script>

<template>
  <section id="tentang" class="container-mm py-16 md:py-20">
    <div class="grid md:grid-cols-2 gap-10 items-center">
      <div class="about-photo" data-reveal>
        <img :src="about.image" :alt="about.imageAlt" loading="lazy" />
      </div>
      <div data-reveal>
        <p class="eyebrow">{{ about.eyebrow }}</p>
        <h2 class="section-title">{{ about.title }}</h2>
        <p v-for="(paragraph, index) in about.paragraphs" :key="index" class="mt-5 text-[var(--muted)] leading-relaxed">
          {{ paragraph }}
        </p>
      </div>
    </div>
  </section>
</template>
