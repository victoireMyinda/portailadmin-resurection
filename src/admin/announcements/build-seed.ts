import eglise from '@frontuser/assets/eglise.webp'
import paroisse from '@frontuser/assets/paroisse.webp'
import chorale from '@frontuser/assets/chorale.webp'
import fidele from '@frontuser/assets/fidele.webp'
import grotte from '@frontuser/assets/grotte.webp'
import statutmarie from '@frontuser/assets/statutmarie.webp'
import nouvellegrotte from '@frontuser/assets/nouvellegrotte.webp'
import announcementsData from '../../../../frontpublic/src/data/announcements.json'
import type { AnnouncementRecord } from '../../types'

const imageByKey: Record<string, string> = {
  eglise,
  paroisse,
  chorale,
  fidele,
  grotte,
  statutmarie,
  nouvellegrotte,
}

type RawAnnouncement = (typeof announcementsData)[number]

function mapAnnouncement(raw: RawAnnouncement, order: number): AnnouncementRecord {
  const media = raw.media as { type: string; imageKey?: string; youtubeId?: string } | undefined
  let mediaType: AnnouncementRecord['mediaType'] = 'none'
  let mediaImageUrl: string | undefined
  let mediaYoutubeId: string | undefined

  if (media?.type === 'image' && media.imageKey) {
    mediaType = 'image'
    mediaImageUrl = imageByKey[media.imageKey] ?? eglise
  } else if (media?.type === 'video' && media.youtubeId) {
    mediaType = 'video'
    mediaYoutubeId = media.youtubeId
  }

  return {
    id: raw.id,
    title: raw.title,
    category: raw.category,
    date: raw.date,
    excerpt: raw.excerpt,
    content: raw.content,
    mediaType,
    mediaImageUrl,
    mediaYoutubeId,
    order,
  }
}

export function buildWeeklyAnnouncementsSeed(): AnnouncementRecord[] {
  return announcementsData.slice(0, 4).map((raw, index) => mapAnnouncement(raw, (index + 1) * 10))
}

export function buildParishAnnouncementsSeed(): AnnouncementRecord[] {
  return announcementsData.map((raw, index) => mapAnnouncement(raw, (index + 1) * 10))
}

export const announcementCategoryChoices = [
  { id: 'retraites', name: 'Retraites' },
  { id: 'veillees', name: 'Veillées' },
  { id: 'bans', name: 'Bans de mariage' },
  { id: 'baptemes', name: 'Baptêmes' },
  { id: 'evenements', name: 'Événements' },
  { id: 'pelerinages', name: 'Pèlerinages' },
  { id: 'communiques', name: 'Communiqués' },
  { id: 'ordinations', name: 'Ordinations' },
  { id: 'funerailles', name: 'Funérailles' },
]
