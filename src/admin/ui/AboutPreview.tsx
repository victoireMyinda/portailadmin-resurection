import { useWatch } from 'react-hook-form'
import { Box, Button, Typography, alpha } from '@mui/material'
import { ArrowRight } from 'lucide-react'
import { parishColors } from '../../theme/parishTheme'
import type { HomeAboutRecord } from '../../types'

type AboutPreviewDisplayProps = Partial<HomeAboutRecord> & {
  showCaption?: boolean
}

export function AboutPreviewDisplay({
  imageUrl,
  title,
  presentation,
  historySummary,
  readMorePath,
  showCaption = true,
}: AboutPreviewDisplayProps) {
  return (
    <Box
      sx={{
        borderRadius: 3,
        border: '1px solid',
        borderColor: alpha(parishColors.royal, 0.12),
        bgcolor: alpha(parishColors.muted, 0.5),
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(13,71,161,0.06)',
      }}
    >
      {showCaption && (
        <Typography
          variant="caption"
          sx={{
            display: 'block',
            px: 2.5,
            pt: 2,
            pb: 1,
            fontWeight: 700,
            color: parishColors.mutedForeground,
            bgcolor: '#fff',
          }}
        >
          Aperçu — À propos de la paroisse (page d’accueil)
        </Typography>
      )}

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 2.5,
          p: 2.5,
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: '"Playfair Display", serif' }}>
            {title || 'À propos de notre paroisse'}
          </Typography>
          {presentation && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5, lineHeight: 1.65 }}>
              {presentation}
            </Typography>
          )}
          {historySummary && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1.25, lineHeight: 1.65 }}>
              {historySummary}
            </Typography>
          )}
          <Button
            size="small"
            variant="contained"
            color="primary"
            endIcon={<ArrowRight size={14} />}
            sx={{ mt: 2, borderRadius: 2, fontWeight: 700 }}
          >
            Lire la suite
          </Button>
          {readMorePath && (
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.75 }}>
              → {readMorePath}
            </Typography>
          )}
        </Box>
        <Box
          component="img"
          src={imageUrl || undefined}
          alt=""
          sx={{
            width: '100%',
            minHeight: 180,
            borderRadius: 3,
            objectFit: 'cover',
            bgcolor: alpha(parishColors.muted, 0.8),
          }}
        />
      </Box>
    </Box>
  )
}

export function AboutPreviewLive() {
  const imageUrl = useWatch({ name: 'imageUrl' }) as string | undefined
  const title = useWatch({ name: 'title' }) as string | undefined
  const presentation = useWatch({ name: 'presentation' }) as string | undefined
  const historySummary = useWatch({ name: 'historySummary' }) as string | undefined
  const readMorePath = useWatch({ name: 'readMorePath' }) as string | undefined

  return (
    <AboutPreviewDisplay
      imageUrl={imageUrl}
      title={title}
      presentation={presentation}
      historySummary={historySummary}
      readMorePath={readMorePath}
    />
  )
}
