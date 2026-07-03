import type { ReactNode } from 'react'
import { Box, Card, Typography, alpha } from '@mui/material'
import { parishColors } from '../../theme/parishTheme'

export function EmptyState({
  title,
  description,
  icon,
  action,
}: {
  title: string
  description: string
  icon: ReactNode
  action?: ReactNode
}) {
  return (
    <Card
      sx={{
        borderRadius: 4,
        py: { xs: 6, md: 8 },
        px: 3,
        textAlign: 'center',
        border: '2px dashed',
        borderColor: alpha(parishColors.royal, 0.15),
        bgcolor: alpha(parishColors.royal, 0.02),
      }}
    >
      <Box
        sx={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          mx: 'auto',
          mb: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#fff',
          color: parishColors.gold,
          boxShadow: `0 8px 24px ${alpha(parishColors.royal, 0.08)}`,
        }}
      >
        {icon}
      </Box>
      <Typography variant="h6" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 700 }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1, maxWidth: 400, mx: 'auto', lineHeight: 1.6 }}>
        {description}
      </Typography>
      {action && <Box sx={{ mt: 3 }}>{action}</Box>}
    </Card>
  )
}
