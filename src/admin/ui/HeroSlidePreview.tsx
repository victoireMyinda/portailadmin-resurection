import { useWatch } from 'react-hook-form'
import { Box, Button, Typography, alpha } from '@mui/material'
import { parishColors } from '../../theme/parishTheme'
import type { HomeHeroSlideRecord } from '../../types'

type HeroSlidePreviewDisplayProps = Partial<HomeHeroSlideRecord> & {
  showCaption?: boolean
  compact?: boolean
}

export function HeroSlidePreviewDisplay({
  imageUrl,
  title,
  titleLine2,
  description,
  ctaLabel,
  featured,
  showCaption = true,
  compact = false,
}: HeroSlidePreviewDisplayProps) {
  return (
    <Box
      sx={{
        borderRadius: 3,
        border: '1px solid',
        borderColor: alpha(parishColors.royal, 0.12),
        overflow: 'hidden',
        bgcolor: '#0a1628',
        boxShadow: '0 4px 20px rgba(13,71,161,0.1)',
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
            color: parishColors.mutedForeground,
            bgcolor: '#fff',
          }}
        >
          Aperçu — carousel d’accueil (hero)
        </Typography>
      )}

      <Box
        sx={{
          position: 'relative',
          minHeight: compact ? 200 : 280,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: '#fff',
          px: 3,
          py: compact ? 3 : 5,
        }}
      >
        {imageUrl ? (
          <Box
            component="img"
            src={imageUrl}
            alt=""
            sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : null}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(180deg, ${alpha(parishColors.royal, 0.4)} 0%, ${alpha('#0a1628', 0.85)} 100%)`,
          }}
        />
        <Box sx={{ position: 'relative', zIndex: 1, maxWidth: 520 }}>
          {featured ? (
            <Typography
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontSize: compact ? 22 : 28,
                fontWeight: 700,
                lineHeight: 1.15,
                textShadow: '0 2px 16px rgba(0,0,0,0.4)',
              }}
            >
              {title || 'Titre principal'}
              {titleLine2 && (
                <>
                  <br />
                  <Box component="span" sx={{ color: parishColors.gold }}>
                    {titleLine2}
                  </Box>
                </>
              )}
            </Typography>
          ) : (
            <Typography
              sx={{
                fontSize: compact ? 20 : 24,
                fontWeight: 700,
                lineHeight: 1.2,
                textShadow: '0 2px 16px rgba(0,0,0,0.4)',
              }}
            >
              {title || 'Titre de la bannière'}
            </Typography>
          )}
          {description && (
            <Typography sx={{ mt: 1.5, fontSize: compact ? 13 : 15, opacity: 0.92, lineHeight: 1.5 }}>
              {description}
            </Typography>
          )}
          {ctaLabel && !compact && (
            <Button
              variant="contained"
              size="small"
              sx={{
                mt: 2.5,
                bgcolor: parishColors.gold,
                color: '#1a1a1a',
                fontWeight: 700,
                borderRadius: 2,
                '&:hover': { bgcolor: parishColors.goldLight },
              }}
            >
              {ctaLabel}
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export function HeroSlidePreviewLive() {
  const imageUrl = useWatch({ name: 'imageUrl' }) as string | undefined
  const title = useWatch({ name: 'title' }) as string | undefined
  const titleLine2 = useWatch({ name: 'titleLine2' }) as string | undefined
  const description = useWatch({ name: 'description' }) as string | undefined
  const ctaLabel = useWatch({ name: 'ctaLabel' }) as string | undefined
  const featured = useWatch({ name: 'featured' }) as boolean | undefined

  return (
    <HeroSlidePreviewDisplay
      imageUrl={imageUrl}
      title={title}
      titleLine2={titleLine2}
      description={description}
      ctaLabel={ctaLabel}
      featured={featured}
    />
  )
}
