import { InstallationDb } from '../interfaces/data-access/installation-db'
import { InstallationModel } from '../interfaces/models/installation-model'

interface Dependencies {
  InstallationModel: InstallationModel
}

export const makeInstallationDb = ({
  InstallationModel,
}: Dependencies): InstallationDb => {
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
        { githubUserId, githubInstallationId, installedRepos: repos },
        {
          upsert: true,
        }
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
        },
        {
          upsert: true,
        }
      )
    },
    getInstallationByGithubInstallationId: async (githubInstallationId) => {
      return await InstallationModel.findOne({
        githubInstallationId,
      }).sort({ _id: -1 })
    },
    getInstallationByGithubUserId: async (githubUserId) => {
      return await InstallationModel.findOne({
        githubUserId,
      }).sort({ _id: -1 })
    },
    getInstallationBySlackTeamId: async (slackTeamId) => {
      return await InstallationModel.findOne({
        slackTeamId,
      }).sort({ _id: -1 })
    },
    deleteAllInstallationByGithubUserId: async (githubUserId) => {
      await InstallationModel.deleteMany({
        githubUserId,
      })
    },
  }
}
