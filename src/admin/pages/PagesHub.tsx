import { Box, Button, Card, CardContent, Typography, alpha } from '@mui/material'
import { Title } from 'react-admin'
import { Link as RouterLink } from 'react-router-dom'
import { ArrowRight, FileStack } from 'lucide-react'
import { parishColors } from '../../theme/parishTheme'
import { design } from '../../theme/design-tokens'
import { pageSections } from './page-sections'

export function PagesHub() {
  return (
    <Box sx={{ px: { xs: 2, sm: 3, md: 4 }, py: 3, maxWidth: 1100, mx: 'auto', width: '100%' }}>
      <Title title="Gestion des pages" />

      <Box sx={{ mb: 4, pb: 2.5, borderBottom: `1px solid ${design.border}` }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: `${design.radius.sm}px`,
              bgcolor: alpha(parishColors.royal, 0.08),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: parishColors.royal,
            }}
          >
            <FileStack size={22} strokeWidth={1.75} />
          </Box>
          <Typography
            variant="h4"
            sx={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontWeight: 700,
              color: parishColors.foreground,
              letterSpacing: '-0.02em',
            }}
          >
            Gestion des pages
          </Typography>
        </Box>
        <Typography sx={{ color: parishColors.mutedForeground, maxWidth: 560, fontSize: '0.9375rem' }}>
          Contenus du portail public regroupés par page et sous-pages.
        </Typography>
      </Box>

      {pageSections.map((section) => (
        <Box key={section.id} sx={{ mb: 4 }}>
          <Typography
            variant="overline"
            sx={{ fontWeight: 700, letterSpacing: '0.12em', color: parishColors.mutedForeground }}
          >
            {section.title}
          </Typography>
          <Typography variant="body2" sx={{ mt: 0.5, mb: 2, color: parishColors.mutedForeground }}>
            {section.subtitle}
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: section.modules.length >= 3 ? 'repeat(2, 1fr)' : '1fr',
                lg: 'repeat(3, 1fr)',
              },
              gap: 2,
            }}
          >
            {section.modules.map((mod) => {
              const Icon = mod.icon
              return (
                <Card
                  key={mod.to}
                  elevation={0}
                  sx={{
                    borderRadius: `${design.radius.lg}px`,
                    border: `1px solid ${design.border}`,
                    boxShadow: design.shadow.xs,
                    transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
                    '&:hover': {
                      boxShadow: design.shadow.md,
                      borderColor: design.borderStrong,
                    },
                  }}
                >
                  <CardContent sx={{ p: 2.5 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: `${design.radius.sm}px`,
                        bgcolor: alpha(mod.color, 0.1),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 1.5,
                      }}
                    >
                      <Icon size={20} color={mod.color} strokeWidth={1.75} />
                    </Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: parishColors.foreground }}>
                      {mod.title}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 0.5, mb: 2, fontSize: '0.8125rem', color: parishColors.mutedForeground }}>
                      {mod.description}
                    </Typography>
                    <Button
                      component={RouterLink}
                      to={mod.to}
                      size="small"
                      variant="outlined"
                      endIcon={<ArrowRight size={14} />}
                      sx={{
                        borderRadius: `${design.radius.sm}px`,
                        fontWeight: 600,
                        borderColor: design.borderStrong,
                        color: parishColors.royal,
                        '&:hover': { borderColor: parishColors.royal, bgcolor: alpha(parishColors.royal, 0.04) },
                      }}
                    >
                      Gérer
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </Box>
        </Box>
      ))}
    </Box>
  )
}
