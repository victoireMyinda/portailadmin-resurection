import { Button, alpha } from '@mui/material'
import { Mail, MailOpen } from 'lucide-react'
import { useUpdate, useNotify, useRefresh } from 'react-admin'
import { parishColors } from '../../theme/parishTheme'
import { design } from '../../theme/design-tokens'

type ReadToggleButtonProps = {
  record: Record<string, unknown>
}

export function ReadToggleButton({ record }: ReadToggleButtonProps) {
  const [update, { isLoading }] = useUpdate()
  const notify = useNotify()
  const refresh = useRefresh()
  const read = record.read === true
  const id = String(record.id)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    update(
      'visitorMessages',
      {
        id,
        data: { read: !read },
        previousData: record,
      },
      {
        onSuccess: () => {
          notify(read ? 'Message marqué comme non lu' : 'Message marqué comme lu', { type: 'info' })
          refresh()
        },
        onError: () => {
          notify('Impossible de mettre à jour le statut', { type: 'error' })
        },
      },
    )
  }

  return (
    <Button
      size="small"
      variant="outlined"
      disabled={isLoading}
      onClick={handleClick}
      startIcon={read ? <MailOpen size={14} /> : <Mail size={14} />}
      sx={{
        mt: 1.25,
        borderRadius: `${design.radius.sm}px`,
        fontSize: '0.6875rem',
        fontWeight: 600,
        textTransform: 'none',
        borderColor: read ? design.border : alpha(parishColors.gold, 0.5),
        color: read ? parishColors.mutedForeground : '#92680a',
        bgcolor: read ? 'transparent' : alpha(parishColors.gold, 0.06),
        '&:hover': {
          borderColor: read ? design.borderStrong : parishColors.gold,
          bgcolor: read ? design.surfaceMuted : alpha(parishColors.gold, 0.12),
        },
      }}
    >
      {read ? 'Marquer non lu' : 'Marquer lu'}
    </Button>
  )
}
