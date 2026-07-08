<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const title = computed(() => route.meta.title || 'Dashboard')
</script>

<template>
  <header class="admin-topbar">
    <div>
      <h1>{{ title }}</h1>
    </div>
    <div class="admin-topbar-actions">
      <RouterLink to="/" class="admin-btn admin-btn-secondary">
        <i class="fa-solid fa-eye" aria-hidden="true"></i>
        Lihat Landing
      </RouterLink>
    </div>
  </header>
</template>
