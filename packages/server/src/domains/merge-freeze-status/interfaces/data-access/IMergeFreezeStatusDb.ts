import { MergeFreezeStatus } from '../../data/entities/merge-freeze-status.entity'

export interface IMergeFreezeStatusDb {
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
  getLatestStatus: (
    owner: string,
    repo: string
  ) => Promise<MergeFreezeStatus | null>
  getAllRepoStatusesByGithubId: (
    githubUserId: number
  ) => Promise<{ [repo: string]: MergeFreezeStatus | null }>
}
