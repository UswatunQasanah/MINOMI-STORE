<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ADMIN_AUTH_KEY } from '../../router'
import '../admin.css'

const route = useRoute()
const router = useRouter()
const email = ref('admin@minomi.local')
const password = ref('')
const error = ref('')

const login = () => {
  if (email.value === 'admin@minomi.local' && password.value === 'admin123') {
    window.localStorage.setItem(ADMIN_AUTH_KEY, 'true')
    router.push(route.query.redirect || '/admin')
    return
  }

  error.value = 'Email atau password admin belum sesuai.'
}
</script>

<template>
  <main class="admin-login-page">
    <section class="admin-panel admin-login-card">
      <h1>Login Admin</h1>
      <p style="margin:8px 0 24px;color:#7d6770;">Kelola konten landing page mino.mi store.</p>

      <form class="admin-form" @submit.prevent="login">
        <div v-if="error" class="admin-alert">{{ error }}</div>

        <div class="admin-field">
          <label for="admin-email">Email</label>
          <input id="admin-email" v-model="email" class="admin-input" type="email" />
        </div>

        <div class="admin-field">
          <label for="admin-password">Password</label>
          <input id="admin-password" v-model="password" class="admin-input" type="password" />
        </div>

        <button class="admin-btn admin-btn-primary" type="submit">Masuk Dashboard</button>
      </form>
    </section>
  </main>
</template>
