export interface ContactRecord {
  id: string
  label: string
  physicalAddress: string
  email: string
  phones: { label: string; number: string }[]
}

export interface SocialNetworkRecord {
  id: string
  name: string
  iconUrl: string
  link: string
  order?: number
}

export interface ParishLogoRecord {
  id: string
  imageUrl: string
  primaryTitle: string
  secondaryTitle: string
  archdioceseBannerTitle?: string
  headerArchdiocese?: string
  headerDeanery?: string
  headerParish?: string
  headerLocation?: string
}

export interface NavigationItemRecord {
  id: string
  label: string
  href: string
  order: number
  parentId?: string
  navKey?: string
}

export interface PageBannerRecord {
  id: string
  imageUrl: string
  title: string
  titleLine2?: string
  description: string
  pagePath: string
  order?: number
}

export interface HomeHeroSlideRecord {
  id: string
  imageUrl: string
  title: string
  titleLine2?: string
  description: string
  ctaLabel: string
  ctaHref: string
  featured?: boolean
  order: number
}

export interface HomeCurateMessageRecord {
  id: string
  imageUrl: string
  title: string
  name: string
  role: string
  greeting: string
  content: string
  signature: string
}

export interface HomeAboutRecord {
  id: string
  imageUrl: string
  title: string
  presentation: string
  historySummary: string
  readMorePath?: string
}

export interface ParishHistorySectionRecord {
  id: string
  heading: string
  content: string
  order: number
}

export interface ParishCurateRecord {
  id: string
  name: string
  period: string
  imageUrl: string
  achievements: string[]
  order: number
}

export interface ParishWeeklyDayRecord {
  id: string
  dayLabel: string
  order: number
  activities: { time: string; title: string; location: string }[]
}

export interface ParishMassCategoryRecord {
  id: string
  category: string
  order: number
  items: { day: string; time: string; description: string }[]
}

export interface ParishCommissionRecord {
  id: string
  name: string
  mission: string
  description: string
  responsible: string
  contact: string
  imageUrl: string
  subCommissions: { name: string; description: string }[]
  order: number
}

export interface ParishGroupRecord {
  id: string
  name: string
  mission: string
  activities: string
  responsible: string
  order: number
}

export interface AnnouncementRecord {
  id: string
  title: string
  category: string
  date: string
  excerpt: string
  content: string
  mediaType?: 'none' | 'image' | 'video'
  mediaImageUrl?: string
  mediaYoutubeId?: string
  order?: number
}

export interface LiturgySeasonItem {
  name: string
  note?: string
}

export interface LiturgyCalendarRecord {
  id: string
  season: string
  color: string
  liturgicalDay: string
  nextEventTitle: string
  nextEventDate: string
  nextEventLocation: string
  featuredTitle: string
  featuredSubtitle: string
  featuredDescription: string
  featuredCtaLabel: string
  featuredCtaHref: string
  seasons: LiturgySeasonItem[]
}

export interface LiturgyHomilyRecord {
  id: string
  title: string
  liturgicalDay: string
  date: string
  heading: string
  excerpt: string
  content: string
}

export interface LiturgyReadingItem {
  type: string
  reference: string
  text: string
}

export interface LiturgyDailyRecord {
  id: string
  readings: LiturgyReadingItem[]
  gospelReference: string
  gospelText: string
  psalmReference: string
  psalmText: string
  wordReference: string
  wordText: string
  saintName: string
  saintFeast: string
  saintMeditation: string
}

export interface LiveStreamUpcomingItem {
  title: string
  date: string
  platform: string
}

export interface LiveStreamSettingsRecord {
  id: string
  title: string
  subtitle: string
  description: string
  scheduleNote: string
  notifyHint: string
  featuredTitle: string
  featuredDescription: string
  featuredWatchUrl: string
  featuredEmbedUrl: string
  upcoming: LiveStreamUpcomingItem[]
}

export interface LiveStreamPlatformRecord {
  id: string
  name: string
  order: number
  watchUrl: string
  embedUrl: string
  offlineTitle: string
  offlineDescription: string
  isLive: boolean
}

export interface MediaAlbumRecord {
  id: string
  title: string
  description: string
  photoIds: string[]
  order: number
}

export interface MediaPhotoRecord {
  id: string
  title: string
  category: string
  imageSource: 'url' | 'upload'
  imageUrl: string
  thumbnailUrl: string
  order: number
}

export interface MediaVideoRecord {
  id: string
  title: string
  description: string
  category?: string
  youtubeId: string
  videoSource?: 'youtube' | 'url' | 'upload'
  videoUrl?: string
  thumbnailUrl?: string
  order: number
}

export interface ChurchContentBlockRecord {
  heading?: string
  paragraphs: string[]
}

export interface ChurchSectionRecord {
  id: string
  title: string
  subtitle: string
  blocks: ChurchContentBlockRecord[]
  order: number
}

export interface DonationVerseRecord {
  reference: string
  text: string
}

export interface DonationSettingsRecord {
  id: string
  spiritualIntro: string
  spiritualTitle: string
  spiritualMessage: string
  thankYou: string
  receiptNote: string
  verses: DonationVerseRecord[]
  accountDisplayName: string
}

export interface DonationPaymentMethodRecord {
  id: string
  name: string
  accountName: string
  number: string
  currency: 'USD' | 'CDF'
  type: 'mobile' | 'bank'
  order: number
  imageUrl?: string
  imageSource?: 'url' | 'upload'
}

export interface ParishVisitRecord {
  id: string
  name: string
  day: string
  timeRange: string
  location: string
  phone: string
  order: number
}

export type ParishUserRole = 'admin' | 'cure' | 'secretaire'

export interface ParishUserRecord {
  id: string
  email: string
  displayName: string
  role: ParishUserRole
  imageUrl?: string
  active: boolean
  createdAt: string
}

export interface VisitorMessageRecord {
  id: string
  name: string
  phone: string
  message: string
  createdAt: string
  read: boolean
}

export type Database = {
  contacts: ContactRecord[]
  socialNetworks: SocialNetworkRecord[]
  parishLogos: ParishLogoRecord[]
  navigationItems: NavigationItemRecord[]
  pageBanners: PageBannerRecord[]
  homeHeroSlides: HomeHeroSlideRecord[]
  homeCurateMessages: HomeCurateMessageRecord[]
  homeAbout: HomeAboutRecord[]
  parishHistorySections: ParishHistorySectionRecord[]
  parishCurates: ParishCurateRecord[]
  parishWeeklyDays: ParishWeeklyDayRecord[]
  parishMassCategories: ParishMassCategoryRecord[]
  parishCommissions: ParishCommissionRecord[]
  parishGroups: ParishGroupRecord[]
  weeklyAnnouncements: AnnouncementRecord[]
  parishAnnouncements: AnnouncementRecord[]
  liturgyCalendar: LiturgyCalendarRecord[]
  liturgyHomily: LiturgyHomilyRecord[]
  liturgyDaily: LiturgyDailyRecord[]
  liveStreamSettings: LiveStreamSettingsRecord[]
  liveStreamPlatforms: LiveStreamPlatformRecord[]
  mediaAlbums: MediaAlbumRecord[]
  mediaPhotos: MediaPhotoRecord[]
  mediaVideos: MediaVideoRecord[]
  churchSections: ChurchSectionRecord[]
  donationSettings: DonationSettingsRecord[]
  donationPaymentMethods: DonationPaymentMethodRecord[]
  parishSecretaryVisits: ParishVisitRecord[]
  parishCurateVisits: ParishVisitRecord[]
  visitorMessages: VisitorMessageRecord[]
  parishUsers: ParishUserRecord[]
}
