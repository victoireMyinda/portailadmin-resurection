import type { ReactNode } from 'react'
import { useListContext, useResourceContext } from 'react-admin'
import { Box, Button } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { ListPageHeader } from './ListPageHeader'
import { ListActionsBar } from './ListActionsBar'
import { getPageHubBackTarget } from '../navigation/page-routes'
import { parishColors } from '../../theme/parishTheme'
import { design } from '../../theme/design-tokens'

type ResourceListLayoutProps = {
  title: string
  subtitle?: string
  icon: ReactNode
  showFilters?: boolean
  children: ReactNode
}

export function ResourceListLayout({
  title,
  subtitle,
  icon,
  showFilters = false,
  children,
}: ResourceListLayoutProps) {
  const { total, isLoading } = useListContext()
  const resource = useResourceContext()
  const hubBack = resource ? getPageHubBackTarget(resource) : null

  return (
    <Box>
      {hubBack && (
        <Button
          component={RouterLink}
          to={hubBack.to}
          size="small"
          startIcon={<ArrowLeft size={16} />}
          sx={{
            mb: 1.5,
            borderRadius: `${design.radius.sm}px`,
            fontWeight: 600,
            fontSize: '0.8125rem',
            color: parishColors.royal,
            bgcolor: design.surface,
            border: `1px solid ${design.border}`,
            boxShadow: design.shadow.xs,
            '&:hover': { bgcolor: design.surfaceMuted, borderColor: design.borderStrong },
          }}
        >
          {hubBack.label}
        </Button>
      )}
      <ListPageHeader
        title={title}
        subtitle={subtitle}
        icon={icon}
        count={isLoading ? undefined : total}
        actions={<ListActionsBar showFilters={showFilters} />}
      />
      {children}
    </Box>
  )
}
