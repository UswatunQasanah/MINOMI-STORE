<script setup>
import AdminObjectForm from '../components/AdminObjectForm.vue'

const fields = [
  { name: 'titleBefore', label: 'Judul baris pertama' },
  { name: 'highlight', label: 'Teks highlight' },
  { name: 'titleAfter', label: 'Judul lanjutan' },
  { name: 'description', label: 'Deskripsi', type: 'textarea' },
  { name: 'primaryButtonText', label: 'Teks tombol WhatsApp' },
  { name: 'primaryButtonUrl', label: 'Link tombol WhatsApp' },
  { name: 'secondaryButtonText', label: 'Teks tombol kedua' },
  { name: 'secondaryButtonUrl', label: 'Link tombol kedua' },
]
</script>

<template>
  <AdminObjectForm
    title="Edit Hero Section"
    description="Ubah judul, deskripsi, dan tombol utama pada bagian paling atas landing page."
    section-key="hero"
    :fields="fields"
  />
</template>
