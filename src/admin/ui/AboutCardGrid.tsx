import { Box, Card, IconButton, Typography, alpha } from '@mui/material'
import { ChevronRight, Info } from 'lucide-react'
import { Link as RouterLink } from 'react-router-dom'
import {
  CreateButton,
  Loading,
  useCreatePath,
  useListContext,
  useResourceContext,
} from 'react-admin'
import { parishColors } from '../../theme/parishTheme'
import type { HomeAboutRecord } from '../../types'
import { AboutPreviewDisplay } from './AboutPreview'
import { EmptyState } from './EmptyState'
import { ResourceListLayout } from './ResourceListLayout'

export function HomeAboutListView() {
  return (
    <ResourceListLayout
      title="À propos de la paroisse"
      subtitle="Présentation et historique résumé sur la page d’accueil"
      icon={<Info size={24} />}
    >
      <HomeAboutCard />
    </ResourceListLayout>
  )
}

function HomeAboutCard() {
  const { data, isLoading } = useListContext()
  const resource = useResourceContext()
  const createPath = useCreatePath()

  if (isLoading) return <Loading />

  const records = (data ?? []) as HomeAboutRecord[]

  if (!records.length) {
    return (
      <EmptyState
        title="Section à propos non configurée"
        description="Décrivez la paroisse telle qu’elle apparaît sur la page d’accueil."
        icon={<Info size={28} />}
        action={<CreateButton variant="contained" color="secondary" label="Configurer la section" />}
      />
    )
  }

  const record = records[0]
  const to = createPath({ resource, id: record.id, type: 'edit' })

  return (
    <RouterLink to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Card
        sx={{
          borderRadius: 4,
          border: '1px solid',
          borderColor: alpha(parishColors.royal, 0.1),
          overflow: 'hidden',
          position: 'relative',
          transition: 'all 0.25s',
          '&:hover': {
            boxShadow: '0 16px 40px rgba(13,71,161,0.12)',
            borderColor: alpha(parishColors.gold, 0.35),
          },
        }}
      >
        <IconButton
          sx={{ position: 'absolute', top: 12, right: 12, zIndex: 2, bgcolor: '#fff', boxShadow: 1 }}
          size="small"
        >
          <ChevronRight size={18} />
        </IconButton>
        <AboutPreviewDisplay {...record} />
        <Box sx={{ px: 2.5, pb: 2, bgcolor: alpha(parishColors.muted, 0.5) }}>
          <Typography variant="caption" color="text.secondary">
            Cliquez pour modifier la présentation de la paroisse
          </Typography>
        </Box>
      </Card>
    </RouterLink>
  )
}
