export function resolveYoutubeUrls(youtubeId: string) {
  const id = youtubeId.trim()
  if (!id) {
    return { embedUrl: '', watchUrl: '', thumbnail: '' }
  }
  return {
    embedUrl: `https://www.youtube.com/embed/${id}`,
    watchUrl: `https://www.youtube.com/watch?v=${id}`,
    thumbnail: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
  }
}

export function parseYoutubeId(input: string): string {
  const value = input.trim()
  if (!value) return ''
  if (/^[\w-]{6,}$/.test(value) && !value.includes('/')) return value
  try {
    const url = new URL(value)
    if (url.hostname.includes('youtu.be')) return url.pathname.slice(1).split('/')[0] ?? ''
    if (url.hostname.includes('youtube.com')) {
      const v = url.searchParams.get('v')
      if (v) return v
      const parts = url.pathname.split('/').filter(Boolean)
      const embedIdx = parts.indexOf('embed')
      if (embedIdx >= 0 && parts[embedIdx + 1]) return parts[embedIdx + 1]
      const liveIdx = parts.indexOf('live')
      if (liveIdx >= 0 && parts[liveIdx + 1]) return parts[liveIdx + 1] ?? ''
    }
  } catch {
    return value
  }
  return value
}
