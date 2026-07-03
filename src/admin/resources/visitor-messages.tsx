import { BooleanInput, Resource, TextInput } from 'react-admin'
import { Inbox, Mail, Type, User } from 'lucide-react'
import { ParishSectionList } from '../ui/ParishSectionList'
import { FormSection, ModernEdit, ModernListShell } from '../ui/modern'
import { visitorReadFilter } from '../ui/parish-list-filters'

export const visitorMessageResources = (
  <Resource
    name="visitorMessages"
    list={
      <ModernListShell sort={{ field: 'createdAt', order: 'DESC' }} perPage={50} extraFilters={[visitorReadFilter]}>
        <ParishSectionList
          title="Messages des visiteurs"
          subtitle="Avis et demandes envoyés depuis le portail"
          icon={<Inbox size={24} />}
          emptyTitle="Aucun message"
          emptyDescription="Les messages envoyés depuis le site apparaîtront ici."
          createLabel=""
          hideCreate
          sortField="createdAt"
          getCardTitle={(r) => String(r.name ?? '—')}
          getCardSubtitle={(r) => String(r.message ?? '').slice(0, 100)}
          getCardMeta={(r) => [
            String(r.phone ?? ''),
            r.read ? 'Lu' : 'Non lu',
            String(r.createdAt ?? '').slice(0, 10),
          ]}
          compact
        />
      </ModernListShell>
    }
    edit={
      <ModernEdit title="Message visiteur" subtitle="Lecture et suivi">
        <FormSection title="Expéditeur" icon={<User size={20} />}>
          <TextInput source="name" label="Nom" disabled fullWidth />
          <TextInput source="phone" label="Téléphone" disabled fullWidth />
          <TextInput source="createdAt" label="Reçu le" disabled fullWidth />
        </FormSection>
        <FormSection title="Message" icon={<Mail size={20} />}>
          <TextInput source="message" label="Contenu" disabled fullWidth multiline rows={8} />
        </FormSection>
        <FormSection title="Suivi" icon={<Type size={20} />}>
          <BooleanInput source="read" label="Marquer comme lu" />
        </FormSection>
      </ModernEdit>
    }
    recordRepresentation="name"
    options={{ label: 'Messages' }}
  />
)
