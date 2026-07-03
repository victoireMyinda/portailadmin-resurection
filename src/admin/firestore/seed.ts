import {
  collection,
  doc,
  getDoc,
  getDocs,
  writeBatch,
  deleteDoc,
  setDoc,
} from 'firebase/firestore'
import { firestore } from '../../firebase/app'
import { buildSeedDatabase } from '../seed'
import { FIRESTORE_COLLECTIONS, META_COLLECTION, SEED_META_DOC, sanitizeForFirestore } from './utils'

const BATCH_LIMIT = 450
const SEED_VERSION = 12

async function writeBatchRecords(
  resource: string,
  records: Array<Record<string, unknown> & { id: string }>,
): Promise<void> {
  for (let i = 0; i < records.length; i += BATCH_LIMIT) {
    const batch = writeBatch(firestore)
    const chunk = records.slice(i, i + BATCH_LIMIT)
    for (const record of chunk) {
      const { id, ...rest } = record
      batch.set(doc(firestore, resource, String(id)), sanitizeForFirestore({ ...rest, id: String(id) }))
    }
    await batch.commit()
  }
}

async function seedCollectionIfEmpty(
  resource: string,
  records: Array<Record<string, unknown> & { id: string }>,
): Promise<void> {
  if (records.length === 0) return
  const snap = await getDocs(collection(firestore, resource))
  if (!snap.empty) return
  await writeBatchRecords(resource, records)
}

export async function isFirestoreSeeded(): Promise<boolean> {
  const snap = await getDoc(doc(firestore, META_COLLECTION, SEED_META_DOC))
  return snap.exists() && Number(snap.data()?.version) >= SEED_VERSION
}

export async function seedFirestore(): Promise<void> {
  const database = buildSeedDatabase()

  for (const resource of FIRESTORE_COLLECTIONS) {
    const records = (database[resource as keyof typeof database] ?? []) as unknown as Array<
      Record<string, unknown> & { id: string }
    >
    await seedCollectionIfEmpty(resource, records)
  }

  await setDoc(doc(firestore, META_COLLECTION, SEED_META_DOC), {
    seeded: true,
    version: SEED_VERSION,
    seededAt: new Date().toISOString(),
    source: 'admin-refonte-v2',
  })
}

export async function clearFirestoreCollections(): Promise<void> {
  for (const resource of FIRESTORE_COLLECTIONS) {
    const snap = await getDocs(collection(firestore, resource))
    for (let i = 0; i < snap.docs.length; i += BATCH_LIMIT) {
      const batch = writeBatch(firestore)
      const chunk = snap.docs.slice(i, i + BATCH_LIMIT)
      for (const document of chunk) {
        batch.delete(document.ref)
      }
      await batch.commit()
    }
  }
}

export async function reseedFirestore(): Promise<void> {
  await clearFirestoreCollections()
  await deleteDoc(doc(firestore, META_COLLECTION, SEED_META_DOC)).catch(() => undefined)
  await seedFirestore()
}

export async function ensureFirestoreSeeded(): Promise<void> {
  const seeded = await isFirestoreSeeded()
  if (!seeded) {
    await seedFirestore()
  }
}
