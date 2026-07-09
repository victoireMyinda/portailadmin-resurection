import { Inbox } from 'lucide-react'
import { ParishSectionList } from '../ui/ParishSectionList'
import { ReadToggleButton } from './read-toggle-button'
import { isVisitorMessageUnread, useUnreadVisitorMessagesCount } from './unread-count'

export function VisitorMessagesList() {
  const unread = useUnreadVisitorMessagesCount()

  return (
    <ParishSectionList
      title="Messages des visiteurs"
      subtitle="Avis et demandes envoyés depuis le portail public"
      icon={<Inbox size={24} />}
      emptyTitle="Aucun message"
      emptyDescription="Les messages du portail public ou une saisie manuelle apparaîtront ici."
      createLabel="Ajouter un message"
      sortField="createdAt"
      compact
      headerBadges={
        unread > 0
          ? [{ label: unread > 1 ? 'non lus' : 'non lu', count: unread, emphasis: 'alert' as const }]
          : undefined
      }
      getCardTitle={(r) => String(r.name ?? '—')}
      getCardSubtitle={(r) => String(r.message ?? '').slice(0, 100)}
      getCardMeta={(r) => [
        String(r.phone ?? ''),
        r.read === true ? 'Lu' : 'Non lu',
        String(r.createdAt ?? '').slice(0, 10),
      ]}
      isHighlighted={(r) => isVisitorMessageUnread({ read: r.read as boolean | undefined })}
      cardActions={(r) => <ReadToggleButton record={r} />}
    />
  )
}
