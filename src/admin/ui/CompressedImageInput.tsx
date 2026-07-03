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
import { Link2, Upload } from 'lucide-react'
import { useInput, useNotify } from 'react-admin'
import { useWatch } from 'react-hook-form'
import { uploadCompressedPhoto, uploadSummary } from '../utils/upload-media'

type PhotoSourceMode = 'url' | 'upload'

type PhotoSourceInputProps = {
  imageSource?: string
  imageUrlSource?: string
  thumbnailSource?: string
  label?: string
}

export function PhotoSourceInput({
  imageSource = 'imageSource',
  imageUrlSource = 'imageUrl',
  thumbnailSource = 'thumbnailUrl',
  label = 'Photo',
}: PhotoSourceInputProps) {
  const notify = useNotify()
  const fileRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  const { field: modeField } = useInput({ source: imageSource, defaultValue: 'url' as PhotoSourceMode })
  const {
    field: imageField,
    fieldState: imageState,
    isRequired,
  } = useInput({ source: imageUrlSource })
  const { field: thumbField } = useInput({ source: thumbnailSource })

  const photoId = String(useWatch({ name: 'id' }) ?? '').trim()
  const mode: PhotoSourceMode = modeField.value === 'upload' ? 'upload' : 'url'
  const preview = String(imageField.value ?? thumbField.value ?? '')

  const setMode = (next: PhotoSourceMode) => {
    modeField.onChange(next)
  }

  const handleFile = async (file: File) => {
    if (!photoId) {
      notify("Renseignez d'abord l'identifiant de la photo", { type: 'warning' })
      return
    }
    if (!file.type.startsWith('image/')) {
      notify('Sélectionnez un fichier image (JPG, PNG, WebP…)', { type: 'warning' })
      return
    }

    setUploading(true)
    try {
      const result = await uploadCompressedPhoto(photoId, file)
      modeField.onChange('upload')
      imageField.onChange(result.imageUrl)
      thumbField.onChange(result.thumbnailUrl)
      notify(
        result.storage === 'firebase'
          ? `Photo importée sur Firebase Storage — ${uploadSummary(result.originalSize, result.compressedSize)}`
          : `Photo enregistrée (mode local) — ${uploadSummary(result.originalSize, result.compressedSize)}. Pour activer Storage : npm run firebase:setup-storage`,
        { type: result.storage === 'firebase' ? 'success' : 'warning' },
      )
    } catch (error) {
      console.error(error)
      notify(
        error instanceof Error
          ? error.message
          : "Échec de l'envoi. Vérifiez Firebase Storage ou utilisez un lien en ligne.",
        { type: 'error' },
      )
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  const handleImageUrlBlur = () => {
    imageField.onBlur()
    if (mode === 'url' && imageField.value && !thumbField.value) {
      thumbField.onChange(imageField.value)
    }
  }

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
        {label}
        {isRequired ? ' *' : ''}
      </Typography>

      <ToggleButtonGroup
        exclusive
        value={mode}
        onChange={(_, value: PhotoSourceMode | null) => {
          if (value) setMode(value)
        }}
        size="small"
        sx={{ mb: 2, flexWrap: 'wrap' }}
      >
        <ToggleButton value="url" sx={{ gap: 0.75, px: 2 }}>
          <Link2 size={16} />
          Lien en ligne
        </ToggleButton>
        <ToggleButton value="upload" sx={{ gap: 0.75, px: 2 }}>
          <Upload size={16} />
          Depuis l&apos;appareil
        </ToggleButton>
      </ToggleButtonGroup>

      {preview && (
        <Box
          component="img"
          src={preview}
          alt=""
          sx={{
            display: 'block',
            maxWidth: '100%',
            maxHeight: 220,
            borderRadius: 2,
            mb: 1.5,
            border: '1px solid',
            borderColor: 'divider',
            objectFit: 'cover',
          }}
        />
      )}

      {mode === 'url' ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <TextField
            label="URL de la photo"
            value={imageField.value ?? ''}
            onChange={(e) => {
              modeField.onChange('url')
              imageField.onChange(e.target.value)
            }}
            onBlur={handleImageUrlBlur}
            fullWidth
            placeholder="https://exemple.com/photo.jpg"
            error={Boolean(imageState.error)}
            helperText={
              imageState.error?.message ??
              'Collez le lien direct vers l\'image hébergée en ligne'
            }
            size="small"
          />
          <TextField
            label="URL miniature (optionnel)"
            value={thumbField.value ?? ''}
            onChange={(e) => {
              modeField.onChange('url')
              thumbField.onChange(e.target.value)
            }}
            onBlur={thumbField.onBlur}
            fullWidth
            placeholder="Laisser vide pour réutiliser l'URL principale"
            size="small"
            helperText="Version plus légère pour la grille ; sinon l'URL principale est utilisée"
          />
        </Box>
      ) : (
        <Box>
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,image/heic,image/*"
            capture="environment"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) void handleFile(file)
            }}
          />

          <Button
            variant="contained"
            color="secondary"
            startIcon={uploading ? <CircularProgress size={16} color="inherit" /> : <Upload size={16} />}
            disabled={uploading || !photoId}
            onClick={() => fileRef.current?.click()}
            sx={{ borderRadius: 2 }}
          >
            {uploading ? 'Compression et envoi…' : 'Choisir une photo sur cet appareil'}
          </Button>

          {!photoId && (
            <Typography variant="caption" color="warning.main" sx={{ display: 'block', mt: 1 }}>
              Indiquez d&apos;abord l&apos;identifiant de la photo ci-dessus.
            </Typography>
          )}

          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1.5 }}>
            La photo est redimensionnée (max. 1600 px), convertie en WebP et envoyée sur Firebase Storage.
            Une miniature (480 px) est créée pour la galerie.
          </Typography>

          {(imageField.value || thumbField.value) && (
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
              Fichier enregistré : {String(imageField.value ?? '').slice(0, 60)}…
            </Typography>
          )}
        </Box>
      )}
    </Box>
  )
}

/** @deprecated Utiliser PhotoSourceInput */
export const CompressedImageInput = PhotoSourceInput
