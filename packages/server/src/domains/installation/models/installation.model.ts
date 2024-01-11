import mongoose, { Schema } from 'mongoose'
import {
  InstallationModel,
  InstallationModelSchema,
} from '../interfaces/models/installation-model'

const repoSchema = new Schema<InstallationModelSchema['installedRepos'][0]>({
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

installationModelSchema.method('isInstallationComplete', function () {
  return this.githubInstallationId && this.slackTeamId && this.slackInstallation
})

export const installationModel: InstallationModel = mongoose.model<
  InstallationModelSchema,
  InstallationModel
>('Installation', installationModelSchema)
