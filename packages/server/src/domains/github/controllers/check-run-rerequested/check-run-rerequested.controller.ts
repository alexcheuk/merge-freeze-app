import { CheckRunEvent } from '@octokit/webhooks-types'
import { Response } from 'express'
import { ICheckRunRerequestedController } from '../../interfaces/controllers/ICheckRunRerequestedController'
import { ISyncStatusOnCheckRunUseCase } from '../../interfaces/use-cases/ISyncStatusOnCheckRunUseCase'

export const makeCheckRunRerequestedController = ({
  syncStatusOnCheckRun,
}: {
  syncStatusOnCheckRun: ISyncStatusOnCheckRunUseCase
}): ICheckRunRerequestedController => {
  return async (event: CheckRunEvent, res: Response) => {
    if (!event.installation?.id) {
      res.sendStatus(200)
      return
    }

    await syncStatusOnCheckRun({
      ref: event.check_run.head_sha,
      githubInstallationId: event.installation?.id,
      owner: event.repository.owner.login,
      repo: event.repository.name,
    })

    res.sendStatus(200)
  }
}
