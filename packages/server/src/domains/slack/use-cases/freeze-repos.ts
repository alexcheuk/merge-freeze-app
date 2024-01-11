import { InstallationDb } from '../../installation/interfaces/data-access/installation-db'
import { FreezeReposDTO } from '../interfaces/dtos'
import { freezeRepo } from '.'

interface Dependency {
  installationDb: InstallationDb
}

export const makeFreezeRepos = ({ installationDb }: Dependency) => {
  return async ({
    slackTeamId,
    requesterId,
    requesterName,
    reason,
    repos,
  }: FreezeReposDTO) => {
    try {
      const asyncTasks: Promise<any>[] = []

      const installation = await installationDb.getInstallationBySlackTeamId(
        slackTeamId
      )

      repos.forEach(async ({ owner, repo }) => {
        freezeRepo(
          {
            slackTeamId,
            requesterId,
            requesterName,
            reason,
            repo: {
              owner,
              repo,
            },
          },
          {
            installationId: installation?.githubInstallationId,
          }
        )
      })

      return Promise.all(asyncTasks)
    } catch (e) {
      throw e
    }
  }
}
