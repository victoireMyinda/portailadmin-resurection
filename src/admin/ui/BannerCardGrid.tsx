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
import { ChevronRight, ImageIcon, Link2 } from 'lucide-react'
import { Link as RouterLink } from 'react-router-dom'
import {
  CreateButton,
  Loading,
  useCreatePath,
  useListContext,
  useResourceContext,
} from 'react-admin'
import { parishColors } from '../../theme/parishTheme'
import type { PageBannerRecord } from '../../types'
import { EmptyState } from './EmptyState'
import { PageBannerPreviewDisplay } from './PageBannerPreview'
import { ResourceListLayout } from './ResourceListLayout'

export function BannerListView() {
  return (
    <ResourceListLayout
      title="Bannières de pages"
      subtitle="Image, titre et description affichés en tête de chaque page du portail public"
      icon={<ImageIcon size={24} />}
    >
      <BannerCardGrid />
    </ResourceListLayout>
  )
}

function BannerCardGrid() {
  const { data, isLoading } = useListContext()
  const resource = useResourceContext()
  const createPath = useCreatePath()

  if (isLoading) return <Loading />

  const items = (data ?? []) as PageBannerRecord[]

  if (!items.length) {
    return (
      <EmptyState
        title="Aucune bannière configurée"
        description="Ajoutez les bannières des pages : image de fond, titre et description."
        icon={<ImageIcon size={28} />}
        action={<CreateButton variant="contained" color="secondary" label="Ajouter une bannière" />}
      />
    )
  }

  const sorted = [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, 1fr)' },
        gap: 2.5,
      }}
    >
      {sorted.map((banner) => {
        const to = createPath({ resource, id: banner.id, type: 'edit' })

        return (
          <RouterLink key={banner.id} to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Card
              sx={{
                height: '100%',
                borderRadius: 4,
                border: '1px solid',
                borderColor: alpha(parishColors.royal, 0.1),
                overflow: 'hidden',
                transition: 'all 0.25s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 16px 40px rgba(13,71,161,0.12)',
                  borderColor: alpha(parishColors.gold, 0.35),
                },
              }}
            >
              <PageBannerPreviewDisplay
                imageUrl={banner.imageUrl}
                title={banner.title}
                description={banner.description}
                showCaption={false}
                compact
              />
              <CardContent sx={{ p: 2.5 }}>
                <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, pr: 1 }}>
                    {banner.title}
                  </Typography>
                  <IconButton size="small" sx={{ color: parishColors.royal, mt: -0.5 }}>
                    <ChevronRight size={18} />
                  </IconButton>
                </Stack>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                  <Chip
                    icon={<Link2 size={12} />}
                    label={banner.pagePath}
                    size="small"
                    variant="outlined"
                    sx={{ fontFamily: 'monospace', fontSize: 11, maxWidth: '100%' }}
                  />
                  <Chip label={`Ordre ${banner.order ?? 0}`} size="small" sx={{ fontSize: 11 }} />
                </Stack>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }} noWrap>
                  {banner.description}
                </Typography>
              </CardContent>
            </Card>
          </RouterLink>
        )
      })}
    </Box>
  )
}
