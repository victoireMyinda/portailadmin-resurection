import { defaultTheme } from 'react-admin'
import { createTheme } from '@mui/material/styles'
import { deepmerge } from '@mui/utils'
import { brand } from './brand'
import { design } from './design-tokens'

export const parishColors = {
  royal: brand.royal,
  royalLight: brand.royalLight,
  royalDark: brand.navy,
  gold: brand.gold,
  goldLight: brand.goldLight,
  goldMuted: 'rgba(212, 175, 55, 0.15)',
  background: brand.white,
  foreground: brand.foreground,
  muted: brand.muted,
  mutedForeground: brand.mutedForeground,
  border: brand.border,
  footerBg: '#eef1f6',
  footerText: '#3d4f63',
} as const

const baseTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: brand.royal,
      light: brand.royalLight,
      dark: brand.royalDark,
      contrastText: brand.white,
    },
    secondary: {
      main: brand.gold,
      light: brand.goldLight,
      dark: brand.goldDark,
      contrastText: brand.foreground,
    },
    background: {
      default: brand.background,
      paper: brand.white,
    },
    text: {
      primary: brand.foreground,
      secondary: brand.mutedForeground,
    },
    divider: brand.border,
  },
  typography: {
    fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
    fontSize: 14,
    h1: { fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700, letterSpacing: '-0.02em' },
    h2: { fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700, letterSpacing: '-0.02em' },
    h3: { fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 600, letterSpacing: '-0.01em' },
    h4: { fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 600, letterSpacing: '-0.01em' },
    h5: { fontFamily: '"Inter", sans-serif', fontWeight: 600, fontSize: '1.125rem' },
    h6: { fontFamily: '"Inter", sans-serif', fontWeight: 600, fontSize: '1rem' },
    subtitle1: { fontWeight: 600, fontSize: '0.9375rem' },
    subtitle2: { fontWeight: 600, fontSize: '0.8125rem', letterSpacing: '0.01em' },
    body2: { fontSize: '0.875rem', lineHeight: 1.6 },
    caption: { fontSize: '0.75rem', letterSpacing: '0.02em' },
    overline: { fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.12em' },
    button: { textTransform: 'none', fontWeight: 600, fontSize: '0.875rem' },
  },
  shape: { borderRadius: design.radius.md },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundColor: brand.background },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: design.surface,
          color: brand.foreground,
          boxShadow: design.shadow.appBar,
          borderBottom: `1px solid ${brand.border}`,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: design.radius.sm,
          boxShadow: 'none',
          padding: '8px 18px',
          '&:hover': { boxShadow: design.shadow.xs },
          '&.MuiButton-containedPrimary': {
            background: `linear-gradient(180deg, ${brand.royalLight} 0%, ${brand.royal} 100%)`,
            '&:hover': {
              background: `linear-gradient(180deg, ${brand.royal} 0%, ${brand.royalDark} 100%)`,
            },
          },
          '&.MuiButton-containedSecondary': {
            background: `linear-gradient(180deg, ${brand.gold} 0%, ${brand.goldDark} 100%)`,
            color: brand.foreground,
            fontWeight: 700,
            '&:hover': {
              background: `linear-gradient(180deg, ${brand.goldLight} 0%, ${brand.gold} 100%)`,
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: `1px solid ${brand.border}`,
          boxShadow: design.shadow.sm,
          borderRadius: design.radius.lg,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
        elevation1: { boxShadow: design.shadow.sm },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: design.radius.sm,
          backgroundColor: brand.muted,
          transition: 'background-color 0.2s, box-shadow 0.2s',
          '&:hover': { backgroundColor: brand.white },
          '&.Mui-focused': {
            backgroundColor: brand.white,
            boxShadow: '0 0 0 3px rgba(13, 71, 161, 0.1)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: brand.royal,
            borderWidth: 1,
          },
        },
        notchedOutline: { borderColor: brand.border },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          fontSize: '0.8125rem',
          '&.Mui-focused': { color: brand.royal },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600, fontSize: '0.6875rem' },
        outlined: { borderColor: design.borderStrong },
      },
    },
  },
})

export const parishTheme = deepmerge(defaultTheme, baseTheme)
