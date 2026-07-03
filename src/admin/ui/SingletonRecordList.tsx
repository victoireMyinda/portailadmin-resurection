import { Box, Card, CardContent, Chip, IconButton, Stack, Typography, alpha } from '@mui/material'
import { ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'
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

type SingletonRecordListProps = {
  title: string
  subtitle: string
  icon: ReactNode
  emptyTitle: string
  emptyDescription: string
  createLabel: string
  getCardTitle: (record: Record<string, unknown>) => string
  getCardSubtitle?: (record: Record<string, unknown>) => string
  getCardMeta?: (record: Record<string, unknown>) => string[]
}

export function SingletonRecordList({
  title,
  subtitle,
  icon,
  emptyTitle,
  emptyDescription,
  createLabel,
  getCardTitle,
  getCardSubtitle,
  getCardMeta,
}: SingletonRecordListProps) {
  return (
    <ResourceListLayout title={title} subtitle={subtitle} icon={icon}>
      <SingletonRecordCard
        emptyTitle={emptyTitle}
        emptyDescription={emptyDescription}
        createLabel={createLabel}
        getCardTitle={getCardTitle}
        getCardSubtitle={getCardSubtitle}
        getCardMeta={getCardMeta}
        icon={icon}
      />
    </ResourceListLayout>
  )
}

type SingletonRecordCardProps = Omit<SingletonRecordListProps, 'title' | 'subtitle'>

function SingletonRecordCard({
  emptyTitle,
  emptyDescription,
  createLabel,
  getCardTitle,
  getCardSubtitle,
  getCardMeta,
  icon,
}: SingletonRecordCardProps) {
  const { data, isLoading } = useListContext()
  const resource = useResourceContext()
  const createPath = useCreatePath()

  if (isLoading) return <Loading />

  const records = (data ?? []) as Record<string, unknown>[]

  if (!records.length) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        icon={icon}
        action={<CreateButton variant="contained" color="secondary" label={createLabel} />}
      />
    )
  }

  const record = records[0]
  const to = createPath({ resource, id: String(record.id), type: 'edit' })
  const meta = getCardMeta?.(record) ?? []

  return (
    <Box sx={{ width: '100%', maxWidth: 640, minWidth: 0 }}>
      <RouterLink to={to} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
        <Card
          sx={{
            borderRadius: 4,
            border: '1px solid',
            borderColor: alpha(parishColors.royal, 0.1),
            transition: 'all 0.25s',
            minWidth: 0,
            overflow: 'hidden',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 12px 32px rgba(13,71,161,0.1)',
              borderColor: alpha(parishColors.gold, 0.35),
            },
          }}
        >
          <CardContent sx={{ p: 2.5 }}>
            <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-start', gap: 0.5 }}>
              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 700,
                    lineHeight: 1.35,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    wordBreak: 'break-word',
                  }}
                >
                  {getCardTitle(record)}
                </Typography>
                {getCardSubtitle && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mt: 0.75,
                      lineHeight: 1.45,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      wordBreak: 'break-word',
                    }}
                  >
                    {getCardSubtitle(record)}
                  </Typography>
                )}
              </Box>
              <IconButton size="small" sx={{ color: parishColors.royal, flexShrink: 0 }}>
                <ChevronRight size={18} />
              </IconButton>
            </Stack>
            {meta.length > 0 && (
              <Box sx={{ mt: 1.5, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {meta.map((label) => (
                  <Chip
                    key={label}
                    label={label}
                    size="small"
                    variant="outlined"
                    sx={{
                      fontSize: 11,
                      maxWidth: '100%',
                      '& .MuiChip-label': { overflow: 'hidden', textOverflow: 'ellipsis' },
                    }}
                  />
                ))}
              </Box>
            )}
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1.5, display: 'block' }}>
              Cliquez pour modifier le contenu publié
            </Typography>
          </CardContent>
        </Card>
      </RouterLink>
    </Box>
  )
}
