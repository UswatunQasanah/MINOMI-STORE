<script setup>
import AdminArrayEditor from '../components/AdminArrayEditor.vue'

const fields = [
  { name: 'value', label: 'Angka/statistik' },
  { name: 'label', label: 'Label' },
  { name: 'description', label: 'Deskripsi', type: 'textarea' },
]

const emptyItem = {
  value: '',
  label: '',
  description: '',
}
</script>

<template>
  <AdminArrayEditor
    title="Edit Trust Section"
    description="Atur statistik singkat yang menampilkan bukti kepercayaan toko."
    section-key="trustStats"
    primary-field="value"
    secondary-field="label"
    :fields="fields"
    :empty-item="emptyItem"
  />
</template>
