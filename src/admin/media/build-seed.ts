import eglise from '@frontuser/assets/eglise.webp'
import paroisse from '@frontuser/assets/paroisse.webp'
import chorale from '@frontuser/assets/chorale.webp'
import fidele from '@frontuser/assets/fidele.webp'
import cloche from '@frontuser/assets/cloche.webp'
import cloche2 from '@frontuser/assets/cloche2.webp'
import grotte from '@frontuser/assets/grotte.webp'
import anciennegrotte from '@frontuser/assets/anciennegrotte.webp'
import nouvellegrotte from '@frontuser/assets/nouvellegrotte.webp'
import statutmarie from '@frontuser/assets/statutmarie.webp'
import mediaData from '../../../../frontuser/src/data/media.json'
import type { MediaAlbumRecord, MediaPhotoRecord, MediaVideoRecord } from '../../types'

const imageByKey: Record<string, string> = {
  eglise,
  paroisse,
  chorale,
  fidele,
  cloche,
  cloche2,
  grotte,
  anciennegrotte,
  nouvellegrotte,
  statutmarie,
}

export const MEDIA_ALL_CATEGORY = 'Tout'

export const mediaCategoryChoices = mediaData.categories
  .filter((name) => name !== MEDIA_ALL_CATEGORY)
  .map((name) => ({ id: name, name }))

export const mediaCategoryFilterChoices = mediaCategoryChoices

export const mediaFilterPills = mediaData.categories.map((name) => ({
  id: name === MEDIA_ALL_CATEGORY ? 'all' : name,
  label: name,
}))

export function buildMediaPhotosSeed(): MediaPhotoRecord[] {
  return mediaData.photos.map((photo) => ({
    id: photo.id,
    title: photo.title,
    category: photo.category,
    imageUrl: photo.imageKey ? imageByKey[photo.imageKey] ?? '' : '',
    thumbnailUrl: photo.imageKey ? imageByKey[photo.imageKey] ?? '' : '',
    imageSource: 'url',
    order: photo.order,
  }))
}

export function buildMediaVideosSeed(): MediaVideoRecord[] {
  return mediaData.videos.map((video) => ({
    id: video.id,
    title: video.title,
    description: video.description,
    category: video.category,
    youtubeId: video.youtubeId,
    order: video.order,
  }))
}

export function buildMediaAlbumsSeed(): MediaAlbumRecord[] {
  return mediaData.albums.map((album) => ({
    id: album.id,
    title: album.title,
    description: album.description,
    photoIds: album.photoIds,
    order: album.order,
  }))
}
