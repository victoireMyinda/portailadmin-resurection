import {
  BooleanInput,
  NumberInput,
  Resource,
  TextInput,
  required,
} from 'react-admin'
import { FileText, Home, Image as ImageIcon, Link2, MessageSquare, Type } from 'lucide-react'
import { HomeHeroListView } from '../ui/HomeHeroCardGrid'
import { CurateMessageListView } from '../ui/CurateMessageCardGrid'
import { HomeAboutListView } from '../ui/AboutCardGrid'
import { HeroSlidePreviewLive } from '../ui/HeroSlidePreview'
import { CurateMessagePreviewLive } from '../ui/CurateMessagePreview'
import { AboutPreviewLive } from '../ui/AboutPreview'
import { FormSection, ModernCreate, ModernEdit, ModernListShell } from '../ui/modern'

export const homeHeroSlideResources = (
  <Resource
    name="homeHeroSlides"
    list={
      <ModernListShell sort={{ field: 'order', order: 'ASC' }} perPage={20}>
        <HomeHeroListView />
      </ModernListShell>
    }
    edit={
      <ModernEdit title="Modifier la bannière d'accueil" subtitle="Slide du carousel hero">
        <FormSection title="Identifiant" icon={<FileText size={20} />}>
          <TextInput source="id" label="Identifiant" disabled fullWidth />
        </FormSection>
        <FormSection title="Aperçu" icon={<Home size={20} />}>
          <HeroSlidePreviewLive />
        </FormSection>
        <FormSection title="Image principale" icon={<ImageIcon size={20} />}>
          <TextInput source="imageUrl" label="URL de l'image" validate={required()} fullWidth />
          <BooleanInput
            source="featured"
            label="Slide principal (titre en deux lignes avec accent doré)"
            helperText="Comme la première slide « Paroisse Catholique / de la Résurrection »"
          />
        </FormSection>
        <FormSection title="Textes" icon={<Type size={20} />}>
          <TextInput source="title" label="Titre" validate={required()} fullWidth />
          <TextInput
            source="titleLine2"
            label="Titre ligne 2 (accent doré)"
            fullWidth
            helperText="Uniquement pour le slide principal"
          />
          <TextInput
            source="description"
            label="Description"
            validate={required()}
            fullWidth
            multiline
            rows={2}
          />
        </FormSection>
        <FormSection title="Bouton d'action" icon={<Link2 size={20} />}>
          <TextInput source="ctaLabel" label="Libellé du bouton" validate={required()} fullWidth />
          <TextInput
            source="ctaHref"
            label="Lien du bouton"
            validate={required()}
            fullWidth
            helperText="Ex. #mot-du-cure, #horaires ou /notre-paroisse/commissions"
          />
          <NumberInput source="order" label="Ordre dans le carousel" validate={required()} fullWidth />
        </FormSection>
      </ModernEdit>
    }
    create={
      <ModernCreate
        title="Nouvelle bannière d'accueil"
        subtitle="Ajoutez un slide au carousel hero"
        defaultValues={{ order: 10, featured: false }}
      >
        <FormSection title="Identifiant" icon={<FileText size={20} />}>
          <TextInput source="id" label="Identifiant" validate={required()} fullWidth />
        </FormSection>
        <FormSection title="Aperçu" icon={<Home size={20} />}>
          <HeroSlidePreviewLive />
        </FormSection>
        <FormSection title="Image" icon={<ImageIcon size={20} />}>
          <TextInput source="imageUrl" label="URL de l'image" validate={required()} fullWidth />
          <BooleanInput source="featured" label="Slide principal" />
        </FormSection>
        <FormSection title="Textes" icon={<Type size={20} />}>
          <TextInput source="title" label="Titre" validate={required()} fullWidth />
          <TextInput source="titleLine2" label="Titre ligne 2" fullWidth />
          <TextInput source="description" label="Description" validate={required()} fullWidth multiline rows={2} />
        </FormSection>
        <FormSection title="Bouton" icon={<Link2 size={20} />}>
          <TextInput source="ctaLabel" label="Libellé du bouton" validate={required()} fullWidth />
          <TextInput source="ctaHref" label="Lien" validate={required()} fullWidth />
          <NumberInput source="order" label="Ordre" validate={required()} fullWidth defaultValue={10} />
        </FormSection>
      </ModernCreate>
    }
    recordRepresentation="title"
    options={{ label: 'Bannières accueil' }}
  />
)

export const homeCurateMessageResources = (
  <Resource
    name="homeCurateMessages"
    list={
      <ModernListShell perPage={5}>
        <CurateMessageListView />
      </ModernListShell>
    }
    edit={
      <ModernEdit title="Modifier le mot du curé" subtitle="Section pastorale de la page d'accueil">
        <FormSection title="Identifiant" icon={<FileText size={20} />}>
          <TextInput source="id" label="Identifiant" disabled fullWidth />
        </FormSection>
        <FormSection title="Aperçu" icon={<MessageSquare size={20} />}>
          <CurateMessagePreviewLive />
        </FormSection>
        <FormSection title="Photo" icon={<ImageIcon size={20} />}>
          <TextInput
            source="imageUrl"
            label="Image principale"
            validate={required()}
            fullWidth
            helperText="Portrait ou photo de l’église affiché à gauche du message"
          />
        </FormSection>
        <FormSection title="En-tête du message" icon={<Type size={20} />}>
          <TextInput source="title" label="Titre de section" validate={required()} fullWidth helperText="Ex. Mot du Curé" />
          <TextInput source="name" label="Nom du curé" validate={required()} fullWidth />
          <TextInput source="role" label="Fonction" validate={required()} fullWidth helperText="Ex. Curé de la Paroisse" />
          <TextInput source="greeting" label="Formule d'accueil" validate={required()} fullWidth />
        </FormSection>
        <FormSection title="Corps du message" icon={<MessageSquare size={20} />}>
          <TextInput
            source="content"
            label="Message"
            validate={required()}
            fullWidth
            multiline
            rows={12}
            helperText="Séparez les paragraphes par une ligne vide"
          />
          <TextInput source="signature" label="Signature" validate={required()} fullWidth />
        </FormSection>
      </ModernEdit>
    }
    create={
      <ModernCreate
        title="Configurer le mot du curé"
        subtitle="Message pastoral sur la page d'accueil"
        defaultValues={{ id: 'default', title: 'Mot du Curé', role: 'Curé de la Paroisse' }}
      >
        <FormSection title="Aperçu" icon={<MessageSquare size={20} />}>
          <CurateMessagePreviewLive />
        </FormSection>
        <FormSection title="Photo" icon={<ImageIcon size={20} />}>
          <TextInput source="imageUrl" label="Image principale" validate={required()} fullWidth />
        </FormSection>
        <FormSection title="En-tête" icon={<Type size={20} />}>
          <TextInput source="id" label="Identifiant" validate={required()} fullWidth />
          <TextInput source="title" label="Titre de section" validate={required()} fullWidth />
          <TextInput source="name" label="Nom du curé" validate={required()} fullWidth />
          <TextInput source="role" label="Fonction" validate={required()} fullWidth />
          <TextInput source="greeting" label="Formule d'accueil" validate={required()} fullWidth />
        </FormSection>
        <FormSection title="Message" icon={<MessageSquare size={20} />}>
          <TextInput source="content" label="Contenu" validate={required()} fullWidth multiline rows={12} />
          <TextInput source="signature" label="Signature" validate={required()} fullWidth />
        </FormSection>
      </ModernCreate>
    }
    recordRepresentation="name"
    options={{ label: 'Mot du curé' }}
  />
)

export const homeAboutResources = (
  <Resource
    name="homeAbout"
    list={
      <ModernListShell perPage={5}>
        <HomeAboutListView />
      </ModernListShell>
    }
    edit={
      <ModernEdit title="Modifier à propos" subtitle="Présentation de la paroisse sur la page d'accueil">
        <FormSection title="Identifiant" icon={<FileText size={20} />}>
          <TextInput source="id" label="Identifiant" disabled fullWidth />
        </FormSection>
        <FormSection title="Aperçu" icon={<Home size={20} />}>
          <AboutPreviewLive />
        </FormSection>
        <FormSection title="Image principale" icon={<ImageIcon size={20} />}>
          <TextInput source="imageUrl" label="URL de l'image" validate={required()} fullWidth />
        </FormSection>
        <FormSection title="Contenu" icon={<Type size={20} />}>
          <TextInput source="title" label="Titre de section" validate={required()} fullWidth />
          <TextInput
            source="presentation"
            label="Présentation"
            validate={required()}
            fullWidth
            multiline
            rows={4}
          />
          <TextInput
            source="historySummary"
            label="Historique résumé"
            validate={required()}
            fullWidth
            multiline
            rows={4}
          />
          <TextInput
            source="readMorePath"
            label="Lien « Lire la suite »"
            fullWidth
            helperText="Ex. /notre-paroisse/histoire"
          />
        </FormSection>
      </ModernEdit>
    }
    create={
      <ModernCreate
        title="Configurer à propos"
        subtitle="Section présentation sur la page d'accueil"
        defaultValues={{
          id: 'default',
          title: 'À propos de notre paroisse',
          readMorePath: '/notre-paroisse/histoire',
        }}
      >
        <FormSection title="Aperçu" icon={<Home size={20} />}>
          <AboutPreviewLive />
        </FormSection>
        <FormSection title="Image" icon={<ImageIcon size={20} />}>
          <TextInput source="imageUrl" label="URL de l'image" validate={required()} fullWidth />
        </FormSection>
        <FormSection title="Contenu" icon={<Type size={20} />}>
          <TextInput source="id" label="Identifiant" validate={required()} fullWidth />
          <TextInput source="title" label="Titre" validate={required()} fullWidth />
          <TextInput source="presentation" label="Présentation" validate={required()} fullWidth multiline rows={4} />
          <TextInput source="historySummary" label="Historique résumé" validate={required()} fullWidth multiline rows={4} />
          <TextInput source="readMorePath" label="Lien suite" fullWidth />
        </FormSection>
      </ModernCreate>
    }
    recordRepresentation="title"
    options={{ label: 'À propos accueil' }}
  />
)
