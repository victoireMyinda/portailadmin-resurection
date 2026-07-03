import { Layout, type LayoutProps } from 'react-admin'
import { ParishAppBar } from './ParishAppBar'
import { ParishMenu } from './ParishMenu'
import { design } from '../../theme/design-tokens'
import { parishColors } from '../../theme/parishTheme'

export function ParishLayout(props: LayoutProps) {
  return (
    <Layout
      {...props}
      appBar={ParishAppBar}
      menu={ParishMenu}
      sx={{
        '& .RaLayout-appFrame': { bgcolor: design.canvas },
        '& .RaLayout-content': {
          background: design.canvas,
        },
        '& .RaSidebar-fixed': {
          background: design.sidebarGradient,
          borderRight: 'none',
          boxShadow: '4px 0 24px rgba(13, 71, 161, 0.15)',
        },
        '& .RaSidebar-fixed .MuiDrawer-paper': {
          background: design.sidebarGradient,
          borderRight: 'none',
        },
        '& .RaMenuItemLink-root': {
          color: design.sidebarText,
          borderRadius: `${design.radius.sm}px`,
          margin: '2px 10px',
          py: 1.1,
          px: 1.5,
          fontWeight: 500,
          fontSize: '0.875rem',
          transition: 'background 0.15s ease, color 0.15s ease',
          borderLeft: '3px solid transparent',
          '&:hover': {
            bgcolor: design.sidebarHover,
            color: design.sidebarTextActive,
          },
        },
        '& .RaMenuItemLink-active': {
          bgcolor: `${design.sidebarActive} !important`,
          color: `${design.sidebarTextActive} !important`,
          fontWeight: 600,
          borderLeft: `3px solid ${parishColors.gold} !important`,
        },
        '& .RaMenuItemLink-icon': {
          color: 'rgba(255,255,255,0.55)',
          minWidth: 36,
        },
        '& .RaMenuItemLink-active .RaMenuItemLink-icon': {
          color: parishColors.gold,
        },
        '& .RaMenu-open': { width: 260 },
        '& .RaList-content': { boxShadow: 'none' },
      }}
    />
  )
}
