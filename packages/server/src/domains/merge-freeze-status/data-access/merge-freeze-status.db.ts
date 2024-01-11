import { MergeFreezeStatusDb } from '../interfaces/data-access/merge-freeze-status-db'
import { MergeFreezeStatusModel } from '../interfaces/models/merge-freeze-status-model'

interface Dependencies {
  MergeFreezeStatusModel: MergeFreezeStatusModel
}

export const makeMergeFreezeStatusDb = ({
  MergeFreezeStatusModel,
}: Dependencies): MergeFreezeStatusDb => {
  return {
    freeze: async ({ owner, repo, source, id, name, reason, metadata }) => {
      return MergeFreezeStatusModel.setFrozen({
        owner,
        repo,
        source,
        id,
        name,
        reason,
        metadata,
      })
    },
    unfreeze: () => {
      return null as any
    },
  }
}
