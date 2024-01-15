import mongoose, { Schema } from 'mongoose'
import { MergeFreezeStatusModel as IMergeFreezeStatusModel } from './merge-freeze-status.model.interface'
import { MergeFreezeStatus } from '../entities/merge-freeze-status.entity'

export interface MergeFreezeStatusSchema {
  repoOwner: string
  repoName: string
  source: string
  requesterId: string
  requester: string
  reason: string
  isFrozen: boolean
  datetime: Date
}

const mergeFreezeStatusSchema = new Schema<MergeFreezeStatusSchema>({
  repoOwner: String,
  repoName: String,
  source: String,
  requesterId: String,
  requester: String,
  reason: String,
  isFrozen: Boolean,
  datetime: Date,
})

export const MergeFreezeStatusMongooseModel = mongoose.model(
  'MergeFreezeStatus',
  mergeFreezeStatusSchema
)

const mapResultToEntity = (res: MergeFreezeStatusSchema): MergeFreezeStatus => {
  return new MergeFreezeStatus({
    datetime: res.datetime,
    isFrozen: res.isFrozen,
    reason: res.reason,
    repoName: res.repoName,
    repoOwner: res.repoOwner,
    requester: res.requester,
    requesterId: res.requesterId,
    source: res.source,
  })
}

export const MergeFreezeStatusModel: IMergeFreezeStatusModel = {
  create: async (data) => {
    const res = await MergeFreezeStatusMongooseModel.create(data)

    return mapResultToEntity(res)
  },
  findOne: async (query) => {
    const res = await MergeFreezeStatusMongooseModel.findOne(query).sort({
      datetime: -1,
    })

    return mapResultToEntity(res as MergeFreezeStatusSchema)
  },
}
