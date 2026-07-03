import {
  Box,
  Card,
  CardContent,
  Chip,
  IconButton,
  Stack,
  Typography,
  alpha,
} from '@mui/material'
import { ChevronRight, Mail, MapPin, Phone, UserRound } from 'lucide-react'
import { Link as RouterLink } from 'react-router-dom'
import {
  CreateButton,
  Loading,
  useCreatePath,
  useListContext,
  useResourceContext,
} from 'react-admin'
import { parishColors } from '../../theme/parishTheme'
import { EmptyState } from './EmptyState'
import { ResourceListLayout } from './ResourceListLayout'

function InfoRow({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <Stack direction="row" spacing={1.5} sx={{ alignItems: 'flex-start' }}>
      <Box
        sx={{
          width: 32,
          height: 32,
          borderRadius: 1.5,
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: alpha(parishColors.gold, 0.12),
          color: '#92680a',
        }}
      >
        {icon}
      </Box>
      <Box sx={{ minWidth: 0, pt: 0.35 }}>{children}</Box>
    </Stack>
  )
}

export function ContactListView() {
  return (
    <ResourceListLayout
      title="Contacts paroisse"
      subtitle="Adresses, e-mails et téléphones affichés sur le portail public"
      icon={<MapPin size={24} />}
    >
      <ContactCardGrid />
    </ResourceListLayout>
  )
}

function ContactCardGrid() {
  const { data, isLoading } = useListContext()
  const resource = useResourceContext()
  const createPath = useCreatePath()

  if (isLoading) return <Loading />
  if (!data?.length) {
    return (
      <EmptyState
        title="Aucun contact enregistré"
        description="Commencez par ajouter les coordonnées principales de la paroisse."
        icon={<MapPin size={28} />}
        action={<CreateButton variant="contained" color="secondary" label="Ajouter un contact" />}
      />
    )
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, 1fr)' },
        gap: 2.5,
      }}
    >
      {data.map((record) => {
        const r = record as Record<string, unknown>
        const phones = (r.phones as { label: string; number: string }[]) ?? []
        const to = createPath({ resource, id: String(r.id), type: 'edit' })

        return (
          <RouterLink key={String(r.id)} to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Card
              sx={{
                height: '100%',
                borderRadius: 4,
                border: '1px solid',
                borderColor: alpha(parishColors.royal, 0.1),
                overflow: 'hidden',
                transition: 'all 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: '0 20px 48px rgba(13,71,161,0.14)',
                  borderColor: alpha(parishColors.royal, 0.25),
                  '& .contact-card-action': { opacity: 1, transform: 'translateX(0)' },
                },
              }}
            >
              <Box
                sx={{
                  height: 6,
                  background: `linear-gradient(90deg, ${parishColors.royal} 0%, ${parishColors.gold} 100%)`,
                }}
              />
              <CardContent sx={{ p: 2.5 }}>
                <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', minWidth: 0 }}>
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: 2,
                        bgcolor: alpha(parishColors.royal, 0.1),
                        color: parishColors.royal,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <UserRound size={22} />
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: '"Playfair Display", serif',
                        fontWeight: 700,
                        fontSize: '1.1rem',
                        lineHeight: 1.25,
                      }}
                    >
                      {String(r.label ?? 'Contact')}
                    </Typography>
                  </Stack>
                  <IconButton
                    size="small"
                    className="contact-card-action"
                    sx={{
                      color: parishColors.royal,
                      opacity: { xs: 1, md: 0.6 },
                      transform: { xs: 'none', md: 'translateX(-4px)' },
                      transition: 'all 0.2s',
                    }}
                  >
                    <ChevronRight size={20} />
                  </IconButton>
                </Stack>

                <Stack spacing={1.75}>
                  <InfoRow icon={<MapPin size={16} />}>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.55 }}>
                      {String(r.physicalAddress ?? '—')}
                    </Typography>
                  </InfoRow>
                  <InfoRow icon={<Mail size={16} />}>
                    <Typography variant="body2" sx={{ fontWeight: 600, wordBreak: 'break-all' }}>
                      {String(r.email ?? '—')}
                    </Typography>
                  </InfoRow>
                  {phones.length > 0 && (
                    <InfoRow icon={<Phone size={16} />}>
                      <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 0.75 }}>
                        {phones.map((p) => (
                          <Chip
                            key={`${p.label}-${p.number}`}
                            label={p.label ? `${p.label} · ${p.number}` : p.number}
                            size="small"
                            sx={{
                              height: 26,
                              fontSize: 12,
                              fontWeight: 600,
                              bgcolor: alpha(parishColors.royal, 0.06),
                              border: `1px solid ${alpha(parishColors.royal, 0.12)}`,
                            }}
                          />
                        ))}
                      </Stack>
                    </InfoRow>
                  )}
                </Stack>
              </CardContent>
            </Card>
          </RouterLink>
        )
      })}
    </Box>
  )
}
