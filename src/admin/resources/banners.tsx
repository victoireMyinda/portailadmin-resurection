import { NumberInput, Resource, TextInput, required } from 'react-admin'
import { FileText, Image as ImageIcon, Link2, Type } from 'lucide-react'
import { BannerListView } from '../ui/BannerCardGrid'
import { PageBannerPreviewLive } from '../ui/PageBannerPreview'
import { FormSection, ModernCreate, ModernEdit, ModernListShell } from '../ui/modern'

const bannerFormFields = (
  <>
    <FormSection
      title="Aperçu en direct"
      icon={<ImageIcon size={20} />}
      description="Reproduit la bannière affichée en tête de page sur le portail"
    >
      <PageBannerPreviewLive />
    </FormSection>
    <FormSection title="Page associée" icon={<Link2 size={20} />}>
      <TextInput
        source="pagePath"
        label="Chemin de la page"
        validate={required()}
        fullWidth
        helperText="Ex. /medias, /notre-paroisse/commissions — permet d’identifier la bannière"
      />
      <NumberInput
        source="order"
        label="Ordre d'affichage"
        validate={required()}
        fullWidth
        helperText="Utilisé pour trier la liste dans l’administration"
      />
    </FormSection>
    <FormSection title="Image principale" icon={<ImageIcon size={20} />}>
      <TextInput
        source="imageUrl"
        label="URL de l'image"
        validate={required()}
        fullWidth
        helperText="Image de fond en pleine largeur (format paysage recommandé)"
      />
    </FormSection>
    <FormSection title="Textes de la bannière" icon={<Type size={20} />}>
      <TextInput
        source="title"
        label="Titre"
        validate={required()}
        fullWidth
        helperText="Titre principal centré sur la bannière"
      />
      <TextInput
        source="description"
        label="Description"
        validate={required()}
        fullWidth
        multiline
        rows={3}
        helperText="Sous-titre affiché sous le titre"
      />
    </FormSection>
  </>
)

export const pageBannerResources = (
  <Resource
    name="pageBanners"
    list={
      <ModernListShell sort={{ field: 'order', order: 'ASC' }} perPage={50}>
        <BannerListView />
      </ModernListShell>
    }
    edit={
      <ModernEdit
        title="Modifier la bannière"
        subtitle="Image, titre et description de la bannière de page"
      >
        <FormSection title="Identifiant" icon={<FileText size={20} />}>
          <TextInput source="id" label="Identifiant" disabled fullWidth />
        </FormSection>
        {bannerFormFields}
      </ModernEdit>
    }
    create={
      <ModernCreate
        title="Nouvelle bannière"
        subtitle="Configurez l’en-tête visuel d’une page du portail"
        defaultValues={{ order: 10 }}
      >
        <FormSection title="Identifiant" icon={<FileText size={20} />}>
          <TextInput
            source="id"
            label="Identifiant"
            validate={required()}
            fullWidth
            helperText="Ex. medias, parish-masses"
          />
        </FormSection>
        {bannerFormFields}
      </ModernCreate>
    }
    recordRepresentation="title"
    options={{ label: 'Bannières' }}
  />
)
