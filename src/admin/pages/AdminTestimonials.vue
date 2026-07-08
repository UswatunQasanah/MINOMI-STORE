<script setup>
import AdminArrayEditor from '../components/AdminArrayEditor.vue'

const fields = [
  { name: 'name', label: 'Nama pelanggan' },
  { name: 'quote', label: 'Isi testimoni', type: 'textarea' },
]

const emptyItem = {
  name: '',
  quote: '',
}
</script>

<template>
  <AdminArrayEditor
    title="Edit Testimoni"
    description="Tambah, edit, atau hapus testimoni pelanggan."
    section-key="testimonials"
    primary-field="name"
    secondary-field="quote"
    :fields="fields"
    :empty-item="emptyItem"
  />
</template>
