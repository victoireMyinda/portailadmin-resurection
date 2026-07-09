import { useRef, useState } from 'react'
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material'
import { Link2, Play, Upload } from 'lucide-react'
import { useInput, useNotify } from 'react-admin'
import { useWatch } from 'react-hook-form'
import { parseYoutubeId } from '../media/youtube'
import { uploadVideoFile } from '../utils/upload-media'

type VideoSourceMode = 'youtube' | 'url' | 'upload'

type VideoSourceInputProps = {
  sourceField?: string
  youtubeIdField?: string
  videoUrlField?: string
  thumbnailField?: string
}

export function VideoSourceInput({
  sourceField = 'videoSource',
  youtubeIdField = 'youtubeId',
  videoUrlField = 'videoUrl',
  thumbnailField = 'thumbnailUrl',
}: VideoSourceInputProps) {
  const notify = useNotify()
  const fileRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  const { field: modeField } = useInput({ source: sourceField, defaultValue: 'youtube' as VideoSourceMode })
  const { field: youtubeField } = useInput({ source: youtubeIdField, defaultValue: '' })
  const { field: videoUrl } = useInput({ source: videoUrlField, defaultValue: '' })
  const { field: thumbnailFieldInput } = useInput({ source: thumbnailField, defaultValue: '' })
  const recordId = String(useWatch({ name: 'id' }) ?? '').trim()

  const mode: VideoSourceMode =
    modeField.value === 'upload' || modeField.value === 'url' ? modeField.value : 'youtube'

  const setMode = (next: VideoSourceMode) => {
    modeField.onChange(next)
    if (next !== 'youtube') youtubeField.onChange('')
    if (next === 'youtube') videoUrl.onChange('')
  }

  const handleYoutubeBlur = () => {
    const parsed = parseYoutubeId(String(youtubeField.value ?? ''))
    youtubeField.onChange(parsed)
    youtubeField.onBlur()
  }

  const handleUpload = async (file: File) => {
    if (!recordId) {
      notify("Renseignez d'abord l'identifiant de la vidéo.", { type: 'warning' })
      return
    }
    setUploading(true)
    try {
      const result = await uploadVideoFile(recordId, file)
      modeField.onChange('upload')
      videoUrl.onChange(result.videoUrl)
      youtubeField.onChange('')
      notify('Vidéo téléversée sur Firebase Storage.', { type: 'success' })
    } catch (error) {
      notify(error instanceof Error ? error.message : 'Téléversement vidéo impossible.', { type: 'error' })
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
        Source de la vidéo
      </Typography>
      <ToggleButtonGroup
        exclusive
        size="small"
        value={mode}
        onChange={(_, value: VideoSourceMode | null) => {
          if (value) setMode(value)
        }}
        sx={{ mb: 2, flexWrap: 'wrap' }}
      >
        <ToggleButton value="youtube" sx={{ gap: 0.75, px: 2 }}>
          <Play size={16} />
          YouTube
        </ToggleButton>
        <ToggleButton value="url" sx={{ gap: 0.75, px: 2 }}>
          <Link2 size={16} />
          Lien direct
        </ToggleButton>
        <ToggleButton value="upload" sx={{ gap: 0.75, px: 2 }}>
          <Upload size={16} />
          Téléversement
        </ToggleButton>
      </ToggleButtonGroup>

      {mode === 'youtube' && (
        <TextField
          label="ID ou lien YouTube"
          value={youtubeField.value ?? ''}
          onChange={(e) => {
            modeField.onChange('youtube')
            youtubeField.onChange(e.target.value)
          }}
          onBlur={handleYoutubeBlur}
          helperText="Collez un lien YouTube ou seulement l'identifiant"
          fullWidth
        />
      )}

      {mode === 'url' && (
        <Box sx={{ display: 'grid', gap: 1.5 }}>
          <TextField
            label="URL vidéo"
            value={videoUrl.value ?? ''}
            onChange={(e) => {
              modeField.onChange('url')
              videoUrl.onChange(e.target.value)
            }}
            helperText="URL directe vers un fichier vidéo hébergé"
            fullWidth
          />
          <TextField
            label="URL miniature (optionnelle)"
            value={thumbnailFieldInput.value ?? ''}
            onChange={(e) => thumbnailFieldInput.onChange(e.target.value)}
            fullWidth
          />
          {videoUrl.value && (
            thumbnailFieldInput.value ? (
              <Box
                component="img"
                src={String(thumbnailFieldInput.value)}
                alt=""
                sx={{
                  display: 'block',
                  maxWidth: '100%',
                  maxHeight: 220,
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <Box
                component="video"
                src={String(videoUrl.value)}
                controls
                sx={{
                  display: 'block',
                  maxWidth: '100%',
                  maxHeight: 260,
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  bgcolor: '#000',
                }}
              />
            )
          )}
        </Box>
      )}

      {mode === 'upload' && (
        <Box>
          <input
            ref={fileRef}
            hidden
            type="file"
            accept="video/*"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) void handleUpload(file)
            }}
          />
          <Button
            variant="contained"
            color="secondary"
            startIcon={uploading ? <CircularProgress size={16} color="inherit" /> : <Upload size={16} />}
            disabled={uploading || !recordId}
            onClick={() => fileRef.current?.click()}
            sx={{ borderRadius: 2 }}
          >
            {uploading ? 'Envoi en cours…' : 'Choisir une vidéo'}
          </Button>
          {!recordId && (
            <Typography variant="caption" color="warning.main" sx={{ display: 'block', mt: 1 }}>
              Indiquez d&apos;abord l&apos;identifiant de la vidéo.
            </Typography>
          )}
          {videoUrl.value && (
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
              Fichier enregistré : {String(videoUrl.value).slice(0, 60)}…
            </Typography>
          )}
        </Box>
      )}
    </Box>
  )
}
