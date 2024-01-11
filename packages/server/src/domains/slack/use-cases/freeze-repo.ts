import { makeGithubApi } from '../../github/data-access/github.api'
import { InstallationDb } from '../../installation/interfaces/data-access/installation-db'
import { MergeFreezeStatusDb } from '../../merge-freeze-status/interfaces/data-access/merge-freeze-status-db'
import {
  FreezeRepoDTO,
  FreezeRepoOptions,
} from '../interfaces/dtos/freeze-repo.dto'
import { buildFrozenGithubCheck } from '../utils/slack-messages/build-frozen-github-check'

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
      : (await installationDb.getInstallationBySlackTeamId(slackTeamId))?.id

    asyncTasks.push(
      mergeFreezeStatusDb.freeze({
        owner: repo.owner,
        repo: repo.repo,
        source: 'slack',
        id: requesterId,
        name: requesterName,
        reason,
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
