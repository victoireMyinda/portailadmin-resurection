import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { auth, storage } from '../../firebase/app'
import { compressImagePair, formatBytes } from './compress-image'

export type UploadPhotoResult = {
  imageUrl: string
  thumbnailUrl: string
  originalSize: number
  compressedSize: number
  storage: 'firebase' | 'inline'
}

const MAX_INLINE_DATA_URL_CHARS = 900_000

async function ensureStorageAuth(): Promise<void> {
  const user = auth.currentUser
  if (!user) {
    throw new Error('Session expirée — reconnectez-vous pour importer une photo.')
  }
  await user.getIdToken(true)
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(new Error('Lecture du fichier impossible'))
    reader.readAsDataURL(blob)
  })
}

function isStorageTransportError(error: unknown): boolean {
  const message = String((error as { message?: string })?.message ?? error ?? '').toLowerCase()
  const code = String((error as { code?: string })?.code ?? '')
  return (
    message.includes('cors') ||
    message.includes('network') ||
    message.includes('failed') ||
    message.includes('storage') ||
    code.startsWith('storage/') ||
    code === 'storage/unauthorized' ||
    code === 'storage/unknown'
  )
}

async function uploadToFirebaseStorage(
  photoId: string,
  full: Blob,
  thumb: Blob,
): Promise<{ imageUrl: string; thumbnailUrl: string }> {
  const safeId = photoId.replace(/[^a-zA-Z0-9_-]/g, '_')
  const fullRef = ref(storage, `media/photos/${safeId}/full.webp`)
  const thumbRef = ref(storage, `media/photos/${safeId}/thumb.webp`)

  await uploadBytes(fullRef, full, { contentType: 'image/webp' })
  await uploadBytes(thumbRef, thumb, { contentType: 'image/webp' })

  return {
    imageUrl: await getDownloadURL(fullRef),
    thumbnailUrl: await getDownloadURL(thumbRef),
  }
}

async function storeInline(full: Blob, thumb: Blob): Promise<{ imageUrl: string; thumbnailUrl: string }> {
  const [imageUrl, thumbnailUrl] = await Promise.all([blobToDataUrl(full), blobToDataUrl(thumb)])

  if (imageUrl.length > MAX_INLINE_DATA_URL_CHARS) {
    throw new Error(
      'Image trop volumineuse après compression. Activez Firebase Storage (npm run firebase:setup-storage).',
    )
  }

  return { imageUrl, thumbnailUrl }
}

export async function uploadCompressedPhoto(photoId: string, file: File): Promise<UploadPhotoResult> {
  const { full, thumb } = await compressImagePair(file)
  const originalSize = file.size
  const compressedSize = full.size + thumb.size

  await ensureStorageAuth()

  try {
    const urls = await uploadToFirebaseStorage(photoId, full, thumb)
    return { ...urls, originalSize, compressedSize, storage: 'firebase' }
  } catch (error) {
    console.warn('[upload-media] Firebase Storage indisponible, repli inline.', error)

    if (!isStorageTransportError(error)) {
      throw error instanceof Error ? error : new Error('Import de la photo impossible.')
    }

    const urls = await storeInline(full, thumb)
    return { ...urls, originalSize, compressedSize, storage: 'inline' }
  }
}

export function uploadSummary(originalSize: number, compressedSize: number): string {
  const saved = Math.max(0, originalSize - compressedSize)
  const pct = originalSize > 0 ? Math.round((saved / originalSize) * 100) : 0
  return `${formatBytes(originalSize)} → ${formatBytes(compressedSize)} (−${pct}%)`
}
