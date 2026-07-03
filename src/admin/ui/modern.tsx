import type { ReactNode } from 'react'
import type { ReactElement } from 'react'
import {
  Create,
  Edit,
  List,
  type ListProps,
  Loading,
  SimpleForm,
  ListButton,
  useCreatePath,
  useListContext,
  useResourceContext,
  SaveButton,
  DeleteButton,
  Toolbar,
} from 'react-admin'
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  LinearProgress,
  Stack,
  Typography,
  alpha,
} from '@mui/material'
import { ChevronRight, Sparkles, ArrowLeft } from 'lucide-react'
import { Link as RouterLink } from 'react-router-dom'
import { parishColors } from '../../theme/parishTheme'
import { design } from '../../theme/design-tokens'
import { ListActionsBar } from './ListActionsBar'
import { mergeParishFilters } from './parish-list-filters'
import { getPageHubBackTarget } from '../navigation/page-routes'

export function ModernListActions({ showFilters = false }: { showFilters?: boolean }) {
  return <ListActionsBar showFilters={showFilters} />
}

type ModernListShellProps = ListProps & {
  subtitle?: string
  extraFilters?: ReactElement[]
}

export function ModernListShell({ subtitle, children, filters, extraFilters, ...props }: ModernListShellProps) {
  const mergedFilters = filters ?? mergeParishFilters(extraFilters)
  return (
    <List
      {...props}
      filters={mergedFilters}
      actions={false}
      sx={{
        '& .RaList-main': { background: 'transparent', boxShadow: 'none' },
        '& .RaList-content': { background: 'transparent', boxShadow: 'none', overflow: 'visible' },
        '& .RaList-actions': { display: 'none' },
        '& h1.RaList-title': { display: 'none' },
        '& .RaList-filters': {
          mb: 2.5,
          p: { xs: 1.5, md: 2 },
          borderRadius: `${design.radius.lg}px`,
          bgcolor: design.surface,
          border: `1px solid ${design.border}`,
          boxShadow: design.shadow.xs,
        },
        '& .RaFilterFormInput-spacer': { display: 'none' },
        '& .RaFilterFormInput-root': { minWidth: { xs: '100%', sm: 200 } },
        '& .MuiFormControl-root .MuiOutlinedInput-root': {
          bgcolor: design.surfaceMuted,
          borderRadius: `${design.radius.sm}px`,
        },
        ...props.sx,
      }}
    >
      {children}
    </List>
  )
}

export type RecordCardConfig = {
  title: (record: Record<string, unknown>) => string
  subtitle?: (record: Record<string, unknown>) => string
  tags?: (record: Record<string, unknown>) => { label: string; color?: 'gold' | 'royal' | 'neutral' }[]
  meta?: (record: Record<string, unknown>) => string[]
}

const tagColors = {
  gold: { bg: alpha(parishColors.gold, 0.15), color: '#92680a', border: alpha(parishColors.gold, 0.35) },
  royal: { bg: alpha(parishColors.royal, 0.1), color: parishColors.royal, border: alpha(parishColors.royal, 0.25) },
  neutral: { bg: '#f3f4f6', color: '#4b5563', border: '#e5e7eb' },
}

export function RecordCardGrid({ config }: { config: RecordCardConfig }) {
  const { data, isLoading, total } = useListContext()
  const resource = useResourceContext()
  const createPath = useCreatePath()

  if (isLoading) return <Loading />
  if (!data?.length) {
    return (
      <Card sx={{ borderRadius: 3, py: 8, textAlign: 'center', border: '1px dashed', borderColor: 'divider' }}>
        <Sparkles size={32} color={parishColors.gold} style={{ margin: '0 auto 12px' }} />
        <Typography variant="h6" sx={{ fontFamily: '"Playfair Display", serif' }}>
          Aucun élément pour le moment
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Créez votre premier contenu avec le bouton « Nouveau »
        </Typography>
      </Card>
    )
  }

  return (
    <Box>
      <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
        {total} élément{total !== 1 ? 's' : ''}
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
          gap: 2,
        }}
      >
        {data.map((record) => {
          const r = record as Record<string, unknown>
          const to = createPath({ resource, id: String(r.id), type: 'edit' })
          const tags = config.tags?.(r) ?? []
          const meta = config.meta?.(r) ?? []

          return (
            <RouterLink
              key={String(r.id)}
              to={to}
              style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
            >
              <Card
                sx={{
                  height: '100%',
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 32px rgba(13,71,161,0.12)',
                    borderColor: alpha(parishColors.royal, 0.3),
                  },
                }}
              >
              <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
                <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-start', gap: 1 }}>
                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    {tags.length > 0 && (
                      <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 0.75, mb: 1.25 }}>
                        {tags.map((tag) => {
                          const c = tagColors[tag.color ?? 'neutral']
                          return (
                            <Chip
                              key={tag.label}
                              label={tag.label}
                              size="small"
                              sx={{
                                height: 24,
                                fontSize: 11,
                                fontWeight: 600,
                                bgcolor: c.bg,
                                color: c.color,
                                border: `1px solid ${c.border}`,
                              }}
                            />
                          )
                        })}
                      </Stack>
                    )}
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 700,
                        color: 'text.primary',
                        lineHeight: 1.35,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {config.title(r)}
                    </Typography>
                    {config.subtitle && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mt: 1,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          lineHeight: 1.5,
                        }}
                      >
                        {config.subtitle(r)}
                      </Typography>
                    )}
                    {meta.length > 0 && (
                      <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1, mt: 1.5 }}>
                        {meta.map((m) => (
                          <Typography key={m} variant="caption" color="text.secondary">
                            {m}
                          </Typography>
                        ))}
                      </Stack>
                    )}
                  </Box>
                  <IconButton size="small" sx={{ color: parishColors.royal, mt: -0.5 }}>
                    <ChevronRight size={18} />
                  </IconButton>
                </Stack>
              </CardContent>
              </Card>
            </RouterLink>
          )
        })}
      </Box>
    </Box>
  )
}

export function ModernTableShell({ children }: { children: ReactNode }) {
  const { isLoading } = useListContext()
  return (
    <Card sx={{ borderRadius: 3, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
      {isLoading && <LinearProgress />}
      <Box
        sx={{
          '& .RaDatagrid-table': { borderCollapse: 'separate', borderSpacing: 0 },
          '& .RaDatagrid-headerCell': {
            bgcolor: '#f8fafc',
            borderBottom: '1px solid #e5e7eb',
            fontSize: 12,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: 0.5,
            color: parishColors.mutedForeground,
            py: 1.5,
          },
          '& .RaDatagrid-row': {
            transition: 'background 0.15s',
            '&:hover': { bgcolor: alpha(parishColors.royal, 0.04) },
          },
          '& .RaDatagrid-rowCell': {
            borderBottom: '1px solid #f1f5f9',
            py: 1.75,
            fontSize: 14,
          },
          '& .RaDatagrid-total': { display: 'none' },
        }}
      >
        {children}
      </Box>
    </Card>
  )
}

export function ModernCreateToolbar() {
  return (
    <Toolbar
      className="parish-form-toolbar"
      sx={{
        gap: 1.5,
        px: { xs: 2, md: 3 },
        py: 2,
        mt: 1,
        borderRadius: `${design.radius.lg}px`,
        bgcolor: design.surface,
        border: `1px solid ${design.border}`,
        boxShadow: design.shadow.sm,
        position: 'sticky',
        bottom: 16,
        zIndex: 10,
        flexWrap: 'wrap',
        '& .MuiButton-root': { borderRadius: 2, px: 3, fontWeight: 700 },
      }}
    >
      <ListButton label="Retour à la liste" icon={<ArrowLeft size={16} />} />
      <SaveButton label="Créer l'enregistrement" variant="contained" color="secondary" size="large" />
    </Toolbar>
  )
}

export function ModernFormToolbar() {
  return (
    <Toolbar
      className="parish-form-toolbar"
      sx={{
        gap: 1.5,
        px: { xs: 2, md: 3 },
        py: 2,
        mt: 1,
        borderRadius: `${design.radius.lg}px`,
        bgcolor: design.surface,
        border: `1px solid ${design.border}`,
        boxShadow: design.shadow.sm,
        position: 'sticky',
        bottom: 16,
        zIndex: 10,
        flexWrap: 'wrap',
        '& .MuiButton-root': { borderRadius: 2, px: 3, fontWeight: 700 },
      }}
    >
      <ListButton label="Retour à la liste" icon={<ArrowLeft size={16} />} />
      <SaveButton label="Enregistrer les modifications" variant="contained" color="secondary" size="large" />
      <DeleteButton mutationMode="pessimistic" sx={{ borderRadius: 2 }} />
    </Toolbar>
  )
}

type FormPageProps = {
  title: string
  subtitle?: string
  children: ReactNode
  defaultValues?: Record<string, unknown>
}

export function ModernEdit({ title, subtitle, children }: FormPageProps) {
  return (
    <Edit
      title={title}
      sx={{
        '& .RaEdit-main': { background: 'transparent' },
        '& .RaEdit-card': { background: 'transparent', boxShadow: 'none' },
      }}
    >
      <FormPageShell title={title} subtitle={subtitle}>
        <SimpleForm toolbar={<ModernFormToolbar />}>{children}</SimpleForm>
      </FormPageShell>
    </Edit>
  )
}

export function ModernCreate({ title, subtitle, children, defaultValues }: FormPageProps) {
  return (
    <Create
      title={title}
      sx={{
        '& .RaCreate-main': { background: 'transparent' },
        '& .RaCreate-card': { background: 'transparent', boxShadow: 'none' },
      }}
    >
      <FormPageShell title={title} subtitle={subtitle}>
        <SimpleForm defaultValues={defaultValues} toolbar={<ModernCreateToolbar />}>
          {children}
        </SimpleForm>
      </FormPageShell>
    </Create>
  )
}

function FormPageShell({ title, subtitle, children }: FormPageProps) {
  const resource = useResourceContext()
  const hubBack = resource ? getPageHubBackTarget(resource) : null

  return (
    <Box sx={{ maxWidth: 760, mx: 'auto', width: '100%', pb: 6 }}>
      <Box sx={{ mb: 1.5, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {hubBack && (
          <Button
            component={RouterLink}
            to={hubBack.to}
            size="small"
            startIcon={<ArrowLeft size={16} />}
            sx={{
              borderRadius: `${design.radius.sm}px`,
              fontWeight: 600,
              color: parishColors.royal,
              bgcolor: alpha(parishColors.royal, 0.05),
              border: `1px solid ${design.border}`,
              '&:hover': { bgcolor: alpha(parishColors.royal, 0.08) },
            }}
          >
            {hubBack.label}
          </Button>
        )}
      </Box>
      <Box
        sx={{
          mb: 3,
          pb: 2.5,
          borderBottom: `1px solid ${design.border}`,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontWeight: 700,
            color: parishColors.foreground,
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography sx={{ mt: 0.75, color: parishColors.mutedForeground, lineHeight: 1.55, maxWidth: 520 }}>
            {subtitle}
          </Typography>
        )}
      </Box>
      <Box className="parish-form-body">{children}</Box>
    </Box>
  )
}

export function FormSection({
  title,
  description,
  icon,
  children,
}: {
  title: string
  description?: string
  icon?: ReactNode
  children: ReactNode
}) {
  return (
    <Box
      sx={{
        mb: 2,
        borderRadius: `${design.radius.lg}px`,
        border: `1px solid ${design.border}`,
        bgcolor: design.surface,
        overflow: 'hidden',
        boxShadow: design.shadow.xs,
      }}
    >
      <Box
        sx={{
          px: { xs: 2, md: 2.5 },
          py: 1.75,
          bgcolor: design.surfaceMuted,
          borderBottom: `1px solid ${design.border}`,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        {icon && (
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: `${design.radius.sm}px`,
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: alpha(parishColors.royal, 0.08),
              color: parishColors.royal,
            }}
          >
            {icon}
          </Box>
        )}
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: parishColors.foreground, lineHeight: 1.3 }}>
            {title}
          </Typography>
          {description && (
            <Typography variant="caption" sx={{ display: 'block', mt: 0.25, lineHeight: 1.5, color: parishColors.mutedForeground }}>
              {description}
            </Typography>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          p: { xs: 2, md: 2.5 },
          '& .MuiFormControl-root': { mb: 0 },
          '& .MuiOutlinedInput-root': {
            borderRadius: `${design.radius.sm}px`,
            bgcolor: design.surfaceMuted,
            transition: 'all 0.2s ease',
            '&:hover': { bgcolor: design.surface },
            '&.Mui-focused': {
              bgcolor: design.surface,
              boxShadow: `0 0 0 3px ${alpha(parishColors.royal, 0.08)}`,
            },
          },
          '& .MuiInputLabel-root': { fontWeight: 500, fontSize: '0.8125rem' },
          '& .MuiFormHelperText-root': { mx: 0, mt: 0.75 },
        }}
      >
        <Stack spacing={2.5}>{children}</Stack>
      </Box>
    </Box>
  )
}

/** Deux champs côte à côte sur desktop. */
export function FormRow({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        gap: 2.5,
        '& > .MuiFormControl-root': { mb: 0 },
      }}
    >
      {children}
    </Box>
  )
}
