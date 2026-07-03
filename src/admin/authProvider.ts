import type { AuthProvider } from 'react-admin'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { auth } from '../firebase/app'
import { resetFirestoreSession } from './firestore/session'
import {
  clearCachedParishUser,
  ensureParishUserAccess,
  getCachedParishUser,
} from './auth/parish-users'

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL ?? 'myindavictoire@gmail.com'

function resolveAdminEmail(username: string): string {
  if (username.includes('@')) return username.trim()
  return ADMIN_EMAIL
}

async function waitForAuthUser(): Promise<void> {
  if (auth.currentUser) {
    await auth.currentUser.getIdToken(true)
    return
  }
  return new Promise((resolve, reject) => {
    const timeout = window.setTimeout(() => {
      unsubscribe()
      reject(new Error('Session Firebase expirée'))
    }, 10000)
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      window.clearTimeout(timeout)
      unsubscribe()
      if (!user) {
        reject(new Error('Non authentifié'))
        return
      }
      try {
        await user.getIdToken(true)
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  })
}

function mapAuthError(error: unknown): Error {
  const code = String((error as { code?: string })?.code ?? '')
  if (
    code === 'auth/invalid-credential' ||
    code === 'auth/wrong-password' ||
    code === 'auth/user-not-found' ||
    code === 'auth/invalid-email'
  ) {
    return new Error('E-mail ou mot de passe incorrect.')
  }
  if (code === 'auth/too-many-requests') {
    return new Error('Trop de tentatives. Réessayez dans quelques minutes.')
  }
  return error instanceof Error ? error : new Error('Connexion impossible.')
}

export const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    try {
      const email = resolveAdminEmail(String(username ?? ''))
      const credential = await signInWithEmailAndPassword(auth, email, String(password ?? ''))
      await credential.user.getIdToken(true)
      await ensureParishUserAccess()
      resetFirestoreSession()
    } catch (error) {
      throw mapAuthError(error)
    }
  },

  logout: async () => {
    clearCachedParishUser()
    resetFirestoreSession()
    await signOut(auth)
  },

  checkAuth: async () => {
    await waitForAuthUser()
    await ensureParishUserAccess()
  },

  checkError: (error) => {
    const message = String(error?.message ?? '')
    const code = String(error?.code ?? error?.body?.code ?? '')
    if (
      code === 'permission-denied' ||
      message.includes('Missing or insufficient permissions') ||
      message.includes('insufficient permissions')
    ) {
      // Ne pas déconnecter l'utilisateur — l'erreur s'affiche sur l'action en cours.
      return Promise.resolve()
    }
    if (code === 'auth/invalid-credential' || code === 'auth/wrong-password') {
      return Promise.reject(new Error('E-mail ou mot de passe incorrect.'))
    }
    return Promise.resolve()
  },

  getPermissions: async () => getCachedParishUser()?.role ?? 'admin',

  getIdentity: async () => {
    const user = auth.currentUser
    const profile = getCachedParishUser()
    return {
      id: user?.uid ?? profile?.id ?? 'admin',
      fullName: profile?.displayName ?? user?.displayName ?? user?.email ?? 'Administrateur Paroisse',
      avatar: profile?.imageUrl || undefined,
    }
  },
}

export const defaultCredentials = {
  username: ADMIN_EMAIL,
}
