import { makeGithubApi } from '../../github/data-access/github.api'
import { MergeFreezeStatusDb } from '../../merge-freeze-status/data/merge-freeze-status.db.interface'
import { FreezeRepoDTO, FreezeRepoOptions } from './dtos/freeze-repo.dto'
import { buildFrozenGithubCheck } from '../../github/utils/build-frozen-github-check'
import { InstallationDb } from '../../installation/data/installation.db.interface'

interface Dependency {
  mergeFreezeStatusDb: MergeFreezeStatusDb
  installationDb: InstallationDb
  makeGithubDb: typeof makeGithubApi
}

export const makeFreezeRepo = ({
  mergeFreezeStatusDb,
  installationDb,
  makeGithubDb,
}: Dependency) => {
  return async (
    { slackTeamId, requesterId, requesterName, reason, repo }: FreezeRepoDTO,
    { installationId }: FreezeRepoOptions = {}
  ) => {
    const asyncTasks: Promise<any>[] = []

    const githubInstallationId = installationId
      ? installationId
      : (await installationDb.getInstallationBySlackTeamId(slackTeamId))
          ?.githubInstallationId

    if (!githubInstallationId)
      throw new Error('Github installation ID not found')

    asyncTasks.push(
      mergeFreezeStatusDb.freeze({
        owner: repo.owner,
        repo: repo.repo,
        source: 'slack',
        id: requesterId,
        name: requesterName,
        reason,
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
                    buildFrozenGithubCheck({
                      reason,
                      requesterName: requesterName,
                    })
                  )
                )
              })
            } else {
              asyncTasks.push(
                gh.createCheck(
                  pr.head.sha,
                  buildFrozenGithubCheck({
                    reason,
                    requesterName: requesterName,
                  })
                )
              )
            }
          })

        asyncTasks.push(checksPromise)
      })
    }

    return Promise.all(asyncTasks)
  }
}
