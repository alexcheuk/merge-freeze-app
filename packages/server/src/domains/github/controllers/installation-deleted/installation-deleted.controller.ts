import { InstallationEvent } from '@octokit/webhooks-types'
import { Response } from 'express'
import { IUninstallUseCase } from '../../../installation/interfaces/use-cases/IUninstallUseCase'

export const makeInstallationDeletedController = ({
  uninstall,
}: {
  uninstall: IUninstallUseCase
}) => {
  return async (event: InstallationEvent, res: Response) => {
    try {
      await uninstall({
        githubUserId: event.sender.id,
      })

      res.sendStatus(200)
    } catch (e) {
      throw e
    }
  }
}
