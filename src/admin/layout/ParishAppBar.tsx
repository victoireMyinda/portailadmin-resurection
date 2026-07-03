import { AppBar, TitlePortal, UserMenu, Logout, MenuItemLink } from 'react-admin'
import { Box, Typography, alpha } from '@mui/material'
import { Settings } from 'lucide-react'
import { parishColors } from '../../theme/parishTheme'

export function ParishAppBar() {
  return (
    <AppBar
      color="inherit"
      elevation={0}
      userMenu={
        <UserMenu>
          <MenuItemLink to="/settings" primaryText="Paramètres" leftIcon={<Settings size={18} />} />
          <Logout />
        </UserMenu>
      }
      sx={{
        '& .RaAppBar-toolbar': {
          minHeight: 60,
          px: { xs: 2, md: 3 },
        },
        '& .RaUserMenu-avatar': {
          bgcolor: alpha(parishColors.royal, 0.08),
          color: parishColors.royal,
          fontWeight: 700,
        },
        '& .MuiTypography-root.RaConfigurable-root': {
          fontFamily: '"Inter", sans-serif',
          fontWeight: 600,
          fontSize: '0.9375rem',
          color: parishColors.mutedForeground,
        },
      }}
    >
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <TitlePortal />
      </Box>
      <Typography
        variant="caption"
        sx={{
          display: { xs: 'none', md: 'block' },
          color: parishColors.mutedForeground,
          fontWeight: 500,
          mr: 1,
        }}
      >
        Portail paroissial
      </Typography>
    </AppBar>
  )
}
