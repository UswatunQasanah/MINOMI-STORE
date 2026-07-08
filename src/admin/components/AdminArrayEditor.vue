<script setup>
import { ref } from 'vue'
import { useSiteContent } from '../../composables/useSiteContent'

const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  sectionKey: { type: String, required: true },
  fields: { type: Array, required: true },
  emptyItem: { type: Object, required: true },
  primaryField: { type: String, default: 'title' },
  secondaryField: { type: String, default: 'description' },
})

const { content, addItem, updateItem, removeItem } = useSiteContent()
const clone = (value) => JSON.parse(JSON.stringify(value))
const draft = ref(clone(props.emptyItem))
const editingIndex = ref(null)
const saved = ref(false)

const clearForm = () => {
  draft.value = clone(props.emptyItem)
  editingIndex.value = null
}

const editItem = (item, index) => {
  draft.value = clone(item)
  editingIndex.value = index
}

const save = () => {
  if (editingIndex.value === null) {
    addItem(props.sectionKey, draft.value)
  } else {
    updateItem(props.sectionKey, editingIndex.value, draft.value)
  }

  saved.value = true
  clearForm()
  window.setTimeout(() => {
    saved.value = false
  }, 1600)
}

const deleteItem = (index) => {
  removeItem(props.sectionKey, index)
  if (editingIndex.value === index) clearForm()
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
          <label :for="`${props.sectionKey}-${field.name}`">{{ field.label }}</label>
          <textarea
            v-if="field.type === 'textarea'"
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
        <button class="admin-btn admin-btn-primary" type="submit">
          <i class="fa-solid fa-floppy-disk" aria-hidden="true"></i>
          {{ editingIndex === null ? 'Tambah' : 'Simpan Edit' }}
        </button>
        <button class="admin-btn admin-btn-secondary" type="button" @click="clearForm">
          Kosongkan
        </button>
      </div>
    </form>

    <div class="admin-list">
      <article v-for="(item, index) in content[props.sectionKey]" :key="`${item[props.primaryField]}-${index}`" class="admin-list-item">
        <div>
          <strong>{{ item[props.primaryField] || item.name || item.question || `Item ${index + 1}` }}</strong>
          <span>{{ item[props.secondaryField] || item.description || item.answer || 'Klik Edit untuk mengubah data.' }}</span>
        </div>
        <div class="admin-actions">
          <button class="admin-btn admin-btn-secondary" type="button" @click="editItem(item, index)">Edit</button>
          <button class="admin-btn admin-btn-danger" type="button" @click="deleteItem(index)">Hapus</button>
        </div>
      </article>
    </div>
  </section>
</template>
