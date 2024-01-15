import { makeMergeFreezeStatusDb } from './merge-freeze-status.db'
import { MergeFreezeStatusModel } from './models/marge-freeze-status.model'

export const mergeFreezeStatusDb = makeMergeFreezeStatusDb({
  MergeFreezeStatusModel: MergeFreezeStatusModel,
})
