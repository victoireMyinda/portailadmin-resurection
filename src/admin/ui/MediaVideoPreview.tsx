import { Box, Typography } from '@mui/material'
import { useWatch } from 'react-hook-form'
import { parseYoutubeId, resolveYoutubeUrls } from '../media/youtube'

export function MediaVideoPreviewLive() {
  const rawId = useWatch<{ youtubeId?: string }>({ name: 'youtubeId' })
  const youtubeId = parseYoutubeId(String(rawId ?? ''))
  const { thumbnail, embedUrl } = resolveYoutubeUrls(youtubeId)

  if (!youtubeId) {
    return (
      <Typography variant="body2" color="text.secondary">
        Saisissez un ID ou lien YouTube pour prévisualiser la vidéo.
      </Typography>
    )
  }

  return (
    <Box sx={{ borderRadius: 3, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
      {embedUrl ? (
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
      ) : (
        thumbnail && (
          <Box component="img" src={thumbnail} alt="" sx={{ width: '100%', display: 'block' }} />
        )
      )}
      <Box sx={{ p: 2, bgcolor: '#f8fafc' }}>
        <Typography variant="caption" color="text.secondary">
          ID : {youtubeId} — lecture via lien YouTube uniquement (pas de fichier vidéo stocké)
        </Typography>
      </Box>
    </Box>
  )
}
