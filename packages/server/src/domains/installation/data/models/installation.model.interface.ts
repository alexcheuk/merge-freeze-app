import { FilterQuery, Mongoose, UpdateQuery } from 'mongoose'
import { Installation } from '../entities/installation.entity'
import { InstallationModelSchema } from './installation.model'

type QueryFilter = FilterQuery<InstallationModelSchema>
type QueryUpdate = UpdateQuery<InstallationModelSchema>

export interface InstallationModel {
  findOneAndUpdate: (
    filter: QueryFilter,
    update: QueryUpdate
  ) => Promise<Installation | null>
  findOne: (filter: QueryFilter) => Promise<Installation | null>
  deleteMany: (filter: QueryFilter) => Promise<void>
}
