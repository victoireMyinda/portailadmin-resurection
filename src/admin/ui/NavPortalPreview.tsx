import { useMemo, useState } from 'react'
import { Box, Typography, alpha } from '@mui/material'
import { ChevronDown } from 'lucide-react'
import { parishColors } from '../../theme/parishTheme'
import type { NavigationItemRecord } from '../../types'

type NavPortalPreviewProps = {
  items: NavigationItemRecord[]
}

function sortByOrder(a: NavigationItemRecord, b: NavigationItemRecord) {
  return (a.order ?? 0) - (b.order ?? 0)
}

export function NavPortalPreview({ items }: NavPortalPreviewProps) {
  const mainTabs = useMemo(
    () => items.filter((item) => !item.parentId).sort(sortByOrder),
    [items],
  )

  const childrenByParent = useMemo(() => {
    const map = new Map<string, NavigationItemRecord[]>()
    for (const item of items) {
      if (!item.parentId) continue
      const list = map.get(item.parentId) ?? []
      list.push(item)
      map.set(item.parentId, list)
    }
    for (const list of map.values()) {
      list.sort(sortByOrder)
    }
    return map
  }, [items])

  const defaultActive =
    mainTabs.find((tab) => (childrenByParent.get(tab.id)?.length ?? 0) > 0)?.id ?? mainTabs[0]?.id ?? null
  const [activeId, setActiveId] = useState<string | null>(defaultActive)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const activeChildren = activeId ? (childrenByParent.get(activeId) ?? []) : []

  return (
    <Box
      sx={{
        borderRadius: 3,
        border: '1px solid',
        borderColor: alpha(parishColors.royal, 0.12),
        bgcolor: '#fff',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(13,71,161,0.06)',
      }}
    >
      <Typography
        variant="caption"
        sx={{
          display: 'block',
          px: 2.5,
          pt: 2,
          pb: 1,
          fontWeight: 700,
          letterSpacing: 0.5,
          color: parishColors.mutedForeground,
        }}
      >
        Aperçu — navigation du portail public
      </Typography>

      {/* Barre principale (desktop) */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 0.5,
          px: 2,
          py: 1.5,
          borderBottom: '1px solid',
          borderColor: 'divider',
          bgcolor: alpha(parishColors.royal, 0.02),
        }}
      >
        {mainTabs.map((tab) => {
          const hasChildren = (childrenByParent.get(tab.id)?.length ?? 0) > 0
          const isActive = activeId === tab.id

          if (hasChildren) {
            return (
              <Box
                key={tab.id}
                sx={{ position: 'relative' }}
                onMouseEnter={() => setOpenDropdown(tab.id)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Box
                  component="button"
                  type="button"
                  onClick={() => setActiveId(tab.id)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    border: 'none',
                    cursor: 'pointer',
                    borderRadius: 1.5,
                    px: 1.25,
                    py: 1,
                    fontSize: 13,
                    fontWeight: 600,
                    bgcolor: isActive ? alpha(parishColors.royal, 0.1) : 'transparent',
                    color: isActive ? parishColors.royal : parishColors.mutedForeground,
                    '&:hover': { bgcolor: alpha(parishColors.royal, 0.06) },
                  }}
                >
                  {tab.label}
                  <ChevronDown size={14} style={{ opacity: 0.6 }} />
                </Box>
                {openDropdown === tab.id && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      zIndex: 10,
                      minWidth: 220,
                      mt: 0.5,
                      py: 1,
                      px: 1,
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                      bgcolor: '#fff',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    }}
                  >
                    {(childrenByParent.get(tab.id) ?? []).map((child) => (
                      <Typography
                        key={child.id}
                        sx={{
                          display: 'block',
                          px: 1.5,
                          py: 0.75,
                          fontSize: 13,
                          borderRadius: 1.5,
                          color: parishColors.foreground,
                          '&:hover': { bgcolor: alpha(parishColors.royal, 0.06) },
                        }}
                      >
                        {child.label}
                      </Typography>
                    ))}
                  </Box>
                )}
              </Box>
            )
          }

          return (
            <Box
              key={tab.id}
              component="button"
              type="button"
              onClick={() => setActiveId(tab.id)}
              sx={{
                border: 'none',
                cursor: 'pointer',
                borderRadius: 1.5,
                px: 1.25,
                py: 1,
                fontSize: 13,
                fontWeight: 600,
                bgcolor: isActive ? alpha(parishColors.royal, 0.1) : 'transparent',
                color: isActive ? parishColors.royal : parishColors.mutedForeground,
                '&:hover': { bgcolor: alpha(parishColors.royal, 0.06) },
              }}
            >
              {tab.label}
            </Box>
          )
        })}
      </Box>

      {/* Sous-navigation (pills) */}
      {activeChildren.length > 0 && (
        <Box sx={{ px: 2, py: 1.5, bgcolor: alpha(parishColors.muted, 0.6) }}>
          <Typography variant="caption" sx={{ color: parishColors.mutedForeground, mb: 1, display: 'block' }}>
            Sous-onglets de la section
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
            {activeChildren.map((child, index) => (
              <Box
                key={child.id}
                sx={{
                  px: 2,
                  py: 0.75,
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 600,
                  bgcolor: index === 0 ? parishColors.royal : 'transparent',
                  color: index === 0 ? '#fff' : parishColors.mutedForeground,
                  border: index === 0 ? 'none' : `1px solid ${parishColors.border}`,
                }}
              >
                {child.label}
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  )
}
