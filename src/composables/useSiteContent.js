import { ref } from 'vue'
import { defaultSiteContent } from '../data/siteContent'

const STORAGE_KEY = 'minomi-site-content'

const clone = (value) => JSON.parse(JSON.stringify(value))

const readStorage = () => {
  if (typeof window === 'undefined') return clone(defaultSiteContent)

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    return saved ? { ...clone(defaultSiteContent), ...JSON.parse(saved) } : clone(defaultSiteContent)
  } catch {
    return clone(defaultSiteContent)
  }
}

const content = ref(readStorage())

const persist = () => {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content.value))
}

const replaceContent = (nextContent) => {
  content.value = clone(nextContent)
  persist()
}

export function useSiteContent() {
  const saveContent = () => persist()

  const resetContent = () => {
    replaceContent(defaultSiteContent)
  }

  const updateSection = (section, value) => {
    content.value[section] = clone(value)
    persist()
  }

  const updateField = (section, field, value) => {
    content.value[section] = {
      ...content.value[section],
      [field]: value,
    }
    persist()
  }

  const addItem = (section, item) => {
    content.value[section] = [...(content.value[section] || []), clone(item)]
    persist()
  }

  const updateItem = (section, index, item) => {
    const items = [...(content.value[section] || [])]
    items[index] = clone(item)
    content.value[section] = items
    persist()
  }

  const removeItem = (section, index) => {
    content.value[section] = (content.value[section] || []).filter((_, itemIndex) => itemIndex !== index)
    persist()
  }

  return {
    content,
    saveContent,
    resetContent,
    updateSection,
    updateField,
    addItem,
    updateItem,
    removeItem,
  }
}
