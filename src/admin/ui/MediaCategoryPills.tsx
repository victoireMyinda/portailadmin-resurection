import { useState } from 'react'
import { Box, Button } from '@mui/material'
import { mediaFilterPills } from '../media/build-seed'
import { parishColors } from '../../theme/parishTheme'
import { design } from '../../theme/design-tokens'

type MediaCategoryPillsProps = {
  value?: string
  onChange?: (categoryId: string) => void
}

export function MediaCategoryPills({ value, onChange }: MediaCategoryPillsProps) {
  const [internal, setInternal] = useState('all')
  const selected = value ?? internal

  const setSelected = (id: string) => {
    if (onChange) onChange(id)
    else setInternal(id)
  }

  const pills = mediaFilterPills

  return (
    <Box sx={{ mb: 2.5, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
      {pills.map((pill) => {
        const active = selected === pill.id
        return (
          <Button
            key={pill.id}
            size="small"
            variant={active ? 'contained' : 'outlined'}
            color={active ? 'secondary' : 'inherit'}
            onClick={() => setSelected(pill.id)}
            sx={{
              borderRadius: `${design.radius.pill}px`,
              fontWeight: 600,
              textTransform: 'none',
              px: 2,
              ...(!active && {
                borderColor: design.borderStrong,
                color: parishColors.foreground,
                bgcolor: design.surface,
                '&:hover': { bgcolor: design.surfaceMuted, borderColor: design.borderStrong },
              }),
            }}
          >
            {pill.label}
          </Button>
        )
      })}
    </Box>
  )
}

export function filterByMediaCategory<T extends Record<string, unknown>>(
  records: T[],
  categoryField: string,
  selectedCategory: string,
): T[] {
  if (selectedCategory === 'all') return records
  return records.filter((record) => String(record[categoryField] ?? '') === selectedCategory)
}
