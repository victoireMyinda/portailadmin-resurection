import {
  ArrayInput,
  DateInput,
  Resource,
  SelectInput,
  SimpleFormIterator,
  TextInput,
  required,
} from 'react-admin'
import { BookOpen, Calendar, Cross, Hash, Link2, Sparkles, Type } from 'lucide-react'
import { SingletonRecordList } from '../ui/SingletonRecordList'
import { FormSection, ModernCreate, ModernEdit, ModernListShell } from '../ui/modern'
import { liturgyColorChoices } from '../liturgy/build-seed'

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

export const liturgyCalendarResources = (
  <Resource
    name="liturgyCalendar"
    list={
      <ModernListShell perPage={5}>
        <SingletonRecordList
          title="Calendrier liturgique"
          subtitle="Saison, couleur et prochain événement — /liturgie/calendrier"
          icon={<Calendar size={24} />}
          emptyTitle="Calendrier non configuré"
          emptyDescription="Définissez la saison liturgique et le prochain événement paroissial."
          createLabel="Configurer le calendrier"
          getCardTitle={(r) => String(r.season ?? '—')}
          getCardSubtitle={(r) => String(r.liturgicalDay ?? '')}
          getCardMeta={(r) => [String(r.color ?? ''), String(r.nextEventTitle ?? '')]}
        />
      </ModernListShell>
    }
    edit={
      <ModernEdit title="Modifier le calendrier liturgique" subtitle="Page Calendrier liturgique">
        <FormSection title="Identifiant" icon={<Hash size={20} />}>
          <TextInput source="id" label="Identifiant" disabled fullWidth />
        </FormSection>
        <FormSection title="Saison en cours" icon={<Calendar size={20} />}>
          <TextInput source="season" label="Titre de la saison" validate={required()} fullWidth />
          <SelectInput source="color" label="Couleur liturgique" choices={liturgyColorChoices} validate={required()} fullWidth />
          <TextInput
            source="liturgicalDay"
            label="Jour liturgique affiché"
            validate={required()}
            fullWidth
            helperText="Ex. 13e dimanche du Temps Ordinaire — Année A"
          />
        </FormSection>
        <FormSection title="Prochain événement" icon={<Sparkles size={20} />}>
          <TextInput source="nextEventTitle" label="Titre de l'événement" validate={required()} fullWidth />
          <TextInput
            source="nextEventDate"
            label="Date et heure (ISO)"
            validate={required()}
            fullWidth
            helperText="Ex. 2026-04-20T10:00:00"
          />
          <TextInput source="nextEventLocation" label="Lieu" validate={required()} fullWidth />
        </FormSection>
        <FormSection title="Thème mis en avant (accueil)" icon={<Type size={20} />}>
          <TextInput source="featuredTitle" label="Titre" validate={required()} fullWidth />
          <TextInput source="featuredSubtitle" label="Sous-titre" validate={required()} fullWidth />
          <TextInput source="featuredDescription" label="Description" validate={required()} fullWidth multiline rows={3} />
          <TextInput source="featuredCtaLabel" label="Libellé du bouton" validate={required()} fullWidth />
          <TextInput source="featuredCtaHref" label="Lien du bouton" validate={required()} fullWidth helperText="Ex. /liturgie/homelie ou #homelie" />
        </FormSection>
        <FormSection title="Grille des saisons" icon={<BookOpen size={20} />}>
          <ArrayInput source="seasons" label="Saisons affichées sur le calendrier">
            <SimpleFormIterator sx={arrayIteratorSx}>
              <TextInput source="name" label="Nom de la saison" validate={required()} fullWidth />
              <TextInput source="note" label="Note (optionnelle)" fullWidth helperText="Ex. Saison actuelle" />
            </SimpleFormIterator>
          </ArrayInput>
        </FormSection>
      </ModernEdit>
    }
    create={
      <ModernCreate
        title="Configurer le calendrier liturgique"
        subtitle="Contenu de /liturgie/calendrier"
        defaultValues={{ id: 'current', color: 'Vert' }}
      >
        <FormSection title="Identifiant" icon={<Hash size={20} />}>
          <TextInput source="id" label="Identifiant" validate={required()} fullWidth defaultValue="current" />
        </FormSection>
        <FormSection title="Saison en cours" icon={<Calendar size={20} />}>
          <TextInput source="season" label="Titre de la saison" validate={required()} fullWidth />
          <SelectInput source="color" label="Couleur liturgique" choices={liturgyColorChoices} validate={required()} fullWidth />
          <TextInput source="liturgicalDay" label="Jour liturgique affiché" validate={required()} fullWidth />
        </FormSection>
        <FormSection title="Prochain événement" icon={<Sparkles size={20} />}>
          <TextInput source="nextEventTitle" label="Titre" validate={required()} fullWidth />
          <TextInput source="nextEventDate" label="Date et heure (ISO)" validate={required()} fullWidth />
          <TextInput source="nextEventLocation" label="Lieu" validate={required()} fullWidth />
        </FormSection>
        <FormSection title="Thème mis en avant" icon={<Type size={20} />}>
          <TextInput source="featuredTitle" label="Titre" validate={required()} fullWidth />
          <TextInput source="featuredSubtitle" label="Sous-titre" validate={required()} fullWidth />
          <TextInput source="featuredDescription" label="Description" validate={required()} fullWidth multiline rows={3} />
          <TextInput source="featuredCtaLabel" label="Libellé du bouton" validate={required()} fullWidth />
          <TextInput source="featuredCtaHref" label="Lien du bouton" validate={required()} fullWidth />
        </FormSection>
        <FormSection title="Grille des saisons" icon={<BookOpen size={20} />}>
          <ArrayInput source="seasons" label="Saisons">
            <SimpleFormIterator sx={arrayIteratorSx}>
              <TextInput source="name" label="Nom" validate={required()} fullWidth />
              <TextInput source="note" label="Note" fullWidth />
            </SimpleFormIterator>
          </ArrayInput>
        </FormSection>
      </ModernCreate>
    }
    recordRepresentation="season"
    options={{ label: 'Calendrier liturgique' }}
  />
)

export const liturgyHomilyResources = (
  <Resource
    name="liturgyHomily"
    list={
      <ModernListShell perPage={5}>
        <SingletonRecordList
          title="Homélie du jour"
          subtitle="Texte pastoral du dimanche — /liturgie/homelie"
          icon={<BookOpen size={24} />}
          emptyTitle="Homélie non configurée"
          emptyDescription="Rédigez l'homélie affichée sur le portail."
          createLabel="Configurer l'homélie"
          getCardTitle={(r) => String(r.heading ?? r.title ?? '—')}
          getCardSubtitle={(r) => String(r.excerpt ?? '').slice(0, 120)}
          getCardMeta={(r) => [String(r.liturgicalDay ?? ''), String(r.date ?? '')]}
        />
      </ModernListShell>
    }
    edit={
      <ModernEdit title="Modifier l'homélie" subtitle="Page Homélie du jour">
        <FormSection title="Identifiant" icon={<Hash size={20} />}>
          <TextInput source="id" label="Identifiant" disabled fullWidth />
        </FormSection>
        <FormSection title="Informations" icon={<Calendar size={20} />}>
          <TextInput source="title" label="Titre interne" validate={required()} fullWidth />
          <TextInput source="liturgicalDay" label="Jour liturgique" validate={required()} fullWidth />
          <DateInput source="date" label="Date de publication" validate={required()} fullWidth />
        </FormSection>
        <FormSection title="Contenu de l'homélie" icon={<Type size={20} />}>
          <TextInput source="heading" label="Titre affiché" validate={required()} fullWidth />
          <TextInput source="excerpt" label="Chapeau / introduction" validate={required()} fullWidth multiline rows={3} />
          <TextInput source="content" label="Texte complet" validate={required()} fullWidth multiline rows={10} />
        </FormSection>
      </ModernEdit>
    }
    create={
      <ModernCreate
        title="Configurer l'homélie"
        subtitle="Contenu de /liturgie/homelie"
        defaultValues={{ id: 'current' }}
      >
        <FormSection title="Identifiant" icon={<Hash size={20} />}>
          <TextInput source="id" label="Identifiant" validate={required()} fullWidth defaultValue="current" />
        </FormSection>
        <FormSection title="Informations" icon={<Calendar size={20} />}>
          <TextInput source="title" label="Titre interne" validate={required()} fullWidth />
          <TextInput source="liturgicalDay" label="Jour liturgique" validate={required()} fullWidth />
          <DateInput source="date" label="Date" validate={required()} fullWidth />
        </FormSection>
        <FormSection title="Contenu" icon={<Type size={20} />}>
          <TextInput source="heading" label="Titre affiché" validate={required()} fullWidth />
          <TextInput source="excerpt" label="Introduction" validate={required()} fullWidth multiline rows={3} />
          <TextInput source="content" label="Texte complet" validate={required()} fullWidth multiline rows={10} />
        </FormSection>
      </ModernCreate>
    }
    recordRepresentation="heading"
    options={{ label: 'Homélie du jour' }}
  />
)

export const liturgyDailyResources = (
  <Resource
    name="liturgyDaily"
    list={
      <ModernListShell perPage={5}>
        <SingletonRecordList
          title="Parole et Saint du jour"
          subtitle="Lectures, Évangile, psaume et saint — /liturgie/parole-saint"
          icon={<Cross size={24} />}
          emptyTitle="Contenu quotidien non configuré"
          emptyDescription="Renseignez les lectures et le saint du jour."
          createLabel="Configurer le contenu"
          getCardTitle={(r) => String(r.saintName ?? '—')}
          getCardSubtitle={(r) => String(r.wordText ?? '').slice(0, 100)}
          getCardMeta={(r) => [
            String(r.saintFeast ?? ''),
            `${((r.readings as unknown[]) ?? []).length} lecture(s)`,
          ]}
        />
      </ModernListShell>
    }
    edit={
      <ModernEdit title="Modifier parole et saint du jour" subtitle="Page Parole et Saint du jour">
        <FormSection title="Identifiant" icon={<Hash size={20} />}>
          <TextInput source="id" label="Identifiant" disabled fullWidth />
        </FormSection>
        <FormSection title="Lectures" icon={<BookOpen size={20} />}>
          <ArrayInput source="readings" label="Lectures du jour">
            <SimpleFormIterator sx={arrayIteratorSx}>
              <TextInput source="type" label="Type" validate={required()} fullWidth helperText="Ex. Première lecture" />
              <TextInput source="reference" label="Référence biblique" validate={required()} fullWidth />
              <TextInput source="text" label="Texte" validate={required()} fullWidth multiline rows={3} />
            </SimpleFormIterator>
          </ArrayInput>
        </FormSection>
        <FormSection title="Évangile" icon={<Type size={20} />}>
          <TextInput source="gospelReference" label="Référence" validate={required()} fullWidth />
          <TextInput source="gospelText" label="Texte" validate={required()} fullWidth multiline rows={4} />
        </FormSection>
        <FormSection title="Psaume" icon={<Type size={20} />}>
          <TextInput source="psalmReference" label="Référence" validate={required()} fullWidth />
          <TextInput source="psalmText" label="Texte" validate={required()} fullWidth multiline rows={3} />
        </FormSection>
        <FormSection title="Parole du jour (widget)" icon={<Link2 size={20} />}>
          <TextInput source="wordReference" label="Référence" validate={required()} fullWidth />
          <TextInput source="wordText" label="Verset" validate={required()} fullWidth multiline rows={2} />
        </FormSection>
        <FormSection title="Saint du jour" icon={<Cross size={20} />}>
          <TextInput source="saintName" label="Nom du saint" validate={required()} fullWidth />
          <TextInput source="saintFeast" label="Fête / mémoire" validate={required()} fullWidth helperText="Ex. Mémoire, Fête" />
          <TextInput source="saintMeditation" label="Méditation" validate={required()} fullWidth multiline rows={4} />
        </FormSection>
      </ModernEdit>
    }
    create={
      <ModernCreate
        title="Configurer parole et saint du jour"
        subtitle="Contenu de /liturgie/parole-saint"
        defaultValues={{ id: 'current' }}
      >
        <FormSection title="Identifiant" icon={<Hash size={20} />}>
          <TextInput source="id" label="Identifiant" validate={required()} fullWidth defaultValue="current" />
        </FormSection>
        <FormSection title="Lectures" icon={<BookOpen size={20} />}>
          <ArrayInput source="readings" label="Lectures">
            <SimpleFormIterator sx={arrayIteratorSx}>
              <TextInput source="type" label="Type" validate={required()} fullWidth />
              <TextInput source="reference" label="Référence" validate={required()} fullWidth />
              <TextInput source="text" label="Texte" validate={required()} fullWidth multiline rows={3} />
            </SimpleFormIterator>
          </ArrayInput>
        </FormSection>
        <FormSection title="Évangile" icon={<Type size={20} />}>
          <TextInput source="gospelReference" label="Référence" validate={required()} fullWidth />
          <TextInput source="gospelText" label="Texte" validate={required()} fullWidth multiline rows={4} />
        </FormSection>
        <FormSection title="Psaume" icon={<Type size={20} />}>
          <TextInput source="psalmReference" label="Référence" validate={required()} fullWidth />
          <TextInput source="psalmText" label="Texte" validate={required()} fullWidth multiline rows={3} />
        </FormSection>
        <FormSection title="Parole du jour" icon={<Link2 size={20} />}>
          <TextInput source="wordReference" label="Référence" validate={required()} fullWidth />
          <TextInput source="wordText" label="Verset" validate={required()} fullWidth multiline rows={2} />
        </FormSection>
        <FormSection title="Saint du jour" icon={<Cross size={20} />}>
          <TextInput source="saintName" label="Nom" validate={required()} fullWidth />
          <TextInput source="saintFeast" label="Fête" validate={required()} fullWidth />
          <TextInput source="saintMeditation" label="Méditation" validate={required()} fullWidth multiline rows={4} />
        </FormSection>
      </ModernCreate>
    }
    recordRepresentation="saintName"
    options={{ label: 'Parole & Saint' }}
  />
)
