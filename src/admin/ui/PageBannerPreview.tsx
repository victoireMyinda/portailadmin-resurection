import { useWatch } from 'react-hook-form'
import { Box, Typography, alpha } from '@mui/material'
import { parishColors } from '../../theme/parishTheme'

type PageBannerPreviewDisplayProps = {
  imageUrl?: string
  title?: string
  description?: string
  pagePath?: string
  showCaption?: boolean
  compact?: boolean
}

/** Aperçu statique — bannière de page (hors formulaire). */
export function PageBannerPreviewDisplay({
  imageUrl,
  title,
  description,
  pagePath,
  showCaption = true,
  compact = false,
}: PageBannerPreviewDisplayProps) {
  return (
    <Box
      sx={{
        borderRadius: 3,
        border: '1px solid',
        borderColor: alpha(parishColors.royal, 0.12),
        overflow: 'hidden',
        bgcolor: '#fff',
        boxShadow: '0 4px 20px rgba(13,71,161,0.06)',
      }}
    >
      {showCaption && (
        <Typography
          variant="caption"
          sx={{
            display: 'block',
            px: 2,
            pt: 2,
            pb: 1,
            fontWeight: 700,
            letterSpacing: 0.5,
            color: parishColors.mutedForeground,
          }}
        >
          Aperçu — bannière du portail public
          {pagePath ? ` · ${pagePath}` : ''}
        </Typography>
      )}

      <Box
        sx={{
          position: 'relative',
          mx: showCaption ? 2 : 0,
          mb: showCaption ? 2 : 0,
          borderRadius: showCaption ? 2 : 0,
          overflow: 'hidden',
          minHeight: compact ? 120 : 160,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: '#fff',
        }}
      >
        {imageUrl ? (
          <Box
            component="img"
            src={imageUrl}
            alt=""
            sx={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <Box sx={{ position: 'absolute', inset: 0, bgcolor: parishColors.royal }} />
        )}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(180deg, ${alpha(parishColors.royal, 0.55)} 0%, ${alpha('#0a1628', 0.75)} 100%)`,
          }}
        />
        <Box sx={{ position: 'relative', zIndex: 1, px: 3, py: compact ? 2 : 3, maxWidth: 480 }}>
          <Typography
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontSize: compact ? 18 : 22,
              fontWeight: 700,
              lineHeight: 1.2,
              textShadow: '0 2px 12px rgba(0,0,0,0.35)',
            }}
          >
            {title || 'Titre de la bannière'}
          </Typography>
          {description && (
            <Typography
              sx={{
                mt: 1,
                fontSize: compact ? 12 : 14,
                lineHeight: 1.45,
                opacity: 0.92,
                textShadow: '0 1px 8px rgba(0,0,0,0.3)',
              }}
            >
              {description}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  )
}

/** Aperçu en direct — uniquement dans un formulaire React Admin. */
export function PageBannerPreviewLive() {
  const imageUrl = useWatch({ name: 'imageUrl' }) as string | undefined
  const title = useWatch({ name: 'title' }) as string | undefined
  const description = useWatch({ name: 'description' }) as string | undefined
  const pagePath = useWatch({ name: 'pagePath' }) as string | undefined

  return (
    <PageBannerPreviewDisplay
      imageUrl={imageUrl}
      title={title || 'Titre de la bannière'}
      description={description}
      pagePath={pagePath}
    />
  )
}
