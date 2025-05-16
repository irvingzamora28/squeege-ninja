// Database provider interface for scalable, swappable DB backends
export interface IDatabaseProvider {
  getAllEmails(): Promise<{ id: number; email: string; created_at: string }[]>
  insertEmail(email: string): Promise<void>
  getSubscriptionCount(): Promise<number>
}
