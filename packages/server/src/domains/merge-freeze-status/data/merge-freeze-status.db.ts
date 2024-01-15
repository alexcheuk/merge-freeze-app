import { MergeFreezeStatusDb } from './merge-freeze-status.db.interface'
import { MergeFreezeStatusModel } from './models/merge-freeze-status.model.interface'

interface Dependencies {
  MergeFreezeStatusModel: MergeFreezeStatusModel
}

export const makeMergeFreezeStatusDb = ({
  MergeFreezeStatusModel,
}: Dependencies): MergeFreezeStatusDb => {
  return {
    freeze: async ({ owner, repo, source, id, name, reason }) => {
      await MergeFreezeStatusModel.create({
        repoOwner: owner,
        repoName: repo,
        source,
        requesterId: id,
        requester: name,
        reason,
        datetime: new Date(),
        isFrozen: true,
      })
    },
    unfreeze: async ({ owner, repo, source, id, name }) => {
      await MergeFreezeStatusModel.create({
        repoOwner: owner,
        repoName: repo,
        source,
        requesterId: id,
        requester: name,
        datetime: new Date(),
        isFrozen: false,
        reason: '',
      })
    },
    getLatestStatus: async (owner, repo) => {
      const doc = await MergeFreezeStatusModel.findOne({
        repoOwner: owner,
        repoName: repo,
      })

      return doc
    },
  }
}
