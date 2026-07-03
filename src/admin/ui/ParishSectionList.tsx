import {
  Box,
  Card,
  CardContent,
  Chip,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
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
import { design } from '../../theme/design-tokens'
import { EmptyState } from './EmptyState'
import { ResourceListLayout } from './ResourceListLayout'

type ParishSectionListProps = {
  title: string
  subtitle: string
  icon: ReactNode
  emptyTitle: string
  emptyDescription: string
  createLabel: string
  hideCreate?: boolean
  getCardTitle: (record: Record<string, unknown>) => string
  getCardSubtitle?: (record: Record<string, unknown>) => string
  getCardMeta?: (record: Record<string, unknown>) => string[]
  getCardImage?: (record: Record<string, unknown>) => string | undefined
  sortField?: string
  compact?: boolean
}

export function ParishSectionList({
  title,
  subtitle,
  icon,
  emptyTitle,
  emptyDescription,
  createLabel,
  hideCreate = false,
  getCardTitle,
  getCardSubtitle,
  getCardMeta,
  getCardImage,
  sortField = 'order',
  compact = false,
}: ParishSectionListProps) {
  return (
    <ResourceListLayout title={title} subtitle={subtitle} icon={icon}>
      <ParishSectionCardGrid
        emptyTitle={emptyTitle}
        emptyDescription={emptyDescription}
        createLabel={createLabel}
        hideCreate={hideCreate}
        getCardTitle={getCardTitle}
        getCardSubtitle={getCardSubtitle}
        getCardMeta={getCardMeta}
        getCardImage={getCardImage}
        sortField={sortField}
        compact={compact}
        icon={icon}
      />
    </ResourceListLayout>
  )
}

type ParishSectionCardGridProps = Omit<ParishSectionListProps, 'title' | 'subtitle' | 'icon'>

function ParishSectionCardGrid({
  emptyTitle,
  emptyDescription,
  createLabel,
  hideCreate = false,
  getCardTitle,
  getCardSubtitle,
  getCardMeta,
  getCardImage,
  sortField = 'order',
  compact = false,
  icon,
}: ParishSectionCardGridProps & { icon?: ReactNode }) {
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
        icon={icon ?? iconPlaceholder}
        action={
          hideCreate ? undefined : (
            <CreateButton variant="contained" color="secondary" label={createLabel} />
          )
        }
      />
    )
  }

  const sorted = [...records].sort(
    (a, b) => Number(a[sortField] ?? 99) - Number(b[sortField] ?? 99),
  )

  return (
    <Box sx={{ width: '100%', maxWidth: '100%', minWidth: 0, overflow: 'hidden' }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: compact
            ? 'repeat(auto-fill, minmax(min(100%, 200px), 1fr))'
            : 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))',
          gap: compact ? 1.5 : 2,
        }}
      >
      {sorted.map((record) => {
        const to = createPath({ resource, id: String(record.id), type: 'edit' })
        const meta = getCardMeta?.(record) ?? []

        return (
          <RouterLink
            key={String(record.id)}
            to={to}
            style={{ textDecoration: 'none', color: 'inherit', minWidth: 0 }}
          >
            <Card
              elevation={0}
              sx={{
                height: '100%',
                borderRadius: `${design.radius.lg}px`,
                border: `1px solid ${design.border}`,
                boxShadow: design.shadow.xs,
                transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
                minWidth: 0,
                overflow: 'hidden',
                '&:hover': {
                  boxShadow: design.shadow.md,
                  borderColor: design.borderStrong,
                },
              }}
            >
              {getCardImage?.(record) && (
                <Box
                  sx={{
                    height: compact ? 72 : 88,
                    bgcolor: design.surfaceMuted,
                    borderBottom: `1px solid ${design.border}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 1.5,
                  }}
                >
                  <Box
                    component="img"
                    src={getCardImage(record)}
                    alt=""
                    sx={{ maxHeight: '100%', maxWidth: '80%', objectFit: 'contain' }}
                  />
                </Box>
              )}
              <CardContent sx={{ p: compact ? 1.75 : 2.5 }}>
                <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-start', gap: 0.5 }}>
                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography
                      variant={compact ? 'body2' : 'subtitle1'}
                      sx={{
                        fontWeight: 600,
                        lineHeight: 1.35,
                        color: parishColors.foreground,
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
                        variant="caption"
                        color="text.secondary"
                        sx={{
                          mt: 0.5,
                          lineHeight: 1.4,
                          display: '-webkit-box',
                          WebkitLineClamp: compact ? 2 : 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          wordBreak: 'break-word',
                        }}
                      >
                        {getCardSubtitle(record)}
                      </Typography>
                    )}
                  </Box>
                  <IconButton size="small" sx={{ color: parishColors.mutedForeground, flexShrink: 0, mt: -0.5 }}>
                    <ChevronRight size={compact ? 16 : 18} />
                  </IconButton>
                </Stack>
                {meta.length > 0 && (
                  <Box
                    sx={{
                      mt: 1.25,
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 0.5,
                    }}
                  >
                    {meta.map((label) => (
                      <Chip
                        key={label}
                        label={label}
                        size="small"
                        variant="outlined"
                        sx={{
                          fontSize: 10,
                          height: 22,
                          maxWidth: '100%',
                          borderColor: design.border,
                          color: parishColors.mutedForeground,
                          '& .MuiChip-label': {
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          },
                        }}
                      />
                    ))}
                  </Box>
                )}
              </CardContent>
            </Card>
          </RouterLink>
        )
      })}
      </Box>
    </Box>
  )
}

const iconPlaceholder = <Box sx={{ width: 28, height: 28 }} />