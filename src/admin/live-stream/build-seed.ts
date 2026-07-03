import liveData from '../../../../frontuser/src/data/live.json'
import type { LiveStreamPlatformRecord, LiveStreamSettingsRecord } from '../../types'

export const livePlatformIds = ['youtube', 'facebook', 'tiktok'] as const

export function buildLiveStreamSettingsSeed(): LiveStreamSettingsRecord[] {
  return [
    {
      id: 'current',
      title: liveData.title,
      subtitle: liveData.subtitle,
      description: liveData.description,
      scheduleNote: liveData.scheduleNote,
      notifyHint: liveData.notifyHint,
      featuredTitle: liveData.featuredVideo.title,
      featuredDescription: liveData.featuredVideo.description,
      featuredWatchUrl: liveData.featuredVideo.watchUrl,
      featuredEmbedUrl: liveData.featuredVideo.embedUrl,
      upcoming: liveData.upcoming,
    },
  ]
}

export function buildLiveStreamPlatformsSeed(): LiveStreamPlatformRecord[] {
  return liveData.platforms.map((platform) => ({
    id: platform.id,
    name: platform.name,
    order: platform.order,
    watchUrl: platform.watchUrl,
    embedUrl: platform.embedUrl,
    offlineTitle: platform.offlineTitle,
    offlineDescription: platform.offlineDescription,
    isLive: platform.isLive,
  }))
}
