import {
  AutocompleteArrayInput,
  NumberInput,
  ReferenceArrayInput,
  Resource,
  SelectInput,
  TextInput,
  required,
} from 'react-admin'
import { FileText, FolderOpen, Hash, Image as ImageIcon, Images, Play, Type } from 'lucide-react'
import { ParishSectionList } from '../ui/ParishSectionList'
import { PhotoSourceInput } from '../ui/CompressedImageInput'
import { MediaVideoPreviewLive } from '../ui/MediaVideoPreview'
import { FormSection, ModernCreate, ModernEdit, ModernListShell } from '../ui/modern'
import { mediaCategoryChoices } from '../media/build-seed'

export const mediaAlbumResources = (
  <Resource
    name="mediaAlbums"
    list={
      <ModernListShell sort={{ field: 'order', order: 'ASC' }} perPage={50}>
        <ParishSectionList
          title="Albums photo"
          subtitle="Regroupements affichés dans l'onglet Albums — /medias"
          icon={<FolderOpen size={24} />}
          emptyTitle="Aucun album"
          emptyDescription="Créez des albums pour organiser la galerie."
          createLabel="Créer un album"
          getCardTitle={(r) => String(r.title ?? '—')}
          getCardSubtitle={(r) => String(r.description ?? '').slice(0, 80)}
          getCardMeta={(r) => [`${((r.photoIds as unknown[]) ?? []).length} photo(s)`]}
          compact
        />
      </ModernListShell>
    }
    edit={
      <ModernEdit title="Modifier l'album" subtitle="Galerie médias">
        <FormSection title="Identifiant" icon={<Hash size={20} />}>
          <TextInput source="id" label="Identifiant" disabled fullWidth />
          <NumberInput source="order" label="Ordre d'affichage" validate={required()} fullWidth />
        </FormSection>
        <FormSection title="Contenu" icon={<Type size={20} />}>
          <TextInput source="title" label="Titre" validate={required()} fullWidth />
          <TextInput source="description" label="Description" validate={required()} fullWidth multiline rows={3} />
        </FormSection>
        <FormSection title="Photos de l'album" icon={<Images size={20} />}>
          <ReferenceArrayInput source="photoIds" reference="mediaPhotos" label="Photos incluses">
            <AutocompleteArrayInput optionText="title" fullWidth />
          </ReferenceArrayInput>
        </FormSection>
      </ModernEdit>
    }
    create={
      <ModernCreate title="Nouvel album" subtitle="Galerie médias" defaultValues={{ order: 10, photoIds: [] }}>
        <FormSection title="Identifiant" icon={<Hash size={20} />}>
          <TextInput source="id" label="Identifiant" validate={required()} fullWidth />
          <NumberInput source="order" label="Ordre" validate={required()} fullWidth />
        </FormSection>
        <FormSection title="Contenu" icon={<Type size={20} />}>
          <TextInput source="title" label="Titre" validate={required()} fullWidth />
          <TextInput source="description" label="Description" validate={required()} fullWidth multiline rows={3} />
        </FormSection>
        <FormSection title="Photos" icon={<Images size={20} />}>
          <ReferenceArrayInput source="photoIds" reference="mediaPhotos" label="Photos">
            <AutocompleteArrayInput optionText="title" fullWidth />
          </ReferenceArrayInput>
        </FormSection>
      </ModernCreate>
    }
    recordRepresentation="title"
    options={{ label: 'Albums' }}
  />
)

export const mediaPhotoResources = (
  <Resource
    name="mediaPhotos"
    list={
      <ModernListShell sort={{ field: 'order', order: 'ASC' }} perPage={50}>
        <ParishSectionList
          title="Photos"
          subtitle="Galerie compressée WebP — onglet Photos"
          icon={<ImageIcon size={24} />}
          emptyTitle="Aucune photo"
          emptyDescription="Ajoutez des photos à la galerie paroissiale."
          createLabel="Ajouter une photo"
          getCardTitle={(r) => String(r.title ?? '—')}
          getCardSubtitle={(r) => String(r.category ?? '')}
          getCardMeta={(r) => [
            r.imageSource === 'upload' ? 'Import appareil' : 'Lien en ligne',
            `Ordre ${r.order ?? 0}`,
          ]}
          compact
        />
      </ModernListShell>
    }
    edit={
      <ModernEdit title="Modifier la photo" subtitle="Galerie médias">
        <FormSection title="Identifiant" icon={<Hash size={20} />}>
          <TextInput source="id" label="Identifiant" disabled fullWidth />
          <NumberInput source="order" label="Ordre d'affichage" validate={required()} fullWidth />
        </FormSection>
        <FormSection title="Informations" icon={<Type size={20} />}>
          <TextInput source="title" label="Titre" validate={required()} fullWidth />
          <SelectInput source="category" label="Catégorie" choices={mediaCategoryChoices} validate={required()} fullWidth />
        </FormSection>
        <FormSection title="Source de l'image" icon={<ImageIcon size={20} />}>
          <PhotoSourceInput label="Photo de la galerie" />
        </FormSection>
      </ModernEdit>
    }
    create={
      <ModernCreate
        title="Nouvelle photo"
        subtitle="Lien en ligne ou import depuis l'appareil"
        defaultValues={{ order: 10, imageSource: 'url' }}
      >
        <FormSection title="Identifiant" icon={<Hash size={20} />}>
          <TextInput source="id" label="Identifiant" validate={required()} fullWidth helperText="Ex. 11, grotte-2026" />
          <NumberInput source="order" label="Ordre" validate={required()} fullWidth />
        </FormSection>
        <FormSection title="Informations" icon={<Type size={20} />}>
          <TextInput source="title" label="Titre" validate={required()} fullWidth />
          <SelectInput source="category" label="Catégorie" choices={mediaCategoryChoices} validate={required()} fullWidth />
        </FormSection>
        <FormSection title="Source de l'image" icon={<ImageIcon size={20} />}>
          <PhotoSourceInput label="Photo de la galerie" />
        </FormSection>
      </ModernCreate>
    }
    recordRepresentation="title"
    options={{ label: 'Photos' }}
  />
)

export const mediaVideoResources = (
  <Resource
    name="mediaVideos"
    list={
      <ModernListShell sort={{ field: 'order', order: 'ASC' }} perPage={50}>
        <ParishSectionList
          title="Vidéos"
          subtitle="Liens YouTube uniquement — onglet Vidéos"
          icon={<Play size={24} />}
          emptyTitle="Aucune vidéo"
          emptyDescription="Ajoutez des liens YouTube (pas de fichier vidéo)."
          createLabel="Ajouter une vidéo"
          getCardTitle={(r) => String(r.title ?? '—')}
          getCardSubtitle={(r) => String(r.description ?? '').slice(0, 80)}
          getCardMeta={(r) => [r.youtubeId ? `YouTube: ${r.youtubeId}` : 'À venir']}
          compact
        />
      </ModernListShell>
    }
    edit={
      <ModernEdit title="Modifier la vidéo" subtitle="Lien YouTube">
        <FormSection title="Identifiant" icon={<Hash size={20} />}>
          <TextInput source="id" label="Identifiant" disabled fullWidth />
          <NumberInput source="order" label="Ordre d'affichage" validate={required()} fullWidth />
        </FormSection>
        <FormSection title="Vidéo YouTube" icon={<Play size={20} />}>
          <TextInput
            source="youtubeId"
            label="ID ou lien YouTube"
            fullWidth
            helperText="Ex. FxMDSUhFgSk ou https://www.youtube.com/watch?v=… — aucun fichier vidéo n'est stocké"
          />
          <TextInput source="title" label="Titre affiché" validate={required()} fullWidth />
          <TextInput source="description" label="Description courte" validate={required()} fullWidth multiline rows={2} />
        </FormSection>
        <FormSection title="Aperçu" icon={<FileText size={20} />}>
          <MediaVideoPreviewLive />
        </FormSection>
      </ModernEdit>
    }
    create={
      <ModernCreate title="Nouvelle vidéo" subtitle="Lien YouTube" defaultValues={{ order: 10 }}>
        <FormSection title="Identifiant" icon={<Hash size={20} />}>
          <TextInput source="id" label="Identifiant" validate={required()} fullWidth />
          <NumberInput source="order" label="Ordre" validate={required()} fullWidth />
        </FormSection>
        <FormSection title="Vidéo YouTube" icon={<Play size={20} />}>
          <TextInput source="youtubeId" label="ID ou lien YouTube" fullWidth />
          <TextInput source="title" label="Titre" validate={required()} fullWidth />
          <TextInput source="description" label="Description" validate={required()} fullWidth multiline rows={2} />
        </FormSection>
        <FormSection title="Aperçu" icon={<FileText size={20} />}>
          <MediaVideoPreviewLive />
        </FormSection>
      </ModernCreate>
    }
    recordRepresentation="title"
    options={{ label: 'Vidéos' }}
  />
)
