import { TopToolbar, CreateButton, ExportButton, FilterButton } from 'react-admin'
import { parishColors } from '../../theme/parishTheme'
import { design } from '../../theme/design-tokens'

export function ListActionsBar({ showFilters = false }: { showFilters?: boolean }) {
  return (
    <TopToolbar
      sx={{
        minHeight: 'auto !important',
        p: 0,
        gap: 1,
        alignItems: 'center',
        '& .MuiButton-root': {
          borderRadius: `${design.radius.sm}px`,
          fontWeight: 600,
          fontSize: '0.8125rem',
          textTransform: 'none',
        },
        '& .MuiButton-outlined': {
          borderColor: design.borderStrong,
          color: parishColors.foreground,
          bgcolor: design.surface,
          '&:hover': {
            bgcolor: design.surfaceMuted,
            borderColor: parishColors.royal,
          },
        },
      }}
    >
      {showFilters && <FilterButton />}
      <ExportButton label="Exporter" size="small" variant="outlined" />
      <CreateButton variant="contained" color="secondary" label="Ajouter" size="small" />
    </TopToolbar>
  )
}
