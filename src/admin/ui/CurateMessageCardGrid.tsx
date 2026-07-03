import { Box, Card, IconButton, Typography, alpha } from '@mui/material'
import { ChevronRight, MessageSquare } from 'lucide-react'
import { Link as RouterLink } from 'react-router-dom'
import {
  CreateButton,
  Loading,
  useCreatePath,
  useListContext,
  useResourceContext,
} from 'react-admin'
import { parishColors } from '../../theme/parishTheme'
import type { HomeCurateMessageRecord } from '../../types'
import { CurateMessagePreviewDisplay } from './CurateMessagePreview'
import { EmptyState } from './EmptyState'
import { ResourceListLayout } from './ResourceListLayout'

export function CurateMessageListView() {
  return (
    <ResourceListLayout
      title="Mot du curé"
      subtitle="Message pastoral affiché sur la page d’accueil avec photo du curé"
      icon={<MessageSquare size={24} />}
    >
      <CurateMessageCard />
    </ResourceListLayout>
  )
}

function CurateMessageCard() {
  const { data, isLoading } = useListContext()
  const resource = useResourceContext()
  const createPath = useCreatePath()

  if (isLoading) return <Loading />

  const records = (data ?? []) as HomeCurateMessageRecord[]

  if (!records.length) {
    return (
      <EmptyState
        title="Mot du curé non configuré"
        description="Rédigez le message du curé tel qu’il apparaît sur la page d’accueil."
        icon={<MessageSquare size={28} />}
        action={<CreateButton variant="contained" color="secondary" label="Configurer le message" />}
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
        <CurateMessagePreviewDisplay {...record} />
        <Box sx={{ px: 2.5, pb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            Cliquez pour modifier le message de {record.name}
          </Typography>
        </Box>
      </Card>
    </RouterLink>
  )
}
