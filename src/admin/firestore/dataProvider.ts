import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  writeBatch,
} from 'firebase/firestore'
import type {
  CreateParams,
  DataProvider,
  DeleteManyParams,
  DeleteParams,
  GetListParams,
  GetManyParams,
  GetManyReferenceParams,
  GetOneParams,
  UpdateManyParams,
  UpdateParams,
} from 'react-admin'
import { onAuthStateChanged } from 'firebase/auth'
import { firestore, auth } from '../../firebase/app'
import { ensureFirestoreSeeded, reseedFirestore } from './seed'
import {
  getInitPromise,
  isFirestorePermissionError,
  resetFirestoreSession,
  setInitPromise,
} from './session'
import { loadDashboardStats } from './dashboard-stats'
import {
  createParishUser,
  deactivateParishUser,
} from '../auth/parish-users'
import {
  applyFilters,
  applySearch,
  applySort,
  recordTitle,
  sanitizeForFirestore,
  type StoredRecord,
} from './utils'

export { resetFirestoreSession }

async function ensureAuthWithToken(): Promise<void> {
  if (auth.currentUser) {
    await auth.currentUser.getIdToken(true)
    return
  }
  return new Promise((resolve, reject) => {
    const timeout = window.setTimeout(() => {
      unsubscribe()
      reject(new Error('Connexion Firebase requise pour accéder à Firestore'))
    }, 10000)
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      window.clearTimeout(timeout)
      unsubscribe()
      if (!user) {
        reject(new Error('Connexion Firebase requise pour accéder à Firestore'))
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

async function trySeedDatabase(): Promise<void> {
  try {
    await ensureFirestoreSeeded()
  } catch (error) {
    if (isFirestorePermissionError(error)) {
      console.warn(
        '[Firestore] Import initial impossible. Publiez les règles Firestore dans la console Firebase.',
        error,
      )
      return
    }
    throw error
  }
}

function ensureReady(): Promise<void> {
  const cached = getInitPromise()
  if (cached) return cached

  const promise = ensureAuthWithToken()
    .then(() => trySeedDatabase())
    .catch((error) => {
      resetFirestoreSession()
      throw error
    })

  setInitPromise(promise)
  return promise
}

function wrapFirestoreError(error: unknown): Error {
  if (isFirestorePermissionError(error)) {
    return new Error(
      'Accès Firestore refusé. Dans Firebase Console → Firestore → Règles, publiez : allow read: if true; allow write: if request.auth != null;',
    )
  }
  return error instanceof Error ? error : new Error(String(error))
}

async function fetchCollection(resource: string): Promise<StoredRecord[]> {
  const snap = await getDocs(collection(firestore, resource))
  return snap.docs.map((document) => ({ id: document.id, ...document.data() }) as StoredRecord)
}

export const firestoreDataProvider = {
  getList: async (resource, params: GetListParams) => {
    try {
      await ensureReady()
      const { page, perPage } = params.pagination ?? { page: 1, perPage: 25 }
      const filter = params.filter as Record<string, unknown> | undefined
      const q = filter?.q as string | undefined
      const filterWithoutQ = filter ? { ...filter } : undefined
      if (filterWithoutQ) delete filterWithoutQ.q

      let records = await fetchCollection(resource)
      records = applySearch(records, q)
      records = applyFilters(records, filterWithoutQ)
      records = applySort(records, params.sort)

      const total = records.length
      const start = (page - 1) * perPage
      const data = records.slice(start, start + perPage)

      return { data, total }
    } catch (error) {
      throw wrapFirestoreError(error)
    }
  },

  getOne: async (resource, params: GetOneParams) => {
    await ensureReady()
    const snap = await getDoc(doc(firestore, resource, String(params.id)))
    if (!snap.exists()) throw new Error(`Record ${params.id} not found in ${resource}`)
    return { data: { id: snap.id, ...snap.data() } as StoredRecord }
  },

  getMany: async (resource, params: GetManyParams) => {
    await ensureReady()
    const records = await Promise.all(
      params.ids.map(async (id) => {
        const snap = await getDoc(doc(firestore, resource, String(id)))
        return snap.exists() ? ({ id: snap.id, ...snap.data() } as StoredRecord) : null
      }),
    )
    return { data: records.filter(Boolean) as StoredRecord[] }
  },

  getManyReference: async (resource, params: GetManyReferenceParams) => {
    await ensureReady()
    const { page, perPage } = params.pagination ?? { page: 1, perPage: 25 }
    let records = await fetchCollection(resource)
    records = records.filter((item) => item[params.target] === params.id)
    const total = records.length
    const start = (page - 1) * perPage
    return { data: records.slice(start, start + perPage), total }
  },

  create: async (resource, params: CreateParams) => {
    try {
      await ensureReady()
      if (resource === 'parishUsers') {
        const data = params.data as Record<string, unknown>
        const record = await createParishUser({
          email: String(data.email ?? ''),
          password: String(data.password ?? ''),
          displayName: String(data.displayName ?? data.email ?? ''),
          role: data.role as 'admin' | 'cure' | 'secretaire',
          imageUrl: data.imageUrl ? String(data.imageUrl) : undefined,
        })
        return { data: record as unknown as StoredRecord }
      }
      const id = String(params.data.id ?? `${resource}-${Date.now()}`)
      const record = sanitizeForFirestore({ ...params.data, id }) as StoredRecord
      await setDoc(doc(firestore, resource, id), record)
      return { data: record }
    } catch (error) {
      throw wrapFirestoreError(error)
    }
  },

  update: async (resource, params: UpdateParams) => {
    await ensureReady()
    const id = String(params.id)
    const { password: _password, ...rest } = params.data as Record<string, unknown>
    const record = sanitizeForFirestore({
      ...params.previousData,
      ...rest,
      id,
    }) as StoredRecord
    await setDoc(doc(firestore, resource, id), record, { merge: true })
    return { data: record }
  },

  updateMany: async (resource, params: UpdateManyParams) => {
    await ensureReady()
    const batch = writeBatch(firestore)
    const payload = sanitizeForFirestore(params.data as Record<string, unknown>)
    for (const id of params.ids) {
      batch.update(doc(firestore, resource, String(id)), payload)
    }
    await batch.commit()
    return { data: params.ids }
  },

  delete: async (resource, params: DeleteParams) => {
    await ensureReady()
    const ref = doc(firestore, resource, String(params.id))
    const snap = await getDoc(ref)
    if (!snap.exists()) throw new Error(`Record ${params.id} not found in ${resource}`)
    const record = { id: snap.id, ...snap.data() } as StoredRecord
    if (resource === 'parishUsers') {
      await deactivateParishUser(String(params.id))
      return { data: { ...record, active: false } as StoredRecord }
    }
    await deleteDoc(ref)
    return { data: record }
  },

  deleteMany: async (resource, params: DeleteManyParams) => {
    await ensureReady()
    const batch = writeBatch(firestore)
    for (const id of params.ids) {
      batch.delete(doc(firestore, resource, String(id)))
    }
    await batch.commit()
    return { data: params.ids }
  },
} as DataProvider

export async function reseedDatabase(): Promise<void> {
  resetFirestoreSession()
  await reseedFirestore()
}

export async function getDashboardStats() {
  try {
    await ensureReady()
  } catch (error) {
    if (isFirestorePermissionError(error)) {
      return loadDashboardStats().catch(() => ({
        visits: { total: 0, today: 0, thisMonth: 0, lastVisitAt: undefined },
        kpis: [] as import('./dashboard-stats').DashboardKpi[],
      }))
    }
    throw wrapFirestoreError(error)
  }
  return loadDashboardStats()
}

export async function getFirestoreCounts(): Promise<Record<string, number>> {
  try {
    await ensureReady()
  } catch (error) {
    if (isFirestorePermissionError(error)) return {}
    throw wrapFirestoreError(error)
  }
  const counts: Record<string, number> = {}
  const resources = ['contacts', 'socialNetworks', 'parishLogos', 'navigationItems', 'pageBanners', 'homeHeroSlides', 'homeCurateMessages', 'homeAbout', 'parishHistorySections', 'parishCurates', 'parishWeeklyDays', 'parishMassCategories', 'parishCommissions', 'parishGroups', 'weeklyAnnouncements', 'parishAnnouncements']
  await Promise.all(
    resources.map(async (resource) => {
      const snap = await getDocs(collection(firestore, resource))
      counts[resource] = snap.size
    }),
  )
  return counts
}

export async function getFirestoreRecentRecords(limit = 5) {
  try {
    await ensureReady()
  } catch (error) {
    if (isFirestorePermissionError(error)) return []
    throw wrapFirestoreError(error)
  }
  const resources = [
    'announcements',
    'bulletins',
    'commissions',
    'workProjects',
    'galleryImages',
    'liveStreams',
  ]
  const items: { resource: string; id: string; title: string; date?: string; sortDate: string }[] = []

  await Promise.all(
    resources.map(async (resource) => {
      const records = await fetchCollection(resource)
      for (const record of records.slice(0, 20)) {
        items.push({
          resource,
          id: String(record.id),
          title: recordTitle(record),
          date: record.date as string | undefined,
          sortDate: (record.date as string) ?? String(record.id),
        })
      }
    }),
  )

  return items
    .sort((a, b) => b.sortDate.localeCompare(a.sortDate))
    .slice(0, limit)
    .map(({ sortDate: _, ...rest }) => rest)
}
