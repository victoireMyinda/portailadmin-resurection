import type { ResourceName } from '../../constants'

/** Ressources sans champ locale (refonte admin). */
export const LOCALIZED_RESOURCES = new Set<ResourceName>()

export function isLocalizedResource(_resource: string): boolean {
  return false
}
