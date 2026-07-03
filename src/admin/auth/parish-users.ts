import { initializeApp, getApps } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth'
import { getAuth } from 'firebase/auth'
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore'
import { firebaseConfig, auth, firestore } from '../../firebase/app'
import type { ParishUserRecord } from '../../types'
import { sanitizeForFirestore } from '../firestore/utils'

let cachedParishUser: ParishUserRecord | null = null

export function getCachedParishUser(): ParishUserRecord | null {
  return cachedParishUser
}

export function clearCachedParishUser(): void {
  cachedParishUser = null
}

export function setCachedParishUser(user: ParishUserRecord | null): void {
  cachedParishUser = user
}

const SECONDARY_APP_NAME = 'ParishUserProvisioner'

function getProvisionerAuth() {
  const existing = getApps().find((app) => app.name === SECONDARY_APP_NAME)
  const app = existing ?? initializeApp(firebaseConfig, SECONDARY_APP_NAME)
  return getAuth(app)
}

export const parishRoleChoices = [
  { id: 'admin', name: 'Admin' },
  { id: 'cure', name: 'Curé' },
  { id: 'secretaire', name: 'Secrétaire' },
]

export function parishRoleLabel(role: string): string {
  return parishRoleChoices.find((r) => r.id === role)?.name ?? role
}

export async function ensureParishUserAccess(): Promise<ParishUserRecord> {
  const user = auth.currentUser
  if (!user) throw new Error('Non authentifié')

  const userRef = doc(firestore, 'parishUsers', user.uid)
  const snap = await getDoc(userRef)

  if (snap.exists()) {
    const data = snap.data() as ParishUserRecord
    if (data.active === false) {
      await signOut(auth)
      throw new Error('Ce compte a été désactivé.')
    }
    cachedParishUser = { ...data, id: user.uid }
    return cachedParishUser
  }

  const all = await getDocs(collection(firestore, 'parishUsers'))
  if (all.empty) {
    const bootstrap: ParishUserRecord = {
      id: user.uid,
      email: user.email ?? '',
      displayName: user.displayName ?? 'Administrateur',
      role: 'admin',
      imageUrl: '',
      active: true,
      createdAt: new Date().toISOString(),
    }
    await setDoc(userRef, sanitizeForFirestore(bootstrap as unknown as Record<string, unknown>))
    cachedParishUser = bootstrap
    return bootstrap
  }

  await signOut(auth)
  throw new Error('Compte non autorisé. Demandez à un administrateur de créer votre accès.')
}

export async function createParishUser(data: {
  email: string
  password: string
  displayName: string
  role: ParishUserRecord['role']
  imageUrl?: string
}): Promise<ParishUserRecord> {
  const provisioner = getProvisionerAuth()
  try {
    const credential = await createUserWithEmailAndPassword(provisioner, data.email.trim(), data.password)
    const record: ParishUserRecord = {
      id: credential.user.uid,
      email: data.email.trim(),
      displayName: data.displayName.trim(),
      role: data.role,
      imageUrl: data.imageUrl?.trim() ?? '',
      active: true,
      createdAt: new Date().toISOString(),
    }
    await setDoc(
      doc(firestore, 'parishUsers', credential.user.uid),
      sanitizeForFirestore(record as unknown as Record<string, unknown>),
    )
    return record
  } finally {
    await signOut(provisioner).catch(() => undefined)
  }
}

export async function deactivateParishUser(uid: string): Promise<void> {
  await setDoc(doc(firestore, 'parishUsers', uid), { active: false }, { merge: true })
}

export async function sendParishUserPasswordReset(email: string): Promise<void> {
  await sendPasswordResetEmail(auth, email)
}
