import { AutocompleteArrayInput, NumberInput, ReferenceArrayInput, Resource, SelectInput, TextInput, required } from 'react-admin'
import { FileText, FolderOpen, Hash, Image as ImageIcon, Images, Play, Type } from 'lucide-react'
import { ParishSectionList } from '../ui/ParishSectionList'
import { PhotoSourceInput } from '../ui/CompressedImageInput'
import { MediaVideoPreviewLive } from '../ui/MediaVideoPreview'
import { VideoSourceInput } from '../ui/VideoSourceInput'
import { FormSection, ModernCreate, ModernEdit, ModernListShell } from '../ui/modern'
import { PhotoBatchCreatePage, VideoBatchCreatePage } from '../media/media-batch-create'
import { mediaCategoryChoices } from '../media/build-seed'
import { parseYoutubeId, resolveYoutubeUrls } from '../media/youtube'

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
          subtitle="Galerie — comme sur le portail public"
          icon={<ImageIcon size={24} />}
          emptyTitle="Aucune photo"
          emptyDescription="Ajoutez des photos à la galerie paroissiale."
          createLabel="Ajouter une photo"
          categoryFilterField="category"
          getCardTitle={(r) => String(r.title ?? '—')}
          getCardImage={(r) => {
            const src = String(r.thumbnailUrl || r.imageUrl || '')
            return src || undefined
          }}
          imageOnly
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
      <PhotoBatchCreatePage />
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
          subtitle="Galerie — comme sur le portail public"
          icon={<Play size={24} />}
          emptyTitle="Aucune vidéo"
          emptyDescription="Ajoutez des vidéos via YouTube, URL directe ou téléversement."
          createLabel="Ajouter une vidéo"
          categoryFilterField="category"
          getCardTitle={(r) => String(r.title ?? '—')}
          getCardImage={(r) => {
            const thumb = String(r.thumbnailUrl ?? '').trim()
            if (thumb) return thumb
            const yt = parseYoutubeId(String(r.youtubeId ?? ''))
            if (yt) return resolveYoutubeUrls(yt).thumbnail
            return undefined
          }}
          imageOnly
          showPlayOverlay
          compact
        />
      </ModernListShell>
    }
    edit={
      <ModernEdit title="Modifier la vidéo" subtitle="Source YouTube, lien direct ou téléversement">
        <FormSection title="Identifiant" icon={<Hash size={20} />}>
          <TextInput source="id" label="Identifiant" disabled fullWidth />
          <NumberInput source="order" label="Ordre d'affichage" validate={required()} fullWidth />
        </FormSection>
        <FormSection title="Informations" icon={<Type size={20} />}>
          <TextInput source="title" label="Titre affiché" validate={required()} fullWidth />
          <SelectInput source="category" label="Catégorie" choices={mediaCategoryChoices} validate={required()} fullWidth />
          <TextInput source="description" label="Description courte" fullWidth multiline rows={2} />
        </FormSection>
        <FormSection title="Source de la vidéo" icon={<Play size={20} />}>
          <VideoSourceInput />
        </FormSection>
        <FormSection title="Aperçu" icon={<FileText size={20} />}>
          <MediaVideoPreviewLive />
        </FormSection>
      </ModernEdit>
    }
    create={
      <VideoBatchCreatePage />
    }
    recordRepresentation="title"
    options={{ label: 'Vidéos' }}
  />
)
