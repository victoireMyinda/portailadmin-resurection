import {
  ArrayInput,
  NumberInput,
  Resource,
  SimpleFormIterator,
  TextInput,
  required,
} from 'react-admin'
import { ContactListView } from '../ui/ContactCardGrid'
import { SocialListView } from '../ui/SocialCardGrid'
import { IconPreview } from '../ui/IconPreview'
import { FormRow, FormSection, ModernCreate, ModernEdit, ModernListShell } from '../ui/modern'
import { Hash, Image, Link2, Mail, MapPin, Phone, Share2, Tag, UserRound } from 'lucide-react'

export const contactResources = (
  <Resource
    name="contacts"
    list={
      <ModernListShell sort={{ field: 'label', order: 'ASC' }}>
        <ContactListView />
      </ModernListShell>
    }
    edit={
      <ModernEdit title="Modifier le contact" subtitle="Ces informations sont visibles par les fidèles sur le portail">
        <FormSection title="Identification" icon={<UserRound size={20} />}>
          <TextInput source="id" label="Identifiant technique" disabled fullWidth />
          <TextInput
            source="label"
            label="Nom du contact"
            validate={required()}
            fullWidth
            helperText="Ex. Paroisse principale, Secrétariat, Curé"
          />
        </FormSection>
        <FormSection title="Adresse & e-mail" icon={<MapPin size={20} />}>
          <TextInput
            source="physicalAddress"
            label="Adresse physique"
            multiline
            rows={4}
            validate={required()}
            fullWidth
            helperText="Adresse complète telle qu’affichée aux visiteurs"
          />
          <TextInput
            source="email"
            label="Adresse e-mail"
            type="email"
            validate={required()}
            fullWidth
            helperText="E-mail de contact officiel de la paroisse"
          />
        </FormSection>
        <FormSection
          title="Numéros de téléphone"
          icon={<Phone size={20} />}
          description="Ajoutez autant de numéros que nécessaire (standard, WhatsApp, urgence…)"
        >
          <ArrayInput source="phones" label="">
            <SimpleFormIterator
              fullWidth
              disableReordering
              sx={{
                '& .RaSimpleFormIterator-line': {
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                  p: 2,
                  mb: 1.5,
                  bgcolor: '#f8fafc',
                },
                '& .RaSimpleFormIterator-add': { borderRadius: 2, fontWeight: 700 },
              }}
            >
              <FormRow>
                <TextInput source="label" label="Libellé" fullWidth helperText="Standard, WhatsApp…" />
                <TextInput source="number" label="Numéro" validate={required()} fullWidth />
              </FormRow>
            </SimpleFormIterator>
          </ArrayInput>
        </FormSection>
      </ModernEdit>
    }
    create={
      <ModernCreate title="Nouveau contact" subtitle="Enregistrer un point de contact paroissial">
        <FormSection title="Identification" icon={<Tag size={20} />}>
          <TextInput source="label" label="Nom du contact" validate={required()} fullWidth />
        </FormSection>
        <FormSection title="Adresse & e-mail" icon={<Mail size={20} />}>
          <TextInput
            source="physicalAddress"
            label="Adresse physique"
            multiline
            rows={4}
            validate={required()}
            fullWidth
          />
          <TextInput source="email" label="Adresse e-mail" type="email" validate={required()} fullWidth />
        </FormSection>
        <FormSection title="Téléphones" icon={<Phone size={20} />}>
          <ArrayInput source="phones" label="" defaultValue={[{ label: 'Principal', number: '' }]}>
            <SimpleFormIterator fullWidth>
              <FormRow>
                <TextInput source="label" label="Libellé" fullWidth />
                <TextInput source="number" label="Numéro" validate={required()} fullWidth />
              </FormRow>
            </SimpleFormIterator>
          </ArrayInput>
        </FormSection>
      </ModernCreate>
    }
    recordRepresentation="label"
    options={{ label: 'Contacts paroisse' }}
  />
)

export const socialNetworkResources = (
  <Resource
    name="socialNetworks"
    list={
      <ModernListShell sort={{ field: 'order', order: 'ASC' }}>
        <SocialListView />
      </ModernListShell>
    }
    edit={
      <ModernEdit title="Modifier le réseau" subtitle="Icône et lien affichés dans le pied de page et les pages du site">
        <FormSection title="Informations" icon={<Share2 size={20} />}>
          <TextInput source="id" label="Identifiant" disabled fullWidth />
          <FormRow>
            <TextInput source="name" label="Nom du réseau" validate={required()} fullWidth />
            <NumberInput source="order" label="Ordre d'affichage" min={0} fullWidth helperText="1 = en premier" />
          </FormRow>
        </FormSection>
        <FormSection title="Visuel" icon={<Image size={20} />} description="URL directe vers le logo (PNG, SVG, WebP)">
          <TextInput source="iconUrl" label="URL de l'icône" validate={required()} fullWidth />
          <IconPreview source="iconUrl" />
        </FormSection>
        <FormSection title="Lien" icon={<Link2 size={20} />}>
          <TextInput
            source="link"
            label="URL de la page"
            validate={required()}
            fullWidth
            helperText="Lien complet commençant par https://"
          />
        </FormSection>
      </ModernEdit>
    }
    create={
      <ModernCreate title="Nouveau réseau social" subtitle="Ajouter une page officielle de la paroisse">
        <FormSection title="Informations" icon={<Hash size={20} />}>
          <FormRow>
            <TextInput source="name" label="Nom" validate={required()} fullWidth />
            <NumberInput source="order" label="Ordre" min={0} defaultValue={1} fullWidth />
          </FormRow>
        </FormSection>
        <FormSection title="Visuel" icon={<Image size={20} />}>
          <TextInput source="iconUrl" label="URL de l'icône" validate={required()} fullWidth />
          <IconPreview source="iconUrl" />
        </FormSection>
        <FormSection title="Lien" icon={<Link2 size={20} />}>
          <TextInput source="link" label="URL de la page" validate={required()} fullWidth />
        </FormSection>
      </ModernCreate>
    }
    recordRepresentation="name"
    options={{ label: 'Réseaux sociaux' }}
  />
)
