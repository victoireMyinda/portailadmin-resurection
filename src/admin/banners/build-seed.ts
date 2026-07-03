import eglise from '@frontuser/assets/eglise.webp'
import paroisse from '@frontuser/assets/paroisse.webp'
import chorale from '@frontuser/assets/chorale.webp'
import fidele from '@frontuser/assets/fidele.webp'
import grotte from '@frontuser/assets/grotte.webp'
import statutmarie from '@frontuser/assets/statutmarie.webp'
import type { PageBannerRecord } from '../../types'

type BannerSeed = Omit<PageBannerRecord, 'imageUrl'> & { imageUrl: string }

const entries: BannerSeed[] = [
  // Notre Paroisse
  {
    id: 'parish-history',
    pagePath: '/notre-paroisse/histoire',
    title: 'Historique de la paroisse',
    description: 'Une communauté de foi, d’espérance et de charité au cœur de Lemba Salongo.',
    imageUrl: paroisse,
    order: 10,
  },
  {
    id: 'parish-curates',
    pagePath: '/notre-paroisse/cures',
    title: 'Historique des Curés',
    description: 'Les pasteurs qui ont accompagné la paroisse au fil des années.',
    imageUrl: eglise,
    order: 20,
  },
  {
    id: 'parish-weekly',
    pagePath: '/notre-paroisse/annonces-semaine',
    title: 'Annonces de la semaine',
    description: 'Programme de la semaine paroissiale.',
    imageUrl: fidele,
    order: 30,
  },
  {
    id: 'parish-masses',
    pagePath: '/notre-paroisse/messes',
    title: 'Programme des messes',
    description: 'Horaires des célébrations eucharistiques à la paroisse.',
    imageUrl: eglise,
    order: 40,
  },
  {
    id: 'commissions',
    pagePath: '/notre-paroisse/commissions',
    title: 'Commissions',
    description: 'Découvrir nos commissions paroissiales.',
    imageUrl: chorale,
    order: 50,
  },
  {
    id: 'parish-groups',
    pagePath: '/notre-paroisse/groupes',
    title: 'Groupes et mouvements',
    description: 'Mouvements, associations et groupes de la vie paroissiale.',
    imageUrl: fidele,
    order: 60,
  },
  // Annonces
  {
    id: 'announcements-weekly',
    pagePath: '/annonces/semaine',
    title: 'Annonce de la semaine',
    description: 'Bulletin hebdomadaire de la paroisse.',
    imageUrl: fidele,
    order: 65,
  },
  {
    id: 'announcements-all',
    pagePath: '/annonces/toutes',
    title: 'Toutes les annonces',
    description: 'Vie paroissiale et annonces récentes.',
    imageUrl: paroisse,
    order: 66,
  },
  // Liturgie
  {
    id: 'liturgy-calendar',
    pagePath: '/liturgie/calendrier',
    title: 'Calendrier liturgique',
    description: 'Temps liturgiques et fêtes de l’Église.',
    imageUrl: chorale,
    order: 100,
  },
  {
    id: 'liturgy-homily',
    pagePath: '/liturgie/homelie',
    title: 'Homélie du jour',
    description: 'Méditation sur la Parole de Dieu pour la journée.',
    imageUrl: eglise,
    order: 110,
  },
  {
    id: 'liturgy-daily',
    pagePath: '/liturgie/parole-saint',
    title: 'Parole et Saint du jour',
    description: 'Évangile du jour et saint à honorer.',
    imageUrl: statutmarie,
    order: 120,
  },
  // Pages autonomes
  {
    id: 'live',
    pagePath: '/messe-en-direct',
    title: 'Messe en direct',
    description: 'Suivez la célébration eucharistique en ligne.',
    imageUrl: chorale,
    order: 130,
  },
  {
    id: 'medias',
    pagePath: '/medias',
    title: 'Médias',
    description: 'Galerie photos & vidéos.',
    imageUrl: eglise,
    order: 140,
  },
  {
    id: 'donations',
    pagePath: '/dons',
    title: 'Donation',
    description: 'Soutenez la mission pastorale de la paroisse.',
    imageUrl: statutmarie,
    order: 150,
  },
  {
    id: 'contact',
    pagePath: '/contact',
    title: 'Contact',
    description: 'Nous sommes à votre écoute.',
    imageUrl: paroisse,
    order: 160,
  },
  // Tout sur l'Église
  {
    id: 'church-history',
    pagePath: '/eglise/histoire',
    title: "Historique de l'Église",
    description: 'Deux mille ans d’histoire et de foi catholique.',
    imageUrl: eglise,
    order: 170,
  },
  {
    id: 'church-sacraments',
    pagePath: '/eglise/sacrements',
    title: 'Les Sacrements',
    description: 'Signes visibles de la grâce invisible de Dieu.',
    imageUrl: chorale,
    order: 180,
  },
  {
    id: 'church-liturgy',
    pagePath: '/eglise/liturgie',
    title: 'La Liturgie',
    description: 'Célébration publique et officielle du culte divin.',
    imageUrl: eglise,
    order: 190,
  },
  {
    id: 'church-seasons',
    pagePath: '/eglise/temps-liturgique',
    title: 'Temps liturgique',
    description: 'Avent, Noël, Carême, Pâques et temps ordinaire.',
    imageUrl: chorale,
    order: 200,
  },
  {
    id: 'church-feasts',
    pagePath: '/eglise/fetes',
    title: 'Fêtes chrétiennes',
    description: 'Grandes solennités et fêtes du calendrier catholique.',
    imageUrl: statutmarie,
    order: 210,
  },
  {
    id: 'church-saints',
    pagePath: '/eglise/saints',
    title: 'Les Saints',
    description: 'Témoins de la foi et modèles pour les chrétiens.',
    imageUrl: statutmarie,
    order: 220,
  },
  {
    id: 'church-prayers',
    pagePath: '/eglise/prieres',
    title: 'Prières catholiques',
    description: 'Prières traditionnelles de l’Église.',
    imageUrl: grotte,
    order: 230,
  },
  {
    id: 'church-catechism',
    pagePath: '/eglise/catechisme',
    title: 'Le Catéchisme',
    description: 'Enseignement officiel de la foi catholique.',
    imageUrl: fidele,
    order: 240,
  },
  {
    id: 'church-documents',
    pagePath: '/eglise/documents',
    title: "Documents de l'Église",
    description: 'Textes magistériels et enseignements pontificaux.',
    imageUrl: paroisse,
    order: 250,
  },
  {
    id: 'church-bible',
    pagePath: '/eglise/bible',
    title: 'La Bible',
    description: 'Parole de Dieu, source de toute révélation.',
    imageUrl: paroisse,
    order: 260,
  },
  {
    id: 'church-councils',
    pagePath: '/eglise/conciles',
    title: 'Les Conciles',
    description: 'Assemblées ecclésiastiques au service de la foi.',
    imageUrl: eglise,
    order: 270,
  },
  {
    id: 'church-popes',
    pagePath: '/eglise/papes',
    title: 'Les Papes',
    description: 'Successeurs de Pierre et pasteurs de l’Église universelle.',
    imageUrl: eglise,
    order: 280,
  },
  {
    id: 'church-vocations',
    pagePath: '/eglise/vocations',
    title: 'Les Vocations',
    description: 'Appel à la vie consacrée et au service de l’Église.',
    imageUrl: fidele,
    order: 290,
  },
  {
    id: 'church-faq',
    pagePath: '/eglise/faq',
    title: 'FAQ — Foi catholique',
    description: 'Réponses aux questions fréquentes sur la foi.',
    imageUrl: grotte,
    order: 300,
  },
]

export function buildPageBannersSeed(): PageBannerRecord[] {
  return entries
}
