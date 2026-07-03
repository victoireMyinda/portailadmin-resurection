import {
  ArrayInput,
  NumberInput,
  Resource,
  SelectInput,
  SimpleFormIterator,
  TextInput,
  required,
} from 'react-admin'
import { CreditCard, Hash, Heart, Image as ImageIcon, Smartphone, Type } from 'lucide-react'
import { ParishSectionList } from '../ui/ParishSectionList'
import { PhotoSourceInput } from '../ui/CompressedImageInput'
import { SingletonRecordList } from '../ui/SingletonRecordList'
import { FormSection, ModernCreate, ModernEdit, ModernListShell } from '../ui/modern'
import { paymentCurrencyFilter, paymentTypeFilter } from '../ui/parish-list-filters'
import { donationCurrencyChoices, donationTypeChoices } from '../donations/build-seed'

const arrayIteratorSx = {
  '& .RaSimpleFormIterator-line': {
    borderRadius: 3,
    border: '1px solid',
    borderColor: 'divider',
    p: 2,
    mb: 1.5,
    bgcolor: '#f8fafc',
  },
  '& .RaSimpleFormIterator-add': { borderRadius: 2, fontWeight: 700 },
}

const settingsFields = (
  <>
    <FormSection title="Textes spirituels" icon={<Heart size={20} />}>
      <TextInput source="spiritualIntro" label="Introduction courte" validate={required()} fullWidth />
      <TextInput source="spiritualTitle" label="Titre de la section" validate={required()} fullWidth />
      <TextInput source="spiritualMessage" label="Message pastoral" validate={required()} fullWidth multiline rows={4} />
      <TextInput source="thankYou" label="Message de remerciement" validate={required()} fullWidth multiline rows={2} />
      <TextInput source="receiptNote" label="Note sur le reçu" validate={required()} fullWidth multiline rows={2} />
      <TextInput source="accountDisplayName" label="Nom de compte affiché (défaut)" validate={required()} fullWidth />
    </FormSection>
    <FormSection title="Versets bibliques" icon={<Type size={20} />}>
      <ArrayInput source="verses" label="Versets">
        <SimpleFormIterator sx={arrayIteratorSx}>
          <TextInput source="reference" label="Référence" validate={required()} fullWidth />
          <TextInput source="text" label="Texte" validate={required()} fullWidth multiline rows={3} />
        </SimpleFormIterator>
      </ArrayInput>
    </FormSection>
  </>
)

export const donationSettingsResources = (
  <Resource
    name="donationSettings"
    list={
      <ModernListShell perPage={5}>
        <SingletonRecordList
          title="Faire un don — contenu"
          subtitle="Textes spirituels et messages — /dons"
          icon={<Heart size={24} />}
          emptyTitle="Page dons non configurée"
          emptyDescription="Rédigez les textes de la page Faire un don."
          createLabel="Configurer la page"
          getCardTitle={(r) => String(r.spiritualTitle ?? '—')}
          getCardSubtitle={(r) => String(r.spiritualIntro ?? '')}
          getCardMeta={(r) => [`${((r.verses as unknown[]) ?? []).length} verset(s)`]}
        />
      </ModernListShell>
    }
    edit={
      <ModernEdit title="Modifier la page Faire un don" subtitle="Contenu spirituel">
        <FormSection title="Identifiant" icon={<Hash size={20} />}>
          <TextInput source="id" label="Identifiant" disabled fullWidth />
        </FormSection>
        {settingsFields}
      </ModernEdit>
    }
    create={
      <ModernCreate title="Configurer Faire un don" subtitle="/dons" defaultValues={{ id: 'current' }}>
        <FormSection title="Identifiant" icon={<Hash size={20} />}>
          <TextInput source="id" label="Identifiant" validate={required()} fullWidth defaultValue="current" />
        </FormSection>
        {settingsFields}
      </ModernCreate>
    }
    recordRepresentation="spiritualTitle"
    options={{ label: 'Page dons' }}
  />
)

const paymentMethodFields = (
  <>
    <FormSection title="Moyen de paiement" icon={<CreditCard size={20} />}>
      <TextInput source="name" label="Nom affiché" validate={required()} fullWidth helperText="Ex. Orange Money, Equity BCDC" />
      <SelectInput source="type" label="Type" choices={donationTypeChoices} validate={required()} fullWidth />
      <SelectInput source="currency" label="Devise" choices={donationCurrencyChoices} validate={required()} fullWidth />
      <NumberInput source="order" label="Ordre d'affichage" validate={required()} fullWidth />
    </FormSection>
    <FormSection title="Coordonnées" icon={<Smartphone size={20} />}>
      <TextInput source="accountName" label="Nom du compte" validate={required()} fullWidth />
      <TextInput source="number" label="Numéro / IBAN / instruction" validate={required()} fullWidth />
    </FormSection>
    <FormSection title="Logo / image" icon={<ImageIcon size={20} />}>
      <PhotoSourceInput label="Logo du moyen de paiement" imageUrlSource="imageUrl" />
    </FormSection>
  </>
)

export const donationPaymentMethodResources = (
  <Resource
    name="donationPaymentMethods"
    list={
      <ModernListShell
        sort={{ field: 'order', order: 'ASC' }}
        perPage={50}
        extraFilters={[paymentTypeFilter, paymentCurrencyFilter]}
      >
        <ParishSectionList
          title="Moyens de paiement"
          subtitle="Mobile Money et banques — /dons"
          icon={<CreditCard size={24} />}
          emptyTitle="Aucun moyen de paiement"
          emptyDescription="Ajoutez les comptes Mobile Money et bancaires."
          createLabel="Ajouter un moyen"
          getCardTitle={(r) => String(r.name ?? '—')}
          getCardSubtitle={(r) => String(r.number ?? '')}
          getCardImage={(r) => String(r.imageUrl ?? '').trim() || undefined}
          getCardMeta={(r) => [
            String(r.type === 'mobile' ? 'Mobile Money' : 'Banque'),
            String(r.currency ?? ''),
          ]}
          compact
        />
      </ModernListShell>
    }
    edit={
      <ModernEdit title="Modifier le moyen de paiement" subtitle="Faire un don">
        <FormSection title="Identifiant" icon={<Hash size={20} />}>
          <TextInput source="id" label="Identifiant" disabled fullWidth />
        </FormSection>
        {paymentMethodFields}
      </ModernEdit>
    }
    create={
      <ModernCreate title="Nouveau moyen de paiement" subtitle="Faire un don" defaultValues={{ order: 10, type: 'mobile', currency: 'CDF', imageSource: 'url' }}>
        <FormSection title="Identifiant" icon={<Hash size={20} />}>
          <TextInput source="id" label="Identifiant" validate={required()} fullWidth helperText="Ex. orange, equity" />
        </FormSection>
        {paymentMethodFields}
      </ModernCreate>
    }
    recordRepresentation="name"
    options={{ label: 'Paiements dons' }}
  />
)
