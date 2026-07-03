import {
  BooleanInput,
  Resource,
  SelectInput,
  TextInput,
  email,
  minLength,
  required,
} from 'react-admin'
import { Phone, Shield, User, UserCog } from 'lucide-react'
import { ParishSectionList } from '../ui/ParishSectionList'
import { FormSection, ModernCreate, ModernEdit, ModernListShell } from '../ui/modern'
import { parishRoleChoices, parishRoleLabel } from '../auth/parish-users'
import { parishUserActiveFilter, parishUserRoleFilter } from '../ui/parish-list-filters'

export const parishUserResources = (
  <Resource
    name="parishUsers"
    list={
      <ModernListShell
        sort={{ field: 'displayName', order: 'ASC' }}
        perPage={50}
        extraFilters={[parishUserRoleFilter, parishUserActiveFilter]}
      >
        <ParishSectionList
          title="Gestion des utilisateurs"
          subtitle="Comptes d'accès à l'administration paroissiale"
          icon={<UserCog size={24} />}
          emptyTitle="Aucun utilisateur"
          emptyDescription="Créez des comptes pour les administrateurs, le curé et le secrétariat."
          createLabel="Nouvel utilisateur"
          sortField="displayName"
          getCardTitle={(r) => String(r.displayName ?? r.email ?? '—')}
          getCardSubtitle={(r) => String(r.email ?? '')}
          getCardMeta={(r) => [
            parishRoleLabel(String(r.role ?? '')),
            r.active === false ? 'Inactif' : 'Actif',
          ]}
          compact
        />
      </ModernListShell>
    }
    create={
      <ModernCreate
        title="Nouvel utilisateur"
        subtitle="E-mail, mot de passe et rôle d'accès"
        defaultValues={{ role: 'secretaire', active: true }}
      >
        <FormSection title="Identité" icon={<User size={20} />}>
          <TextInput source="displayName" label="Nom affiché" validate={required()} fullWidth />
          <TextInput
            source="email"
            label="Adresse e-mail"
            type="email"
            validate={[required(), email()]}
            fullWidth
          />
          <TextInput
            source="password"
            label="Mot de passe"
            type="password"
            validate={[required(), minLength(6, 'Minimum 6 caractères')]}
            fullWidth
            helperText="Ce mot de passe sera utilisé pour la première connexion"
          />
        </FormSection>
        <FormSection title="Rôle" icon={<Shield size={20} />}>
          <SelectInput
            source="role"
            label="Rôle"
            choices={parishRoleChoices}
            validate={required()}
            fullWidth
          />
        </FormSection>
        <FormSection title="Photo (optionnelle)" icon={<Phone size={20} />}>
          <TextInput
            source="imageUrl"
            label="URL de la photo de profil"
            fullWidth
            helperText="Lien vers une image en ligne (facultatif)"
          />
        </FormSection>
      </ModernCreate>
    }
    edit={
      <ModernEdit title="Modifier l'utilisateur" subtitle="Profil et statut du compte">
        <FormSection title="Identité" icon={<User size={20} />}>
          <TextInput source="displayName" label="Nom affiché" validate={required()} fullWidth />
          <TextInput source="email" label="Adresse e-mail" disabled fullWidth />
        </FormSection>
        <FormSection title="Rôle & statut" icon={<Shield size={20} />}>
          <SelectInput source="role" label="Rôle" choices={parishRoleChoices} validate={required()} fullWidth />
          <BooleanInput source="active" label="Compte actif" />
        </FormSection>
        <FormSection title="Photo (optionnelle)" icon={<Phone size={20} />}>
          <TextInput source="imageUrl" label="URL de la photo de profil" fullWidth />
        </FormSection>
      </ModernEdit>
    }
    recordRepresentation="displayName"
    options={{ label: 'Gestion utilisateurs' }}
  />
)
