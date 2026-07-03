import { mainNavigation } from '../../../../frontuser/src/config/navigation'
import type { NavigationItemRecord } from '../../types'

const NAV_LABELS_FR: Record<string, string> = {
  'nav.home': 'Accueil',
  'nav.parish': 'Notre Paroisse',
  'nav.parish.history': 'Historique de la paroisse',
  'nav.parish.curates': 'Historique des Curés',
  'nav.parish.weekly': 'Annonces de la semaine',
  'nav.parish.masses': 'Programme des messes',
  'nav.parish.commissions': 'Commissions',
  'nav.parish.groups': 'Groupes et mouvements',
  'nav.events': 'Événements',
  'nav.announcements': 'Annonces',
  'nav.announcements.weekly': 'Annonce de la semaine',
  'nav.announcements.all': 'Toutes les annonces',
  'nav.liturgy': 'Liturgie',
  'nav.liturgy.calendar': 'Calendrier liturgique',
  'nav.liturgy.homily': 'Homélie du jour',
  'nav.liturgy.daily': 'Parole et Saint du jour',
  'nav.live': 'Messe en direct',
  'nav.media': 'Médias',
  'nav.church': "Tout sur l'Église",
  'nav.church.history': "Historique de l'Église",
  'nav.church.sacraments': 'Les Sacrements',
  'nav.church.liturgy': 'La Liturgie',
  'nav.church.seasons': 'Temps liturgique',
  'nav.church.feasts': 'Fêtes chrétiennes',
  'nav.church.saints': 'Les Saints',
  'nav.church.prayers': 'Prières catholiques',
  'nav.church.catechism': 'Le Catéchisme',
  'nav.church.documents': "Documents de l'Église",
  'nav.church.bible': 'La Bible',
  'nav.church.councils': 'Les Conciles',
  'nav.church.popes': 'Les Papes',
  'nav.church.vocations': 'Les Vocations',
  'nav.church.faq': 'FAQ — Foi catholique',
}

function keyToId(key: string): string {
  return key.replace(/^nav\./, '').replace(/\./g, '-')
}

export function buildNavigationSeed(): NavigationItemRecord[] {
  const items: NavigationItemRecord[] = []
  let mainOrder = 0

  for (const item of mainNavigation) {
    mainOrder += 10
    const id = keyToId(item.key)
    items.push({
      id,
      label: NAV_LABELS_FR[item.key] ?? item.key,
      href: item.href,
      order: mainOrder,
      navKey: item.key,
    })

    if (item.children) {
      let childOrder = 0
      for (const child of item.children) {
        childOrder += 10
        items.push({
          id: keyToId(child.key),
          label: NAV_LABELS_FR[child.key] ?? child.key,
          href: child.href,
          order: childOrder,
          parentId: id,
          navKey: child.key,
        })
      }
    }
  }

  return items
}
