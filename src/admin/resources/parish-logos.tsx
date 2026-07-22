import { Resource, TextInput, required } from 'react-admin'
import { Type, Image as ImageIcon } from 'lucide-react'
import { LogoListView } from '../ui/LogoCardGrid'
import { HeaderBrandPreviewLive } from '../ui/HeaderBrandPreview'
import { FormSection, ModernCreate, ModernEdit, ModernListShell } from '../ui/modern'

const headerLineFields = (
  <>
    <TextInput
      source="headerArchdiocese"
      label="Ligne 1 — Archidiocèse"
      validate={required()}
      fullWidth
      defaultValue="Archidiocèse de Kinshasa"
      helperText="Première ligne à côté du logo — visible sur mobile et desktop"
    />
    <TextInput
      source="headerDeanery"
      label="Ligne 2 — Doyenné"
      validate={required()}
      fullWidth
      defaultValue="Doyenné Elimo Santu"
    />
    <TextInput
      source="headerParish"
      label="Ligne 3 — Paroisse (accent principal)"
      validate={required()}
      fullWidth
      defaultValue="PAROISSE DE LA RESURRECTION"
      helperText="Affichée en bleu / or, en gras"
    />
    <TextInput
      source="headerLocation"
      label="Ligne 4 — Localisation"
      validate={required()}
      fullWidth
      defaultValue="Lemba/Salongo"
    />
  </>
)

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
        subtitle="Logo, textes à côté du logo et titres des bannières"
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
        <FormSection
          title="Textes à côté du logo"
          icon={<Type size={20} />}
          description="Quatre lignes affichées à droite du logo dans l’en-tête (mobile et desktop)"
        >
          {headerLineFields}
        </FormSection>
        <FormSection title="Textes du pied de page" icon={<Type size={20} />}>
          <TextInput
            source="primaryTitle"
            label="Titre principal (footer)"
            validate={required()}
            fullWidth
            helperText="Utilisé dans le pied de page du site"
          />
          <TextInput
            source="secondaryTitle"
            label="Titre secondaire (footer)"
            validate={required()}
            fullWidth
            helperText="Sous-titre discret dans le pied de page"
          />
        </FormSection>
        <FormSection title="Textes des bannières" icon={<Type size={20} />}>
          <TextInput
            source="archdioceseBannerTitle"
            label="Titre archidiocèse (en-tête des bannières)"
            fullWidth
            defaultValue="Archidiocèse de Kinshasa"
            helperText="Affiché en doré au-dessus du titre sur le carousel d’accueil et les bannières de pages"
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
        <FormSection title="Textes à côté du logo" icon={<Type size={20} />}>
          {headerLineFields}
        </FormSection>
        <FormSection title="Textes du pied de page" icon={<Type size={20} />}>
          <TextInput
            source="primaryTitle"
            label="Titre principal (footer)"
            validate={required()}
            fullWidth
            defaultValue="Paroisse de la Résurrection"
          />
          <TextInput
            source="secondaryTitle"
            label="Titre secondaire (footer)"
            validate={required()}
            fullWidth
            defaultValue="Lemba Salongo, Kinshasa"
          />
        </FormSection>
        <FormSection title="Textes des bannières" icon={<Type size={20} />}>
          <TextInput
            source="archdioceseBannerTitle"
            label="Titre archidiocèse (en-tête des bannières)"
            fullWidth
            defaultValue="Archidiocèse de Kinshasa"
          />
        </FormSection>
      </ModernCreate>
    }
    recordRepresentation="primaryTitle"
    options={{ label: 'Logo & identité' }}
  />
)
