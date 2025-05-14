import db from '@/lib/db'

export function getSubscriptionCount(): number {
  try {
    const row = db.prepare('SELECT COUNT(*) as count FROM emails').get()
    return typeof row.count === 'number' ? row.count : 0
  } catch {
    return 0
  }
}
