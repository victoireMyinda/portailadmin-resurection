import ClearIcon from '@mui/icons-material/Clear'
import SearchIcon from '@mui/icons-material/Search'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { useInput } from 'ra-core'

type ParishSearchInputProps = {
  source?: string
  placeholder?: string
  alwaysOn?: boolean
  resettable?: boolean
}

/** Barre de recherche compatible MUI 9 (évite InputProps de react-admin SearchInput). */
export function ParishSearchInput({
  source = 'q',
  placeholder = 'Rechercher…',
  resettable = true,
}: ParishSearchInputProps) {
  const { field, id } = useInput({ source })

  return (
    <TextField
      id={id}
      name={field.name}
      value={field.value ?? ''}
      onChange={field.onChange}
      onBlur={field.onBlur}
      ref={field.ref}
      size="small"
      placeholder={placeholder}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              {resettable && field.value ? (
                <IconButton
                  size="small"
                  aria-label="Effacer la recherche"
                  onClick={() => field.onChange('')}
                  edge="end"
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              ) : (
                <SearchIcon color="disabled" fontSize="small" />
              )}
            </InputAdornment>
          ),
        },
      }}
    />
  )
}
