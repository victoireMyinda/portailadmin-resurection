import { brand } from './brand'

/** Tokens visuels — charte portail public */
export const design = {
  canvas: brand.background,
  canvasAlt: '#eef1f6',
  surface: brand.white,
  surfaceMuted: brand.muted,
  border: brand.border,
  borderStrong: '#d8dee8',
  sidebar: brand.royal,
  sidebarGradient: brand.sidebarGradient,
  sidebarBorder: 'rgba(255, 255, 255, 0.12)',
  sidebarText: 'rgba(255, 255, 255, 0.82)',
  sidebarTextMuted: 'rgba(255, 255, 255, 0.5)',
  sidebarTextActive: brand.white,
  sidebarHover: 'rgba(255, 255, 255, 0.1)',
  sidebarActive: 'rgba(212, 175, 55, 0.2)',
  accentLine: `linear-gradient(180deg, ${brand.gold} 0%, ${brand.goldDark} 100%)`,
  shadow: {
    xs: '0 1px 2px rgba(13, 71, 161, 0.04)',
    sm: '0 1px 3px rgba(13, 71, 161, 0.06), 0 4px 16px rgba(13, 71, 161, 0.04)',
    md: '0 4px 24px rgba(13, 71, 161, 0.08)',
    lg: '0 12px 40px rgba(13, 71, 161, 0.1)',
    appBar: '0 1px 0 rgba(13, 71, 161, 0.08)',
  },
  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    pill: 999,
  },
} as const
