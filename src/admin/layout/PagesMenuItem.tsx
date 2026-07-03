import { MenuItemLink } from 'react-admin'
import { useLocation } from 'react-router-dom'
import { FileStack } from 'lucide-react'
import { pageSections } from '../pages/page-sections'
import { design } from '../../theme/design-tokens'
import { parishColors } from '../../theme/parishTheme'

const pagePaths = pageSections.flatMap((section) => section.modules.map((mod) => mod.to))

export function PagesMenuItem() {
  const location = useLocation()
  const isOnPagesHub = location.pathname === '/pages' || location.pathname.endsWith('/pages')
  const isOnPageModule = pagePaths.some((path) => location.pathname.startsWith(path))
  const isActive = isOnPagesHub || isOnPageModule

  return (
    <MenuItemLink
      to="/pages"
      primaryText="Gestion des pages"
      leftIcon={<FileStack size={18} strokeWidth={1.75} />}
      sx={{
        borderRadius: `${design.radius.sm}px`,
        mx: 1.25,
        mb: 0.5,
        ...(isActive && {
          bgcolor: design.sidebarActive,
          color: design.sidebarTextActive,
          fontWeight: 600,
          borderLeft: `3px solid ${parishColors.gold}`,
        }),
      }}
    />
  )
}
