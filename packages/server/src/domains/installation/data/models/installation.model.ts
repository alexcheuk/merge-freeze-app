import mongoose, { Schema } from 'mongoose'
import { Installation as SlackInstallation } from '@slack/bolt'
import { InstallationModel as IInstallationModel } from './installation.model.interface'
import { Installation } from '../entities/installation.entity'
import { SlackInstallation as SlackInstallationEntity } from '../../../slack/data/entities/slack-installation.entity'

export interface InstallationInstalledRepoModel {
  owner: string
  repo: string
}

export interface InstallationModelSchema {
  githubUserId?: number
  githubInstallationId?: number
  slackTeamId?: string
  slackInstallation?: SlackInstallation<'v2'>
  installedRepos?: InstallationInstalledRepoModel[]
  configuration?: {
    allowedChannels?: string[]
    mergeFreezeTemplate?: string
    mergeUnfreezeTemplate?: string
  }
}

const repoSchema = new Schema<InstallationInstalledRepoModel>({
  owner: String,
  repo: String,
})
const configurationSchema = new Schema<
  InstallationModelSchema['configuration']
>({
  allowedChannels: [String],
})

const installationModelSchema = new Schema<InstallationModelSchema>({
  githubUserId: Number,
  githubInstallationId: Number,
  slackTeamId: String,
  slackInstallation: Object,
  installedRepos: [repoSchema],
  configuration: configurationSchema,
})

const InstallationMongooseModel = mongoose.model(
  'Installation',
  installationModelSchema
)

const mapResultToEntity = (
  res: InstallationModelSchema
): Installation | null => {
  if (!res) return null

  return new Installation({
    configuration: res.configuration,
    githubInstallationId: res.githubInstallationId,
    githubUserId: res.githubUserId,
    installedRepos: res.installedRepos,
    slackInstallation: res.slackInstallation
      ? new SlackInstallationEntity(res.slackInstallation)
      : undefined,
    slackTeamId: res.slackTeamId,
  })
}

export const InstallationModel: IInstallationModel = {
  findOneAndUpdate: async (query, update) => {
    const res = await InstallationMongooseModel.findOneAndUpdate(
      query,
      update,
      {
        upsert: true,
      }
    )

    return mapResultToEntity(res as InstallationModelSchema)
  },
  findOne: async (filter) => {
    const res = await InstallationMongooseModel.findOne(filter).sort({
      _id: -1,
    })

    return mapResultToEntity(res as InstallationModelSchema)
  },
  deleteMany: async (filter) => {
    await InstallationMongooseModel.deleteMany(filter)

    return
  },
}
