import { IInstallationDb } from '../interfaces/data/IInstallationDb'
import { IInstallationModel } from '../interfaces/models/IInstallationModel'

interface Dependencies {
  InstallationModel: IInstallationModel
}

export const makeInstallationDb = ({
  InstallationModel,
}: Dependencies): IInstallationDb => {
  return {
    upsertGithubInstallation: async (
      githubUserId,
      githubInstallationId,
      repos
    ) => {
      await InstallationModel.findOneAndUpdate(
        {
          githubUserId,
        },
        { githubUserId, githubInstallationId, installedRepos: repos }
      )
    },
    upsertSlackIntegration: async (githubUserId, slackIntegrationData) => {
      await InstallationModel.findOneAndUpdate(
        {
          githubUserId,
        },
        {
          githubUserId,
          ...slackIntegrationData,
        }
      )
    },
    getInstallationByGithubInstallationId: async (githubInstallationId) => {
      return await InstallationModel.findOne({
        githubInstallationId,
      })
    },
    getInstallationByGithubUserId: async (githubUserId) => {
      return await InstallationModel.findOne({
        githubUserId,
      })
    },
    getInstallationBySlackTeamId: async (slackTeamId) => {
      return await InstallationModel.findOne({
        slackTeamId,
      })
    },
    deleteAllInstallationByGithubUserId: async (githubUserId) => {
      await InstallationModel.deleteMany({
        githubUserId,
      })
    },
    updateAllowedChannels: async (githubInstallationId, allowedChannels) => {
      await InstallationModel.findOneAndUpdate(
        {
          githubInstallationId,
        },
        {
          allowedChannels,
        }
      )
    },
    updateInstalledRepos: async (githubInstallationId, repos = []) => {
      await InstallationModel.findOneAndUpdate(
        {
          githubInstallationId,
        },
        {
          installedRepos: repos,
        }
      )
    },
  }
}
