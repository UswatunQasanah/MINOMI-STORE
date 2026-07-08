<script setup>
import AdminArrayEditor from '../components/AdminArrayEditor.vue'

const fields = [
  { name: 'icon', label: 'Class icon Font Awesome' },
  { name: 'title', label: 'Judul alasan' },
  { name: 'description', label: 'Deskripsi', type: 'textarea' },
]

const emptyItem = {
  icon: 'fa-solid fa-heart',
  title: '',
  description: '',
}
</script>

<template>
  <AdminArrayEditor
    title="Edit Alasan Pelanggan"
    description="Kelola alasan kenapa pelanggan memilih mino.mi store."
    section-key="whyShop"
    primary-field="title"
    secondary-field="description"
    :fields="fields"
    :empty-item="emptyItem"
  />
</template>
