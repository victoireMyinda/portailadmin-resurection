import { Login, LoginForm } from 'react-admin'
import { Box, Typography } from '@mui/material'
import parishLogo from '@frontuser/assets/paroisse.webp'
import { parishColors } from '../theme/parishTheme'
import { design } from '../theme/design-tokens'

export function ParishLoginPage() {
  return (
    <Login
      className="parish-login"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'stretch',
        background: design.canvas,
        '& .RaLogin-main': {
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          alignItems: 'stretch',
          justifyContent: 'center',
          p: 0,
        },
        '& .RaLogin-card': {
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          width: '100%',
          maxWidth: 920,
          minHeight: { md: 520 },
          borderRadius: `${design.radius.xl}px`,
          border: `1px solid ${design.border}`,
          boxShadow: design.shadow.lg,
          overflow: 'hidden',
          m: { xs: 2, md: 3 },
        },
        '& .RaLogin-avatar': { display: 'none' },
        '& .MuiCardContent-root': { p: 0, '&:last-child': { pb: 0 } },
        '& .MuiButton-containedPrimary': {
          background: `linear-gradient(180deg, #1565C0 0%, #0D47A1 100%)`,
          color: '#fff',
          fontWeight: 700,
          borderRadius: `${design.radius.sm}px`,
          py: 1.25,
          '&:hover': {
            background: `linear-gradient(180deg, #0D47A1 0%, #0a3d8f 100%)`,
          },
        },
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          justifyContent: 'center',
          p: 5,
          background: design.sidebarGradient,
          color: '#fff',
        }}
      >
        <Box
          component="img"
          src={parishLogo}
          alt="Paroisse de la Résurrection"
          sx={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            objectFit: 'cover',
            border: `3px solid ${parishColors.gold}`,
            mb: 3,
          }}
        />
        <Typography
          variant="h4"
          sx={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
          }}
        >
          Paroisse de la Résurrection
        </Typography>
        <Typography sx={{ mt: 1.5, color: 'rgba(255,255,255,0.75)', maxWidth: 320, lineHeight: 1.6 }}>
          Espace sécurisé de gestion du portail paroissial — Lemba Salongo, Kinshasa.
        </Typography>
      </Box>

      <Box sx={{ flex: 1, p: { xs: 3, sm: 4 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Box sx={{ display: { xs: 'block', md: 'none' }, textAlign: 'center', mb: 3 }}>
          <Box
            component="img"
            src={parishLogo}
            alt=""
            sx={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              objectFit: 'cover',
              border: `2px solid ${parishColors.gold}`,
              mb: 1.5,
            }}
          />
          <Typography variant="h6" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, color: parishColors.foreground }}>
            Administration
          </Typography>
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 700, color: parishColors.foreground, mb: 0.5, display: { xs: 'none', md: 'block' } }}>
          Connexion
        </Typography>
        <Typography variant="body2" sx={{ color: parishColors.mutedForeground, mb: 3 }}>
          Identifiants Firebase (e-mail et mot de passe)
        </Typography>
        <LoginForm />
      </Box>
    </Login>
  )
}
