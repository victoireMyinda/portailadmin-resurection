let initPromise: Promise<void> | null = null

export function resetFirestoreSession(): void {
  initPromise = null
}

export function getInitPromise(): Promise<void> | null {
  return initPromise
}

export function setInitPromise(promise: Promise<void> | null): void {
  initPromise = promise
}

export function isFirestorePermissionError(error: unknown): boolean {
  const e = error as { code?: string; message?: string }
  return (
    e?.code === 'permission-denied' ||
    String(e?.message ?? '').includes('Missing or insufficient permissions') ||
    String(e?.message ?? '').includes('insufficient permissions')
  )
}
