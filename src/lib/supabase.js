import { createClient } from '@supabase/supabase-js'

const rawSupabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const normalizeSupabaseUrl = (url) => {
  if (!url) return ''

  try {
    return new URL(url).origin
  } catch {
    return url
      .replace(/\/rest\/v1\/?$/i, '')
      .replace(/\/storage\/v1\/?$/i, '')
      .replace(/\/+$/g, '')
  }
}

const supabaseUrl = normalizeSupabaseUrl(rawSupabaseUrl)

export const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey)

export const supabase = hasSupabaseConfig
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export const SUPABASE_IMAGE_BUCKET = 'landing-images'

const MAX_IMAGE_SIZE = 2 * 1024 * 1024

const sanitizeFileName = (name) => {
  const baseName = name
    .toLowerCase()
    .replace(/\.[^/.]+$/, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)

  return baseName || 'image'
}

const sanitizeFolder = (folder) => folder
  .toLowerCase()
  .replace(/^\/+|\/+$/g, '')
  .replace(/[^a-z0-9-]/g, '-')
  .replace(/-+/g, '-')
  || 'uploads'

const getExtension = (file) => {
  const extension = file.name.split('.').pop()?.toLowerCase()
  return extension || file.type.split('/').pop() || 'png'
}

export async function uploadImageToSupabase(file, folder) {
  if (!file) {
    throw new Error('Pilih gambar terlebih dahulu.')
  }

  if (!file.type.startsWith('image/')) {
    throw new Error('File harus berupa gambar.')
  }

  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error('Ukuran gambar maksimal 2MB.')
  }

  if (!hasSupabaseConfig || !supabase) {
    throw new Error('Konfigurasi Supabase belum tersedia. Cek VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY.')
  }

  const safeFolder = sanitizeFolder(folder)
  const extension = getExtension(file)
  const randomId = crypto.randomUUID?.().slice(0, 8) || Math.random().toString(36).slice(2, 10)
  const fileName = `${Date.now()}-${randomId}-${sanitizeFileName(file.name)}.${extension}`
  const filePath = `${safeFolder}/${fileName}`

  const { error } = await supabase.storage
    .from(SUPABASE_IMAGE_BUCKET)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type,
    })

  if (error) {
    throw new Error(error.message || 'Upload ke Supabase gagal.')
  }

  const { data } = supabase.storage
    .from(SUPABASE_IMAGE_BUCKET)
    .getPublicUrl(filePath)

  if (!data?.publicUrl) {
    throw new Error('Public URL gambar tidak berhasil dibuat.')
  }

  return data.publicUrl
}
