import {
  ArrayInput,
  BooleanInput,
  NumberInput,
  Resource,
  SimpleFormIterator,
  TextInput,
  required,
} from 'react-admin'
import { Hash, Link2, Radio, Settings, Tv, Type } from 'lucide-react'
import { ParishSectionList } from '../ui/ParishSectionList'
import { SingletonRecordList } from '../ui/SingletonRecordList'
import { LiveEmbedUrlInput } from '../ui/LiveEmbedUrlInput'
import { FormSection, ModernCreate, ModernEdit, ModernListShell } from '../ui/modern'

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

const settingsFormFields = (
  <>
    <FormSection title="Page Messe en direct" icon={<Type size={20} />}>
      <TextInput source="title" label="Titre de la page" validate={required()} fullWidth />
      <TextInput source="subtitle" label="Sous-titre" validate={required()} fullWidth />
      <TextInput source="description" label="Description" validate={required()} fullWidth multiline rows={3} />
      <TextInput source="scheduleNote" label="Note horaire" validate={required()} fullWidth />
      <TextInput source="notifyHint" label="Message notifications" validate={required()} fullWidth multiline rows={2} />
    </FormSection>
    <FormSection title="Lecteur par défaut (hors live)" icon={<Tv size={20} />}>
      <TextInput source="featuredTitle" label="Titre affiché" validate={required()} fullWidth />
      <TextInput source="featuredDescription" label="Description" validate={required()} fullWidth multiline rows={2} />
      <TextInput source="featuredWatchUrl" label="Lien de visionnage" validate={required()} fullWidth />
      <LiveEmbedUrlInput
        embedSource="featuredEmbedUrl"
        watchSource="featuredWatchUrl"
        label="URL d'intégration (iframe)"
        validate={required()}
        helperText="Remplie automatiquement pour YouTube (ex. watch?v=… → embed/…)."
      />
    </FormSection>
    <FormSection title="Prochaines diffusions" icon={<Radio size={20} />}>
      <ArrayInput source="upcoming" label="Événements à venir">
        <SimpleFormIterator sx={arrayIteratorSx}>
          <TextInput source="title" label="Titre" validate={required()} fullWidth />
          <TextInput source="date" label="Date / horaire" validate={required()} fullWidth />
          <TextInput source="platform" label="Plateforme" validate={required()} fullWidth helperText="YouTube, Facebook ou TikTok" />
        </SimpleFormIterator>
      </ArrayInput>
    </FormSection>
  </>
)

export const liveStreamSettingsResources = (
  <Resource
    name="liveStreamSettings"
    list={
      <ModernListShell perPage={5}>
        <SingletonRecordList
          title="Messe en direct — contenu par défaut"
          subtitle="Textes et lecteur affichés hors diffusion — /messe-en-direct"
          icon={<Settings size={24} />}
          emptyTitle="Page non configurée"
          emptyDescription="Définissez les informations par défaut de la messe en direct."
          createLabel="Configurer la page"
          getCardTitle={(r) => String(r.title ?? '—')}
          getCardSubtitle={(r) => String(r.subtitle ?? '')}
          getCardMeta={(r) => [String(r.scheduleNote ?? '').slice(0, 40)]}
        />
      </ModernListShell>
    }
    edit={
      <ModernEdit title="Modifier la page Messe en direct" subtitle="Contenu par défaut">
        <FormSection title="Identifiant" icon={<Hash size={20} />}>
          <TextInput source="id" label="Identifiant" disabled fullWidth />
        </FormSection>
        {settingsFormFields}
      </ModernEdit>
    }
    create={
      <ModernCreate title="Configurer Messe en direct" subtitle="Contenu par défaut" defaultValues={{ id: 'current' }}>
        <FormSection title="Identifiant" icon={<Hash size={20} />}>
          <TextInput source="id" label="Identifiant" validate={required()} fullWidth defaultValue="current" />
        </FormSection>
        {settingsFormFields}
      </ModernCreate>
    }
    recordRepresentation="title"
    options={{ label: 'Page live' }}
  />
)

const platformFormFields = (
  <>
    <FormSection title="Plateforme" icon={<Radio size={20} />}>
      <TextInput source="name" label="Nom affiché" validate={required()} fullWidth />
      <NumberInput source="order" label="Ordre d'affichage" validate={required()} fullWidth />
      <BooleanInput
        source="isLive"
        label="Diffusion en cours (LIVE)"
        helperText="Activez pour faire clignoter la carte et afficher le lecteur intégré"
      />
    </FormSection>
    <FormSection title="Liens" icon={<Link2 size={20} />}>
      <TextInput
        source="watchUrl"
        label="Lien de la page live"
        validate={required()}
        fullWidth
        helperText="Lien YouTube watch, youtu.be ou page live avec ID vidéo"
      />
      <LiveEmbedUrlInput
        embedSource="embedUrl"
        watchSource="watchUrl"
        platformIdSource="id"
        autoplayWhenLive
        label="URL d'intégration (iframe)"
        helperText="YouTube : générée automatiquement. Facebook / TikTok : lecture sur le site si l’URL embed est fournie."
      />
    </FormSection>
    <FormSection title="Informations par défaut (hors live)" icon={<Type size={20} />}>
      <TextInput source="offlineTitle" label="Titre" validate={required()} fullWidth />
      <TextInput source="offlineDescription" label="Description" validate={required()} fullWidth multiline rows={3} />
    </FormSection>
  </>
)

export const liveStreamPlatformResources = (
  <Resource
    name="liveStreamPlatforms"
    list={
      <ModernListShell sort={{ field: 'order', order: 'ASC' }} perPage={10}>
        <ParishSectionList
          title="Plateformes de diffusion"
          subtitle="YouTube, Facebook, TikTok — liens et statut LIVE"
          icon={<Tv size={24} />}
          emptyTitle="Aucune plateforme"
          emptyDescription="Configurez les trois plateformes de diffusion."
          createLabel="Ajouter une plateforme"
          getCardTitle={(r) => String(r.name ?? '—')}
          getCardSubtitle={(r) => String(r.offlineTitle ?? '')}
          getCardMeta={(r) => [
            r.isLive ? '🔴 EN DIRECT' : 'Hors ligne',
            String(r.watchUrl ?? '').replace(/^https?:\/\//, '').slice(0, 30),
          ]}
          compact
        />
      </ModernListShell>
    }
    edit={
      <ModernEdit title="Modifier la plateforme" subtitle="Diffusion en direct">
        <FormSection title="Identifiant" icon={<Hash size={20} />}>
          <TextInput source="id" label="Identifiant" disabled fullWidth />
          <NumberInput source="order" label="Ordre" validate={required()} fullWidth />
        </FormSection>
        {platformFormFields}
      </ModernEdit>
    }
    create={
      <ModernCreate title="Nouvelle plateforme" subtitle="Diffusion en direct" defaultValues={{ order: 10, isLive: false }}>
        <FormSection title="Identifiant" icon={<Hash size={20} />}>
          <TextInput source="id" label="Identifiant" validate={required()} fullWidth helperText="youtube, facebook ou tiktok" />
          <NumberInput source="order" label="Ordre" validate={required()} fullWidth />
        </FormSection>
        {platformFormFields}
      </ModernCreate>
    }
    recordRepresentation="name"
    options={{ label: 'Plateformes live' }}
  />
)
