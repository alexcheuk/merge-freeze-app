export interface MergeFreezeStatusDocument {
  repoOwner: string
  repoName: string
  source: string
  requesterId: string
  requester: string
  reason: string
  isFrozen: boolean
  datetime: Date
  metadata: any
}
