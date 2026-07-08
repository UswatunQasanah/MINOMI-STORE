<script setup>
import AdminArrayEditor from '../components/AdminArrayEditor.vue'

const fields = [
  { name: 'title', label: 'Nama kategori' },
  { name: 'category', label: 'Label kecil' },
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
    title="Edit Produk Andalan"
    description="Tambah, edit, atau hapus kategori produk andalan di landing page."
    section-key="products"
    primary-field="title"
    secondary-field="description"
    :fields="fields"
    :empty-item="emptyItem"
  />
</template>
