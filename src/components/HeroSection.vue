<script setup>
import { computed } from 'vue'
import { useSiteContent } from '../composables/useSiteContent'

const { content } = useSiteContent()
const hero = computed(() => content.value.hero)
</script>

<template>
  <section id="beranda" class="hero py-16 md:py-24">
    <div class="container-mm grid md:grid-cols-[1.15fr_.85fr] gap-12 items-center">
      <div data-reveal>
        <h1 class="section-title" style="font-size:clamp(34px,5.2vw,54px);">
          {{ hero.titleBefore }}<br />
          <em class="italic text-[var(--berry)]">{{ hero.highlight }}</em> {{ hero.titleAfter }}
        </h1>
        <p class="mt-5 text-[var(--muted)] leading-relaxed max-w-md">
          {{ hero.description }}
        </p>
        <div class="flex flex-wrap gap-3 mt-8">
          <a :href="hero.primaryButtonUrl" target="_blank" rel="noopener" class="btn-primary">
            <i class="fa-brands fa-whatsapp"></i> {{ hero.primaryButtonText }}
          </a>
          <a :href="hero.secondaryButtonUrl" class="btn-secondary">{{ hero.secondaryButtonText }}</a>
        </div>
      </div>

      <div class="brand-logo-stage flex justify-center" data-reveal>
        <img
          v-if="hero.image"
          :src="hero.image"
          :alt="hero.imageAlt"
          class="hero-upload-image"
          loading="lazy"
        />
        <div v-else class="brand-logo-wrapper brand-logo-wrapper--hero" aria-hidden="true">
          <div class="brand-logo brand-logo--hero stamp">
            <svg viewBox="0 0 100 100">
              <path id="ringLg" d="M 50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="none" />
              <text font-family="Space Mono, monospace" font-size="6.4" letter-spacing="2.2" fill="currentColor">
                <textPath href="#ringLg" startOffset="0%">MINO.MI STORE &#8226; Jl. KAKAP RAYA NO.6 &#8226; </textPath>
              </text>
            </svg>
            <span class="stamp-core">mino.mi<span>TOKO KOSMETIK</span></span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
