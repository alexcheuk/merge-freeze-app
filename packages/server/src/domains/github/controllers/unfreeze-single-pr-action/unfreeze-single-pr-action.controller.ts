import { CheckRunEvent } from '@octokit/webhooks-types'
import { Response } from 'express'
import { IUnfreezeSinglePRUseCase } from '../../interfaces/use-cases/IUnfreezeSinglePRUseCase'
import { IUnfreezeSinglePrActionController } from '../../interfaces/controllers/IUnfreezeSinglePrActionController'

export const makeUnfreezeSinglePrActionController = ({
  unfreezeSinglePR,
}: {
  unfreezeSinglePR: IUnfreezeSinglePRUseCase
}): IUnfreezeSinglePrActionController => {
  return async (event: CheckRunEvent, res: Response) => {
    if (!event.installation?.id) {
      res.sendStatus(200)
      return
    }

    await unfreezeSinglePR({
      ref: event.check_run.head_sha,
      githubInstallationId: event.installation?.id,
      owner: event.repository.owner.login,
      repo: event.repository.name,
      requester: event.sender.login,
      requesterId: event.sender.id.toString(),
    })

    res.sendStatus(200)
  }
}
