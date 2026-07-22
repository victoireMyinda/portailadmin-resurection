/**
 * Collections Firestore gérées par frontadmin.
 * Contrat partagé avec frontuser (lecture seule) — voir frontpublic/src/firebase/cms-contract.ts
 */
export const RESOURCE_NAMES = [
  'contacts',
  'socialNetworks',
  'parishLogos',
  'navigationItems',
  'pageBanners',
  'homeHeroSlides',
  'homeCurateMessages',
  'homeAbout',
  'parishHistorySections',
  'parishCurates',
  'parishWeeklyDays',
  'parishMassCategories',
  'parishCommissions',
  'parishGroups',
  'weeklyAnnouncements',
  'parishAnnouncements',
  'liturgyCalendar',
  'liturgyHomily',
  'liturgyDaily',
  'liveStreamSettings',
  'liveStreamPlatforms',
  'mediaAlbums',
  'mediaPhotos',
  'mediaVideos',
  'churchSections',
  'donationSettings',
  'donationPaymentMethods',
  'parishSecretaryVisits',
  'parishCurateVisits',
  'visitorMessages',
  'parishUsers',
] as const

export type ResourceName = (typeof RESOURCE_NAMES)[number]
