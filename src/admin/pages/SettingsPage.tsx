import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  TextField,
  Typography,
  alpha,
} from '@mui/material'
import { doc, setDoc } from 'firebase/firestore'
import { updateProfile } from 'firebase/auth'
import { KeyRound, Save, User } from 'lucide-react'
import { useNotify } from 'react-admin'
import { auth, firestore } from '../../firebase/app'
import {
  getCachedParishUser,
  parishRoleChoices,
  sendParishUserPasswordReset,
  setCachedParishUser,
} from '../auth/parish-users'
import { sanitizeForFirestore } from '../firestore/utils'
import { parishColors } from '../../theme/parishTheme'
import type { ParishUserRecord } from '../../types'

export function SettingsPage() {
  const notify = useNotify()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [profile, setProfile] = useState<ParishUserRecord | null>(null)
  const [displayName, setDisplayName] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    const cached = getCachedParishUser()
    if (cached) {
      setProfile(cached)
      setDisplayName(cached.displayName)
      setImageUrl(cached.imageUrl ?? '')
    }
    setLoading(false)
  }, [])

  const roleLabel =
    parishRoleChoices.find((r) => r.id === profile?.role)?.name ?? profile?.role ?? '—'

  const handleSave = async () => {
    const user = auth.currentUser
    if (!user || !profile) return

    setSaving(true)
    try {
      const next: ParishUserRecord = {
        ...profile,
        displayName: displayName.trim(),
        imageUrl: imageUrl.trim(),
      }
      await setDoc(
        doc(firestore, 'parishUsers', user.uid),
        sanitizeForFirestore(next as unknown as Record<string, unknown>),
        { merge: true },
      )
      if (displayName.trim() !== user.displayName) {
        await updateProfile(user, { displayName: displayName.trim() })
      }
      setCachedParishUser(next)
      setProfile(next)
      notify('Profil mis à jour', { type: 'success' })
    } catch (error) {
      notify(error instanceof Error ? error.message : 'Échec de la mise à jour', { type: 'error' })
    } finally {
      setSaving(false)
    }
  }

  const handlePasswordReset = async () => {
    const email = profile?.email ?? auth.currentUser?.email
    if (!email) return
    try {
      await sendParishUserPasswordReset(email)
      notify('E-mail de réinitialisation envoyé', { type: 'info' })
    } catch (error) {
      notify(error instanceof Error ? error.message : 'Envoi impossible', { type: 'error' })
    }
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box sx={{ maxWidth: 720, mx: 'auto', width: '100%', p: { xs: 2, md: 3 }, pb: 6 }}>
      <Box
        sx={{
          mb: 3,
          p: { xs: 2.5, md: 3.5 },
          borderRadius: 4,
          background: `linear-gradient(135deg, ${parishColors.royal} 0%, ${parishColors.royalLight} 100%)`,
          color: '#fff',
        }}
      >
        <Typography variant="h4" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 700 }}>
          Paramètres
        </Typography>
        <Typography sx={{ mt: 1, color: 'rgba(255,255,255,0.85)' }}>
          Profil de l&apos;utilisateur connecté
        </Typography>
      </Box>

      <Card sx={{ borderRadius: 3, mb: 2.5, border: `1px solid ${alpha(parishColors.royal, 0.1)}` }}>
        <CardContent sx={{ p: { xs: 2, md: 3 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: alpha(parishColors.royal, 0.08),
                color: parishColors.royal,
              }}
            >
              <User size={20} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: parishColors.royal }}>
              Mon profil
            </Typography>
          </Box>

          <Stack spacing={2.5}>
            <TextField
              label="Nom affiché"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              fullWidth
            />
            <TextField label="E-mail" value={profile?.email ?? ''} disabled fullWidth />
            <TextField label="Rôle" value={roleLabel} disabled fullWidth />
            <TextField
              label="URL de la photo (optionnelle)"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              fullWidth
              helperText="Lien vers votre photo de profil"
            />
            <Button
              variant="contained"
              color="secondary"
              startIcon={saving ? <CircularProgress size={18} color="inherit" /> : <Save size={18} />}
              onClick={handleSave}
              disabled={saving || !displayName.trim()}
              sx={{ alignSelf: 'flex-start', borderRadius: 2, fontWeight: 700 }}
            >
              Enregistrer
            </Button>
          </Stack>
        </CardContent>
      </Card>

      <Card sx={{ borderRadius: 3, border: `1px solid ${alpha(parishColors.royal, 0.1)}` }}>
        <CardContent sx={{ p: { xs: 2, md: 3 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: alpha(parishColors.royal, 0.08),
                color: parishColors.royal,
              }}
            >
              <KeyRound size={20} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: parishColors.royal }}>
              Mot de passe
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Recevez un lien par e-mail pour définir un nouveau mot de passe.
          </Typography>
          <Button
            variant="outlined"
            onClick={handlePasswordReset}
            sx={{ borderRadius: 2, fontWeight: 600 }}
          >
            Réinitialiser le mot de passe
          </Button>
        </CardContent>
      </Card>
    </Box>
  )
}
