import type { RaRecord } from 'react-admin'
import { RESOURCE_NAMES } from '../../constants'

export const META_COLLECTION = '_meta'
export const SEED_META_DOC = 'database'

export type StoredRecord = RaRecord

export const FIRESTORE_COLLECTIONS = [...RESOURCE_NAMES] as const

/** Retire les champs undefined (Firestore les refuse). */
export function sanitizeForFirestore<T extends Record<string, unknown>>(data: T): T {
  const clean = {} as T
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined) {
      ;(clean as Record<string, unknown>)[key] = value
    }
  }
  return clean
}

export function applyFilters(
  records: StoredRecord[],
  filter: Record<string, unknown> | undefined,
): StoredRecord[] {
  if (!filter) return records
  return records.filter((record) =>
    Object.entries(filter).every(([key, value]) => {
      if (value === undefined || value === '' || value === null) return true
      const recordValue = record[key]
      if (typeof recordValue === 'boolean') {
        return recordValue === (value === true || value === 'true')
      }
      return String(recordValue) === String(value)
    }),
  )
}

export function applySearch(records: StoredRecord[], q: string | undefined): StoredRecord[] {
  if (!q) return records
  const query = q.toLowerCase()
  return records.filter((record) =>
    Object.values(record).some((value) => {
      if (typeof value === 'string') return value.toLowerCase().includes(query)
      if (Array.isArray(value)) return JSON.stringify(value).toLowerCase().includes(query)
      return false
    }),
  )
}

export function applySort(
  records: StoredRecord[],
  sort: { field: string; order: 'ASC' | 'DESC' } | undefined,
): StoredRecord[] {
  if (!sort) return records
  const sorted = [...records].sort((a, b) => {
    const av = a[sort.field]
    const bv = b[sort.field]
    if (av == null && bv == null) return 0
    if (av == null) return 1
    if (bv == null) return -1
    return String(av).localeCompare(String(bv), 'fr', { numeric: true })
  })
  return sort.order === 'DESC' ? sorted.reverse() : sorted
}

export function recordTitle(record: StoredRecord): string {
  return String(
    record.label ?? record.name ?? record.title ?? record.heading ?? record.primaryTitle ?? record.id,
  )
}
