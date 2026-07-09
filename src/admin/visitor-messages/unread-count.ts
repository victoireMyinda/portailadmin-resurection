import { collection, onSnapshot, type QueryDocumentSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { firestore } from '../../firebase/app'

export function isVisitorMessageUnread(data: { read?: boolean }): boolean {
  return data.read !== true
}

export function countUnreadVisitorMessages(
  docs: QueryDocumentSnapshot<{ read?: boolean }>[],
): number {
  return docs.filter((d) => isVisitorMessageUnread(d.data())).length
}

export function subscribeUnreadVisitorMessagesCount(
  onCount: (count: number) => void,
): () => void {
  return onSnapshot(
    collection(firestore, 'visitorMessages'),
    (snap) => onCount(countUnreadVisitorMessages(snap.docs)),
    () => onCount(0),
  )
}

export function useUnreadVisitorMessagesCount(): number {
  const [count, setCount] = useState(0)
  useEffect(() => subscribeUnreadVisitorMessagesCount(setCount), [])
  return count
}
