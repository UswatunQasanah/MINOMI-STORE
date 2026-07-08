<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useSiteContent } from '../composables/useSiteContent'

const navItems = [
  { href: '#beranda', label: 'Beranda' },
  { href: '#best-seller', label: 'Best Seller' },
  { href: '#tentang', label: 'Tentang' },
  { href: '#testimoni', label: 'Testimoni' },
  { href: '#faq', label: 'FAQ' },
  { href: '#lokasi', label: 'Lokasi' },
]

const isMenuOpen = ref(false)
const isScrolled = ref(false)
const activeSection = ref('beranda')
const menuButtonLabel = computed(() => (isMenuOpen.value ? 'Tutup menu' : 'Buka menu'))
const navObserver = ref(null)
const { content } = useSiteContent()
const whatsappUrl = computed(() => content.value.location.whatsappUrl)

const isActive = (href) => href === `#${activeSection.value}`

const closeMenu = () => {
  isMenuOpen.value = false
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 12
}

const setupActiveSectionObserver = () => {
  const sectionIds = navItems.map((item) => item.href).join(',')
  const sections = document.querySelectorAll(sectionIds)

  if (!('IntersectionObserver' in window) || !sections.length) return

  navObserver.value = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activeSection.value = entry.target.getAttribute('id')
      }
    })
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 })

  sections.forEach((section) => navObserver.value.observe(section))
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
  requestAnimationFrame(setupActiveSectionObserver)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  navObserver.value?.disconnect()
})
</script>

<template>
  <header class="site-header" :class="{ 'is-scrolled': isScrolled }">
    <nav class="container-mm flex items-center justify-between py-3">
      <a href="#beranda" class="brand-link flex items-center" @click="closeMenu">
        <span class="brand-logo-wrapper brand-logo-wrapper--nav" aria-hidden="true">
          <span class="brand-logo brand-logo--nav stamp stamp-sm">
            <svg viewBox="0 0 100 100">
              <path id="ringNav" d="M 50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="none" />
              <text font-family="Space Mono, monospace" font-size="6.4" letter-spacing="2.2" fill="currentColor">
                <textPath href="#ringNav" startOffset="0%">MINO.MI STORE &#8226; Jl. KAKAP RAYA NO.6 &#8226; </textPath>
              </text>
            </svg>
            <span class="stamp-core">mino.mi<span>TOKO KOSMETIK</span></span>
          </span>
        </span>
        <span class="font-display text-xl font-semibold">
          mino.mi <em class="not-italic text-[var(--berry)]">store</em>
        </span>
      </a>

      <button
        id="menuBtn"
        class="md:hidden text-2xl"
        :aria-label="menuButtonLabel"
        :aria-expanded="String(isMenuOpen)"
        aria-controls="mobileMenu"
        @click="toggleMenu"
      >
        <span v-if="isMenuOpen">&times;</span>
        <span v-else>&#9776;</span>
      </button>

      <div class="hidden md:flex items-center gap-7">
        <a
          v-for="item in navItems"
          :key="item.href"
          :href="item.href"
          class="nav-link"
          :class="{ 'is-active': isActive(item.href) }"
        >
          {{ item.label }}
        </a>
        <a :href="whatsappUrl" target="_blank" rel="noopener" class="btn-primary">
          <i class="fa-brands fa-whatsapp"></i> Chat WhatsApp
        </a>
      </div>
    </nav>

    <div
      id="mobileMenu"
      class="md:hidden border-t border-[var(--line)] px-4 py-4 text-sm font-semibold"
      :class="{ hidden: !isMenuOpen }"
    >
      <a
        v-for="item in navItems"
        :key="item.href"
        :href="item.href"
        class="mobile-nav-link block py-2"
        :class="{ 'is-active': isActive(item.href) }"
        @click="closeMenu"
      >
        {{ item.label }}
      </a>
      <a :href="whatsappUrl" class="block py-2 text-[var(--berry)]" @click="closeMenu">
        Chat WhatsApp
      </a>
    </div>
  </header>
</template>
