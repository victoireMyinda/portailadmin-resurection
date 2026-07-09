import { Box, Typography } from '@mui/material'
import { useWatch } from 'react-hook-form'
import { parseYoutubeId, resolveYoutubeUrls } from '../media/youtube'

export function MediaVideoPreviewLive() {
  const rawId = useWatch<{ youtubeId?: string }>({ name: 'youtubeId' })
  const rawVideoUrl = useWatch<{ videoUrl?: string }>({ name: 'videoUrl' })
  const rawThumbnailUrl = useWatch<{ thumbnailUrl?: string }>({ name: 'thumbnailUrl' })
  const rawSource = useWatch<{ videoSource?: string }>({ name: 'videoSource' })
  const youtubeId = parseYoutubeId(String(rawId ?? ''))
  const videoUrl = String(rawVideoUrl ?? '').trim()
  const thumbnailUrl = String(rawThumbnailUrl ?? '').trim()
  const videoSource = rawSource === 'upload' || rawSource === 'url' ? rawSource : 'youtube'
  const { thumbnail, embedUrl } = resolveYoutubeUrls(youtubeId)

  if (videoSource === 'youtube' && !youtubeId) {
    return (
      <Typography variant="body2" color="text.secondary">
        Saisissez un ID ou lien YouTube pour prévisualiser la vidéo.
      </Typography>
    )
  }

  if (videoSource !== 'youtube' && !videoUrl) {
    return (
      <Typography variant="body2" color="text.secondary">
        Ajoutez un lien direct ou téléversez une vidéo pour prévisualiser le média.
      </Typography>
    )
  }

  return (
    <Box sx={{ borderRadius: 3, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
      {videoSource === 'youtube' && embedUrl ? (
        <Box sx={{ position: 'relative', aspectRatio: '16/9', bgcolor: '#000' }}>
          <Box
            component="iframe"
            src={embedUrl}
            title="Aperçu YouTube"
            sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Box>
      ) : videoSource !== 'youtube' && videoUrl ? (
        <Box sx={{ bgcolor: '#000' }}>
          {thumbnailUrl ? (
            <Box component="img" src={thumbnailUrl} alt="" sx={{ width: '100%', display: 'block', maxHeight: 220, objectFit: 'cover' }} />
          ) : (
            <Box component="video" src={videoUrl} controls sx={{ width: '100%', display: 'block', maxHeight: 320 }} />
          )}
        </Box>
      ) : (
        thumbnail && (
          <Box component="img" src={thumbnail} alt="" sx={{ width: '100%', display: 'block' }} />
        )
      )}
      <Box sx={{ p: 2, bgcolor: '#f8fafc' }}>
        <Typography variant="caption" color="text.secondary">
          {videoSource === 'youtube'
            ? `ID : ${youtubeId} — lecture via lien YouTube`
            : `Lecture directe depuis ${videoSource === 'upload' ? 'Firebase Storage' : 'une URL externe'}`}
        </Typography>
      </Box>
    </Box>
  )
}
