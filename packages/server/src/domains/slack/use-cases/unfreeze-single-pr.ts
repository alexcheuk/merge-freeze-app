import { makeGithubApi } from '../../github/data-access/github.api'
import { MergeFreezeStatusDb } from '../../merge-freeze-status/data/merge-freeze-status.db.interface'
import { UnfreezeSinglePRDTO } from './dtos/unfreeze-single-pr.dto'
import { buildUnfrozenGithubCheck } from '../../github/utils/build-unfrozen-github-check'
import { InstallationDb } from '../../installation/data/installation.db.interface'

interface Dependency {
  mergeFreezeStatusDb: MergeFreezeStatusDb
  installationDb: InstallationDb
  makeGithubDb: typeof makeGithubApi
}

export const makeUnfreezeSinglePR = ({
  mergeFreezeStatusDb,
  installationDb,
  makeGithubDb,
}: Dependency) => {
  return async ({
    slackTeamId,
    requesterId,
    requesterName,
    reason,
    repo,
    prId,
  }: UnfreezeSinglePRDTO) => {
    try {
      const asyncTasks: Promise<any>[] = []

      const githubInstallationId = (
        await installationDb.getInstallationBySlackTeamId(slackTeamId)
      )?.githubInstallationId

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

      const pr = (await gh.getPr(prId)).data

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

      return Promise.all(asyncTasks)
    } catch (e) {
      throw e
    }
  }
}
