import {
  ArrayInput,
  NumberInput,
  Resource,
  SelectInput,
  SimpleFormIterator,
  TextInput,
  required,
} from 'react-admin'
import { BookOpen, FileText, Hash, Type } from 'lucide-react'
import { ParishSectionList } from '../ui/ParishSectionList'
import { FormSection, ModernCreate, ModernEdit, ModernListShell } from '../ui/modern'
import { churchSectionChoices } from '../church/build-seed'

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

const blockFields = (
  <ArrayInput source="blocks" label="Blocs de contenu">
    <SimpleFormIterator sx={arrayIteratorSx}>
      <TextInput source="heading" label="Titre du bloc (optionnel)" fullWidth />
      <ArrayInput source="paragraphs" label="Paragraphes">
        <SimpleFormIterator sx={arrayIteratorSx}>
          <TextInput source="" label="Paragraphe" validate={required()} fullWidth multiline rows={4} />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleFormIterator>
  </ArrayInput>
)

export const churchSectionResources = (
  <Resource
    name="churchSections"
    list={
      <ModernListShell sort={{ field: 'order', order: 'ASC' }} perPage={50}>
        <ParishSectionList
          title="Tout sur l'Église"
          subtitle="14 rubriques éducatives — /eglise/*"
          icon={<BookOpen size={24} />}
          emptyTitle="Aucune rubrique"
          emptyDescription="Ajoutez les sections du menu Tout sur l'Église."
          createLabel="Ajouter une rubrique"
          getCardTitle={(r) => String(r.title ?? '—')}
          getCardSubtitle={(r) => String(r.subtitle ?? '').slice(0, 90)}
          getCardMeta={(r) => [
            `/eglise/${r.id}`,
            `${((r.blocks as unknown[]) ?? []).length} bloc(s)`,
          ]}
          compact
        />
      </ModernListShell>
    }
    edit={
      <ModernEdit title="Modifier la rubrique" subtitle="Tout sur l'Église">
        <FormSection title="Identifiant" icon={<Hash size={20} />}>
          <TextInput source="id" label="Identifiant (slug URL)" disabled fullWidth />
          <NumberInput source="order" label="Ordre dans le menu" validate={required()} fullWidth />
        </FormSection>
        <FormSection title="En-tête de page" icon={<Type size={20} />}>
          <TextInput source="title" label="Titre" validate={required()} fullWidth />
          <TextInput source="subtitle" label="Sous-titre" validate={required()} fullWidth multiline rows={2} />
        </FormSection>
        <FormSection title="Contenu" icon={<FileText size={20} />}>
          {blockFields}
        </FormSection>
      </ModernEdit>
    }
    create={
      <ModernCreate title="Nouvelle rubrique" subtitle="Tout sur l'Église" defaultValues={{ order: 10, blocks: [] }}>
        <FormSection title="Identifiant" icon={<Hash size={20} />}>
          <SelectInput
            source="id"
            label="Rubrique (slug URL)"
            choices={churchSectionChoices}
            validate={required()}
            fullWidth
            helperText="Ex. histoire → /eglise/histoire"
          />
          <NumberInput source="order" label="Ordre" validate={required()} fullWidth />
        </FormSection>
        <FormSection title="En-tête" icon={<Type size={20} />}>
          <TextInput source="title" label="Titre" validate={required()} fullWidth />
          <TextInput source="subtitle" label="Sous-titre" validate={required()} fullWidth multiline rows={2} />
        </FormSection>
        <FormSection title="Contenu" icon={<FileText size={20} />}>
          {blockFields}
        </FormSection>
      </ModernCreate>
    }
    recordRepresentation="title"
    options={{ label: 'Rubriques Église' }}
  />
)
