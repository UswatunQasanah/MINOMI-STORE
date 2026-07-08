<script setup>
import { computed, ref } from 'vue'
import { hasSupabaseConfig, supabase, SUPABASE_IMAGE_BUCKET } from '../../lib/supabase'

const props = defineProps({
  modelValue: { type: String, default: '' },
  id: { type: String, required: true },
  label: { type: String, required: true },
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

const sanitizeName = (name) => name
  .toLowerCase()
  .replace(/\.[^/.]+$/, '')
  .replace(/[^a-z0-9-]+/g, '-')
  .replace(/^-+|-+$/g, '')
  .slice(0, 42) || 'image'

const getExtension = (file) => {
  const extension = file.name.split('.').pop()?.toLowerCase()
  return extension || file.type.split('/').pop() || 'png'
}

const uploadFile = async (event) => {
  const file = event.target.files?.[0]
  event.target.value = ''
  message.value = ''
  error.value = ''

  if (!file) return

  if (!file.type.startsWith('image/')) {
    error.value = 'File harus berupa gambar.'
    return
  }

  if (file.size > 2 * 1024 * 1024) {
    error.value = 'Ukuran gambar maksimal 2MB.'
    return
  }

  if (!hasSupabaseConfig || !supabase) {
    error.value = 'Konfigurasi Supabase belum tersedia. Cek VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY.'
    return
  }

  try {
    setUploading(true)

    const extension = getExtension(file)
    const randomId = crypto.randomUUID?.() || Math.random().toString(36).slice(2)
    const fileName = `${Date.now()}-${randomId}-${sanitizeName(file.name)}.${extension}`
    const filePath = `admin/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from(SUPABASE_IMAGE_BUCKET)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type,
      })

    if (uploadError) throw uploadError

    const { data } = supabase.storage
      .from(SUPABASE_IMAGE_BUCKET)
      .getPublicUrl(filePath)

    emit('update:modelValue', data.publicUrl)
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
      placeholder="/images/nama-file.png atau URL gambar"
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
