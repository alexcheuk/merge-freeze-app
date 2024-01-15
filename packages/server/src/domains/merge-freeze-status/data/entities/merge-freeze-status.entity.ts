export interface MergeFreezeStatusData {
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
  _data: MergeFreezeStatusData

  constructor(data: MergeFreezeStatusData) {
    this._data = data
  }

  get isFrozen() {
    return this._data.isFrozen
  }
  get datetime() {
    return this._data.datetime
  }
  get repoOwner() {
    return this._data.repoOwner
  }
  get repoName() {
    return this._data.repoName
  }
  get source() {
    return this._data.source
  }
  get reason() {
    return this._data.reason
  }
  get requester() {
    return this._data.requester
  }
  get requesterId() {
    return this._data.requesterId
  }
}
