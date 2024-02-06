import { IInstallationDb } from '../../../installation/interfaces/data/IInstallationDb'
import { IFreezeReposUseCase } from '../../interfaces/use-cases/IFreezeReposUseCase'
import { freezeRepo } from '../freeze-repo'

interface Dependency {
  installationDb: IInstallationDb
}

export const makeFreezeRepos = ({
  installationDb,
}: Dependency): IFreezeReposUseCase => {
  return async ({ slackTeamId, requesterId, requesterName, reason, repos }) => {
    try {
      const asyncTasks: Promise<any>[] = []

      const installation = await installationDb.getInstallationBySlackTeamId(
        slackTeamId
      )

      repos.forEach(async ({ owner, repo }) => {
        freezeRepo({
          slackTeamId,
          requesterId,
          requesterName,
          reason,
          repo: {
            owner,
            repo,
          },
          installationId: installation?.githubInstallationId,
        })
      })

      await Promise.all(asyncTasks)

      return
    } catch (e) {
      throw e
    }
  }
}
