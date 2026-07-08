import { ref } from 'vue'
import { defaultSiteContent } from '../data/siteContent'

const STORAGE_KEY = 'minomi-site-content'

const clone = (value) => JSON.parse(JSON.stringify(value))

const publicImageMap = {
  'product-anessa': '/images/product-anessa.png',
  'product-azarine': '/images/product-azarine.png',
  'product-derma-angel': '/images/product-derma-angel.png',
  'product-elsheskin': '/images/product-elsheskin.png',
  'bestseller-wardah': '/images/bestseller-wardah.png',
  'bestseller-matte-cushion': '/images/bestseller-matte-cushion.png',
  'bestseller-glad2glow': '/images/bestseller-glad2glow.png',
  'storefront-minomi': '/images/storefront-minomi.png',
}

const normalizeImagePath = (image) => {
  if (!image || /^https?:\/\//.test(image) || image.startsWith('/images/')) return image

  const match = Object.entries(publicImageMap).find(([name]) => image.includes(name))
  return match ? match[1] : image
}

const normalizeImages = (siteContent) => {
  const nextContent = clone(siteContent)

  nextContent.products = (nextContent.products || []).map((item) => ({
    ...item,
    image: normalizeImagePath(item.image),
  }))

  nextContent.bestSellers = (nextContent.bestSellers || []).map((item) => ({
    ...item,
    image: normalizeImagePath(item.image),
  }))

  if (nextContent.about) {
    nextContent.about.image = normalizeImagePath(nextContent.about.image)
  }

  return nextContent
}

const readStorage = () => {
  if (typeof window === 'undefined') return normalizeImages(defaultSiteContent)

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    const siteContent = saved ? { ...clone(defaultSiteContent), ...JSON.parse(saved) } : clone(defaultSiteContent)
    const normalizedContent = normalizeImages(siteContent)

    if (saved) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizedContent))
    }

    return normalizedContent
  } catch {
    return normalizeImages(defaultSiteContent)
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
