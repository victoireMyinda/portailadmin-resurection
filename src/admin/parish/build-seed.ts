import eglise from '@frontuser/assets/eglise.webp'
import paroisse from '@frontuser/assets/paroisse.webp'
import chorale from '@frontuser/assets/chorale.webp'
import fidele from '@frontuser/assets/fidele.webp'
import grotte from '@frontuser/assets/grotte.webp'
import statutmarie from '@frontuser/assets/statutmarie.webp'
import cloche2 from '@frontuser/assets/cloche2.webp'
import commissionsData from '../../../../frontuser/src/data/commissions.json'
import weeklyScheduleData from '../../../../frontuser/src/data/weekly-schedule.json'
import parishData from '../../../../frontuser/src/data/parish.json'
import type {
  ParishCommissionRecord,
  ParishCurateRecord,
  ParishGroupRecord,
  ParishHistorySectionRecord,
  ParishMassCategoryRecord,
  ParishWeeklyDayRecord,
} from '../../types'

const commissionImages: Record<string, string> = {
  liturgique: chorale,
  catechese: fidele,
  jeunesse: paroisse,
  famille: statutmarie,
  'justice-paix': eglise,
  caritas: fidele,
  finance: cloche2,
  communication: paroisse,
  evangelisation: grotte,
  mouvements: chorale,
}

const dayLabels: Record<string, string> = {
  lundi: 'Lundi',
  mardi: 'Mardi',
  mercredi: 'Mercredi',
  jeudi: 'Jeudi',
  vendredi: 'Vendredi',
  samedi: 'Samedi',
  dimanche: 'Dimanche',
}

const dayOrder: Record<string, number> = {
  lundi: 10,
  mardi: 20,
  mercredi: 30,
  jeudi: 40,
  vendredi: 50,
  samedi: 60,
  dimanche: 70,
}

export function buildParishHistorySeed(): ParishHistorySectionRecord[] {
  return parishData.history.sections.map((section, index) => ({
    id: `history-${index + 1}`,
    heading: section.title,
    content: section.content,
    order: (index + 1) * 10,
  }))
}

export function buildParishCuratesSeed(): ParishCurateRecord[] {
  return [
    {
      id: 'mwamba',
      name: 'Abbé Joseph Mwamba',
      period: '1985 – 1998',
      imageUrl: eglise,
      achievements: [
        'Fondation de la première chapelle de Salongo-Sud',
        'Mise en place des premières commissions paroissiales',
        'Lancement de la catéchèse structurée pour enfants et adultes',
      ],
      order: 10,
    },
    {
      id: 'kabasele',
      name: 'Abbé Pierre Kabasele',
      period: '1998 – 2012',
      imageUrl: paroisse,
      achievements: [
        "Construction de l'église actuelle et du presbytère",
        'Création de la chorale paroissiale et des groupes de mouvements',
        'Développement des œuvres caritatives en faveur des familles vulnérables',
      ],
      order: 20,
    },
    {
      id: 'nkulu',
      name: 'Abbé Emmanuel Nkulu',
      period: '2012 – 2020',
      imageUrl: grotte,
      achievements: [
        'Rénovation de la grotte mariale et aménagement des espaces de prière',
        "Intensification de l'évangélisation des jeunes et des familles",
        'Partenariats avec les écoles catholiques du quartier',
      ],
      order: 30,
    },
    {
      id: 'delly',
      name: 'Ndeko Jean Delly',
      period: "2020 – aujourd'hui",
      imageUrl: eglise,
      achievements: [
        'Digitalisation de la communication paroissiale et messes en direct',
        'Renforcement de la pastorale synodale et des commissions',
        'Lancement des grands travaux de développement paroissial',
      ],
      order: 40,
    },
  ]
}

export function buildParishWeeklySeed(): ParishWeeklyDayRecord[] {
  return Object.entries(weeklyScheduleData).map(([key, activities]) => ({
    id: key,
    dayLabel: dayLabels[key] ?? key,
    order: dayOrder[key] ?? 99,
    activities: activities.map((a) => ({
      time: a.time,
      title: a.title,
      location: (a as { responsible?: string }).responsible ?? '—',
    })),
  }))
}

export function buildParishMassSeed(): ParishMassCategoryRecord[] {
  return parishData.liturgySchedule.map((schedule, index) => ({
    id: `mass-${index + 1}`,
    category: schedule.category,
    order: (index + 1) * 10,
    items: schedule.items.map((item) => ({
      day: item.day,
      time: item.time,
      description: item.description,
    })),
  }))
}

export function buildParishCommissionsSeed(): ParishCommissionRecord[] {
  return commissionsData.map((c, index) => ({
    id: c.id,
    name: c.name,
    mission: c.mission,
    description: c.description,
    responsible: c.responsible,
    contact: c.contact,
    subCommissions: c.subCommissions,
    imageUrl: commissionImages[c.id] ?? eglise,
    order: (index + 1) * 10,
  }))
}

export function buildParishGroupsSeed(): ParishGroupRecord[] {
  return [
    {
      id: 'legion-marie',
      name: 'Légion de Marie',
      mission: 'Dévotion mariale, prière et service apostolique sous la protection de la Sainte Vierge.',
      activities: 'Réunions hebdomadaires, visite aux malades, distribution de médailles et rosaries.',
      responsible: 'Responsable à confirmer',
      order: 10,
    },
    {
      id: 'renouveau',
      name: 'Renouveau Charismatique',
      mission: "Vivre les dons du Saint-Esprit au service de l'Église et de l'évangélisation.",
      activities: 'Veillées de louange, partage de la Parole, intercession et formation.',
      responsible: 'Responsable à confirmer',
      order: 20,
    },
    {
      id: 'scouts',
      name: 'Scouts catholiques',
      mission: 'Éducation intégrale des jeunes par le scoutisme selon les valeurs chrétiennes.',
      activities: 'Camps, marches, service communautaire et formation spirituelle.',
      responsible: 'Chef de groupe à confirmer',
      order: 30,
    },
    {
      id: 'mej',
      name: 'Mouvement des Enfants et Jeunes (MEJ)',
      mission: 'Accompagner enfants et adolescents dans la découverte de leur vocation baptismale.',
      activities: 'Activités ludiques, retraites, célébrations et engagement solidaire.',
      responsible: 'Responsable MEJ à confirmer',
      order: 40,
    },
    {
      id: 'foyers-charite',
      name: 'Mouvement des Foyers de Charité',
      mission: "Vivre l'Évangile en communauté et témoigner de la charité fraternelle.",
      activities: 'Retraites, partage fraternel, service aux pauvres et aux malades.',
      responsible: 'Responsable à confirmer',
      order: 50,
    },
    {
      id: 'mee',
      name: 'Mouvement Eucharistique des Enfants',
      mission: "Aider les enfants à découvrir et aimer Jésus présent dans l'Eucharistie.",
      activities: 'Adoration enfantine, catéchèse eucharistique et célébrations adaptées.',
      responsible: 'Responsable à confirmer',
      order: 60,
    },
  ]
}
