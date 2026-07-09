import { BooleanInput, Resource, TextInput, required, minLength, maxLength } from 'react-admin'
import { Hash, Mail, Type, User } from 'lucide-react'
import { FormSection, ModernCreate, ModernEdit, ModernListShell } from '../ui/modern'
import { visitorReadFilter } from '../ui/parish-list-filters'
import { VisitorMessagesList } from '../visitor-messages/visitor-messages-list'

const visitorMessageFormFields = (
  <>
    <FormSection title="Expéditeur" icon={<User size={20} />}>
      <TextInput
        source="name"
        label="Nom"
        validate={[required(), minLength(2), maxLength(120)]}
        fullWidth
      />
      <TextInput
        source="phone"
        label="Téléphone"
        validate={[required(), minLength(6), maxLength(40)]}
        fullWidth
      />
    </FormSection>
    <FormSection title="Message" icon={<Mail size={20} />}>
      <TextInput
        source="message"
        label="Contenu"
        validate={[required(), minLength(10), maxLength(2000)]}
        fullWidth
        multiline
        rows={8}
      />
      <TextInput
        source="createdAt"
        label="Reçu le (ISO)"
        validate={required()}
        fullWidth
        helperText="Format : 2026-07-09T10:30:00.000Z"
      />
    </FormSection>
    <FormSection title="Suivi" icon={<Type size={20} />}>
      <BooleanInput source="read" label="Marqué comme lu" />
    </FormSection>
  </>
)

export const visitorMessageResources = (
  <Resource
    name="visitorMessages"
    list={
      <ModernListShell sort={{ field: 'createdAt', order: 'DESC' }} perPage={50} extraFilters={[visitorReadFilter]}>
        <VisitorMessagesList />
      </ModernListShell>
    }
    edit={
      <ModernEdit title="Modifier le message" subtitle="Édition complète du message visiteur">
        <FormSection title="Identifiant" icon={<Hash size={20} />}>
          <TextInput source="id" label="Identifiant Firestore" disabled fullWidth />
        </FormSection>
        {visitorMessageFormFields}
      </ModernEdit>
    }
    create={
      <ModernCreate
        title="Nouveau message"
        subtitle="Saisie manuelle (test, relance secrétariat…)"
        defaultValues={{
          read: false,
          createdAt: new Date().toISOString(),
        }}
      >
        <FormSection title="Identifiant" icon={<Hash size={20} />}>
          <TextInput
            source="id"
            label="Identifiant (optionnel)"
            fullWidth
            helperText="Laissé vide : généré automatiquement"
          />
        </FormSection>
        {visitorMessageFormFields}
      </ModernCreate>
    }
    recordRepresentation="name"
    options={{ label: 'Messages' }}
  />
)
