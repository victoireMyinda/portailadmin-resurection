import { useMemo, useRef, useState } from 'react'
import {
  Alert,
  Box,
  Button,
  Divider,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { Image as ImageIcon, Link2, Plus, Trash2, Upload, Video } from 'lucide-react'
import { useDataProvider, useNotify, useRedirect } from 'react-admin'
import { FormPageShell, FormSection } from '../ui/modern'
import { mediaCategoryChoices } from './build-seed'
import { uploadCompressedPhoto, uploadSummary, uploadVideoFile } from '../utils/upload-media'
import { sanitizeForFirestore } from '../firestore/utils'
import { parseYoutubeId } from './youtube'

type PhotoUploadDraft = { title: string; file: File | null }
type PhotoLinkDraft = { title: string; imageUrl: string; thumbnailUrl: string }
type VideoUploadDraft = { title: string; description: string; file: File | null }
type VideoLinkDraft = { title: string; description: string; url: string }

function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function filenameLabel(name: string): string {
  return name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ').trim()
}

function buildId(prefix: string, title: string, index: number): string {
  const stem = slugify(title) || `${prefix}-${index + 1}`
  return `${prefix}-${stem}-${Date.now()}-${index + 1}`
}

function previewUrl(file: File | null): string {
  return file ? URL.createObjectURL(file) : ''
}

function parseDirectVideoUrl(value: string): { youtubeId: string; videoSource: 'youtube' | 'url'; videoUrl?: string } {
  const youtubeId = parseYoutubeId(value)
  if (youtubeId && (value.includes('youtu') || /^[\w-]{6,}$/.test(value.trim()))) {
    return { youtubeId, videoSource: 'youtube' }
  }
  return { youtubeId: '', videoSource: 'url', videoUrl: value.trim() }
}

export function PhotoBatchCreatePage() {
  const dataProvider = useDataProvider()
  const notify = useNotify()
  const redirect = useRedirect()
  const uploadInputRef = useRef<HTMLInputElement>(null)
  const [category, setCategory] = useState(mediaCategoryChoices[0]?.id ?? '')
  const [orderStart, setOrderStart] = useState(10)
  const [orderStep, setOrderStep] = useState(10)
  const [uploadRows, setUploadRows] = useState<PhotoUploadDraft[]>([])
  const [linkRows, setLinkRows] = useState<PhotoLinkDraft[]>([{ title: '', imageUrl: '', thumbnailUrl: '' }])
  const [saving, setSaving] = useState(false)

  const totalItems = uploadRows.filter((row) => row.file).length + linkRows.filter((row) => row.imageUrl.trim()).length

  const addUploadRows = (files: FileList | null) => {
    if (!files?.length) return
    setUploadRows((prev) => [
      ...prev,
      ...Array.from(files).map((file) => ({ title: filenameLabel(file.name), file })),
    ])
    if (uploadInputRef.current) uploadInputRef.current.value = ''
  }

  const canSave = useMemo(
    () =>
      !saving &&
      !!category &&
      uploadRows.every((row) => !row.file || row.title.trim()) &&
      linkRows.every((row) => !row.imageUrl.trim() || row.title.trim()) &&
      totalItems > 0,
    [category, linkRows, saving, totalItems, uploadRows],
  )

  const save = async () => {
    if (!category) {
      notify('Choisissez une catégorie pour les photos.', { type: 'warning' })
      return
    }
    if (totalItems === 0) {
      notify('Ajoutez au moins une photo par fichier ou par lien.', { type: 'warning' })
      return
    }

    setSaving(true)
    let created = 0
    try {
      const uploadItems = uploadRows.filter((row) => row.file && row.title.trim())
      const linkItems = linkRows.filter((row) => row.imageUrl.trim() && row.title.trim())
      let offset = 0

      for (const [index, row] of uploadItems.entries()) {
        const id = buildId('photo', row.title, index)
        const result = await uploadCompressedPhoto(id, row.file as File)
        await dataProvider.create('mediaPhotos', {
          data: sanitizeForFirestore({
            id,
            title: row.title.trim(),
            category,
            imageSource: 'upload',
            imageUrl: result.imageUrl,
            thumbnailUrl: result.thumbnailUrl,
            order: orderStart + (offset + index) * orderStep,
          }),
        })
        created += 1
        notify(
          `Photo "${row.title}" ajoutée — ${uploadSummary(result.originalSize, result.compressedSize)}`,
          { type: result.storage === 'firebase' ? 'success' : 'warning' },
        )
      }

      offset += uploadItems.length

      for (const [index, row] of linkItems.entries()) {
        const id = buildId('photo', row.title, offset + index)
        await dataProvider.create('mediaPhotos', {
          data: sanitizeForFirestore({
            id,
            title: row.title.trim(),
            category,
            imageSource: 'url',
            imageUrl: row.imageUrl.trim(),
            thumbnailUrl: row.thumbnailUrl.trim() || row.imageUrl.trim(),
            order: orderStart + (offset + index) * orderStep,
          }),
        })
        created += 1
      }

      notify(`${created} photo(s) enregistrée(s).`, { type: 'success' })
      redirect('list', 'mediaPhotos')
    } catch (error) {
      notify(error instanceof Error ? error.message : 'Création des photos impossible.', { type: 'error' })
    } finally {
      setSaving(false)
    }
  }

  return (
    <FormPageShell
      title="Nouvelles photos"
      subtitle="Ajoutez plusieurs photos en une opération, par téléversement ou par liens."
    >
      <FormSection
        title="Paramètres communs"
        description="Chaque élément créé conservera la structure d'un enregistrement photo existant."
        icon={<ImageIcon size={20} />}
      >
        <Box sx={{ p: { xs: 2, md: 2.5 }, display: 'grid', gap: 2 }}>
          <TextField
            select
            label="Catégorie"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            fullWidth
          >
            {mediaCategoryChoices.map((choice) => (
              <MenuItem key={choice.id} value={choice.id}>
                {choice.name}
              </MenuItem>
            ))}
          </TextField>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              label="Ordre de départ"
              type="number"
              value={orderStart}
              onChange={(e) => setOrderStart(Number(e.target.value) || 0)}
              fullWidth
            />
            <TextField
              label="Pas d'incrément"
              type="number"
              value={orderStep}
              onChange={(e) => setOrderStep(Math.max(1, Number(e.target.value) || 1))}
              fullWidth
            />
          </Stack>
        </Box>
      </FormSection>

      <FormSection
        title="Photos à téléverser"
        description="Sélectionnez un ou plusieurs fichiers, puis ajustez le libellé de chaque photo si nécessaire."
        icon={<Upload size={20} />}
      >
        <Box sx={{ p: { xs: 2, md: 2.5 } }}>
          <input
            ref={uploadInputRef}
            hidden
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,image/heic,image/*"
            multiple
            onChange={(e) => addUploadRows(e.target.files)}
          />
          <Button
            variant="contained"
            color="secondary"
            startIcon={<Upload size={16} />}
            onClick={() => uploadInputRef.current?.click()}
            sx={{ borderRadius: 2, mb: 2 }}
          >
            Choisir une ou plusieurs photos
          </Button>
          <Stack spacing={1.5}>
            {uploadRows.length === 0 && (
              <Typography variant="body2" color="text.secondary">
                Aucun fichier sélectionné pour le moment.
              </Typography>
            )}
            {uploadRows.map((row, index) => (
              <Stack key={`${row.file?.name ?? 'upload'}-${index}`} direction={{ xs: 'column', md: 'row' }} spacing={1.5}>
                {row.file && (
                  <Box
                    component="img"
                    src={previewUrl(row.file)}
                    alt={row.title || row.file.name}
                    sx={{
                      width: { xs: '100%', md: 120 },
                      height: 120,
                      objectFit: 'cover',
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                      flexShrink: 0,
                    }}
                  />
                )}
                <Stack spacing={1.5} sx={{ flex: 1 }}>
                  <TextField
                    label="Libellé"
                    value={row.title}
                    onChange={(e) =>
                      setUploadRows((prev) => prev.map((item, i) => (i === index ? { ...item, title: e.target.value } : item)))
                    }
                    fullWidth
                  />
                  <TextField label="Fichier" value={row.file?.name ?? ''} disabled fullWidth />
                </Stack>
                <IconButton color="error" onClick={() => setUploadRows((prev) => prev.filter((_, i) => i !== index))}>
                  <Trash2 size={16} />
                </IconButton>
              </Stack>
            ))}
          </Stack>
        </Box>
      </FormSection>

      <FormSection
        title="Photos via liens"
        description="Ajoutez un ou plusieurs liens d'images hébergées en ligne."
        icon={<Link2 size={20} />}
      >
        <Box sx={{ p: { xs: 2, md: 2.5 } }}>
          <Stack spacing={1.5}>
            {linkRows.map((row, index) => (
              <Box key={`link-${index}`}>
                {index > 0 && <Divider sx={{ mb: 1.5 }} />}
                <Stack spacing={1.5}>
                  <TextField
                    label="Libellé"
                    value={row.title}
                    onChange={(e) =>
                      setLinkRows((prev) => prev.map((item, i) => (i === index ? { ...item, title: e.target.value } : item)))
                    }
                    fullWidth
                  />
                  <TextField
                    label="URL de la photo"
                    value={row.imageUrl}
                    onChange={(e) =>
                      setLinkRows((prev) => prev.map((item, i) => (i === index ? { ...item, imageUrl: e.target.value } : item)))
                    }
                    fullWidth
                  />
                  <TextField
                    label="URL miniature (optionnel)"
                    value={row.thumbnailUrl}
                    onChange={(e) =>
                      setLinkRows((prev) => prev.map((item, i) => (i === index ? { ...item, thumbnailUrl: e.target.value } : item)))
                    }
                    fullWidth
                  />
                  {row.imageUrl.trim() && (
                    <Box
                      component="img"
                      src={row.thumbnailUrl.trim() || row.imageUrl.trim()}
                      alt={row.title || 'Aperçu photo'}
                      sx={{
                        width: '100%',
                        maxWidth: 240,
                        height: 140,
                        objectFit: 'cover',
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: 'divider',
                      }}
                    />
                  )}
                  <Box>
                    <Button color="error" startIcon={<Trash2 size={16} />} onClick={() => setLinkRows((prev) => prev.filter((_, i) => i !== index))} disabled={linkRows.length === 1}>
                      Supprimer cette ligne
                    </Button>
                  </Box>
                </Stack>
              </Box>
            ))}
          </Stack>
          <Button sx={{ mt: 2 }} startIcon={<Plus size={16} />} onClick={() => setLinkRows((prev) => [...prev, { title: '', imageUrl: '', thumbnailUrl: '' }])}>
            Ajouter un autre lien photo
          </Button>
        </Box>
      </FormSection>

      <Alert severity="info" sx={{ mb: 2 }}>
        {totalItems} élément(s) prêt(s) à être créé(s).
      </Alert>

      <Stack direction="row" spacing={1.5} sx={{ mt: 2 }}>
        <Button variant="outlined" onClick={() => redirect('list', 'mediaPhotos')}>
          Retour à la liste
        </Button>
        <Button variant="contained" color="secondary" disabled={!canSave} onClick={() => void save()}>
          {saving ? 'Création en cours…' : `Créer ${totalItems || ''} photo(s)`}
        </Button>
      </Stack>
    </FormPageShell>
  )
}

export function VideoBatchCreatePage() {
  const dataProvider = useDataProvider()
  const notify = useNotify()
  const redirect = useRedirect()
  const uploadInputRef = useRef<HTMLInputElement>(null)
  const [category, setCategory] = useState(mediaCategoryChoices[0]?.id ?? '')
  const [orderStart, setOrderStart] = useState(10)
  const [orderStep, setOrderStep] = useState(10)
  const [uploadRows, setUploadRows] = useState<VideoUploadDraft[]>([])
  const [linkRows, setLinkRows] = useState<VideoLinkDraft[]>([{ title: '', description: '', url: '' }])
  const [saving, setSaving] = useState(false)

  const totalItems = uploadRows.filter((row) => row.file).length + linkRows.filter((row) => row.url.trim()).length

  const addUploadRows = (files: FileList | null) => {
    if (!files?.length) return
    setUploadRows((prev) => [
      ...prev,
      ...Array.from(files).map((file) => ({ title: filenameLabel(file.name), description: '', file })),
    ])
    if (uploadInputRef.current) uploadInputRef.current.value = ''
  }

  const canSave = useMemo(
    () =>
      !saving &&
      uploadRows.every((row) => !row.file || row.title.trim()) &&
      linkRows.every((row) => !row.url.trim() || row.title.trim()) &&
      totalItems > 0,
    [linkRows, saving, totalItems, uploadRows],
  )

  const save = async () => {
    if (totalItems === 0) {
      notify('Ajoutez au moins une vidéo par fichier ou par lien.', { type: 'warning' })
      return
    }

    setSaving(true)
    let created = 0
    try {
      const uploadItems = uploadRows.filter((row) => row.file && row.title.trim())
      const linkItems = linkRows.filter((row) => row.url.trim() && row.title.trim())
      let offset = 0

      for (const [index, row] of uploadItems.entries()) {
        const id = buildId('video', row.title, index)
        const result = await uploadVideoFile(id, row.file as File)
        await dataProvider.create('mediaVideos', {
          data: sanitizeForFirestore({
            id,
            title: row.title.trim(),
            description: row.description.trim(),
            category,
            youtubeId: '',
            videoSource: 'upload',
            videoUrl: result.videoUrl,
            thumbnailUrl: '',
            order: orderStart + (offset + index) * orderStep,
          }),
        })
        created += 1
      }

      offset += uploadItems.length

      for (const [index, row] of linkItems.entries()) {
        const id = buildId('video', row.title, offset + index)
        const parsed = parseDirectVideoUrl(row.url)
        await dataProvider.create('mediaVideos', {
          data: sanitizeForFirestore({
            id,
            title: row.title.trim(),
            description: row.description.trim(),
            category,
            youtubeId: parsed.youtubeId,
            videoSource: parsed.videoSource,
            videoUrl: parsed.videoUrl,
            thumbnailUrl: '',
            order: orderStart + (offset + index) * orderStep,
          }),
        })
        created += 1
      }

      notify(`${created} vidéo(s) enregistrée(s).`, { type: 'success' })
      redirect('list', 'mediaVideos')
    } catch (error) {
      notify(error instanceof Error ? error.message : 'Création des vidéos impossible.', { type: 'error' })
    } finally {
      setSaving(false)
    }
  }

  return (
    <FormPageShell
      title="Nouvelles vidéos"
      subtitle="Ajoutez plusieurs vidéos en une opération, par téléversement ou par liens."
    >
      <FormSection
        title="Paramètres communs"
        description="Les enregistrements restent individuels ; seuls les formulaires d'ajout sont enrichis."
        icon={<Video size={20} />}
      >
        <Box sx={{ p: { xs: 2, md: 2.5 } }}>
          <TextField
            select
            label="Catégorie"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          >
            {mediaCategoryChoices.map((choice) => (
              <MenuItem key={choice.id} value={choice.id}>
                {choice.name}
              </MenuItem>
            ))}
          </TextField>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              label="Ordre de départ"
              type="number"
              value={orderStart}
              onChange={(e) => setOrderStart(Number(e.target.value) || 0)}
              fullWidth
            />
            <TextField
              label="Pas d'incrément"
              type="number"
              value={orderStep}
              onChange={(e) => setOrderStep(Math.max(1, Number(e.target.value) || 1))}
              fullWidth
            />
          </Stack>
        </Box>
      </FormSection>

      <FormSection
        title="Vidéos à téléverser"
        description="Téléversez une ou plusieurs vidéos depuis l'appareil."
        icon={<Upload size={20} />}
      >
        <Box sx={{ p: { xs: 2, md: 2.5 } }}>
          <input ref={uploadInputRef} hidden type="file" accept="video/*" multiple onChange={(e) => addUploadRows(e.target.files)} />
          <Button variant="contained" color="secondary" startIcon={<Upload size={16} />} onClick={() => uploadInputRef.current?.click()} sx={{ borderRadius: 2, mb: 2 }}>
            Choisir une ou plusieurs vidéos
          </Button>
          <Stack spacing={1.5}>
            {uploadRows.length === 0 && (
              <Typography variant="body2" color="text.secondary">
                Aucun fichier vidéo sélectionné.
              </Typography>
            )}
            {uploadRows.map((row, index) => (
              <Stack key={`${row.file?.name ?? 'video'}-${index}`} spacing={1.5}>
                {row.file && (
                  <Box
                    sx={{
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                      bgcolor: 'background.paper',
                      p: 1.5,
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {row.file.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {Math.round(row.file.size / 1024 / 1024 * 10) / 10} Mo
                    </Typography>
                  </Box>
                )}
                <TextField
                  label="Libellé"
                  value={row.title}
                  onChange={(e) =>
                    setUploadRows((prev) => prev.map((item, i) => (i === index ? { ...item, title: e.target.value } : item)))
                  }
                  fullWidth
                />
                <TextField
                  label="Description (optionnelle)"
                  value={row.description}
                  onChange={(e) =>
                    setUploadRows((prev) =>
                      prev.map((item, i) => (i === index ? { ...item, description: e.target.value } : item)),
                    )
                  }
                  fullWidth
                />
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.5}>
                  <TextField label="Fichier" value={row.file?.name ?? ''} disabled fullWidth />
                  <IconButton color="error" onClick={() => setUploadRows((prev) => prev.filter((_, i) => i !== index))}>
                    <Trash2 size={16} />
                  </IconButton>
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Box>
      </FormSection>

      <FormSection
        title="Vidéos via liens"
        description="Ajoutez des liens YouTube ou des liens directs vers des fichiers vidéo hébergés."
        icon={<Link2 size={20} />}
      >
        <Box sx={{ p: { xs: 2, md: 2.5 } }}>
          <Stack spacing={1.5}>
            {linkRows.map((row, index) => (
              <Box key={`video-link-${index}`}>
                {index > 0 && <Divider sx={{ mb: 1.5 }} />}
                <Stack spacing={1.5}>
                  <TextField
                    label="Libellé"
                    value={row.title}
                    onChange={(e) =>
                      setLinkRows((prev) => prev.map((item, i) => (i === index ? { ...item, title: e.target.value } : item)))
                    }
                    fullWidth
                  />
                  <TextField
                    label="Description (optionnelle)"
                    value={row.description}
                    onChange={(e) =>
                      setLinkRows((prev) =>
                        prev.map((item, i) => (i === index ? { ...item, description: e.target.value } : item)),
                      )
                    }
                    fullWidth
                  />
                  <TextField
                    label="URL vidéo"
                    value={row.url}
                    onChange={(e) =>
                      setLinkRows((prev) => prev.map((item, i) => (i === index ? { ...item, url: e.target.value } : item)))
                    }
                    helperText="Lien YouTube ou URL directe vers un fichier vidéo"
                    fullWidth
                  />
                  {row.url.trim() && (
                    row.url.includes('youtu') ? (
                      <Box
                        sx={{
                          borderRadius: 2,
                          border: '1px solid',
                          borderColor: 'divider',
                          p: 1.5,
                          bgcolor: 'background.paper',
                        }}
                      >
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          Aperçu lien YouTube
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {row.url}
                        </Typography>
                      </Box>
                    ) : (
                      <Box
                        component="video"
                        src={row.url.trim()}
                        controls
                        sx={{
                          width: '100%',
                          maxWidth: 320,
                          borderRadius: 2,
                          border: '1px solid',
                          borderColor: 'divider',
                          bgcolor: '#000',
                        }}
                      />
                    )
                  )}
                  <Box>
                    <Button color="error" startIcon={<Trash2 size={16} />} onClick={() => setLinkRows((prev) => prev.filter((_, i) => i !== index))} disabled={linkRows.length === 1}>
                      Supprimer cette ligne
                    </Button>
                  </Box>
                </Stack>
              </Box>
            ))}
          </Stack>
          <Button sx={{ mt: 2 }} startIcon={<Plus size={16} />} onClick={() => setLinkRows((prev) => [...prev, { title: '', description: '', url: '' }])}>
            Ajouter un autre lien vidéo
          </Button>
        </Box>
      </FormSection>

      <Alert severity="info" sx={{ mb: 2 }}>
        {totalItems} élément(s) prêt(s) à être créé(s).
      </Alert>

      <Stack direction="row" spacing={1.5} sx={{ mt: 2 }}>
        <Button variant="outlined" onClick={() => redirect('list', 'mediaVideos')}>
          Retour à la liste
        </Button>
        <Button variant="contained" color="secondary" disabled={!canSave} onClick={() => void save()}>
          {saving ? 'Création en cours…' : `Créer ${totalItems || ''} vidéo(s)`}
        </Button>
      </Stack>
    </FormPageShell>
  )
}
