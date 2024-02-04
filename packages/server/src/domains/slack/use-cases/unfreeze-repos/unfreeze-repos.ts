import { IInstallationDb } from '../../../installation/interfaces/data/IInstallationDb'
import { IUnfreezeReposUseCase } from '../../interfaces/use-cases/IUnfreezeReposUseCase'
import { unfreezeRepo } from '../unfreeze-repo'

interface Dependency {
  installationDb: IInstallationDb
}

export const makeUnfreezeRepos = ({
  installationDb,
}: Dependency): IUnfreezeReposUseCase => {
  return async ({ slackTeamId, requesterId, requesterName, reason }) => {
    try {
      const asyncTasks: Promise<any>[] = []

      const installation = await installationDb.getInstallationBySlackTeamId(
        slackTeamId
      )

      const repos = installation?.installedRepos || []

      repos.forEach(async ({ owner, repo }) => {
        unfreezeRepo({
          slackTeamId,
          requesterId,
          requesterName,
          reason,
          repo: {
            owner,
            repo,
          },
          installationId: installation?.githubInstallationId,
        }).catch((e) => {
          console.log(e)
        })
      })

      return Promise.all(asyncTasks).then(() => {
        return repos
      })
    } catch (e) {
      throw e
    }
  }
}
