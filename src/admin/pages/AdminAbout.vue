<script setup>
import { ref } from 'vue'
import { useSiteContent } from '../../composables/useSiteContent'
import AdminImageUpload from '../components/AdminImageUpload.vue'

const { content, updateSection } = useSiteContent()
const draft = ref({
  ...content.value.about,
  paragraphsText: content.value.about.paragraphs.join('\n\n'),
})
const saved = ref(false)
const uploadCount = ref(0)

const save = () => {
  updateSection('about', {
    eyebrow: draft.value.eyebrow,
    title: draft.value.title,
    image: draft.value.image,
    imageAlt: draft.value.imageAlt,
    paragraphs: draft.value.paragraphsText.split(/\n+/).map((item) => item.trim()).filter(Boolean),
  })
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
        <h2>Edit Tentang Toko</h2>
        <p>Ubah foto toko, judul, dan cerita singkat mino.mi store.</p>
      </div>
      <span v-if="saved" class="admin-btn admin-btn-secondary">Tersimpan</span>
    </div>

    <form class="admin-form" @submit.prevent="save">
      <div class="admin-grid">
        <div class="admin-field">
          <label for="about-eyebrow">Eyebrow</label>
          <input id="about-eyebrow" v-model="draft.eyebrow" class="admin-input" />
        </div>
        <div class="admin-field">
          <label for="about-title">Judul</label>
          <input id="about-title" v-model="draft.title" class="admin-input" />
        </div>
        <div class="admin-field admin-field--full">
          <AdminImageUpload
            id="about-image"
            v-model="draft.image"
            label="URL/path gambar atau upload"
            folder="about"
            @uploading-change="handleUploadingChange"
          />
        </div>
        <div class="admin-field admin-field--full">
          <label for="about-alt">Alt gambar</label>
          <input id="about-alt" v-model="draft.imageAlt" class="admin-input" />
        </div>
        <div class="admin-field admin-field--full">
          <label for="about-story">Cerita toko, pisahkan paragraf dengan baris baru</label>
          <textarea id="about-story" v-model="draft.paragraphsText" class="admin-textarea"></textarea>
        </div>
      </div>

      <div class="admin-actions">
        <button class="admin-btn admin-btn-primary" type="submit" :disabled="uploadCount > 0">
          {{ uploadCount > 0 ? 'Mengupload...' : 'Simpan' }}
        </button>
      </div>
    </form>
  </section>
</template>
