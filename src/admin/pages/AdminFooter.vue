<script setup>
import { ref } from 'vue'
import { useSiteContent } from '../../composables/useSiteContent'

const { content, updateSection } = useSiteContent()
const clone = (value) => JSON.parse(JSON.stringify(value))
const draft = ref(clone(content.value.footer))
const linkDraft = ref({ label: '', href: '' })
const editingIndex = ref(null)
const saved = ref(false)

const saveFooter = () => {
  updateSection('footer', draft.value)
  saved.value = true
  window.setTimeout(() => {
    saved.value = false
  }, 1600)
}

const clearLinkForm = () => {
  linkDraft.value = { label: '', href: '' }
  editingIndex.value = null
}

const saveLink = () => {
  if (editingIndex.value === null) {
    draft.value.links.push({ ...linkDraft.value })
  } else {
    draft.value.links[editingIndex.value] = { ...linkDraft.value }
  }
  updateSection('footer', draft.value)
  clearLinkForm()
}

const editLink = (link, index) => {
  linkDraft.value = { ...link }
  editingIndex.value = index
}

const removeLink = (index) => {
  draft.value.links = draft.value.links.filter((_, itemIndex) => itemIndex !== index)
  updateSection('footer', draft.value)
  if (editingIndex.value === index) clearLinkForm()
}
</script>

<template>
  <section class="admin-panel">
    <div class="admin-section-head">
      <div>
        <h2>Edit Footer</h2>
        <p>Ubah teks footer dan daftar link halaman.</p>
      </div>
      <span v-if="saved" class="admin-btn admin-btn-secondary">Tersimpan</span>
    </div>

    <form class="admin-form" @submit.prevent="saveFooter">
      <div class="admin-grid">
        <div class="admin-field">
          <label for="footer-title">Judul footer</label>
          <input id="footer-title" v-model="draft.title" class="admin-input" />
        </div>
        <div class="admin-field">
          <label for="footer-note">Catatan kanan bawah</label>
          <input id="footer-note" v-model="draft.note" class="admin-input" />
        </div>
        <div class="admin-field admin-field--full">
          <label for="footer-description">Deskripsi</label>
          <textarea id="footer-description" v-model="draft.description" class="admin-textarea"></textarea>
        </div>
        <div class="admin-field admin-field--full">
          <label for="footer-copyright">Copyright</label>
          <input id="footer-copyright" v-model="draft.copyright" class="admin-input" />
        </div>
      </div>

      <div class="admin-actions">
        <button class="admin-btn admin-btn-primary" type="submit">Simpan Footer</button>
      </div>
    </form>
  </section>

  <section class="admin-panel">
    <div class="admin-section-head">
      <div>
        <h2>Link Footer</h2>
        <p>Tambah, edit, atau hapus urutan link di footer.</p>
      </div>
    </div>

    <form class="admin-form" @submit.prevent="saveLink">
      <div class="admin-grid">
        <div class="admin-field">
          <label for="footer-link-label">Label link</label>
          <input id="footer-link-label" v-model="linkDraft.label" class="admin-input" />
        </div>
        <div class="admin-field">
          <label for="footer-link-href">Tujuan link</label>
          <input id="footer-link-href" v-model="linkDraft.href" class="admin-input" />
        </div>
      </div>
      <div class="admin-actions">
        <button class="admin-btn admin-btn-primary" type="submit">
          {{ editingIndex === null ? 'Tambah' : 'Simpan Edit' }}
        </button>
        <button class="admin-btn admin-btn-secondary" type="button" @click="clearLinkForm">Kosongkan</button>
      </div>
    </form>

    <div class="admin-list">
      <article v-for="(link, index) in draft.links" :key="`${link.href}-${index}`" class="admin-list-item">
        <div>
          <strong>{{ link.label }}</strong>
          <span>{{ link.href }}</span>
        </div>
        <div class="admin-actions">
          <button class="admin-btn admin-btn-secondary" type="button" @click="editLink(link, index)">Edit</button>
          <button class="admin-btn admin-btn-danger" type="button" @click="removeLink(index)">Hapus</button>
        </div>
      </article>
    </div>
  </section>
</template>
