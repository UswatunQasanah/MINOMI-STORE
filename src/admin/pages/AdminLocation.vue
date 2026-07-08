<script setup>
import AdminObjectForm from '../components/AdminObjectForm.vue'

const fields = [
  { name: 'address', label: 'Alamat', type: 'textarea' },
  { name: 'hours', label: 'Jam buka', full: true },
  { name: 'whatsapp', label: 'Nomor WhatsApp tampil' },
  { name: 'whatsappUrl', label: 'Link WhatsApp' },
  { name: 'instagram', label: 'Instagram tampil' },
  { name: 'instagramUrl', label: 'Link Instagram' },
  { name: 'tiktok', label: 'TikTok tampil' },
  { name: 'tiktokUrl', label: 'Link TikTok' },
  { name: 'mapUrl', label: 'Embed URL Google Maps', type: 'textarea' },
]
</script>

<template>
  <AdminObjectForm
    title="Edit Lokasi & Kontak"
    description="Ubah alamat, jam buka, kontak, dan link peta."
    section-key="location"
    :fields="fields"
  />
</template>
