<script setup>
import AdminArrayEditor from '../components/AdminArrayEditor.vue'

const fields = [
  { name: 'name', label: 'Nama brand' },
]

const emptyItem = {
  name: '',
}
</script>

<template>
  <AdminArrayEditor
    title="Edit Brand Marquee"
    description="Kelola nama brand yang berjalan pada strip brand."
    section-key="brands"
    primary-field="name"
    secondary-field="name"
    :fields="fields"
    :empty-item="emptyItem"
  />
</template>
