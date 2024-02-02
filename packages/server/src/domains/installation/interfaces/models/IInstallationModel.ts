import { FilterQuery, Mongoose, UpdateQuery } from 'mongoose'
import { Installation } from '../../data/entities/installation.entity'
import { InstallationModelSchema } from '../../data/models/installation.model'

type QueryFilter = FilterQuery<InstallationModelSchema>
type QueryUpdate = UpdateQuery<InstallationModelSchema>

export interface IInstallationModel {
  findOneAndUpdate: (
    filter: QueryFilter,
    update: QueryUpdate
  ) => Promise<Installation | null>
  findOne: (filter: QueryFilter) => Promise<Installation | null>
  deleteMany: (filter: QueryFilter) => Promise<void>
}
