import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  NumberInput,
  Resource,
  SelectInput,
  TextInput,
  required,
  useGetList,
  useRecordContext,
} from 'react-admin'
import { Link2, ListTree, Hash } from 'lucide-react'
import { NavigationListView } from '../ui/NavigationTreeList'
import { FormSection, ModernCreate, ModernEdit, ModernListShell } from '../ui/modern'
import type { NavigationItemRecord } from '../../types'

function ParentTabSelect() {
  const record = useRecordContext<NavigationItemRecord>()
  const { data } = useGetList<NavigationItemRecord>('navigationItems', {
    pagination: { page: 1, perPage: 200 },
    sort: { field: 'order', order: 'ASC' },
  })

  const choices = useMemo(() => {
    if (!data) return []
    return data
      .filter((item) => !item.parentId && item.id !== record?.id)
      .map((item) => ({ id: item.id, name: item.label }))
  }, [data, record?.id])

  return (
    <SelectInput
      source="parentId"
      label="Onglet parent"
      choices={choices}
      emptyText="Onglet principal (barre du haut)"
      fullWidth
      helperText="Laissez vide pour un onglet principal ; sélectionnez un parent pour créer un sous-onglet"
    />
  )
}

function NavigationCreateForm() {
  return (
    <>
    <FormSection
      title="Type d'onglet"
      icon={<ListTree size={20} />}
      description="Les onglets principaux apparaissent dans la barre du haut ; les sous-onglets dans le menu déroulant et la barre de section"
    >
      <ParentTabSelect />
    </FormSection>
    <FormSection title="Libellé & lien" icon={<Link2 size={20} />}>
      <TextInput
        source="id"
        label="Identifiant"
        validate={required()}
        fullWidth
        helperText="Identifiant unique (ex. parish-masses, events-all)"
      />
      <TextInput
        source="label"
        label="Libellé affiché"
        validate={required()}
        fullWidth
        helperText="Texte visible dans le menu du portail"
      />
      <TextInput
        source="href"
        label="Chemin URL"
        validate={required()}
        fullWidth
        helperText="Ex. /notre-paroisse/messes ou /evenements/annonces"
      />
      <NumberInput
        source="order"
        label="Ordre d'affichage"
        validate={required()}
        fullWidth
        defaultValue={10}
        helperText="Plus le nombre est petit, plus l'onglet apparaît à gauche"
      />
    </FormSection>
  </>
  )
}

function NavigationEditForm() {
  return (
    <>
      <FormSection title="Type d'onglet" icon={<ListTree size={20} />}>
        <TextInput source="id" label="Identifiant" disabled fullWidth />
        <ParentTabSelect />
      </FormSection>
      <FormSection title="Libellé & lien" icon={<Link2 size={20} />}>
        <TextInput source="label" label="Libellé affiché" validate={required()} fullWidth />
        <TextInput source="href" label="Chemin URL" validate={required()} fullWidth />
        <NumberInput source="order" label="Ordre d'affichage" validate={required()} fullWidth />
      </FormSection>
      <FormSection title="Référence technique" icon={<Hash size={20} />} description="Clé i18n d'origine — conservée pour la synchronisation future avec le portail">
        <TextInput source="navKey" label="Clé navigation" fullWidth disabled />
      </FormSection>
    </>
  )
}

function NavigationCreatePage() {
  const [searchParams] = useSearchParams()
  const parentId = searchParams.get('parentId') ?? undefined

  return (
    <ModernCreate
      title="Nouvel onglet"
      subtitle="Ajoutez un onglet principal ou un sous-onglet"
      defaultValues={{ parentId, order: 10 }}
    >
      <NavigationCreateForm />
    </ModernCreate>
  )
}

export const navigationResources = (
  <Resource
    name="navigationItems"
    list={
      <ModernListShell sort={{ field: 'order', order: 'ASC' }} perPage={200}>
        <NavigationListView />
      </ModernListShell>
    }
    edit={
      <ModernEdit
        title="Modifier l'onglet"
        subtitle="Onglet principal ou sous-onglet du portail public"
      >
        <NavigationEditForm />
      </ModernEdit>
    }
    create={<NavigationCreatePage />}
    recordRepresentation="label"
    options={{ label: 'Navigation' }}
  />
)
