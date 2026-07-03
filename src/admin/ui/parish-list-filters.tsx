import type { ReactElement } from 'react'
import { SearchInput, SelectInput, NullableBooleanInput } from 'react-admin'

export const parishSearchFilter = (
  <SearchInput source="q" alwaysOn key="parish-search" placeholder="Rechercher…" resettable />
)

export function mergeParishFilters(extra: ReactElement[] = []): ReactElement[] {
  return [parishSearchFilter, ...extra]
}

export const paymentTypeFilter = (
  <SelectInput
    source="type"
    key="filter-type"
    label="Type"
    choices={[
      { id: 'mobile', name: 'Mobile Money' },
      { id: 'bank', name: 'Banque / carte' },
    ]}
    alwaysOn
    emptyText="Tous les types"
  />
)

export const paymentCurrencyFilter = (
  <SelectInput
    source="currency"
    key="filter-currency"
    label="Devise"
    choices={[
      { id: 'USD', name: 'USD' },
      { id: 'CDF', name: 'CDF' },
    ]}
    alwaysOn
    emptyText="Toutes les devises"
  />
)

export const visitorReadFilter = (
  <SelectInput
    source="read"
    key="filter-read"
    label="Statut"
    choices={[
      { id: 'false', name: 'Non lu' },
      { id: 'true', name: 'Lu' },
    ]}
    alwaysOn
    emptyText="Tous"
  />
)

export const parishUserRoleFilter = (
  <SelectInput
    source="role"
    key="filter-role"
    label="Rôle"
    choices={[
      { id: 'admin', name: 'Admin' },
      { id: 'cure', name: 'Curé' },
      { id: 'secretaire', name: 'Secrétaire' },
    ]}
    alwaysOn
    emptyText="Tous les rôles"
  />
)

export const parishUserActiveFilter = (
  <NullableBooleanInput
    source="active"
    key="filter-active"
    label="Actif"
    nullLabel="Tous"
    falseLabel="Inactif"
    trueLabel="Actif"
  />
)
