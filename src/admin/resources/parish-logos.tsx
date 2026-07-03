import { Resource, TextInput, required } from 'react-admin'
import { Type, Image as ImageIcon } from 'lucide-react'
import { LogoListView } from '../ui/LogoCardGrid'
import { HeaderBrandPreviewLive } from '../ui/HeaderBrandPreview'
import { FormSection, ModernCreate, ModernEdit, ModernListShell } from '../ui/modern'

export const parishLogoResources = (
  <Resource
    name="parishLogos"
    list={
      <ModernListShell sort={{ field: 'primaryTitle', order: 'ASC' }}>
        <LogoListView />
      </ModernListShell>
    }
    edit={
      <ModernEdit
        title="Modifier l'identité visuelle"
        subtitle="Reproduit l’affichage du header : logo rond + titre principal + sous-titre"
      >
        <FormSection
          title="Aperçu en direct"
          icon={<ImageIcon size={20} />}
          description="Rendu identique à l’en-tête du portail public"
        >
          <HeaderBrandPreviewLive />
        </FormSection>
        <FormSection title="Image du logo" icon={<ImageIcon size={20} />}>
          <TextInput
            source="id"
            label="Identifiant"
            disabled
            fullWidth
          />
          <TextInput
            source="imageUrl"
            label="URL de l'image"
            validate={required()}
            fullWidth
            helperText="Image carrée recommandée (affichée en cercle avec bordure dorée)"
          />
        </FormSection>
        <FormSection title="Textes de l'en-tête" icon={<Type size={20} />}>
          <TextInput
            source="primaryTitle"
            label="Titre principal"
            validate={required()}
            fullWidth
            helperText="Ex. Paroisse de la Résurrection — en bleu / or sur le site"
          />
          <TextInput
            source="secondaryTitle"
            label="Titre secondaire"
            validate={required()}
            fullWidth
            helperText="Ex. Lemba Salongo, Kinshasa — sous-titre discret"
          />
        </FormSection>
      </ModernEdit>
    }
    create={
      <ModernCreate
        title="Nouvelle identité visuelle"
        subtitle="Logo et titres pour l’en-tête du portail"
      >
        <FormSection title="Aperçu" icon={<ImageIcon size={20} />}>
          <HeaderBrandPreviewLive />
        </FormSection>
        <FormSection title="Image" icon={<ImageIcon size={20} />}>
          <TextInput source="imageUrl" label="URL de l'image" validate={required()} fullWidth />
        </FormSection>
        <FormSection title="Titres" icon={<Type size={20} />}>
          <TextInput
            source="primaryTitle"
            label="Titre principal"
            validate={required()}
            fullWidth
            defaultValue="Paroisse de la Résurrection"
          />
          <TextInput
            source="secondaryTitle"
            label="Titre secondaire"
            validate={required()}
            fullWidth
            defaultValue="Lemba Salongo, Kinshasa"
          />
        </FormSection>
      </ModernCreate>
    }
    recordRepresentation="primaryTitle"
    options={{ label: 'Logo & identité' }}
  />
)
