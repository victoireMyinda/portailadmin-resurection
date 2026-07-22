import eglise from '@frontuser/assets/eglise.webp'
import chorale from '@frontuser/assets/chorale.webp'
import fidele from '@frontuser/assets/fidele.webp'
import grotte from '@frontuser/assets/grotte.webp'
import paroisse from '@frontuser/assets/paroisse.webp'
import parishData from '../../../../frontpublic/src/data/parish.json'
import type { HomeAboutRecord, HomeCurateMessageRecord, HomeHeroSlideRecord } from '../../types'

export function buildHomeHeroSlidesSeed(): HomeHeroSlideRecord[] {
  return [
    {
      id: 'hero-faith',
      imageUrl: eglise,
      title: 'Paroisse Catholique',
      titleLine2: 'de la Résurrection',
      description: 'Une communauté de foi au cœur de Lemba Salongo',
      ctaLabel: 'Découvrir la paroisse',
      ctaHref: '#mot-du-cure',
      featured: true,
      order: 10,
    },
    {
      id: 'hero-liturgy',
      imageUrl: chorale,
      title: 'Louange et célébration',
      description: 'Une liturgie vivante au service de la foi',
      ctaLabel: 'Nos horaires',
      ctaHref: '#horaires',
      order: 20,
    },
    {
      id: 'hero-community',
      imageUrl: fidele,
      title: 'Communauté de fidèles',
      description: 'Espérance, charité et engagement pastoral',
      ctaLabel: 'Nos commissions',
      ctaHref: '/notre-paroisse/commissions',
      order: 30,
    },
    {
      id: 'hero-prayer',
      imageUrl: grotte,
      title: 'Prière et dévotion',
      description: 'Un lieu de rencontre avec le Christ ressuscité',
      ctaLabel: 'Messe en direct',
      ctaHref: '#direct',
      order: 40,
    },
  ]
}

export function buildHomeCurateMessageSeed(): HomeCurateMessageRecord[] {
  const msg = parishData.curateMessage
  return [
    {
      id: 'default',
      imageUrl: eglise,
      title: msg.title,
      name: msg.name,
      role: msg.role,
      greeting: msg.greeting,
      content: msg.content,
      signature: msg.signature,
    },
  ]
}

export function buildHomeAboutSeed(): HomeAboutRecord[] {
  return [
    {
      id: 'default',
      imageUrl: paroisse,
      title: 'À propos de notre paroisse',
      presentation:
        "La Paroisse Catholique de la Résurrection est une communauté vivante au cœur de Lemba Salongo, Kinshasa. Fidèle à la mission de l'Église, elle accueille, forme et envoie chaque fidèle à témoigner de l'Évangile dans la joie et la charité.",
      historySummary:
        "Née du dynamisme pastoral de Lemba, notre paroisse porte le nom de la Résurrection du Christ — signe d'espérance pour Salongo-Sud et toute la capitale congolaise.",
      readMorePath: '/notre-paroisse/histoire',
    },
  ]
}
