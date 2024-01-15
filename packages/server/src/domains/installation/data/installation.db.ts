import { InstallationDb } from './installation.db.interface'
import { InstallationModel } from './models/installation.model.interface'

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
      const res = await InstallationModel.findOneAndUpdate(
        {
          githubUserId,
        },
        { githubUserId, githubInstallationId, installedRepos: repos }
      )

      console.log({ res })
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
  }
}
