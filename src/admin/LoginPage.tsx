import { Login, LoginForm, TextInput, PasswordInput } from 'react-admin'
import { Box, Typography, Divider } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { required } from 'ra-core'
import parishLogo from '@frontuser/assets/paroisse.webp'
import { parishColors } from '../theme/parishTheme'
import { design } from '../theme/design-tokens'
import { brand } from '../theme/brand'

export function ParishLoginPage() {
  return (
    <Login
      className="parish-login"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: `url(${parishLogo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: `
            linear-gradient(135deg, rgba(12, 25, 41, 0.5) 0%, rgba(13, 71, 161, 0.38) 50%, rgba(238, 241, 246, 0.22) 100%),
            radial-gradient(ellipse 70% 55% at 50% 100%, rgba(212, 175, 55, 0.15) 0%, transparent 55%)
          `,
          pointerEvents: 'none',
        },
        '& .RaLogin-main': {
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 2, sm: 3 },
        },
        '& .RaLogin-card': {
          position: 'relative',
          width: '100%',
          maxWidth: 440,
          marginTop: 0,
          borderRadius: `${design.radius.xl}px`,
          border: `1px solid ${design.border}`,
          boxShadow: `${design.shadow.lg}, 0 0 0 1px rgba(255, 255, 255, 0.6) inset`,
          overflow: 'hidden',
          background: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(20px)',
          animation: 'loginCardIn 0.55s cubic-bezier(0.22, 1, 0.36, 1)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: `linear-gradient(90deg, ${brand.goldDark} 0%, ${brand.gold} 50%, ${brand.goldDark} 100%)`,
          },
        },
        '& .RaLogin-avatar': { display: 'none' },
        '& .MuiCardContent-root': {
          p: 0,
          '&:last-child': { pb: 0 },
        },
        '& .RaLoginForm-content': {
          width: '100%',
          px: { xs: 3, sm: 4 },
          pt: 1,
          pb: { xs: 3, sm: 4 },
        },
        '& .MuiFormControl-root': {
          width: '100%',
          mb: 2,
        },
        '& .MuiButton-containedPrimary': {
          mt: 1,
          py: 1.35,
          fontSize: '0.9375rem',
          fontWeight: 700,
          letterSpacing: '0.01em',
          background: `linear-gradient(180deg, ${brand.royalLight} 0%, ${brand.royal} 100%)`,
          boxShadow: '0 4px 14px rgba(13, 71, 161, 0.25)',
          '&:hover': {
            background: `linear-gradient(180deg, ${brand.royal} 0%, ${brand.royalDark} 100%)`,
            boxShadow: '0 6px 20px rgba(13, 71, 161, 0.3)',
          },
        },
        '@keyframes loginCardIn': {
          from: { opacity: 0, transform: 'translateY(16px) scale(0.98)' },
          to: { opacity: 1, transform: 'translateY(0) scale(1)' },
        },
      }}
    >
      <Box sx={{ width: '100%' }}>
        <Box
          sx={{
            textAlign: 'center',
            px: { xs: 3, sm: 4 },
            pt: { xs: 4, sm: 4.5 },
            pb: 2,
          }}
        >
          <Box
            sx={{
              position: 'relative',
              display: 'inline-flex',
              mb: 2.5,
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                inset: -6,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${parishColors.goldMuted} 0%, transparent 70%)`,
              }}
            />
            <Box
              component="img"
              src={parishLogo}
              alt="Paroisse de la Résurrection"
              sx={{
                position: 'relative',
                width: 88,
                height: 88,
                borderRadius: '50%',
                objectFit: 'cover',
                border: `3px solid ${parishColors.gold}`,
                boxShadow: '0 8px 24px rgba(13, 71, 161, 0.15)',
              }}
            />
          </Box>

          <Typography
            variant="overline"
            sx={{
              display: 'block',
              color: parishColors.gold,
              fontWeight: 700,
              letterSpacing: '0.14em',
              mb: 0.75,
            }}
          >
            Espace administration
          </Typography>

          <Typography
            variant="h5"
            sx={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontWeight: 700,
              color: parishColors.foreground,
              lineHeight: 1.25,
              letterSpacing: '-0.02em',
            }}
          >
            Paroisse de la Résurrection
          </Typography>

          <Typography
            variant="body2"
            sx={{
              mt: 1,
              color: parishColors.mutedForeground,
              lineHeight: 1.55,
            }}
          >
            Lemba Salongo — Kinshasa
          </Typography>

          <Divider
            sx={{
              mt: 2.5,
              mb: 0.5,
              borderColor: design.border,
              '&::before, &::after': {
                borderColor: design.border,
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.75,
                color: parishColors.mutedForeground,
                fontSize: '0.75rem',
                fontWeight: 600,
              }}
            >
              <LockOutlinedIcon sx={{ fontSize: 16 }} />
              Connexion sécurisée
            </Box>
          </Divider>
        </Box>

        <LoginForm>
          <TextInput
            autoFocus
            source="username"
            label="Adresse e-mail"
            autoComplete="username"
            validate={required()}
          />
          <PasswordInput
            source="password"
            label="Mot de passe"
            autoComplete="current-password"
            validate={required()}
          />
        </LoginForm>

        <Typography
          variant="caption"
          sx={{
            display: 'block',
            textAlign: 'center',
            px: 4,
            pb: 3,
            color: parishColors.mutedForeground,
            lineHeight: 1.5,
          }}
        >
          Accès réservé aux responsables paroissiaux autorisés.
        </Typography>
      </Box>
    </Login>
  )
}
