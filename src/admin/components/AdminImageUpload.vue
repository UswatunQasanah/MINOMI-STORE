<script setup>
import { computed, ref } from 'vue'
import { uploadImageToSupabase } from '../../lib/supabase'

const props = defineProps({
  modelValue: { type: String, default: '' },
  id: { type: String, required: true },
  label: { type: String, required: true },
  folder: { type: String, default: 'uploads' },
})

const emit = defineEmits(['update:modelValue', 'uploading-change'])

const isUploading = ref(false)
const message = ref('')
const error = ref('')
const previewUrl = computed(() => props.modelValue)

const setUploading = (value) => {
  isUploading.value = value
  emit('uploading-change', value)
}

const uploadFile = async (event) => {
  const file = event.target.files?.[0]
  event.target.value = ''
  message.value = ''
  error.value = ''

  if (!file) return

  try {
    setUploading(true)

    const publicUrl = await uploadImageToSupabase(file, props.folder)
    emit('update:modelValue', publicUrl)
    message.value = 'Gambar berhasil diupload'
  } catch (uploadError) {
    error.value = uploadError?.message
      ? `Upload gagal: ${uploadError.message}`
      : 'Upload gagal. Coba lagi atau isi URL gambar manual.'
  } finally {
    setUploading(false)
  }
}
</script>

<template>
  <div class="admin-image-upload">
    <label :for="id">{{ label }}</label>
    <input
      :id="id"
      class="admin-input"
      type="text"
      :value="modelValue"
      placeholder="URL gambar Supabase atau /images/nama-file.png"
      @input="emit('update:modelValue', $event.target.value)"
    />

    <input
      :id="`${id}-file`"
      class="admin-file-input"
      type="file"
      accept="image/*"
      :disabled="isUploading"
      @change="uploadFile"
    />

    <p v-if="isUploading" class="admin-upload-note">Mengupload...</p>
    <p v-else-if="message" class="admin-upload-success">{{ message }}</p>
    <p v-if="error" class="admin-upload-error">{{ error }}</p>

    <div v-if="previewUrl" class="admin-image-preview">
      <img :src="previewUrl" alt="Preview gambar" />
    </div>
  </div>
</template>
