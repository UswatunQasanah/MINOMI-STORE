<script setup>
import AdminArrayEditor from '../components/AdminArrayEditor.vue'

const fields = [
  { name: 'question', label: 'Pertanyaan' },
  { name: 'answer', label: 'Jawaban', type: 'textarea' },
]

const emptyItem = {
  question: '',
  answer: '',
}
</script>

<template>
  <AdminArrayEditor
    title="Edit FAQ"
    description="Kelola pertanyaan dan jawaban yang muncul di section FAQ."
    section-key="faqs"
    primary-field="question"
    secondary-field="answer"
    :fields="fields"
    :empty-item="emptyItem"
  />
</template>
