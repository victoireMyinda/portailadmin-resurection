import type { LucideIcon } from 'lucide-react'
import {
  Bell,
  BookOpen,
  Calendar,
  Church,
  Clock,
  CreditCard,
  Cross,
  FolderOpen,
  Heart,
  ImageIcon,
  Images,
  Info,
  LayoutList,
  MessageSquare,
  PanelTop,
  Play,
  Radio,
  Settings,
  Users,
} from 'lucide-react'
import { parishColors } from '../../theme/parishTheme'

export type PageModule = {
  to: string
  title: string
  description: string
  icon: LucideIcon
  color: string
}

export type PageSection = {
  id: string
  title: string
  subtitle: string
  modules: PageModule[]
}

export const pageSections: PageSection[] = [
  {
    id: 'home',
    title: "Page d'accueil",
    subtitle: 'Carousel hero, mot du curé et présentation',
    modules: [
      {
        to: '/homeHeroSlides',
        title: 'Bannières carousel',
        description: 'Slides hero : image, titre, description',
        icon: Images,
        color: '#0d9488',
      },
      {
        to: '/homeCurateMessages',
        title: 'Mot du curé',
        description: 'Message pastoral avec photo',
        icon: MessageSquare,
        color: parishColors.royal,
      },
      {
        to: '/homeAbout',
        title: 'À propos',
        description: 'Présentation et historique résumé',
        icon: Info,
        color: '#7c3aed',
      },
    ],
  },
  {
    id: 'parish',
    title: 'Notre Paroisse',
    subtitle: 'Historique, curés, messes, commissions et groupes',
    modules: [
      {
        to: '/parishHistorySections',
        title: 'Historique',
        description: 'Sections de l’historique',
        icon: BookOpen,
        color: '#1d4ed8',
      },
      {
        to: '/parishCurates',
        title: 'Curés',
        description: 'Timeline des curés',
        icon: Church,
        color: '#7c2d12',
      },
      {
        to: '/parishMassCategories',
        title: 'Messes',
        description: 'Horaires des célébrations',
        icon: Clock,
        color: '#4338ca',
      },
      {
        to: '/parishCommissions',
        title: 'Commissions',
        description: 'Commissions et sous-commissions',
        icon: Users,
        color: '#b45309',
      },
      {
        to: '/parishGroups',
        title: 'Groupes',
        description: 'Groupes et mouvements',
        icon: Users,
        color: '#be185d',
      },
      {
        to: '/parishSecretaryVisits',
        title: 'Visites Secrétariat',
        description: 'Permanences du secrétariat paroissial',
        icon: Clock,
        color: '#0369a1',
      },
      {
        to: '/parishCurateVisits',
        title: 'Visites Père Curé',
        description: 'Permanences du Père Curé',
        icon: Church,
        color: '#7c2d12',
      },
    ],
  },
  {
    id: 'announcements',
    title: 'Annonces',
    subtitle: 'Annonce semaine et toutes les annonces',
    modules: [
      {
        to: '/weeklyAnnouncements',
        title: 'Annonce semaine',
        description: 'Bulletin hebdomadaire du portail',
        icon: Bell,
        color: '#dc2626',
      },
      {
        to: '/parishAnnouncements',
        title: 'Toutes les annonces',
        description: 'Archives et actualités paroissiales',
        icon: Calendar,
        color: '#ea580c',
      },
    ],
  },
  {
    id: 'liturgy',
    title: 'Liturgie',
    subtitle: 'Les 3 sous-onglets du menu liturgique',
    modules: [
      {
        to: '/liturgyCalendar',
        title: 'Calendrier liturgique',
        description: 'Saison, couleur et prochain événement',
        icon: Calendar,
        color: '#15803d',
      },
      {
        to: '/liturgyHomily',
        title: 'Homélie du jour',
        description: 'Texte pastoral du dimanche',
        icon: BookOpen,
        color: parishColors.royal,
      },
      {
        to: '/liturgyDaily',
        title: 'Parole et Saint du jour',
        description: 'Lectures, Évangile, psaume et saint',
        icon: Cross,
        color: '#a16207',
      },
    ],
  },
  {
    id: 'live',
    title: 'Messe en direct',
    subtitle: 'YouTube, Facebook et TikTok — diffusion et contenu par défaut',
    modules: [
      {
        to: '/liveStreamSettings',
        title: 'Page & contenu par défaut',
        description: 'Textes, lecteur et prochaines diffusions',
        icon: Settings,
        color: '#dc2626',
      },
      {
        to: '/liveStreamPlatforms',
        title: 'Plateformes (3 réseaux)',
        description: 'Liens, lecteur intégré et statut LIVE',
        icon: Radio,
        color: '#e11d48',
      },
    ],
  },
  {
    id: 'media',
    title: 'Médias',
    subtitle: 'Albums, photos compressées et vidéos YouTube',
    modules: [
      {
        to: '/mediaAlbums',
        title: 'Albums',
        description: 'Regroupements de photos par thème',
        icon: FolderOpen,
        color: '#7c3aed',
      },
      {
        to: '/mediaPhotos',
        title: 'Photos',
        description: 'Galerie WebP compressée',
        icon: Images,
        color: '#2563eb',
      },
      {
        to: '/mediaVideos',
        title: 'Vidéos',
        description: 'Liens YouTube uniquement',
        icon: Play,
        color: '#dc2626',
      },
    ],
  },
  {
    id: 'church',
    title: "Tout sur l'Église",
    subtitle: '14 rubriques éducatives du menu Église',
    modules: [
      {
        to: '/churchSections',
        title: 'Rubriques Église',
        description: 'Histoire, sacrements, Bible, FAQ… — /eglise/*',
        icon: BookOpen,
        color: '#4338ca',
      },
    ],
  },
  {
    id: 'donations',
    title: 'Faire un don',
    subtitle: 'Textes spirituels et moyens de paiement',
    modules: [
      {
        to: '/donationSettings',
        title: 'Page & textes',
        description: 'Versets, message pastoral — /dons',
        icon: Heart,
        color: '#be123c',
      },
      {
        to: '/donationPaymentMethods',
        title: 'Moyens de paiement',
        description: 'Mobile Money et comptes bancaires',
        icon: CreditCard,
        color: '#0d9488',
      },
    ],
  },
  {
    id: 'site',
    title: 'Site & navigation',
    subtitle: 'En-têtes, menu et identité visuelle',
    modules: [
      {
        to: '/pageBanners',
        title: 'Bannières de pages',
        description: 'Image, titre et description par page',
        icon: PanelTop,
        color: '#be123c',
      },
      {
        to: '/navigationItems',
        title: 'Navigation & onglets',
        description: 'Menu principal et sous-onglets',
        icon: LayoutList,
        color: '#b45309',
      },
      {
        to: '/parishLogos',
        title: 'Logo & identité',
        description: 'Logo et titres du header',
        icon: ImageIcon,
        color: '#6d28d9',
      },
    ],
  },
]
