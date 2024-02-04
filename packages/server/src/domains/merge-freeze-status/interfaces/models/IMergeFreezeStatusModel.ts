import { FilterQuery } from 'mongoose'
import { MergeFreezeStatus } from '../../data/entities/merge-freeze-status.entity'
import { MergeFreezeStatusSchema } from '../../data/models/marge-freeze-status.model'

type QueryFilter = FilterQuery<MergeFreezeStatusSchema>

export interface IMergeFreezeStatusModel {
  findOne: (filter: QueryFilter) => Promise<MergeFreezeStatus | null>
  create: (data: MergeFreezeStatusSchema) => Promise<MergeFreezeStatus>
}
