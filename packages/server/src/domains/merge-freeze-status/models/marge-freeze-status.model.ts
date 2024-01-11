import mongoose, { Schema } from 'mongoose'
import { MergeFreezeStatusDocument } from '../interfaces/models/merge-freeze-status-document'
import { MergeFreezeStatusModel } from '../interfaces/models/merge-freeze-status-model'

const mergeFreezeStatusSchema = new Schema<MergeFreezeStatusDocument>({
  repoOwner: String,
  repoName: String,
  source: String,
  requesterId: String,
  requester: String,
  reason: String,
  isFrozen: Boolean,
  datetime: Date,
  metadata: Object,
})

/**
 * Statics
 */

mergeFreezeStatusSchema.statics.getStatusListByRepo = function (
  owner,
  repo,
  query = {}
) {
  return this.find({
    repoOwner: owner,
    repoName: repo,
    ...query,
  })
}

mergeFreezeStatusSchema.statics.getLastStatus = function (
  owner,
  repo,
  callback
) {
  return this.findOne({
    repoOwner: owner,
    repoName: repo,
  })
    .sort({ datetime: -1 })
    .exec(callback)
}

mergeFreezeStatusSchema.statics.setFrozen = function (
  { owner, repo, source, id, name, reason, metadata },
  callback
) {
  return this.create(
    {
      repoOwner: owner,
      repoName: repo,
      source,
      requesterId: id,
      requester: name,
      isFrozen: true,
      datetime: new Date(),
      reason,
      metadata,
    },
    callback
  )
}

mergeFreezeStatusSchema.statics.setUnfrozen = function (
  { owner, repo, source, id, name, metadata },
  callback
) {
  return this.create(
    {
      repoOwner: owner,
      repoName: repo,
      source,
      requesterId: id,
      requester: name,
      isFrozen: false,
      datetime: new Date(),
      metadata,
    },
    callback
  )
}

export const MergeFreezeStatus: MergeFreezeStatusModel = mongoose.model<
  MergeFreezeStatusDocument,
  MergeFreezeStatusModel
>('MergeFreezeStatus', mergeFreezeStatusSchema)
