import {
  Box,
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
  alpha,
} from '@mui/material'
import { ChevronRight, ImageIcon } from 'lucide-react'
import { Link as RouterLink } from 'react-router-dom'
import {
  CreateButton,
  Loading,
  useCreatePath,
  useListContext,
  useResourceContext,
} from 'react-admin'
import { parishColors } from '../../theme/parishTheme'
import { EmptyState } from './EmptyState'
import { ResourceListLayout } from './ResourceListLayout'
import { HeaderBrandPreviewDisplay } from './HeaderBrandPreview'

export function LogoListView() {
  return (
    <ResourceListLayout
      title="Identité visuelle"
      subtitle="Logo et titres affichés dans l’en-tête du site public (comme sur le portail)"
      icon={<ImageIcon size={24} />}
    >
      <LogoCardGrid />
    </ResourceListLayout>
  )
}

function LogoCardGrid() {
  const { data, isLoading } = useListContext()
  const resource = useResourceContext()
  const createPath = useCreatePath()

  if (isLoading) return <Loading />
  if (!data?.length) {
    return (
      <EmptyState
        title="Aucun logo configuré"
        description="Ajoutez l’image et les titres tels qu’ils apparaissent dans le header du portail."
        icon={<ImageIcon size={28} />}
        action={<CreateButton variant="contained" color="secondary" label="Configurer le logo" />}
      />
    )
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
        gap: 2.5,
      }}
    >
      {data.map((record) => {
        const r = record as Record<string, unknown>
        const to = createPath({ resource, id: String(r.id), type: 'edit' })

        return (
          <RouterLink key={String(r.id)} to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Card
              sx={{
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
              <Box
                sx={{
                  px: 2,
                  py: 1,
                  bgcolor: alpha(parishColors.gold, 0.08),
                  borderBottom: `1px solid ${alpha(parishColors.gold, 0.2)}`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#92680a' }}>
                  En-tête site public
                </Typography>
                <IconButton size="small" sx={{ color: parishColors.royal }}>
                  <ChevronRight size={18} />
                </IconButton>
              </Box>
              <CardContent sx={{ p: 2.5 }}>
                <HeaderBrandPreviewDisplay
                  imageUrl={String(r.imageUrl ?? '')}
                  primaryTitle={String(r.primaryTitle ?? '')}
                  secondaryTitle={String(r.secondaryTitle ?? '')}
                  headerArchdiocese={String(r.headerArchdiocese ?? '')}
                  headerDeanery={String(r.headerDeanery ?? '')}
                  headerParish={String(r.headerParish ?? '')}
                  headerLocation={String(r.headerLocation ?? '')}
                />
                <Stack direction="row" spacing={2} sx={{ mt: 2, pt: 2, borderTop: '1px dashed', borderColor: 'divider' }}>
                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      Paroisse (ligne 3)
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }} noWrap>
                      {String(r.headerParish ?? r.primaryTitle ?? '—')}
                    </Typography>
                  </Box>
                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      Localisation (ligne 4)
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {String(r.headerLocation ?? r.secondaryTitle ?? '—')}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </RouterLink>
        )
      })}
    </Box>
  )
}
