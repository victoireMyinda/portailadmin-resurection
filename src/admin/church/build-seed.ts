import { churchSectionIds } from '../../../../frontuser/src/config/navigation'
import { churchFr } from '../../../../frontuser/src/i18n/content/fr/church'
import type { ChurchSectionRecord } from '../../types'

export const churchSectionChoices = churchSectionIds.map((id) => ({
  id,
  name: id
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' '),
}))

export function buildChurchSectionsSeed(): ChurchSectionRecord[] {
  return churchSectionIds.map((id, index) => {
    const section = churchFr[id]
    return {
      id,
      title: section.title,
      subtitle: section.subtitle,
      blocks: section.blocks.map((block) => ({
        ...(block.heading ? { heading: block.heading } : {}),
        paragraphs: [...block.paragraphs],
      })),
      order: (index + 1) * 10,
    }
  })
}
