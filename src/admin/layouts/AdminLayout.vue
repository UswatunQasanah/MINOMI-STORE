<script setup>
import '../admin.css'
import AdminSidebar from '../components/AdminSidebar.vue'
import AdminTopbar from '../components/AdminTopbar.vue'
</script>

<template>
  <div class="admin-app">
    <AdminSidebar />
    <main class="admin-main">
      <AdminTopbar />
      <div class="admin-content">
        <RouterView />
      </div>
    </main>
  </div>
</template>
