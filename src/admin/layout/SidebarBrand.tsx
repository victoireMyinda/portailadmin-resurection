import { Box, Typography } from '@mui/material'
import parishLogo from '@frontuser/assets/paroisse.webp'
import { design } from '../../theme/design-tokens'
import { parishColors } from '../../theme/parishTheme'

export function SidebarBrand() {
  return (
    <Box
      sx={{
        px: 2,
        py: 2.5,
        mb: 0.5,
        borderBottom: `1px solid ${design.sidebarBorder}`,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box
          component="img"
          src={parishLogo}
          alt="Paroisse"
          sx={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            objectFit: 'cover',
            border: `2px solid ${parishColors.gold}`,
            flexShrink: 0,
          }}
        />
        <Box sx={{ minWidth: 0 }}>
          <Typography
            sx={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontWeight: 700,
              fontSize: '0.9rem',
              lineHeight: 1.25,
              color: design.sidebarTextActive,
            }}
          >
            Résurrection
          </Typography>
          <Typography
            sx={{
              fontSize: '0.65rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: design.sidebarTextMuted,
              mt: 0.25,
            }}
          >
            Administration
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
