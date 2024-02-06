import { PullRequestEvent } from '@octokit/webhooks-types'
import { Response } from 'express'
import { ISyncStatusOnCheckRunUseCase } from '../../interfaces/use-cases/ISyncStatusOnCheckRunUseCase'
import { IPullRequestSyncController } from '../../interfaces/controllers/IPullRequestSyncController'

export const makePullRequestSyncController = ({
  syncStatusOnCheckRun,
}: {
  syncStatusOnCheckRun: ISyncStatusOnCheckRunUseCase
}): IPullRequestSyncController => {
  return async (event: PullRequestEvent, res: Response) => {
    if (!event.installation?.id) {
      res.sendStatus(200)
      return
    }

    await syncStatusOnCheckRun({
      ref: event.pull_request.head.sha,
      githubInstallationId: event.installation?.id,
      owner: event.repository.owner.login,
      repo: event.repository.name,
    })

    res.sendStatus(200)
  }
}
