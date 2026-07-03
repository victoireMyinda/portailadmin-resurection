import {
  Box,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
  alpha,
} from '@mui/material'
import { ChevronRight, ExternalLink, Share2 } from 'lucide-react'
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

export function SocialListView() {
  return (
    <ResourceListLayout
      title="Réseaux sociaux"
      subtitle="Pages officielles de la paroisse — icônes et liens affichés sur le site"
      icon={<Share2 size={24} />}
    >
      <SocialCardGrid />
    </ResourceListLayout>
  )
}

function SocialCardGrid() {
  const { data, isLoading } = useListContext()
  const resource = useResourceContext()
  const createPath = useCreatePath()

  if (isLoading) return <Loading />
  if (!data?.length) {
    return (
      <EmptyState
        title="Aucun réseau social"
        description="Ajoutez Facebook, YouTube, Instagram et les autres liens de la paroisse."
        icon={<Share2 size={28} />}
        action={<CreateButton variant="contained" color="secondary" label="Ajouter un réseau" />}
      />
    )
  }

  const sorted = [...data].sort(
    (a, b) => Number((a as Record<string, unknown>).order ?? 99) - Number((b as Record<string, unknown>).order ?? 99),
  )

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)' },
        gap: 2.5,
      }}
    >
      {sorted.map((record) => {
        const r = record as Record<string, unknown>
        const to = createPath({ resource, id: String(r.id), type: 'edit' })
        const iconUrl = String(r.iconUrl ?? '')
        const order = Number(r.order ?? 0)

        return (
          <RouterLink key={String(r.id)} to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Card
              sx={{
                height: '100%',
                borderRadius: 4,
                border: '1px solid',
                borderColor: alpha(parishColors.royal, 0.1),
                bgcolor: '#fff',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
                '&:hover': {
                  transform: 'translateY(-6px) scale(1.01)',
                  boxShadow: '0 20px 48px rgba(212,175,55,0.18)',
                  borderColor: alpha(parishColors.gold, 0.4),
                },
              }}
            >
              {order > 0 && (
                <Chip
                  label={`#${order}`}
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    height: 24,
                    fontWeight: 700,
                    fontSize: 11,
                    bgcolor: alpha(parishColors.gold, 0.15),
                    color: '#92680a',
                    zIndex: 1,
                  }}
                />
              )}
              <CardContent sx={{ p: 2.5, pt: 3 }}>
                <Stack spacing={2}>
                  <Box
                    sx={{
                      width: 72,
                      height: 72,
                      borderRadius: 3,
                      mx: 'auto',
                      bgcolor: alpha(parishColors.royal, 0.04),
                      border: '1px solid',
                      borderColor: alpha(parishColors.royal, 0.08),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                    }}
                  >
                    {iconUrl ? (
                      <Box
                        component="img"
                        src={iconUrl}
                        alt=""
                        sx={{ width: 40, height: 40, objectFit: 'contain' }}
                      />
                    ) : (
                      <ExternalLink size={28} color={parishColors.mutedForeground} />
                    )}
                  </Box>
                  <Box sx={{ textAlign: 'center', minWidth: 0 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 700 }}
                    >
                      {String(r.name ?? '—')}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        display: 'block',
                        mt: 0.75,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        px: 1,
                      }}
                    >
                      {String(r.link ?? '')}
                    </Typography>
                  </Box>
                  <Stack
                    direction="row"
                    sx={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 0.5,
                      color: parishColors.royal,
                      fontSize: 13,
                      fontWeight: 600,
                    }}
                  >
                    <Typography variant="caption" sx={{ fontWeight: 600, color: parishColors.royal }}>
                      Modifier
                    </Typography>
                    <ChevronRight size={14} />
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </RouterLink>
        )
      })}
    </Box>
  )
}
