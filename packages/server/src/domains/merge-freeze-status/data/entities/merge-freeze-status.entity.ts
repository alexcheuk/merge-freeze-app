export interface MergeFreezeStatusConstructor {
  repoOwner: string
  repoName: string
  source: string
  requesterId: string
  requester: string
  reason: string
  isFrozen: boolean
  datetime: Date
}

export class MergeFreezeStatus {
  repoOwner: string
  repoName: string
  source: string
  requesterId: string
  requester: string
  reason: string
  isFrozen: boolean
  datetime: Date

  constructor(data: MergeFreezeStatusConstructor) {
    this.repoOwner = data.repoOwner
    this.repoName = data.repoName
    this.source = data.source
    this.requesterId = data.requesterId
    this.requester = data.requester
    this.reason = data.reason
    this.isFrozen = data.isFrozen
    this.datetime = data.datetime
  }
}
