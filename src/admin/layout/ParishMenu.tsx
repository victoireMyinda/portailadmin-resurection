import { Menu, MenuItemLink, DashboardMenuItem } from 'react-admin'
import { Typography } from '@mui/material'
import { MapPin, Share2, Inbox, UserCog, Settings } from 'lucide-react'
import { design } from '../../theme/design-tokens'
import { PagesMenuItem } from './PagesMenuItem'
import { SidebarBrand } from './SidebarBrand'

function MenuGroup({ label }: { label: string }) {
  return (
    <Typography
      variant="caption"
      sx={{
        display: 'block',
        px: 2.5,
        pt: 2,
        pb: 0.75,
        fontWeight: 700,
        letterSpacing: '0.14em',
        fontSize: '0.625rem',
        textTransform: 'uppercase',
        color: design.sidebarTextMuted,
      }}
    >
      {label}
    </Typography>
  )
}

export function ParishMenu() {
  return (
    <Menu sx={{ mt: 0, pb: 2 }}>
      <SidebarBrand />
      <DashboardMenuItem sx={{ borderRadius: `${design.radius.sm}px`, mx: 1.25 }} />
      <PagesMenuItem />

      <MenuGroup label="Informations" />
      <MenuItemLink to="/contacts" primaryText="Contacts" leftIcon={<MapPin size={18} strokeWidth={1.75} />} />
      <MenuItemLink
        to="/socialNetworks"
        primaryText="Réseaux sociaux"
        leftIcon={<Share2 size={18} strokeWidth={1.75} />}
      />

      <MenuGroup label="Administration" />
      <MenuItemLink to="/visitorMessages" primaryText="Messages" leftIcon={<Inbox size={18} strokeWidth={1.75} />} />
      <MenuItemLink
        to="/parishUsers"
        primaryText="Utilisateurs"
        leftIcon={<UserCog size={18} strokeWidth={1.75} />}
      />
      <MenuItemLink to="/settings" primaryText="Paramètres" leftIcon={<Settings size={18} strokeWidth={1.75} />} />
    </Menu>
  )
}
