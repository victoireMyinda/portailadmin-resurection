import type { ReactNode } from 'react'
import { Box, Typography, alpha } from '@mui/material'
import { parishColors } from '../../theme/parishTheme'
import { design } from '../../theme/design-tokens'

export type ListPageHeaderBadge = {
  label: string
  count: number
  emphasis?: 'default' | 'alert'
}

type ListPageHeaderProps = {
  title: string
  subtitle?: string
  icon: ReactNode
  count?: number
  badges?: ListPageHeaderBadge[]
  actions?: ReactNode
}

export function ListPageHeader({ title, subtitle, icon, count, badges, actions }: ListPageHeaderProps) {
  return (
    <Box
      sx={{
        mb: 3,
        p: { xs: 2, md: 2.5 },
        borderRadius: `${design.radius.lg}px`,
        bgcolor: design.surface,
        border: `1px solid ${design.border}`,
        boxShadow: design.shadow.sm,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'stretch', md: 'center' },
        justifyContent: 'space-between',
        gap: 2,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 4,
          background: design.accentLine,
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, minWidth: 0, pl: 1 }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: `${design.radius.sm}px`,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: alpha(parishColors.royal, 0.06),
            color: parishColors.royal,
          }}
        >
          {icon}
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, flexWrap: 'wrap' }}>
            <Typography
              variant="h5"
              sx={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontWeight: 700,
                color: parishColors.foreground,
                letterSpacing: '-0.01em',
              }}
            >
              {title}
            </Typography>
            {count !== undefined && (
              <Typography
                component="span"
                sx={{
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  px: 1,
                  py: 0.25,
                  borderRadius: design.radius.pill,
                  bgcolor: alpha(parishColors.royal, 0.08),
                  color: parishColors.royal,
                  letterSpacing: '0.04em',
                }}
              >
                {count}
              </Typography>
            )}
            {badges?.map((badge) => (
              <Typography
                key={badge.label}
                component="span"
                sx={{
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  px: 1,
                  py: 0.25,
                  borderRadius: design.radius.pill,
                  bgcolor:
                    badge.emphasis === 'alert'
                      ? alpha(parishColors.gold, 0.15)
                      : alpha(parishColors.royal, 0.08),
                  color: badge.emphasis === 'alert' ? '#92680a' : parishColors.royal,
                  letterSpacing: '0.04em',
                }}
              >
                {badge.count} {badge.label}
              </Typography>
            ))}
          </Box>
          {subtitle && (
            <Typography
              variant="body2"
              sx={{ mt: 0.5, lineHeight: 1.55, maxWidth: 520, color: parishColors.mutedForeground }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
      </Box>
      {actions && (
        <Box
          sx={{
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: { xs: 'flex-start', md: 'flex-end' },
            pl: { md: 1 },
          }}
        >
          {actions}
        </Box>
      )}
    </Box>
  )
}
