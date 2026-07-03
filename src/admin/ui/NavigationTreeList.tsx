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
import { ChevronRight, LayoutList, Link2, Plus } from 'lucide-react'
import { Link as RouterLink } from 'react-router-dom'
import {
  CreateButton,
  Loading,
  useCreatePath,
  useListContext,
  useResourceContext,
} from 'react-admin'
import { parishColors } from '../../theme/parishTheme'
import type { NavigationItemRecord } from '../../types'
import { EmptyState } from './EmptyState'
import { NavPortalPreview } from './NavPortalPreview'
import { ResourceListLayout } from './ResourceListLayout'

function sortByOrder(a: NavigationItemRecord, b: NavigationItemRecord) {
  return (a.order ?? 0) - (b.order ?? 0)
}

export function NavigationListView() {
  return (
    <ResourceListLayout
      title="Navigation & onglets"
      subtitle="Onglets principaux du menu et sous-onglets des sections — comme sur le portail public"
      icon={<LayoutList size={24} />}
    >
      <NavigationTreeList />
    </ResourceListLayout>
  )
}

function NavigationTreeList() {
  const { data, isLoading } = useListContext()
  const resource = useResourceContext()
  const createPath = useCreatePath()

  if (isLoading) return <Loading />

  const items = (data ?? []) as NavigationItemRecord[]

  if (!items.length) {
    return (
      <EmptyState
        title="Aucun onglet configuré"
        description="Ajoutez les onglets principaux et leurs sous-onglets pour reproduire le menu du portail."
        icon={<LayoutList size={28} />}
        action={<CreateButton variant="contained" color="secondary" label="Ajouter un onglet" />}
      />
    )
  }

  const mainTabs = items.filter((item) => !item.parentId).sort(sortByOrder)
  const childrenByParent = new Map<string, NavigationItemRecord[]>()
  for (const item of items) {
    if (!item.parentId) continue
    const list = childrenByParent.get(item.parentId) ?? []
    list.push(item)
    childrenByParent.set(item.parentId, list)
  }
  for (const list of childrenByParent.values()) {
    list.sort(sortByOrder)
  }

  return (
    <Stack spacing={3}>
      <NavPortalPreview items={items} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: parishColors.mutedForeground }}>
          Structure ({mainTabs.length} onglets principaux · {items.length - mainTabs.length} sous-onglets)
        </Typography>
        <CreateButton variant="contained" color="secondary" size="small" label="Nouvel onglet" />
      </Box>

      <Stack spacing={2}>
        {mainTabs.map((tab) => {
          const children = childrenByParent.get(tab.id) ?? []
          const editMain = createPath({ resource, id: tab.id, type: 'edit' })
          const createSub = `${createPath({ resource, type: 'create' })}?parentId=${encodeURIComponent(tab.id)}`

          return (
            <Card
              key={tab.id}
              sx={{
                borderRadius: 4,
                border: '1px solid',
                borderColor: alpha(parishColors.royal, 0.1),
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  px: 2.5,
                  py: 1.25,
                  bgcolor: alpha(parishColors.royal, 0.06),
                  borderBottom: '1px solid',
                  borderColor: alpha(parishColors.royal, 0.1),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 1,
                }}
              >
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center', minWidth: 0 }}>
                  <Chip label="Principal" size="small" color="primary" sx={{ fontWeight: 700, fontSize: 10 }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }} noWrap>
                    {tab.label}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
                  <IconButton
                    component={RouterLink}
                    to={createSub}
                    size="small"
                    title="Ajouter un sous-onglet"
                    sx={{ color: parishColors.royal }}
                  >
                    <Plus size={18} />
                  </IconButton>
                  <IconButton component={RouterLink} to={editMain} size="small" sx={{ color: parishColors.royal }}>
                    <ChevronRight size={20} />
                  </IconButton>
                </Stack>
              </Box>

              <CardContent sx={{ p: 2.5 }}>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: children.length ? 2 : 0 }}>
                  <Link2 size={14} color={parishColors.mutedForeground} />
                  <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace', fontSize: 12 }}>
                    {tab.href}
                  </Typography>
                  <Chip label={`Ordre ${tab.order}`} size="small" variant="outlined" sx={{ ml: 'auto' }} />
                </Stack>

                {children.length > 0 ? (
                  <Box>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: parishColors.mutedForeground, mb: 1, display: 'block' }}>
                      Sous-onglets ({children.length})
                    </Typography>
                    <Stack spacing={1}>
                      {children.map((child) => {
                        const editChild = createPath({ resource, id: child.id, type: 'edit' })
                        return (
                          <RouterLink key={child.id} to={editChild} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1.5,
                                pl: 2,
                                pr: 1,
                                py: 1.25,
                                borderRadius: 2,
                                border: '1px solid',
                                borderColor: 'divider',
                                bgcolor: '#fafbfc',
                                transition: 'all 0.2s',
                                '&:hover': {
                                  borderColor: alpha(parishColors.gold, 0.4),
                                  bgcolor: alpha(parishColors.royal, 0.03),
                                },
                              }}
                            >
                              <Box
                                sx={{
                                  width: 6,
                                  height: 6,
                                  borderRadius: '50%',
                                  bgcolor: parishColors.gold,
                                  flexShrink: 0,
                                }}
                              />
                              <Box sx={{ minWidth: 0, flex: 1 }}>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                  {child.label}
                                </Typography>
                                <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
                                  {child.href}
                                </Typography>
                              </Box>
                              <Chip label={child.order} size="small" variant="outlined" sx={{ fontSize: 11 }} />
                              <ChevronRight size={16} color={parishColors.mutedForeground} />
                            </Box>
                          </RouterLink>
                        )
                      })}
                    </Stack>
                  </Box>
                ) : (
                  <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                    Pas de sous-onglet — lien direct dans le menu principal
                  </Typography>
                )}
              </CardContent>
            </Card>
          )
        })}
      </Stack>
    </Stack>
  )
}
