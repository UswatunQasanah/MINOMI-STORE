<script setup>
import AdminArrayEditor from '../components/AdminArrayEditor.vue'

const fields = [
  { name: 'title', label: 'Nama best seller' },
  { name: 'category', label: 'Kategori' },
  { name: 'image', label: 'URL/path gambar', full: true },
  { name: 'imageAlt', label: 'Alt gambar', full: true },
  { name: 'description', label: 'Deskripsi', type: 'textarea' },
]

const emptyItem = {
  title: '',
  category: '',
  image: '',
  imageAlt: '',
  description: '',
}
</script>

<template>
  <AdminArrayEditor
    title="Edit Best Seller"
    description="Kelola kartu best seller dan gambar produk yang tampil di landing page."
    section-key="bestSellers"
    primary-field="title"
    secondary-field="description"
    :fields="fields"
    :empty-item="emptyItem"
  />
</template>
