import {
  ArrayInput,
  NumberInput,
  Resource,
  SimpleFormIterator,
  TextInput,
  required,
} from 'react-admin'
import {
  BookOpen,
  Calendar,
  Church,
  Clock,
  FileText,
  Hash,
  Image as ImageIcon,
  Mail,
  Type,
  Users,
} from 'lucide-react'
import { ParishSectionList } from '../ui/ParishSectionList'
import { FormRow, FormSection, ModernCreate, ModernEdit, ModernListShell } from '../ui/modern'

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

export const parishHistoryResources = (
  <Resource
    name="parishHistorySections"
    list={
      <ModernListShell sort={{ field: 'order', order: 'ASC' }} perPage={50}>
        <ParishSectionList
          title="Historique de la paroisse"
          subtitle="Sections de contenu — /notre-paroisse/histoire"
          icon={<BookOpen size={24} />}
          emptyTitle="Aucune section d'historique"
          emptyDescription="Ajoutez les paragraphes de l'historique paroissial."
          createLabel="Ajouter une section"
          getCardTitle={(r) => String(r.heading ?? '—')}
          getCardSubtitle={(r) => String(r.content ?? '').slice(0, 80)}
          getCardMeta={(r) => [`Ordre ${r.order ?? 0}`]}
        />
      </ModernListShell>
    }
    edit={
      <ModernEdit title="Modifier la section" subtitle="Historique de la paroisse">
        <FormSection title="Identifiant" icon={<Hash size={20} />}>
          <TextInput source="id" label="Identifiant" disabled fullWidth />
          <NumberInput source="order" label="Ordre d'affichage" validate={required()} fullWidth />
        </FormSection>
        <FormSection title="Contenu" icon={<Type size={20} />}>
          <TextInput source="heading" label="Titre de section" validate={required()} fullWidth />
          <TextInput source="content" label="Texte" validate={required()} fullWidth multiline rows={8} />
        </FormSection>
      </ModernEdit>
    }
    create={
      <ModernCreate title="Nouvelle section" subtitle="Historique de la paroisse" defaultValues={{ order: 10 }}>
        <FormSection title="Identifiant" icon={<Hash size={20} />}>
          <TextInput source="id" label="Identifiant" validate={required()} fullWidth />
          <NumberInput source="order" label="Ordre" validate={required()} fullWidth />
        </FormSection>
        <FormSection title="Contenu" icon={<Type size={20} />}>
          <TextInput source="heading" label="Titre de section" validate={required()} fullWidth />
          <TextInput source="content" label="Texte" validate={required()} fullWidth multiline rows={8} />
        </FormSection>
      </ModernCreate>
    }
    recordRepresentation="heading"
    options={{ label: 'Historique' }}
  />
)

export const parishCurateResources = (
  <Resource
    name="parishCurates"
    list={
      <ModernListShell sort={{ field: 'order', order: 'ASC' }} perPage={50}>
        <ParishSectionList
          title="Historique des curés"
          subtitle="Timeline des curés — /notre-paroisse/cures"
          icon={<Church size={24} />}
          emptyTitle="Aucun curé enregistré"
          emptyDescription="Ajoutez les curés qui ont servi la paroisse."
          createLabel="Ajouter un curé"
          getCardTitle={(r) => String(r.name ?? '—')}
          getCardSubtitle={(r) => String(r.period ?? '')}
          getCardMeta={(r) => [`${(r.achievements as unknown[])?.length ?? 0} réalisations`]}
        />
      </ModernListShell>
    }
    edit={
      <ModernEdit title="Modifier le curé" subtitle="Historique des curés">
        <FormSection title="Identité" icon={<Users size={20} />}>
          <TextInput source="id" label="Identifiant" disabled fullWidth />
          <TextInput source="name" label="Nom" validate={required()} fullWidth />
          <TextInput source="period" label="Période" validate={required()} fullWidth helperText="Ex. 2020 – aujourd'hui" />
          <NumberInput source="order" label="Ordre" validate={required()} fullWidth />
        </FormSection>
        <FormSection title="Photo" icon={<ImageIcon size={20} />}>
          <TextInput source="imageUrl" label="URL de l'image" validate={required()} fullWidth />
        </FormSection>
        <FormSection title="Réalisations" icon={<FileText size={20} />}>
          <ArrayInput source="achievements" label="">
            <SimpleFormIterator fullWidth disableReordering sx={arrayIteratorSx}>
              <TextInput source="" label="Réalisation" validate={required()} fullWidth />
            </SimpleFormIterator>
          </ArrayInput>
        </FormSection>
      </ModernEdit>
    }
    create={
      <ModernCreate title="Nouveau curé" subtitle="Historique des curés" defaultValues={{ order: 10, achievements: [] }}>
        <FormSection title="Identité" icon={<Users size={20} />}>
          <TextInput source="id" label="Identifiant" validate={required()} fullWidth />
          <TextInput source="name" label="Nom" validate={required()} fullWidth />
          <TextInput source="period" label="Période" validate={required()} fullWidth />
          <NumberInput source="order" label="Ordre" validate={required()} fullWidth />
        </FormSection>
        <FormSection title="Photo" icon={<ImageIcon size={20} />}>
          <TextInput source="imageUrl" label="URL de l'image" validate={required()} fullWidth />
        </FormSection>
        <FormSection title="Réalisations" icon={<FileText size={20} />}>
          <ArrayInput source="achievements" label="">
            <SimpleFormIterator fullWidth sx={arrayIteratorSx}>
              <TextInput source="" label="Réalisation" fullWidth />
            </SimpleFormIterator>
          </ArrayInput>
        </FormSection>
      </ModernCreate>
    }
    recordRepresentation="name"
    options={{ label: 'Curés' }}
  />
)

export const parishWeeklyResources = (
  <Resource
    name="parishWeeklyDays"
    list={
      <ModernListShell sort={{ field: 'order', order: 'ASC' }} perPage={20}>
        <ParishSectionList
          title="Annonces de la semaine"
          subtitle="Programme par jour — /notre-paroisse/annonces-semaine"
          icon={<Calendar size={24} />}
          emptyTitle="Aucun jour configuré"
          emptyDescription="Configurez le programme hebdomadaire par jour."
          createLabel="Ajouter un jour"
          getCardTitle={(r) => String(r.dayLabel ?? '—')}
          getCardMeta={(r) => [`${(r.activities as unknown[])?.length ?? 0} activités`]}
        />
      </ModernListShell>
    }
    edit={
      <ModernEdit title="Modifier le jour" subtitle="Annonces de la semaine">
        <FormSection title="Jour" icon={<Calendar size={20} />}>
          <TextInput source="id" label="Identifiant" disabled fullWidth />
          <TextInput source="dayLabel" label="Libellé du jour" validate={required()} fullWidth />
          <NumberInput source="order" label="Ordre" validate={required()} fullWidth />
        </FormSection>
        <FormSection title="Activités" icon={<Clock size={20} />}>
          <ArrayInput source="activities" label="">
            <SimpleFormIterator fullWidth sx={arrayIteratorSx}>
              <FormRow>
                <TextInput source="time" label="Heure" validate={required()} fullWidth />
                <TextInput source="title" label="Activité" validate={required()} fullWidth />
              </FormRow>
              <TextInput source="location" label="Lieu / responsable" fullWidth />
            </SimpleFormIterator>
          </ArrayInput>
        </FormSection>
      </ModernEdit>
    }
    create={
      <ModernCreate title="Nouveau jour" subtitle="Annonces de la semaine" defaultValues={{ order: 10, activities: [] }}>
        <FormSection title="Jour" icon={<Calendar size={20} />}>
          <TextInput source="id" label="Identifiant (ex. lundi)" validate={required()} fullWidth />
          <TextInput source="dayLabel" label="Libellé" validate={required()} fullWidth />
          <NumberInput source="order" label="Ordre" validate={required()} fullWidth />
        </FormSection>
        <FormSection title="Activités" icon={<Clock size={20} />}>
          <ArrayInput source="activities" label="">
            <SimpleFormIterator fullWidth sx={arrayIteratorSx}>
              <FormRow>
                <TextInput source="time" label="Heure" fullWidth />
                <TextInput source="title" label="Activité" fullWidth />
              </FormRow>
              <TextInput source="location" label="Lieu / responsable" fullWidth />
            </SimpleFormIterator>
          </ArrayInput>
        </FormSection>
      </ModernCreate>
    }
    recordRepresentation="dayLabel"
    options={{ label: 'Annonces semaine' }}
  />
)

export const parishMassResources = (
  <Resource
    name="parishMassCategories"
    list={
      <ModernListShell sort={{ field: 'order', order: 'ASC' }} perPage={50}>
        <ParishSectionList
          title="Programme des messes"
          subtitle="Horaires par catégorie — /notre-paroisse/messes"
          icon={<Clock size={24} />}
          emptyTitle="Aucune catégorie d'horaires"
          emptyDescription="Ajoutez les catégories (messes dominicales, confessions…)."
          createLabel="Ajouter une catégorie"
          getCardTitle={(r) => String(r.category ?? '—')}
          getCardMeta={(r) => [`${(r.items as unknown[])?.length ?? 0} horaires`]}
        />
      </ModernListShell>
    }
    edit={
      <ModernEdit title="Modifier les horaires" subtitle="Programme des messes">
        <FormSection title="Catégorie" icon={<Clock size={20} />}>
          <TextInput source="id" label="Identifiant" disabled fullWidth />
          <TextInput source="category" label="Nom de la catégorie" validate={required()} fullWidth />
          <NumberInput source="order" label="Ordre" validate={required()} fullWidth />
        </FormSection>
        <FormSection title="Horaires" icon={<Calendar size={20} />}>
          <ArrayInput source="items" label="">
            <SimpleFormIterator fullWidth sx={arrayIteratorSx}>
              <FormRow>
                <TextInput source="time" label="Heure" validate={required()} fullWidth />
                <TextInput source="day" label="Jour" validate={required()} fullWidth />
              </FormRow>
              <TextInput source="description" label="Description" fullWidth />
            </SimpleFormIterator>
          </ArrayInput>
        </FormSection>
      </ModernEdit>
    }
    create={
      <ModernCreate title="Nouvelle catégorie" subtitle="Programme des messes" defaultValues={{ order: 10, items: [] }}>
        <FormSection title="Catégorie" icon={<Clock size={20} />}>
          <TextInput source="id" label="Identifiant" validate={required()} fullWidth />
          <TextInput source="category" label="Nom" validate={required()} fullWidth />
          <NumberInput source="order" label="Ordre" validate={required()} fullWidth />
        </FormSection>
        <FormSection title="Horaires" icon={<Calendar size={20} />}>
          <ArrayInput source="items" label="">
            <SimpleFormIterator fullWidth sx={arrayIteratorSx}>
              <FormRow>
                <TextInput source="time" label="Heure" fullWidth />
                <TextInput source="day" label="Jour" fullWidth />
              </FormRow>
              <TextInput source="description" label="Description" fullWidth />
            </SimpleFormIterator>
          </ArrayInput>
        </FormSection>
      </ModernCreate>
    }
    recordRepresentation="category"
    options={{ label: 'Messes' }}
  />
)

export const parishCommissionResources = (
  <Resource
    name="parishCommissions"
    list={
      <ModernListShell sort={{ field: 'order', order: 'ASC' }} perPage={50}>
        <ParishSectionList
          title="Commissions paroissiales"
          subtitle="Commissions et sous-commissions — /notre-paroisse/commissions"
          icon={<Users size={24} />}
          emptyTitle="Aucune commission"
          emptyDescription="Ajoutez les commissions paroissiales."
          createLabel="Ajouter une commission"
          getCardTitle={(r) => String(r.name ?? '—')}
          getCardSubtitle={(r) => String(r.mission ?? '')}
          getCardMeta={(r) => [`${(r.subCommissions as unknown[])?.length ?? 0} sous-commissions`]}
        />
      </ModernListShell>
    }
    edit={
      <ModernEdit title="Modifier la commission" subtitle="Commissions paroissiales">
        <FormSection title="Identité" icon={<Users size={20} />}>
          <TextInput source="id" label="Identifiant" disabled fullWidth />
          <TextInput source="name" label="Nom" validate={required()} fullWidth />
          <TextInput source="mission" label="Mission" validate={required()} fullWidth />
          <NumberInput source="order" label="Ordre" validate={required()} fullWidth />
        </FormSection>
        <FormSection title="Image & description" icon={<ImageIcon size={20} />}>
          <TextInput source="imageUrl" label="URL de l'image" validate={required()} fullWidth />
          <TextInput source="description" label="Description" validate={required()} fullWidth multiline rows={5} />
        </FormSection>
        <FormSection title="Contact" icon={<Mail size={20} />}>
          <TextInput source="responsible" label="Responsable" validate={required()} fullWidth />
          <TextInput source="contact" label="E-mail" validate={required()} fullWidth />
        </FormSection>
        <FormSection title="Sous-commissions" icon={<FileText size={20} />}>
          <ArrayInput source="subCommissions" label="">
            <SimpleFormIterator fullWidth sx={arrayIteratorSx}>
              <TextInput source="name" label="Nom" validate={required()} fullWidth />
              <TextInput source="description" label="Description" fullWidth multiline rows={2} />
            </SimpleFormIterator>
          </ArrayInput>
        </FormSection>
      </ModernEdit>
    }
    create={
      <ModernCreate
        title="Nouvelle commission"
        subtitle="Commissions paroissiales"
        defaultValues={{ order: 10, subCommissions: [] }}
      >
        <FormSection title="Identité" icon={<Users size={20} />}>
          <TextInput source="id" label="Identifiant" validate={required()} fullWidth />
          <TextInput source="name" label="Nom" validate={required()} fullWidth />
          <TextInput source="mission" label="Mission" validate={required()} fullWidth />
          <NumberInput source="order" label="Ordre" validate={required()} fullWidth />
        </FormSection>
        <FormSection title="Image & description" icon={<ImageIcon size={20} />}>
          <TextInput source="imageUrl" label="Image" validate={required()} fullWidth />
          <TextInput source="description" label="Description" validate={required()} fullWidth multiline rows={5} />
        </FormSection>
        <FormSection title="Contact" icon={<Mail size={20} />}>
          <TextInput source="responsible" label="Responsable" fullWidth />
          <TextInput source="contact" label="E-mail" fullWidth />
        </FormSection>
        <FormSection title="Sous-commissions" icon={<FileText size={20} />}>
          <ArrayInput source="subCommissions" label="">
            <SimpleFormIterator fullWidth sx={arrayIteratorSx}>
              <TextInput source="name" label="Nom" fullWidth />
              <TextInput source="description" label="Description" fullWidth multiline rows={2} />
            </SimpleFormIterator>
          </ArrayInput>
        </FormSection>
      </ModernCreate>
    }
    recordRepresentation="name"
    options={{ label: 'Commissions' }}
  />
)

export const parishGroupResources = (
  <Resource
    name="parishGroups"
    list={
      <ModernListShell sort={{ field: 'order', order: 'ASC' }} perPage={50}>
        <ParishSectionList
          title="Groupes et mouvements"
          subtitle="Associations paroissiales — /notre-paroisse/groupes"
          icon={<Users size={24} />}
          emptyTitle="Aucun groupe"
          emptyDescription="Ajoutez les groupes et mouvements de la paroisse."
          createLabel="Ajouter un groupe"
          getCardTitle={(r) => String(r.name ?? '—')}
          getCardSubtitle={(r) => String(r.mission ?? '')}
          getCardMeta={(r) => [String(r.responsible ?? '')]}
        />
      </ModernListShell>
    }
    edit={
      <ModernEdit title="Modifier le groupe" subtitle="Groupes et mouvements">
        <FormSection title="Identité" icon={<Users size={20} />}>
          <TextInput source="id" label="Identifiant" disabled fullWidth />
          <TextInput source="name" label="Nom" validate={required()} fullWidth />
          <TextInput source="mission" label="Mission" validate={required()} fullWidth />
          <NumberInput source="order" label="Ordre" validate={required()} fullWidth />
        </FormSection>
        <FormSection title="Activités" icon={<FileText size={20} />}>
          <TextInput source="activities" label="Activités" validate={required()} fullWidth multiline rows={4} />
          <TextInput source="responsible" label="Responsable" validate={required()} fullWidth />
        </FormSection>
      </ModernEdit>
    }
    create={
      <ModernCreate title="Nouveau groupe" subtitle="Groupes et mouvements" defaultValues={{ order: 10 }}>
        <FormSection title="Identité" icon={<Users size={20} />}>
          <TextInput source="id" label="Identifiant" validate={required()} fullWidth />
          <TextInput source="name" label="Nom" validate={required()} fullWidth />
          <TextInput source="mission" label="Mission" validate={required()} fullWidth />
          <NumberInput source="order" label="Ordre" validate={required()} fullWidth />
        </FormSection>
        <FormSection title="Activités" icon={<FileText size={20} />}>
          <TextInput source="activities" label="Activités" validate={required()} fullWidth multiline rows={4} />
          <TextInput source="responsible" label="Responsable" fullWidth />
        </FormSection>
      </ModernCreate>
    }
    recordRepresentation="name"
    options={{ label: 'Groupes' }}
  />
)
