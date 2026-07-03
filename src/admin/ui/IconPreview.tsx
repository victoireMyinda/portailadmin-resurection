import { useWatch } from 'react-hook-form'
import { Box, Typography, alpha } from '@mui/material'
import { ImageIcon } from 'lucide-react'
import { parishColors } from '../../theme/parishTheme'

export function IconPreview({ source }: { source: string }) {
  const value = useWatch({ name: source }) as string | undefined

  return (
    <Box
      sx={{
        mt: 1,
        p: 2.5,
        borderRadius: 3,
        border: '1px solid',
        borderColor: alpha(parishColors.royal, 0.12),
        bgcolor: alpha(parishColors.royal, 0.03),
        display: 'flex',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <Box
        sx={{
          width: 72,
          height: 72,
          borderRadius: 2.5,
          bgcolor: '#fff',
          border: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        {value ? (
          <Box
            component="img"
            src={value}
            alt="Aperçu"
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              e.currentTarget.style.display = 'none'
            }}
            sx={{ width: 40, height: 40, objectFit: 'contain' }}
          />
        ) : (
          <ImageIcon size={28} color={parishColors.mutedForeground} />
        )}
      </Box>
      <Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: parishColors.royal }}>
          Aperçu de l&apos;icône
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.25 }}>
          {value ? 'Rendu tel qu’affiché sur le portail' : 'Saisissez une URL pour voir l’aperçu'}
        </Typography>
      </Box>
    </Box>
  )
}
