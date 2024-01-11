import { MergeFreezeStatus } from '../../merge-freeze-status/models/marge-freeze-status.model'
import { makeMergeFreezeStatusDb } from './merge-freeze-status.db'

export const mergeFreezeStatusDb = makeMergeFreezeStatusDb({
  MergeFreezeStatusModel: MergeFreezeStatus,
})
