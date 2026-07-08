<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useSiteContent } from '../composables/useSiteContent'

const showBackToTop = ref(false)
const { content } = useSiteContent()
const whatsappUrl = computed(() => content.value.location.whatsappUrl)

const handleScroll = () => {
  showBackToTop.value = window.scrollY > 480
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <a :href="whatsappUrl" target="_blank" rel="noopener" class="wa-float" aria-label="Chat WhatsApp mino.mi store">
    <i class="fa-brands fa-whatsapp"></i>
  </a>

  <button class="back-to-top" :class="{ 'is-visible': showBackToTop }" aria-label="Kembali ke atas" @click="scrollToTop">
    <i class="fa-solid fa-arrow-up"></i>
  </button>
</template>
