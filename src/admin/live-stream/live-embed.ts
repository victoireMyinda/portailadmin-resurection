import { parseYoutubeId, resolveYoutubeUrls } from '../media/youtube'

export function isYoutubePlatform(platformId?: string): boolean {
  if (!platformId) return true
  return platformId.toLowerCase() === 'youtube'
}

export function resolveYoutubeEmbedFromUrl(input: string, autoplay = false): string {
  const id = parseYoutubeId(input)
  const invalid = new Set(['live', 'shorts', 'watch', 'embed', 'channel', 'playlist'])
  if (!id || id.includes('/') || id.startsWith('@') || invalid.has(id.toLowerCase())) return ''
  const base = resolveYoutubeUrls(id).embedUrl
  if (!base) return ''
  return autoplay ? `${base}?autoplay=1` : base
}

export function resolveLiveEmbedUrl(
  watchUrl: string,
  embedUrl: string,
  platformId?: string,
  options?: { autoplay?: boolean },
): string {
  const current = embedUrl.trim()
  if (current) return current
  if (!isYoutubePlatform(platformId)) return ''
  return resolveYoutubeEmbedFromUrl(watchUrl, options?.autoplay ?? false)
}

export function normalizeLiveStreamPlatformRecord<T extends Record<string, unknown>>(record: T): T {
  const platformId = String(record.id ?? '')
  const watchUrl = String(record.watchUrl ?? '')
  const isLive = Boolean(record.isLive)
  const embedUrl = resolveLiveEmbedUrl(
    watchUrl,
    String(record.embedUrl ?? ''),
    platformId,
    { autoplay: isLive },
  )
  return { ...record, embedUrl }
}

export function normalizeLiveStreamSettingsRecord<T extends Record<string, unknown>>(record: T): T {
  const watchUrl = String(record.featuredWatchUrl ?? '')
  const featuredEmbedUrl = resolveLiveEmbedUrl(
    watchUrl,
    String(record.featuredEmbedUrl ?? ''),
    'youtube',
  )
  return { ...record, featuredEmbedUrl }
}
