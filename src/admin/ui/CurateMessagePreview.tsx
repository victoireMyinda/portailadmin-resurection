import { useWatch } from 'react-hook-form'
import { Box, Chip, Typography, alpha } from '@mui/material'
import { parishColors } from '../../theme/parishTheme'
import type { HomeCurateMessageRecord } from '../../types'

type CurateMessagePreviewDisplayProps = Partial<HomeCurateMessageRecord> & {
  showCaption?: boolean
}

export function CurateMessagePreviewDisplay({
  imageUrl,
  title,
  name,
  role,
  greeting,
  content,
  signature,
  showCaption = true,
}: CurateMessagePreviewDisplayProps) {
  const paragraphs = content?.split('\n\n').filter(Boolean) ?? []

  return (
    <Box
      sx={{
        borderRadius: 3,
        border: '1px solid',
        borderColor: alpha(parishColors.royal, 0.12),
        bgcolor: '#fff',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(13,71,161,0.06)',
      }}
    >
      {showCaption && (
        <Typography
          variant="caption"
          sx={{
            display: 'block',
            px: 2.5,
            pt: 2,
            pb: 1,
            fontWeight: 700,
            color: parishColors.mutedForeground,
          }}
        >
          Aperçu — Mot du curé (page d’accueil)
        </Typography>
      )}

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '2fr 3fr' },
          gap: 2.5,
          p: 2.5,
        }}
      >
        <Box
          component="img"
          src={imageUrl || undefined}
          alt=""
          sx={{
            width: '100%',
            aspectRatio: '4/5',
            borderRadius: 3,
            objectFit: 'cover',
            bgcolor: alpha(parishColors.muted, 0.8),
          }}
        />
        <Box>
          <Chip
            label={title || 'Mot du Curé'}
            size="small"
            sx={{ mb: 1.5, bgcolor: alpha(parishColors.gold, 0.15), color: '#92680a', fontWeight: 700 }}
          />
          <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: '"Playfair Display", serif' }}>
            {name || 'Nom du curé'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
            {role || 'Curé de la Paroisse'}
          </Typography>
          {greeting && (
            <Typography sx={{ mt: 2, fontWeight: 600, fontSize: 14 }}>{greeting}</Typography>
          )}
          <Box sx={{ mt: 1.5 }}>
            {paragraphs.length > 0 ? (
              paragraphs.slice(0, 2).map((para, i) => (
                <Typography key={i} variant="body2" color="text.secondary" sx={{ mb: 1.25, lineHeight: 1.65 }}>
                  {para.length > 220 ? `${para.slice(0, 220)}…` : para}
                </Typography>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                Contenu du message…
              </Typography>
            )}
          </Box>
          {signature && (
            <Typography
              sx={{
                mt: 2,
                fontFamily: '"Playfair Display", serif',
                fontStyle: 'italic',
                color: parishColors.royal,
                fontWeight: 600,
              }}
            >
              {signature}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export function CurateMessagePreviewLive() {
  const imageUrl = useWatch({ name: 'imageUrl' }) as string | undefined
  const title = useWatch({ name: 'title' }) as string | undefined
  const name = useWatch({ name: 'name' }) as string | undefined
  const role = useWatch({ name: 'role' }) as string | undefined
  const greeting = useWatch({ name: 'greeting' }) as string | undefined
  const content = useWatch({ name: 'content' }) as string | undefined
  const signature = useWatch({ name: 'signature' }) as string | undefined

  return (
    <CurateMessagePreviewDisplay
      imageUrl={imageUrl}
      title={title}
      name={name}
      role={role}
      greeting={greeting}
      content={content}
      signature={signature}
    />
  )
}
