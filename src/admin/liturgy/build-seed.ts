import liturgyData from '../../../../frontuser/src/data/liturgy.json'
import type { LiturgyCalendarRecord, LiturgyDailyRecord, LiturgyHomilyRecord } from '../../types'

const defaultSeasons = [
  { name: 'Avent', note: '' },
  { name: 'Noël', note: '' },
  { name: 'Carême', note: '' },
  { name: 'Pâques', note: '' },
  { name: 'Temps ordinaire', note: 'Saison actuelle' },
  { name: 'Pentecôte', note: '' },
]

export const liturgyColorChoices = [
  { id: 'Vert', name: 'Vert' },
  { id: 'Blanc', name: 'Blanc' },
  { id: 'Rouge', name: 'Rouge' },
  { id: 'Violet', name: 'Violet' },
  { id: 'Rose', name: 'Rose' },
]

export function buildLiturgyCalendarSeed(): LiturgyCalendarRecord[] {
  return [
    {
      id: 'current',
      season: liturgyData.homily.liturgicalDay,
      color: 'Vert',
      liturgicalDay: liturgyData.homily.liturgicalDay,
      nextEventTitle: liturgyData.nextEvent.title,
      nextEventDate: liturgyData.nextEvent.date,
      nextEventLocation: liturgyData.nextEvent.location,
      featuredTitle: liturgyData.featuredTheme.title,
      featuredSubtitle: liturgyData.featuredTheme.subtitle,
      featuredDescription: liturgyData.featuredTheme.description,
      featuredCtaLabel: liturgyData.featuredTheme.ctaLabel,
      featuredCtaHref: liturgyData.featuredTheme.ctaHref,
      seasons: defaultSeasons,
    },
  ]
}

export function buildLiturgyHomilySeed(): LiturgyHomilyRecord[] {
  return [
    {
      id: 'current',
      title: liturgyData.homily.title,
      liturgicalDay: liturgyData.homily.liturgicalDay,
      date: liturgyData.homily.date,
      heading: liturgyData.homily.heading,
      excerpt: liturgyData.homily.excerpt,
      content: liturgyData.homily.content,
    },
  ]
}

export function buildLiturgyDailySeed(): LiturgyDailyRecord[] {
  return [
    {
      id: 'current',
      readings: [
        {
          type: 'Première lecture',
          reference: 'Ac 2, 14. 36-41',
          text: "Pierre, debout avec les onze, éleva la voix et leur dit : « Que toute la maison d'Israël sache donc avec certitude que Dieu a fait Seigneur et Christ ce Jésus que vous avez crucifié. »",
        },
        {
          type: 'Deuxième lecture',
          reference: '1 P 2, 4-9',
          text: 'Approchez-vous du Seigneur, pierre vivante, rejetée par les hommes mais choisie et précieuse aux yeux de Dieu.',
        },
      ],
      gospelReference: 'Jn 10, 1-10',
      gospelText:
        "En vérité, en vérité, je vous le dis : celui qui n'entre pas par la porte dans la bergerie des moutons, mais qui escalade par ailleurs, c'est un voleur et un brigand.",
      psalmReference: 'Ps 23',
      psalmText: 'Le Seigneur est mon berger : je ne manque de rien. Il me fait reposer dans de verts pâturages.',
      wordReference: liturgyData.wordOfDay.reference,
      wordText: liturgyData.wordOfDay.text,
      saintName: liturgyData.saintOfDay.name,
      saintFeast: liturgyData.saintOfDay.feast,
      saintMeditation: liturgyData.saintOfDay.excerpt,
    },
  ]
}
