import { pageSections } from '../pages/page-sections'

const hubResourcePaths = new Set(
  pageSections.flatMap((section) => section.modules.map((mod) => mod.to)),
)

export function getPageHubBackTarget(resource: string): { to: string; label: string } | null {
  const path = `/${resource}`
  if (!hubResourcePaths.has(path)) return null
  return { to: '/pages', label: 'Retour aux pages' }
}

export function findPageSectionTitle(resource: string): string | null {
  const path = `/${resource}`
  for (const section of pageSections) {
    if (section.modules.some((mod) => mod.to === path)) return section.title
  }
  return null
}
