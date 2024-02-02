import { freezeRepo } from '.'
import { IInstallationDb } from '../../installation/interfaces/data/IInstallationDb'
import { FreezeReposDTO } from './dtos/freeze-repos.dto'

interface Dependency {
  installationDb: IInstallationDb
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
