import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { firestore } from '../../firebase/app'
import { isFirestorePermissionError } from './session'
import { countUnreadVisitorMessages } from '../visitor-messages/unread-count'

export type DashboardVisitStats = {
  total: number
  today: number
  thisMonth: number
  lastVisitAt?: string
}

export type DashboardKpi = {
  id: string
  label: string
  value: number
  hint?: string
}

export type DashboardStats = {
  visits: DashboardVisitStats
  kpis: DashboardKpi[]
}

const KPI_LABELS: Record<string, string> = {
  visitorMessages: 'Messages visiteurs',
  parishUsers: 'Utilisateurs admin',
  weeklyAnnouncements: 'Annonces hebdomadaires',
  parishAnnouncements: 'Annonces paroissiales',
  mediaPhotos: 'Photos',
  mediaVideos: 'Vidéos',
  mediaAlbums: 'Albums photo',
  donationPaymentMethods: 'Moyens de paiement',
  contacts: 'Contacts',
  socialNetworks: 'Réseaux sociaux',
  churchSections: 'Rubriques Église',
  parishSecretaryVisits: 'Permanences secrétariat',
  parishCurateVisits: 'Permanences Père Curé',
}

const KPI_RESOURCES = [
  'visitorMessages',
  'parishUsers',
  'weeklyAnnouncements',
  'parishAnnouncements',
  'mediaPhotos',
  'mediaVideos',
  'mediaAlbums',
  'donationPaymentMethods',
  'contacts',
  'socialNetworks',
  'churchSections',
  'parishSecretaryVisits',
  'parishCurateVisits',
] as const

export async function loadDashboardStats(): Promise<DashboardStats> {
  const visits = await fetchVisitStats()
  const counts = await fetchResourceCounts()
  const unreadMessages = await fetchUnreadMessages()

  const kpis: DashboardKpi[] = [
    {
      id: 'visits-total',
      label: 'Visites totales',
      value: visits.total,
      hint: 'Sessions uniques sur le portail',
    },
    {
      id: 'visits-today',
      label: "Visites aujourd'hui",
      value: visits.today,
    },
    {
      id: 'visits-month',
      label: 'Visites ce mois',
      value: visits.thisMonth,
    },
    {
      id: 'messages-unread',
      label: 'Messages non lus',
      value: unreadMessages,
    },
  ]

  for (const resource of KPI_RESOURCES) {
    const label = KPI_LABELS[resource] ?? resource
    let value = counts[resource] ?? 0
    if (resource === 'parishUsers') {
      value = await fetchActiveUsersCount()
    }
    kpis.push({ id: resource, label, value })
  }

  return { visits, kpis }
}

async function fetchVisitStats(): Promise<DashboardVisitStats> {
  try {
    const snap = await getDoc(doc(firestore, 'siteAnalytics', 'summary'))
    if (!snap.exists()) return { total: 0, today: 0, thisMonth: 0 }
    const data = snap.data()
    const today = new Date().toISOString().slice(0, 10)
    const month = today.slice(0, 7)
    return {
      total: Number(data.totalVisits ?? 0),
      today: data.dayKey === today ? Number(data.visitsToday ?? 0) : 0,
      thisMonth: data.monthKey === month ? Number(data.visitsThisMonth ?? 0) : 0,
      lastVisitAt: data.lastVisitAt as string | undefined,
    }
  } catch (error) {
    if (isFirestorePermissionError(error)) return { total: 0, today: 0, thisMonth: 0 }
    throw error
  }
}

async function fetchResourceCounts(): Promise<Record<string, number>> {
  const counts: Record<string, number> = {}
  await Promise.all(
    KPI_RESOURCES.map(async (resource) => {
      if (resource === 'parishUsers') return
      try {
        const snap = await getDocs(collection(firestore, resource))
        counts[resource] = snap.size
      } catch {
        counts[resource] = 0
      }
    }),
  )
  return counts
}

async function fetchUnreadMessages(): Promise<number> {
  try {
    const snap = await getDocs(collection(firestore, 'visitorMessages'))
    return countUnreadVisitorMessages(snap.docs)
  } catch {
    return 0
  }
}

async function fetchActiveUsersCount(): Promise<number> {
  try {
    const snap = await getDocs(collection(firestore, 'parishUsers'))
    return snap.docs.filter((d) => d.data().active !== false).length
  } catch {
    return 0
  }
}
