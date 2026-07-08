<script setup>
import { ref, watch } from 'vue'
import { useSiteContent } from '../../composables/useSiteContent'
import AdminImageUpload from './AdminImageUpload.vue'

const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  sectionKey: { type: String, required: true },
  fields: { type: Array, required: true },
})

const { content, updateSection } = useSiteContent()
const clone = (value) => JSON.parse(JSON.stringify(value || {}))
const draft = ref(clone(content.value[props.sectionKey]))
const saved = ref(false)
const uploadCount = ref(0)

watch(
  () => content.value[props.sectionKey],
  (value) => {
    draft.value = clone(value)
  },
)

const save = () => {
  updateSection(props.sectionKey, draft.value)
  saved.value = true
  window.setTimeout(() => {
    saved.value = false
  }, 1600)
}

const handleUploadingChange = (isUploading) => {
  uploadCount.value += isUploading ? 1 : -1
  if (uploadCount.value < 0) uploadCount.value = 0
}
</script>

<template>
  <section class="admin-panel">
    <div class="admin-section-head">
      <div>
        <h2>{{ title }}</h2>
        <p v-if="description">{{ description }}</p>
      </div>
      <span v-if="saved" class="admin-btn admin-btn-secondary">Tersimpan</span>
    </div>

    <form class="admin-form" @submit.prevent="save">
      <div class="admin-grid">
        <div
          v-for="field in fields"
          :key="field.name"
          class="admin-field"
          :class="{ 'admin-field--full': field.type === 'textarea' || field.full }"
        >
          <label v-if="field.type !== 'image'" :for="`${props.sectionKey}-${field.name}`">{{ field.label }}</label>
          <AdminImageUpload
            v-if="field.type === 'image'"
            :id="`${props.sectionKey}-${field.name}`"
            v-model="draft[field.name]"
            :label="field.label"
            @uploading-change="handleUploadingChange"
          />
          <textarea
            v-else-if="field.type === 'textarea'"
            :id="`${props.sectionKey}-${field.name}`"
            v-model="draft[field.name]"
            class="admin-textarea"
          ></textarea>
          <input
            v-else
            :id="`${props.sectionKey}-${field.name}`"
            v-model="draft[field.name]"
            class="admin-input"
            :type="field.type || 'text'"
          />
        </div>
      </div>

      <div class="admin-actions">
        <button class="admin-btn admin-btn-primary" type="submit" :disabled="uploadCount > 0">
          <i class="fa-solid fa-floppy-disk" aria-hidden="true"></i>
          {{ uploadCount > 0 ? 'Mengupload...' : 'Simpan' }}
        </button>
      </div>
    </form>
  </section>
</template>
