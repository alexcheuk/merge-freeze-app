export interface MergeFreezeStatusDTO {
  owner: string
  repo: string
  source: string
  id: string
  name: string
  reason: string
  isFrozen: boolean
  metadata: any
}
