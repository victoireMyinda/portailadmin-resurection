import { useEffect, useMemo, useState } from 'react'
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
  alpha,
  Skeleton,
  Chip,
} from '@mui/material'
import { Title, useGetIdentity, useNavigate } from 'react-admin'
import {
  BarChart3,
  Eye,
  CalendarDays,
  CalendarRange,
  Mail,
  Users,
  Image,
  Bell,
  CreditCard,
  Church,
  Share2,
  MapPin,
  TrendingUp,
  Radio,
  BookOpen,
  Cross,
  ArrowRight,
  Layers,
  Sparkles,
  Building2,
  Clock,
} from 'lucide-react'
import { parishColors } from '../theme/parishTheme'
import { design } from '../theme/design-tokens'
import { brand } from '../theme/brand'
import { getDashboardStats } from './dataProvider'
import type { DashboardKpi } from './firestore/dashboard-stats'

const kpiIcons: Record<string, React.ReactNode> = {
  'visits-total': <Eye size={22} strokeWidth={1.75} />,
  'visits-today': <CalendarDays size={22} strokeWidth={1.75} />,
  'visits-month': <CalendarRange size={22} strokeWidth={1.75} />,
  'messages-unread': <Mail size={22} strokeWidth={1.75} />,
  visitorMessages: <Mail size={22} strokeWidth={1.75} />,
  parishUsers: <Users size={22} strokeWidth={1.75} />,
  weeklyAnnouncements: <Bell size={22} strokeWidth={1.75} />,
  parishAnnouncements: <Bell size={22} strokeWidth={1.75} />,
  mediaPhotos: <Image size={22} strokeWidth={1.75} />,
  mediaVideos: <Image size={22} strokeWidth={1.75} />,
  mediaAlbums: <Layers size={22} strokeWidth={1.75} />,
  donationPaymentMethods: <CreditCard size={22} strokeWidth={1.75} />,
  contacts: <MapPin size={22} strokeWidth={1.75} />,
  socialNetworks: <Share2 size={22} strokeWidth={1.75} />,
  churchSections: <Church size={22} strokeWidth={1.75} />,
  parishSecretaryVisits: <Building2 size={22} strokeWidth={1.75} />,
  parishCurateVisits: <Clock size={22} strokeWidth={1.75} />,
}

const KPI_ROUTES: Record<string, string> = {
  'messages-unread': '/visitorMessages',
  visitorMessages: '/visitorMessages',
  parishUsers: '/parishUsers',
  weeklyAnnouncements: '/weeklyAnnouncements',
  parishAnnouncements: '/parishAnnouncements',
  mediaPhotos: '/mediaPhotos',
  mediaVideos: '/mediaVideos',
  mediaAlbums: '/mediaAlbums',
  donationPaymentMethods: '/donationPaymentMethods',
  contacts: '/contacts',
  socialNetworks: '/socialNetworks',
  churchSections: '/churchSections',
  parishSecretaryVisits: '/parishSecretaryVisits',
  parishCurateVisits: '/parishCurateVisits',
}

const CONTENT_GROUPS = [
  {
    id: 'announcements',
    title: 'Annonces & communication',
    description: 'Publications et messages des fidèles',
    ids: ['weeklyAnnouncements', 'parishAnnouncements', 'visitorMessages'],
  },
  {
    id: 'media',
    title: 'Médias & galerie',
    description: 'Photos, vidéos et albums du portail',
    ids: ['mediaPhotos', 'mediaVideos', 'mediaAlbums'],
  },
  {
    id: 'admin',
    title: 'Site & administration',
    description: 'Configuration et gestion des accès',
    ids: ['contacts', 'socialNetworks', 'churchSections', 'donationPaymentMethods', 'parishUsers', 'parishSecretaryVisits', 'parishCurateVisits'],
  },
] as const

const QUICK_ACTIONS = [
  { to: '/weeklyAnnouncements', label: 'Annonce semaine', icon: Bell },
  { to: '/parishAnnouncements', label: 'Toutes les annonces', icon: CalendarRange },
  { to: '/liveStreamSettings', label: 'Messe en direct', icon: Radio },
  { to: '/liturgyHomily', label: 'Homélie du jour', icon: BookOpen },
  { to: '/liturgyDaily', label: 'Parole & Saint', icon: Cross },
  { to: '/visitorMessages', label: 'Messages visiteurs', icon: Mail },
] as const

function SectionHeader({
  title,
  description,
  accent = 'royal',
}: {
  title: string
  description?: string
  accent?: 'gold' | 'royal'
}) {
  const accentColor = accent === 'gold' ? parishColors.gold : parishColors.royal
  return (
    <Box sx={{ mb: 2.5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: description ? 0.5 : 0 }}>
        <Box
          sx={{
            width: 4,
            height: 22,
            borderRadius: 99,
            bgcolor: accentColor,
          }}
        />
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: parishColors.foreground,
            fontSize: '1rem',
            letterSpacing: '-0.01em',
          }}
        >
          {title}
        </Typography>
      </Box>
      {description && (
        <Typography sx={{ pl: 2.25, color: parishColors.mutedForeground, fontSize: '0.8125rem' }}>
          {description}
        </Typography>
      )}
    </Box>
  )
}

function KpiCard({
  kpi,
  accent,
  featured,
}: {
  kpi: DashboardKpi
  accent: 'gold' | 'royal'
  featured?: boolean
}) {
  const navigate = useNavigate()
  const icon = kpiIcons[kpi.id] ?? <BarChart3 size={22} strokeWidth={1.75} />
  const accentColor = accent === 'gold' ? parishColors.gold : parishColors.royal
  const href = KPI_ROUTES[kpi.id]
  const highlight = kpi.id === 'messages-unread' && kpi.value > 0

  const body = (
    <CardContent sx={{ p: featured ? 3 : 2.5, height: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2 }}>
        <Box
          sx={{
            width: featured ? 48 : 44,
            height: featured ? 48 : 44,
            borderRadius: `${design.radius.md}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: alpha(accentColor, highlight ? 0.18 : 0.1),
            color: accentColor,
            flexShrink: 0,
          }}
        >
          {icon}
        </Box>
        {highlight && (
          <Chip
            label="À traiter"
            size="small"
            sx={{
              height: 24,
              fontWeight: 700,
              fontSize: '0.6875rem',
              bgcolor: alpha('#DC2626', 0.1),
              color: '#B91C1C',
            }}
          />
        )}
      </Box>

      <Typography
        sx={{
          mt: 2.5,
          fontSize: featured ? '2.25rem' : '1.875rem',
          fontWeight: 700,
          color: parishColors.foreground,
          lineHeight: 1,
          letterSpacing: '-0.03em',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {kpi.value.toLocaleString('fr-FR')}
      </Typography>

      <Typography
        sx={{
          mt: 1.25,
          fontWeight: 600,
          fontSize: '0.875rem',
          color: parishColors.foreground,
          lineHeight: 1.35,
        }}
      >
        {kpi.label}
      </Typography>

      {kpi.hint && (
        <Typography variant="caption" sx={{ display: 'block', mt: 0.75, color: parishColors.mutedForeground, lineHeight: 1.45 }}>
          {kpi.hint}
        </Typography>
      )}

      {href && (
        <Box
          sx={{
            mt: 2,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.5,
            color: accentColor,
            fontSize: '0.75rem',
            fontWeight: 600,
          }}
        >
          Ouvrir
          <ArrowRight size={14} strokeWidth={2} />
        </Box>
      )}
    </CardContent>
  )

  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        borderRadius: `${design.radius.lg}px`,
        border: `1px solid ${highlight ? alpha('#DC2626', 0.25) : design.border}`,
        boxShadow: design.shadow.sm,
        overflow: 'hidden',
        bgcolor: design.surface,
        transition: 'box-shadow 0.2s ease, border-color 0.2s ease, transform 0.2s ease',
        '&:hover': href
          ? {
              boxShadow: design.shadow.md,
              borderColor: alpha(accentColor, 0.35),
              transform: 'translateY(-2px)',
            }
          : {
              boxShadow: design.shadow.md,
              borderColor: design.borderStrong,
            },
      }}
    >
      <Box sx={{ height: 3, background: accent === 'gold' ? design.accentLine : parishColors.royal }} />
      {href ? (
        <CardActionArea onClick={() => navigate(href)} sx={{ height: '100%', alignItems: 'stretch' }}>
          {body}
        </CardActionArea>
      ) : (
        body
      )}
    </Card>
  )
}

function QuickActionCard({
  to,
  label,
  icon: Icon,
}: {
  to: string
  label: string
  icon: typeof Bell
}) {
  const navigate = useNavigate()
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: `${design.radius.md}px`,
        border: `1px solid ${design.border}`,
        boxShadow: design.shadow.xs,
        bgcolor: design.surface,
        transition: 'all 0.2s ease',
        '&:hover': {
          borderColor: alpha(parishColors.royal, 0.3),
          boxShadow: design.shadow.sm,
          transform: 'translateY(-1px)',
        },
      }}
    >
      <CardActionArea onClick={() => navigate(to)} sx={{ px: 2, py: 1.75 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: `${design.radius.sm}px`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: alpha(parishColors.royal, 0.08),
              color: parishColors.royal,
              flexShrink: 0,
            }}
          >
            <Icon size={18} strokeWidth={1.75} />
          </Box>
          <Typography sx={{ fontWeight: 600, fontSize: '0.8125rem', color: parishColors.foreground, lineHeight: 1.3 }}>
            {label}
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  )
}

function DashboardHero({
  name,
  lastVisitAt,
  loading,
  totalVisits,
}: {
  name?: string
  lastVisitAt?: string
  loading: boolean
  totalVisits: number
}) {
  return (
    <Box
      sx={{
        position: 'relative',
        mb: 4,
        overflow: 'hidden',
        borderRadius: `${design.radius.xl}px`,
        background: `linear-gradient(135deg, ${brand.royalLight} 0%, ${brand.royal} 55%, ${brand.royalDark} 100%)`,
        color: '#fff',
        boxShadow: design.shadow.md,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: -40,
          right: -40,
          width: 180,
          height: 180,
          borderRadius: '50%',
          bgcolor: alpha('#fff', 0.06),
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -60,
          left: -20,
          width: 220,
          height: 220,
          borderRadius: '50%',
          bgcolor: alpha(parishColors.gold, 0.12),
        }}
      />

      <Box sx={{ position: 'relative', p: { xs: 3, md: 4 } }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
            alignItems: { xs: 'flex-start', lg: 'center' },
            justifyContent: 'space-between',
            gap: 3,
          }}
        >
          <Box sx={{ maxWidth: 560 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Sparkles size={16} color={parishColors.gold} strokeWidth={2} />
              <Typography
                variant="overline"
                sx={{ color: alpha('#fff', 0.75), fontWeight: 700, letterSpacing: '0.14em' }}
              >
                Administration paroissiale
              </Typography>
            </Box>
            <Typography
              variant="h4"
              sx={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
              }}
            >
              {loading ? 'Tableau de bord' : `Bonjour, ${name?.split(' ')[0] ?? 'Administrateur'}`}
            </Typography>
            <Typography sx={{ mt: 1.25, color: alpha('#fff', 0.82), fontSize: '0.9375rem', lineHeight: 1.6 }}>
              Pilotez le portail public : contenus, annonces, liturgie et messages des fidèles en un coup d&apos;œil.
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
            <Box
              sx={{
                minWidth: 140,
                px: 2,
                py: 1.5,
                borderRadius: `${design.radius.md}px`,
                bgcolor: alpha('#fff', 0.12),
                border: `1px solid ${alpha('#fff', 0.18)}`,
                backdropFilter: 'blur(8px)',
              }}
            >
              <Typography variant="caption" sx={{ color: alpha('#fff', 0.7), display: 'block' }}>
                Visites totales
              </Typography>
              <Typography sx={{ mt: 0.25, fontSize: '1.5rem', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
                {loading ? '—' : totalVisits.toLocaleString('fr-FR')}
              </Typography>
            </Box>
            {lastVisitAt && !loading && (
              <Box
                sx={{
                  minWidth: 180,
                  px: 2,
                  py: 1.5,
                  borderRadius: `${design.radius.md}px`,
                  bgcolor: alpha('#fff', 0.12),
                  border: `1px solid ${alpha('#fff', 0.18)}`,
                  backdropFilter: 'blur(8px)',
                }}
              >
                <Typography variant="caption" sx={{ color: alpha('#fff', 0.7), display: 'block' }}>
                  Dernière visite
                </Typography>
                <Typography sx={{ mt: 0.25, fontSize: '0.8125rem', fontWeight: 600 }}>
                  {new Date(lastVisitAt).toLocaleString('fr-FR')}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export function Dashboard() {
  const navigate = useNavigate()
  const { data: identity } = useGetIdentity()
  const [loading, setLoading] = useState(true)
  const [kpis, setKpis] = useState<DashboardKpi[]>([])
  const [lastVisitAt, setLastVisitAt] = useState<string | undefined>()

  useEffect(() => {
    let active = true
    getDashboardStats()
      .then((stats) => {
        if (!active) return
        setKpis(stats.kpis)
        setLastVisitAt(stats.visits.lastVisitAt)
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  const kpiMap = useMemo(() => Object.fromEntries(kpis.map((k) => [k.id, k])), [kpis])
  const visitKpis = kpis.filter((k) => k.id.startsWith('visits-') || k.id === 'messages-unread')
  const totalVisits = kpiMap['visits-total']?.value ?? 0
  const unreadMessages = kpiMap['messages-unread']?.value ?? 0

  return (
    <Box className="dashboard-root" sx={{ px: { xs: 2, sm: 3, md: 4 }, py: { xs: 2.5, md: 3.5 }, maxWidth: 1280, mx: 'auto', width: '100%' }}>
      <Title title="Tableau de bord" />

      <DashboardHero
        name={identity?.fullName}
        lastVisitAt={lastVisitAt}
        loading={loading}
        totalVisits={totalVisits}
      />

      <SectionHeader title="Raccourcis rapides" description="Accès direct aux tâches les plus fréquentes" />
      <Grid container spacing={1.5} sx={{ mb: 4 }}>
        {QUICK_ACTIONS.map((action) => (
          <Grid key={action.to} size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
            <QuickActionCard {...action} />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap', mb: 2.5 }}>
        <SectionHeader
          title="Fréquentation"
          description="Activité des visiteurs sur le portail public"
          accent="gold"
        />
        {!loading && (
          <Chip
            icon={<TrendingUp size={14} />}
            label="Temps réel Firestore"
            size="small"
            sx={{
              fontWeight: 600,
              bgcolor: alpha(parishColors.gold, 0.12),
              color: brand.goldDark,
              '& .MuiChip-icon': { color: brand.goldDark },
            }}
          />
        )}
      </Box>

      {loading ? (
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <Grid key={i} size={{ xs: 12, sm: 6, lg: 3 }}>
              <Skeleton variant="rounded" height={148} sx={{ borderRadius: `${design.radius.lg}px` }} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container spacing={2} sx={{ mb: 5 }}>
          {visitKpis.map((kpi, index) => (
            <Grid key={kpi.id} size={{ xs: 12, sm: 6, lg: 3 }}>
              <Box className="dashboard-card" sx={{ animationDelay: `${index * 60}ms` }}>
                <KpiCard kpi={kpi} accent="gold" featured={kpi.id === 'visits-total'} />
              </Box>
            </Grid>
          ))}
        </Grid>
      )}

      {CONTENT_GROUPS.map((group) => {
        const groupKpis = group.ids.map((id) => kpiMap[id]).filter(Boolean) as DashboardKpi[]
        if (!loading && groupKpis.length === 0) return null

        return (
          <Box key={group.id} sx={{ mb: 5 }}>
            <SectionHeader title={group.title} description={group.description} />

            {loading ? (
              <Grid container spacing={2}>
                {group.ids.map((id) => (
                  <Grid key={id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <Skeleton variant="rounded" height={140} sx={{ borderRadius: `${design.radius.lg}px` }} />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Grid container spacing={2}>
                {groupKpis.map((kpi, index) => (
                  <Grid key={kpi.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <Box className="dashboard-card" sx={{ animationDelay: `${index * 50}ms` }}>
                      <KpiCard kpi={kpi} accent="royal" />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        )
      })}

      {!loading && unreadMessages > 0 && (
        <Card
          elevation={0}
          sx={{
            borderRadius: `${design.radius.lg}px`,
            border: `1px solid ${alpha('#DC2626', 0.2)}`,
            bgcolor: alpha('#DC2626', 0.04),
            boxShadow: design.shadow.sm,
          }}
        >
          <CardActionArea onClick={() => navigate('/visitorMessages')} sx={{ p: 2.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: `${design.radius.md}px`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: alpha('#DC2626', 0.1),
                    color: '#B91C1C',
                  }}
                >
                  <Mail size={22} strokeWidth={1.75} />
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 700, color: parishColors.foreground }}>
                    {unreadMessages} message{unreadMessages > 1 ? 's' : ''} en attente
                  </Typography>
                  <Typography variant="body2" sx={{ color: parishColors.mutedForeground, mt: 0.25 }}>
                    Consultez la boîte des messages visiteurs pour répondre aux fidèles.
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, color: parishColors.royal, fontWeight: 600, fontSize: '0.875rem' }}>
                Voir les messages
                <ArrowRight size={16} strokeWidth={2} />
              </Box>
            </Box>
          </CardActionArea>
        </Card>
      )}
    </Box>
  )
}
