import {
  NumberInput,
  Resource,
  TextInput,
  required,
} from 'react-admin'
import { Building2, Clock, MapPin, User } from 'lucide-react'
import { ParishSectionList } from '../ui/ParishSectionList'
import { FormSection, ModernCreate, ModernEdit, ModernListShell } from '../ui/modern'

const visitFormFields = (
  <>
    <FormSection title="Personne & jour" icon={<User size={20} />}>
      <TextInput source="name" label="Nom" validate={required()} fullWidth helperText="Secrétaire ou Père Curé" />
      <TextInput source="day" label="Jour de visite" validate={required()} fullWidth helperText="Ex. Lundi – Vendredi, Mardi…" />
      <TextInput source="timeRange" label="Tranche horaire" validate={required()} fullWidth helperText="Ex. 08h00 – 12h00" />
      <NumberInput source="order" label="Ordre d'affichage" validate={required()} fullWidth />
    </FormSection>
    <FormSection title="Lieu & contact" icon={<MapPin size={20} />}>
      <TextInput source="location" label="Lieu" validate={required()} fullWidth />
      <TextInput source="phone" label="Numéro de téléphone" validate={required()} fullWidth />
    </FormSection>
  </>
)

function buildVisitResource({
  name,
  title,
  subtitle,
  icon,
  emptyTitle,
  emptyDescription,
  label,
}: {
  name: string
  title: string
  subtitle: string
  icon: React.ReactNode
  emptyTitle: string
  emptyDescription: string
  label: string
}) {
  return (
    <Resource
      name={name}
      list={
        <ModernListShell sort={{ field: 'order', order: 'ASC' }} perPage={50}>
          <ParishSectionList
            title={title}
            subtitle={subtitle}
            icon={icon}
            emptyTitle={emptyTitle}
            emptyDescription={emptyDescription}
            createLabel="Ajouter une permanence"
            getCardTitle={(r) => String(r.name ?? '—')}
            getCardSubtitle={(r) => `${String(r.day ?? '')} · ${String(r.timeRange ?? '')}`}
            getCardMeta={(r) => [String(r.location ?? ''), String(r.phone ?? '')]}
            compact
          />
        </ModernListShell>
      }
      edit={
        <ModernEdit title={`Modifier — ${title}`} subtitle={subtitle}>
          {visitFormFields}
        </ModernEdit>
      }
      create={
        <ModernCreate title={`Nouvelle permanence — ${title}`} subtitle={subtitle} defaultValues={{ order: 10 }}>
          {visitFormFields}
        </ModernCreate>
      }
      recordRepresentation="name"
      options={{ label }}
    />
  )
}

export const parishSecretaryVisitResources = buildVisitResource({
  name: 'parishSecretaryVisits',
  title: 'Visites du Secrétariat',
  subtitle: 'Permanences du secrétariat — /visites-horaires',
  icon: <Building2 size={24} />,
  emptyTitle: 'Aucune permanence secrétariat',
  emptyDescription: 'Ajoutez les créneaux de visite du secrétariat paroissial.',
  label: 'Visites Secrétariat',
})

export const parishCurateVisitResources = buildVisitResource({
  name: 'parishCurateVisits',
  title: 'Visites du Père Curé',
  subtitle: 'Permanences du curé — /visites-horaires',
  icon: <Clock size={24} />,
  emptyTitle: 'Aucune permanence curé',
  emptyDescription: 'Ajoutez les créneaux de visite du Père Curé.',
  label: 'Visites Père Curé',
})
