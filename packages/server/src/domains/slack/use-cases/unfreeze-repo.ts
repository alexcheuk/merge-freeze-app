import { makeGithubApi } from '../../github/data-access/github.api'
import { MergeFreezeStatusDb } from '../../merge-freeze-status/data/merge-freeze-status.db.interface'
import { UnfreezeRepoDTO, UnfreezeRepoOptions } from './dtos/unfreeze-repo.dto'
import { buildUnfrozenGithubCheck } from '../../github/utils/build-unfrozen-github-check'
import { IInstallationDb } from '../../installation/interfaces/data/IInstallationDb'

interface Dependency {
  mergeFreezeStatusDb: MergeFreezeStatusDb
  installationDb: IInstallationDb
  makeGithubDb: typeof makeGithubApi
}

export const makeUnfreezeRepo = ({
  mergeFreezeStatusDb,
  installationDb,
  makeGithubDb,
}: Dependency) => {
  return async (
    { slackTeamId, requesterId, requesterName, reason, repo }: UnfreezeRepoDTO,
    { installationId }: UnfreezeRepoOptions = {}
  ) => {
    try {
      const asyncTasks: Promise<any>[] = []

      const githubInstallationId = installationId
        ? installationId
        : (await installationDb.getInstallationBySlackTeamId(slackTeamId))
            ?.githubInstallationId

      if (!githubInstallationId) {
        throw new Error('Unable to find installation by Slack ID')
      }

      asyncTasks.push(
        mergeFreezeStatusDb.unfreeze({
          owner: repo.owner,
          repo: repo.repo,
          source: 'slack',
          id: requesterId,
          name: requesterName,
          metadata: null,
        })
      )

      const gh = makeGithubDb({
        installationId: githubInstallationId,
        owner: repo.owner,
        repo: repo.repo,
      })

      const openPrs = (await gh.getOpenPrs()).data

      if (openPrs.length && openPrs.length > 0) {
        openPrs.forEach((pr) => {
          const checksPromise = gh
            .getChecksByRef(pr.head.sha)
            .then((res) => res.data.check_runs)
            .then((checkRuns = []) => {
              if (checkRuns?.length > 0) {
                checkRuns.forEach((check) => {
                  asyncTasks.push(
                    gh.updateCheck(
                      check.id,
                      buildUnfrozenGithubCheck({
                        reason,
                        requesterName,
                      })
                    )
                  )
                })
              } else {
                asyncTasks.push(
                  gh.createCheck(
                    pr.head.sha,
                    buildUnfrozenGithubCheck({
                      reason,
                      requesterName,
                    })
                  )
                )
              }
            })

          asyncTasks.push(checksPromise)
        })
      } else {
        return null
      }

      return Promise.all(asyncTasks)
    } catch (e) {
      throw e
    }
  }
}
