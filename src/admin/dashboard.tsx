import { useEffect, useState } from 'react'
import { Box, Card, CardContent, Grid, Typography, alpha, Skeleton } from '@mui/material'
import { Title } from 'react-admin'
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
} from 'lucide-react'
import { parishColors } from '../theme/parishTheme'
import { design } from '../theme/design-tokens'
import { getDashboardStats } from './dataProvider'
import type { DashboardKpi } from './firestore/dashboard-stats'

const kpiIcons: Record<string, React.ReactNode> = {
  'visits-total': <Eye size={20} strokeWidth={1.75} />,
  'visits-today': <CalendarDays size={20} strokeWidth={1.75} />,
  'visits-month': <CalendarRange size={20} strokeWidth={1.75} />,
  'messages-unread': <Mail size={20} strokeWidth={1.75} />,
  visitorMessages: <Mail size={20} strokeWidth={1.75} />,
  parishUsers: <Users size={20} strokeWidth={1.75} />,
  weeklyAnnouncements: <Bell size={20} strokeWidth={1.75} />,
  parishAnnouncements: <Bell size={20} strokeWidth={1.75} />,
  mediaPhotos: <Image size={20} strokeWidth={1.75} />,
  mediaVideos: <Image size={20} strokeWidth={1.75} />,
  mediaAlbums: <Image size={20} strokeWidth={1.75} />,
  donationPaymentMethods: <CreditCard size={20} strokeWidth={1.75} />,
  contacts: <MapPin size={20} strokeWidth={1.75} />,
  socialNetworks: <Share2 size={20} strokeWidth={1.75} />,
  churchSections: <Church size={20} strokeWidth={1.75} />,
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      variant="overline"
      sx={{
        display: 'block',
        color: parishColors.mutedForeground,
        fontWeight: 700,
        letterSpacing: '0.14em',
        mb: 2,
      }}
    >
      {children}
    </Typography>
  )
}

function KpiCard({ kpi, accent }: { kpi: DashboardKpi; accent: 'gold' | 'royal' }) {
  const icon = kpiIcons[kpi.id] ?? <BarChart3 size={20} strokeWidth={1.75} />
  const accentColor = accent === 'gold' ? parishColors.gold : parishColors.royal

  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        borderRadius: `${design.radius.lg}px`,
        border: `1px solid ${design.border}`,
        boxShadow: design.shadow.sm,
        overflow: 'hidden',
        transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
        '&:hover': {
          boxShadow: design.shadow.md,
          borderColor: design.borderStrong,
        },
      }}
    >
      <Box sx={{ height: 3, background: accent === 'gold' ? design.accentLine : parishColors.royal }} />
      <CardContent sx={{ p: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2 }}>
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: `${design.radius.sm}px`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: alpha(accentColor, 0.1),
              color: accentColor,
              flexShrink: 0,
            }}
          >
            {icon}
          </Box>
          <Typography
            sx={{
              fontSize: '1.75rem',
              fontWeight: 700,
              color: parishColors.foreground,
              lineHeight: 1,
              letterSpacing: '-0.02em',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {kpi.value.toLocaleString('fr-FR')}
          </Typography>
        </Box>
        <Typography
          sx={{
            mt: 2,
            fontWeight: 600,
            fontSize: '0.8125rem',
            color: parishColors.foreground,
            lineHeight: 1.35,
          }}
        >
          {kpi.label}
        </Typography>
        {kpi.hint && (
          <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: parishColors.mutedForeground }}>
            {kpi.hint}
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}

export function Dashboard() {
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

  const visitKpis = kpis.filter((k) => k.id.startsWith('visits-') || k.id === 'messages-unread')
  const contentKpis = kpis.filter((k) => !k.id.startsWith('visits-') && k.id !== 'messages-unread')

  return (
    <Box className="dashboard-root" sx={{ px: { xs: 2, sm: 3, md: 4 }, py: 3, maxWidth: 1200, mx: 'auto', width: '100%' }}>
      <Title title="Tableau de bord" />

      <Box
        sx={{
          mb: 4,
          pb: 3,
          borderBottom: `1px solid ${design.border}`,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.75 }}>
              <TrendingUp size={18} color={parishColors.gold} strokeWidth={2} />
              <Typography variant="overline" sx={{ color: parishColors.mutedForeground, fontWeight: 700 }}>
                Indicateurs clés
              </Typography>
            </Box>
            <Typography
              variant="h4"
              sx={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontWeight: 700,
                color: parishColors.foreground,
                letterSpacing: '-0.02em',
              }}
            >
              Tableau de bord
            </Typography>
            <Typography sx={{ mt: 0.75, color: parishColors.mutedForeground, maxWidth: 480, fontSize: '0.9375rem' }}>
              Statistiques de fréquentation et synthèse du contenu administré.
            </Typography>
          </Box>
          {lastVisitAt && !loading && (
            <Box
              sx={{
                px: 2,
                py: 1,
                borderRadius: `${design.radius.pill}px`,
                bgcolor: design.surface,
                border: `1px solid ${design.border}`,
                boxShadow: design.shadow.xs,
              }}
            >
              <Typography variant="caption" sx={{ color: parishColors.mutedForeground, display: 'block' }}>
                Dernière visite
              </Typography>
              <Typography sx={{ fontSize: '0.8125rem', fontWeight: 600, color: parishColors.foreground }}>
                {new Date(lastVisitAt).toLocaleString('fr-FR')}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      {loading ? (
        <Grid container spacing={2}>
          {Array.from({ length: 8 }).map((_, i) => (
            <Grid key={i} size={{ xs: 12, sm: 6, md: 3 }}>
              <Skeleton variant="rounded" height={120} sx={{ borderRadius: `${design.radius.lg}px` }} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <>
          <SectionTitle>Fréquentation</SectionTitle>
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {visitKpis.map((kpi) => (
              <Grid key={kpi.id} size={{ xs: 12, sm: 6, md: 3 }}>
                <KpiCard kpi={kpi} accent="gold" />
              </Grid>
            ))}
          </Grid>

          <SectionTitle>Contenu & administration</SectionTitle>
          <Grid container spacing={2}>
            {contentKpis.map((kpi) => (
              <Grid key={kpi.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <KpiCard kpi={kpi} accent="royal" />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  )
}
