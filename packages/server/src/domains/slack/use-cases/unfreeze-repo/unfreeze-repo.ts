import { makeGithubApi } from '../../../github/data-access/github.api'
import { IMergeFreezeStatusDb } from '../../../merge-freeze-status/interfaces/data-access/IMergeFreezeStatusDb'
import { buildUnfrozenGithubCheck } from '../../../github/utils/build-unfrozen-github-check'
import { IInstallationDb } from '../../../installation/interfaces/data/IInstallationDb'
import { IUnfreezeRepoUseCase } from '../../interfaces/use-cases/IUnfreezeRepoUseCase'

interface Dependency {
  mergeFreezeStatusDb: IMergeFreezeStatusDb
  installationDb: IInstallationDb
  makeGithubDb: typeof makeGithubApi
}

export const makeUnfreezeRepo = ({
  mergeFreezeStatusDb,
  installationDb,
  makeGithubDb,
}: Dependency): IUnfreezeRepoUseCase => {
  return async ({
    slackTeamId,
    requesterId,
    requesterName,
    reason,
    repo,
    installationId,
  }) => {
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
        return
      }

      await Promise.all(asyncTasks)

      return
    } catch (e) {
      throw e
    }
  }
}
