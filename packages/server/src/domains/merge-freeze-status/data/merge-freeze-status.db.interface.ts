import { MergeFreezeStatus } from './entities/merge-freeze-status.entity'

export interface MergeFreezeStatusDb {
  freeze: (status: {
    owner: string
    repo: string
    source: string
    id: string
    name: string
    reason: string
  }) => Promise<void>
  unfreeze: (status: {
    owner: string
    repo: string
    source: string
    id: string
    name: string
    metadata: any
  }) => Promise<void>
  getLatestStatus: (owner: string, repo: string) => Promise<MergeFreezeStatus>
}
