import {
  Box,
  Card,
  CardContent,
  Chip,
  IconButton,
  Stack,
  Typography,
  alpha,
} from '@mui/material'
import { ChevronRight, Images } from 'lucide-react'
import { Link as RouterLink } from 'react-router-dom'
import {
  CreateButton,
  Loading,
  useCreatePath,
  useListContext,
  useResourceContext,
} from 'react-admin'
import { parishColors } from '../../theme/parishTheme'
import type { HomeHeroSlideRecord } from '../../types'
import { EmptyState } from './EmptyState'
import { HeroSlidePreviewDisplay } from './HeroSlidePreview'
import { ResourceListLayout } from './ResourceListLayout'

export function HomeHeroListView() {
  return (
    <ResourceListLayout
      title="Bannières d’accueil"
      subtitle="Carousel hero en haut de la page d’accueil — image, titre, description et bouton"
      icon={<Images size={24} />}
    >
      <HomeHeroCardGrid />
    </ResourceListLayout>
  )
}

function HomeHeroCardGrid() {
  const { data, isLoading } = useListContext()
  const resource = useResourceContext()
  const createPath = useCreatePath()

  if (isLoading) return <Loading />

  const slides = (data ?? []) as HomeHeroSlideRecord[]

  if (!slides.length) {
    return (
      <EmptyState
        title="Aucune bannière d’accueil"
        description="Ajoutez les slides du carousel hero (4 bannières par défaut sur le portail)."
        icon={<Images size={28} />}
        action={<CreateButton variant="contained" color="secondary" label="Ajouter une bannière" />}
      />
    )
  }

  const sorted = [...slides].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  return (
    <Stack spacing={2.5}>
      <Typography variant="caption" sx={{ fontWeight: 700, color: parishColors.mutedForeground }}>
        {sorted.length} slide{sorted.length > 1 ? 's' : ''} — défilement automatique sur le portail
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, 1fr)' },
          gap: 2.5,
        }}
      >
        {sorted.map((slide) => {
          const to = createPath({ resource, id: slide.id, type: 'edit' })
          return (
            <RouterLink key={slide.id} to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Card
                sx={{
                  borderRadius: 4,
                  border: '1px solid',
                  borderColor: alpha(parishColors.royal, 0.1),
                  overflow: 'hidden',
                  transition: 'all 0.25s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 16px 40px rgba(13,71,161,0.12)',
                  },
                }}
              >
                <HeroSlidePreviewDisplay {...slide} showCaption={false} compact />
                <CardContent sx={{ p: 2 }}>
                  <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }} noWrap>
                        {slide.featured ? `${slide.title} ${slide.titleLine2 ?? ''}` : slide.title}
                      </Typography>
                      <Stack direction="row" spacing={0.75} sx={{ mt: 0.75, flexWrap: 'wrap', gap: 0.75 }}>
                        <Chip label={`Ordre ${slide.order}`} size="small" variant="outlined" sx={{ fontSize: 10 }} />
                        {slide.featured && (
                          <Chip label="Slide principal" size="small" color="primary" sx={{ fontSize: 10 }} />
                        )}
                      </Stack>
                    </Box>
                    <IconButton size="small" sx={{ color: parishColors.royal }}>
                      <ChevronRight size={18} />
                    </IconButton>
                  </Stack>
                </CardContent>
              </Card>
            </RouterLink>
          )
        })}
      </Box>
    </Stack>
  )
}
