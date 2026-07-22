import { useEffect, useState } from 'react'
import { TextField } from '@mui/material'
import { useGetOne, useNotify, useUpdate } from 'react-admin'

export const PARISH_LOGO_ID = 'header'

type ParishLogoArchdioceseFieldProps = {
  helperText?: string
}

/** Champ partagé — enregistre le titre archidiocèse sur parishLogos/header. */
export function ParishLogoArchdioceseField({
  helperText = 'Affiché en doré au-dessus du titre sur toutes les bannières du portail public',
}: ParishLogoArchdioceseFieldProps) {
  const { data, isLoading } = useGetOne('parishLogos', { id: PARISH_LOGO_ID })
  const [update] = useUpdate()
  const notify = useNotify()
  const [value, setValue] = useState('')

  useEffect(() => {
    if (!data) return
    setValue(String(data.archdioceseBannerTitle ?? 'Archidiocèse de Kinshasa'))
  }, [data])

  const handleBlur = async () => {
    if (!data || value === (data.archdioceseBannerTitle ?? '')) return
    try {
      await update('parishLogos', {
        id: PARISH_LOGO_ID,
        data: { ...data, archdioceseBannerTitle: value },
        previousData: data,
      })
      notify('Titre archidiocèse enregistré', { type: 'success' })
    } catch {
      notify('Erreur lors de l’enregistrement du titre archidiocèse', { type: 'error' })
    }
  }

  if (isLoading) return null

  return (
    <TextField
      label="Titre archidiocèse (en-tête des bannières)"
      value={value}
      onChange={(event) => setValue(event.target.value)}
      onBlur={() => void handleBlur()}
      fullWidth
      helperText={helperText}
    />
  )
}

export function useParishLogoArchdioceseTitle(): string {
  const { data } = useGetOne('parishLogos', { id: PARISH_LOGO_ID })
  return String(data?.archdioceseBannerTitle ?? 'Archidiocèse de Kinshasa')
}
