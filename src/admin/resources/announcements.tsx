import {
  DateInput,
  NumberInput,
  Resource,
  SelectInput,
  TextInput,
  required,
} from 'react-admin'
import { Bell, Calendar, FileText, Hash, Image as ImageIcon, Type } from 'lucide-react'
import { ParishSectionList } from '../ui/ParishSectionList'
import { FormSection, ModernCreate, ModernEdit, ModernListShell } from '../ui/modern'
import { announcementCategoryChoices } from '../announcements/build-seed'

const mediaTypeChoices = [
  { id: 'none', name: 'Aucun média' },
  { id: 'image', name: 'Image' },
  { id: 'video', name: 'Vidéo YouTube' },
]

const announcementFormFields = (
  <>
    <FormSection title="Contenu" icon={<Type size={20} />}>
      <TextInput source="title" label="Titre" validate={required()} fullWidth />
      <SelectInput source="category" label="Catégorie" choices={announcementCategoryChoices} validate={required()} fullWidth />
      <DateInput source="date" label="Date" validate={required()} fullWidth />
      <TextInput source="excerpt" label="Résumé court" validate={required()} fullWidth multiline rows={2} />
      <TextInput source="content" label="Contenu complet" validate={required()} fullWidth multiline rows={6} />
      <NumberInput source="order" label="Ordre d'affichage" validate={required()} fullWidth />
    </FormSection>
    <FormSection title="Média (optionnel)" icon={<ImageIcon size={20} />}>
      <SelectInput source="mediaType" label="Type de média" choices={mediaTypeChoices} fullWidth defaultValue="none" />
      <TextInput source="mediaImageUrl" label="URL de l'image" fullWidth helperText="Si type = Image" />
      <TextInput source="mediaYoutubeId" label="ID YouTube" fullWidth helperText="Ex. FxMDSUhFgSk — si type = Vidéo" />
    </FormSection>
  </>
)

export const weeklyAnnouncementResources = (
  <Resource
    name="weeklyAnnouncements"
    list={
      <ModernListShell sort={{ field: 'order', order: 'ASC' }} perPage={50}>
        <ParishSectionList
          title="Annonce de la semaine"
          subtitle="Bulletin hebdomadaire — /annonces/semaine"
          icon={<Bell size={24} />}
          emptyTitle="Aucune annonce de la semaine"
          emptyDescription="Ajoutez les annonces du bulletin hebdomadaire."
          createLabel="Ajouter une annonce"
          getCardTitle={(r) => String(r.title ?? '—')}
          getCardSubtitle={(r) => String(r.excerpt ?? '').slice(0, 80)}
          getCardMeta={(r) => [String(r.date ?? ''), String(r.category ?? '')]}
          compact
        />
      </ModernListShell>
    }
    edit={
      <ModernEdit title="Modifier l'annonce" subtitle="Annonce de la semaine">
        <FormSection title="Identifiant" icon={<Hash size={20} />}>
          <TextInput source="id" label="Identifiant" disabled fullWidth />
        </FormSection>
        {announcementFormFields}
      </ModernEdit>
    }
    create={
      <ModernCreate title="Nouvelle annonce" subtitle="Annonce de la semaine" defaultValues={{ order: 10, mediaType: 'none' }}>
        <FormSection title="Identifiant" icon={<Hash size={20} />}>
          <TextInput source="id" label="Identifiant" validate={required()} fullWidth />
        </FormSection>
        {announcementFormFields}
      </ModernCreate>
    }
    recordRepresentation="title"
    options={{ label: 'Annonce semaine' }}
  />
)

export const parishAnnouncementResources = (
  <Resource
    name="parishAnnouncements"
    list={
      <ModernListShell sort={{ field: 'date', order: 'DESC' }} perPage={50}>
        <ParishSectionList
          title="Toutes les annonces"
          subtitle="Archives et actualités — /annonces/toutes"
          icon={<Calendar size={24} />}
          emptyTitle="Aucune annonce"
          emptyDescription="Publiez les annonces paroissiales."
          createLabel="Ajouter une annonce"
          getCardTitle={(r) => String(r.title ?? '—')}
          getCardSubtitle={(r) => String(r.excerpt ?? '').slice(0, 80)}
          getCardMeta={(r) => [String(r.date ?? ''), String(r.category ?? '')]}
          sortField="date"
          compact
        />
      </ModernListShell>
    }
    edit={
      <ModernEdit title="Modifier l'annonce" subtitle="Toutes les annonces">
        <FormSection title="Identifiant" icon={<Hash size={20} />}>
          <TextInput source="id" label="Identifiant" disabled fullWidth />
        </FormSection>
        {announcementFormFields}
      </ModernEdit>
    }
    create={
      <ModernCreate title="Nouvelle annonce" subtitle="Toutes les annonces" defaultValues={{ order: 10, mediaType: 'none' }}>
        <FormSection title="Identifiant" icon={<FileText size={20} />}>
          <TextInput source="id" label="Identifiant" validate={required()} fullWidth />
        </FormSection>
        {announcementFormFields}
      </ModernCreate>
    }
    recordRepresentation="title"
    options={{ label: 'Toutes annonces' }}
  />
)
