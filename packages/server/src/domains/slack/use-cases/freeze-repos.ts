import { freezeRepo } from '.'
import { InstallationDb } from '../../installation/data/installation.db.interface'
import { FreezeReposDTO } from './dtos/freeze-repos.dto'

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
