type CompressOptions = {
  maxWidth?: number
  maxHeight?: number
  quality?: number
  mimeType?: string
}

export async function compressImageFile(
  file: File,
  { maxWidth = 1600, maxHeight = 1600, quality = 0.82, mimeType = 'image/webp' }: CompressOptions = {},
): Promise<Blob> {
  const bitmap = await createImageBitmap(file)
  const ratio = Math.min(maxWidth / bitmap.width, maxHeight / bitmap.height, 1)
  const width = Math.max(1, Math.round(bitmap.width * ratio))
  const height = Math.max(1, Math.round(bitmap.height * ratio))

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    bitmap.close()
    throw new Error('Impossible de compresser l\'image')
  }
  ctx.drawImage(bitmap, 0, 0, width, height)
  bitmap.close()

  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, mimeType, quality)
  })
  if (!blob) throw new Error('Compression de l\'image échouée')
  return blob
}

export async function compressImagePair(file: File): Promise<{ full: Blob; thumb: Blob }> {
  const [full, thumb] = await Promise.all([
    compressImageFile(file, { maxWidth: 1600, maxHeight: 1600, quality: 0.82 }),
    compressImageFile(file, { maxWidth: 480, maxHeight: 480, quality: 0.75 }),
  ])
  return { full, thumb }
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} o`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} Ko`
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`
}
