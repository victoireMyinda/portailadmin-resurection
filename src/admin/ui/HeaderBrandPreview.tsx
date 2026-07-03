import { useWatch } from 'react-hook-form'
import { Box, Typography, alpha } from '@mui/material'
import { parishColors } from '../../theme/parishTheme'

type HeaderBrandPreviewDisplayProps = {
  imageUrl?: string
  primaryTitle?: string
  secondaryTitle?: string
  showCaption?: boolean
}

/** Aperçu statique — utilisable hors formulaire (liste, cartes). */
export function HeaderBrandPreviewDisplay({
  imageUrl,
  primaryTitle,
  secondaryTitle,
  showCaption = true,
}: HeaderBrandPreviewDisplayProps) {
  return (
    <Box
      sx={{
        p: 2.5,
        borderRadius: 3,
        border: '1px solid',
        borderColor: alpha(parishColors.royal, 0.12),
        bgcolor: '#fff',
        boxShadow: '0 4px 20px rgba(13,71,161,0.06)',
      }}
    >
      {showCaption && (
        <Typography
          variant="caption"
          sx={{
            fontWeight: 700,
            letterSpacing: 0.5,
            color: parishColors.mutedForeground,
            mb: 2,
            display: 'block',
          }}
        >
          Aperçu — en-tête du portail public
        </Typography>
      )}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          px: 2,
          py: 1.5,
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
          bgcolor: alpha(parishColors.royal, 0.02),
        }}
      >
        <Box
          component="img"
          src={imageUrl || undefined}
          alt=""
          sx={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            objectFit: 'cover',
            flexShrink: 0,
            border: `2px solid ${alpha(parishColors.gold, 0.55)}`,
            bgcolor: alpha(parishColors.muted, 0.5),
          }}
        />
        <Box sx={{ minWidth: 0 }}>
          <Typography
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 14,
              fontWeight: 700,
              lineHeight: 1.25,
              color: parishColors.royal,
            }}
          >
            {primaryTitle || '—'}
          </Typography>
          <Typography sx={{ fontSize: 12, color: parishColors.mutedForeground, mt: 0.25, lineHeight: 1.3 }}>
            {secondaryTitle || '—'}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

/** Aperçu en direct — uniquement dans un formulaire React Admin. */
export function HeaderBrandPreviewLive() {
  const imageUrl = useWatch({ name: 'imageUrl' }) as string | undefined
  const primaryTitle = useWatch({ name: 'primaryTitle' }) as string | undefined
  const secondaryTitle = useWatch({ name: 'secondaryTitle' }) as string | undefined

  return (
    <HeaderBrandPreviewDisplay
      imageUrl={imageUrl}
      primaryTitle={primaryTitle || 'Titre principal'}
      secondaryTitle={secondaryTitle || 'Titre secondaire'}
    />
  )
}
