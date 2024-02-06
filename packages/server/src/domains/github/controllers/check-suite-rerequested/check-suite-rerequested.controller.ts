import { CheckSuiteEvent } from '@octokit/webhooks-types'
import { Response } from 'express'
import { ISyncStatusOnCheckRunUseCase } from '../../interfaces/use-cases/ISyncStatusOnCheckRunUseCase'
import { ICheckSuiteRerequestedController } from '../../interfaces/controllers/ICheckSuiteRerequestedController'

export const makeCheckSuiteRerequestedController = ({
  syncStatusOnCheckRun,
}: {
  syncStatusOnCheckRun: ISyncStatusOnCheckRunUseCase
}): ICheckSuiteRerequestedController => {
  return async (event: CheckSuiteEvent, res: Response) => {
    if (!event.installation?.id) {
      res.sendStatus(200)
      return
    }

    await syncStatusOnCheckRun({
      ref: event.check_suite.head_sha,
      githubInstallationId: event.installation?.id,
      owner: event.repository.owner.login,
      repo: event.repository.name,
    })

    res.sendStatus(200)
  }
}
