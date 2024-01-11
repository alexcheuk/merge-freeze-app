import { HydratedDocument, Model } from 'mongoose'
import { Installation as SlackInstallation } from '@slack/bolt'

export interface InstallationModelSchema {
  githubUserId: number
  githubInstallationId: number
  slackTeamId: string
  slackInstallation: SlackInstallation<'v2'>
  installedRepos: {
    owner: string
    repo: string
  }[]
  configuration: {
    allowedChannels: string[]
    mergeFreezeTemplate: string
    mergeUnfreezeTemplate: string
  }
}

export interface InstallationModelMethods {
  isInstallationComplete: () => boolean
}

export interface InstallationModel
  extends Model<InstallationModelSchema, {}, InstallationModelMethods> {}

export type Installation = HydratedDocument<
  InstallationModelSchema,
  InstallationModelMethods
>
