import { UnfreezeReposDTO } from './dtos/unfreeze-repos.dto'
import { unfreezeRepo } from '.'
import { InstallationDb } from '../../installation/data/installation.db.interface'

interface Dependency {
  installationDb: InstallationDb
}

export const makeUnfreezeRepos = ({ installationDb }: Dependency) => {
  return async ({
    slackTeamId,
    requesterId,
    requesterName,
    reason,
  }: UnfreezeReposDTO): Promise<
    {
      owner: string
      repo: string
    }[]
  > => {
    try {
      const asyncTasks: Promise<any>[] = []

      const installation = await installationDb.getInstallationBySlackTeamId(
        slackTeamId
      )

      const repos = installation?.installedRepos || []

      repos.forEach(async ({ owner, repo }) => {
        unfreezeRepo(
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
        ).catch((e) => {
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
