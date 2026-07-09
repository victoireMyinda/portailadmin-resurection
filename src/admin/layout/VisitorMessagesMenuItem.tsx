import { MenuItemLink } from 'react-admin'
import { Box, Typography } from '@mui/material'
import { Inbox } from 'lucide-react'
import { useUnreadVisitorMessagesCount } from '../visitor-messages/unread-count'
import { design } from '../../theme/design-tokens'
import { parishColors } from '../../theme/parishTheme'

export function VisitorMessagesMenuItem() {
  const unread = useUnreadVisitorMessagesCount()

  return (
    <MenuItemLink
      to="/visitorMessages"
      primaryText={
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: 1 }}>
          <span>Messages</span>
          {unread > 0 && (
            <Typography
              component="span"
              aria-label={`${unread} message${unread > 1 ? 's' : ''} non lu${unread > 1 ? 's' : ''}`}
              sx={{
                fontSize: '0.625rem',
                fontWeight: 700,
                minWidth: 20,
                height: 20,
                px: 0.75,
                borderRadius: design.radius.pill,
                bgcolor: parishColors.gold,
                color: '#fff',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                lineHeight: 1,
                flexShrink: 0,
              }}
            >
              {unread > 99 ? '99+' : unread}
            </Typography>
          )}
        </Box>
      }
      leftIcon={<Inbox size={18} strokeWidth={1.75} />}
    />
  )
}
