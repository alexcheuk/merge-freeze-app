import { FilterQuery, UpdateQuery } from 'mongoose'
import { MergeFreezeStatus } from '../entities/merge-freeze-status.entity'
import { MergeFreezeStatusSchema } from './marge-freeze-status.model'

type QueryFilter = FilterQuery<MergeFreezeStatusSchema>

export interface MergeFreezeStatusModel {
  findOne: (filter: QueryFilter) => Promise<MergeFreezeStatus>
  create: (data: MergeFreezeStatusSchema) => Promise<MergeFreezeStatus>
}
