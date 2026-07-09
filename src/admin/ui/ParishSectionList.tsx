import {
  Box,
  Card,
  CardContent,
  Chip,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import { ChevronRight, Play } from 'lucide-react'
import type { ReactNode } from 'react'
import { useState } from 'react'
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
import { ResourceListLayout, type ListPageHeaderBadge } from './ResourceListLayout'
import { MediaCategoryPills, filterByMediaCategory } from './MediaCategoryPills'

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
  cardActions?: (record: Record<string, unknown>) => ReactNode
  isHighlighted?: (record: Record<string, unknown>) => boolean
  headerBadges?: ListPageHeaderBadge[]
  categoryFilterField?: string
  sortField?: string
  compact?: boolean
  /** Grille visuelle : uniquement la vignette ; détails dans l’écran d’édition au clic */
  imageOnly?: boolean
  showPlayOverlay?: boolean
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
  cardActions,
  isHighlighted,
  headerBadges,
  categoryFilterField,
  sortField = 'order',
  compact = false,
  imageOnly = false,
  showPlayOverlay = false,
}: ParishSectionListProps) {
  return (
    <ResourceListLayout title={title} subtitle={subtitle} icon={icon} badges={headerBadges}>
      <ParishSectionCardGrid
        emptyTitle={emptyTitle}
        emptyDescription={emptyDescription}
        createLabel={createLabel}
        hideCreate={hideCreate}
        getCardTitle={getCardTitle}
        getCardSubtitle={getCardSubtitle}
        getCardMeta={getCardMeta}
        getCardImage={getCardImage}
        cardActions={cardActions}
        isHighlighted={isHighlighted}
        categoryFilterField={categoryFilterField}
        sortField={sortField}
        compact={compact}
        imageOnly={imageOnly}
        showPlayOverlay={showPlayOverlay}
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
  cardActions,
  isHighlighted,
  categoryFilterField,
  sortField = 'order',
  compact = false,
  imageOnly = false,
  showPlayOverlay = false,
  icon,
}: ParishSectionCardGridProps & { icon?: ReactNode }) {
  const { data, isLoading } = useListContext()
  const resource = useResourceContext()
  const createPath = useCreatePath()
  const [selectedCategory, setSelectedCategory] = useState('all')

  if (isLoading) return <Loading />

  const allRecords = (data ?? []) as Record<string, unknown>[]
  const records = categoryFilterField
    ? filterByMediaCategory(allRecords, categoryFilterField, selectedCategory)
    : allRecords

  if (!allRecords.length) {
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
      {categoryFilterField && (
        <MediaCategoryPills
          value={selectedCategory}
          onChange={setSelectedCategory}
        />
      )}
      {records.length === 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
          Aucun élément dans cette catégorie.
        </Typography>
      ) : (
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: imageOnly
            ? 'repeat(auto-fill, minmax(min(100%, 140px), 1fr))'
            : compact
              ? 'repeat(auto-fill, minmax(min(100%, 200px), 1fr))'
              : 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))',
          gap: imageOnly ? 1 : compact ? 1.5 : 2,
        }}
      >
      {sorted.map((record) => {
        const to = createPath({ resource, id: String(record.id), type: 'edit' })
        const meta = getCardMeta?.(record) ?? []
        const highlighted = isHighlighted?.(record) ?? false
        const imageSrc = getCardImage?.(record)

        return (
          <RouterLink
            key={String(record.id)}
            to={to}
            aria-label={getCardTitle(record)}
            style={{ textDecoration: 'none', color: 'inherit', minWidth: 0 }}
          >
            <Card
              elevation={0}
              sx={{
                height: '100%',
                borderRadius: `${design.radius.lg}px`,
                border: highlighted
                  ? `1px solid ${parishColors.gold}`
                  : `1px solid ${design.border}`,
                boxShadow: highlighted ? design.shadow.sm : design.shadow.xs,
                transition: 'box-shadow 0.2s ease, border-color 0.2s ease, transform 0.2s ease',
                minWidth: 0,
                overflow: 'hidden',
                '&:hover': {
                  boxShadow: design.shadow.md,
                  borderColor: design.borderStrong,
                  ...(imageOnly ? { transform: 'scale(1.02)' } : {}),
                },
              }}
            >
              {imageOnly ? (
                <Box
                  sx={{
                    position: 'relative',
                    aspectRatio: showPlayOverlay ? '16 / 9' : '1 / 1',
                    bgcolor: design.surfaceMuted,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {imageSrc ? (
                    <Box
                      component="img"
                      src={imageSrc}
                      alt=""
                      sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  ) : (
                    <Box sx={{ color: parishColors.mutedForeground, opacity: 0.5 }}>
                      {showPlayOverlay ? <Play size={32} /> : null}
                    </Box>
                  )}
                  {showPlayOverlay && imageSrc && (
                    <Box
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'rgba(0,0,0,0.25)',
                      }}
                    >
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: '50%',
                          bgcolor: parishColors.gold,
                          color: parishColors.foreground,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Play size={18} fill="currentColor" />
                      </Box>
                    </Box>
                  )}
                </Box>
              ) : (
                <>
              {imageSrc && (
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
                    src={imageSrc}
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
                {cardActions?.(record)}
              </CardContent>
                </>
              )}
            </Card>
          </RouterLink>
        )
      })}
      </Box>
      )}
    </Box>
  )
}

const iconPlaceholder = <Box sx={{ width: 28, height: 28 }} />