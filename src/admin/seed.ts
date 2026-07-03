import type { Database } from '../types'
import parishLogoImage from '@frontuser/assets/paroisse.webp'
import { buildNavigationSeed } from './navigation/build-seed'
import { buildPageBannersSeed } from './banners/build-seed'
import {
  buildHomeAboutSeed,
  buildHomeCurateMessageSeed,
  buildHomeHeroSlidesSeed,
} from './home/build-seed'
import {
  buildParishCommissionsSeed,
  buildParishCuratesSeed,
  buildParishGroupsSeed,
  buildParishHistorySeed,
  buildParishMassSeed,
  buildParishWeeklySeed,
} from './parish/build-seed'
import { buildParishAnnouncementsSeed, buildWeeklyAnnouncementsSeed } from './announcements/build-seed'
import {
  buildLiturgyCalendarSeed,
  buildLiturgyDailySeed,
  buildLiturgyHomilySeed,
} from './liturgy/build-seed'
import { buildLiveStreamPlatformsSeed, buildLiveStreamSettingsSeed } from './live-stream/build-seed'
import { buildMediaAlbumsSeed, buildMediaPhotosSeed, buildMediaVideosSeed } from './media/build-seed'
import { buildChurchSectionsSeed } from './church/build-seed'
import { buildDonationPaymentMethodsSeed, buildDonationSettingsSeed } from './donations/build-seed'

export function buildSeedDatabase(): Database {
  return {
    contacts: [
      {
        id: 'main',
        label: 'Paroisse principale',
        physicalAddress:
          'Quartier Salongo-Sud, Commune de Lemba, Kinshasa, République Démocratique du Congo',
        email: 'contact@paroisseresurrection-kinshasa.org',
        phones: [
          { label: 'Standard', number: '+243 81 664 4420' },
          { label: 'Affichage', number: '081 664 4420' },
        ],
      },
    ],
    socialNetworks: [
      {
        id: 'facebook',
        name: 'Facebook',
        iconUrl: 'https://cdn.simpleicons.org/facebook/1877F2',
        link: 'https://facebook.com/paroisseresurrection',
        order: 1,
      },
      {
        id: 'whatsapp',
        name: 'WhatsApp',
        iconUrl: 'https://cdn.simpleicons.org/whatsapp/25D366',
        link: 'https://wa.me/243816644420',
        order: 2,
      },
      {
        id: 'youtube',
        name: 'YouTube',
        iconUrl: 'https://cdn.simpleicons.org/youtube/FF0000',
        link: 'https://youtube.com/@paroisseresurrection',
        order: 3,
      },
      {
        id: 'instagram',
        name: 'Instagram',
        iconUrl: 'https://cdn.simpleicons.org/instagram/E4405F',
        link: 'https://instagram.com/paroisseresurrection',
        order: 4,
      },
      {
        id: 'tiktok',
        name: 'TikTok',
        iconUrl: 'https://cdn.simpleicons.org/tiktok/000000',
        link: 'https://tiktok.com/@paroisseresurrection',
        order: 5,
      },
    ],
    parishLogos: [
      {
        id: 'header',
        imageUrl: parishLogoImage,
        primaryTitle: 'Paroisse de la Résurrection',
        secondaryTitle: 'Lemba Salongo, Kinshasa',
      },
    ],
    navigationItems: buildNavigationSeed(),
    pageBanners: buildPageBannersSeed(),
    homeHeroSlides: buildHomeHeroSlidesSeed(),
    homeCurateMessages: buildHomeCurateMessageSeed(),
    homeAbout: buildHomeAboutSeed(),
    parishHistorySections: buildParishHistorySeed(),
    parishCurates: buildParishCuratesSeed(),
    parishWeeklyDays: buildParishWeeklySeed(),
    parishMassCategories: buildParishMassSeed(),
    parishCommissions: buildParishCommissionsSeed(),
    parishGroups: buildParishGroupsSeed(),
    weeklyAnnouncements: buildWeeklyAnnouncementsSeed(),
    parishAnnouncements: buildParishAnnouncementsSeed(),
    liturgyCalendar: buildLiturgyCalendarSeed(),
    liturgyHomily: buildLiturgyHomilySeed(),
    liturgyDaily: buildLiturgyDailySeed(),
    liveStreamSettings: buildLiveStreamSettingsSeed(),
    liveStreamPlatforms: buildLiveStreamPlatformsSeed(),
    mediaAlbums: buildMediaAlbumsSeed(),
    mediaPhotos: buildMediaPhotosSeed(),
    mediaVideos: buildMediaVideosSeed(),
    churchSections: buildChurchSectionsSeed(),
    donationSettings: buildDonationSettingsSeed(),
    donationPaymentMethods: buildDonationPaymentMethodsSeed(),
    visitorMessages: [],
    parishUsers: [],
  }
}
