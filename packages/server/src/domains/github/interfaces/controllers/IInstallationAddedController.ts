import { InstallationRepositoriesEvent } from '@octokit/webhooks-types'
import { Response } from 'express'

export type IInstallationAddedController = (
  event: InstallationRepositoriesEvent,
  res: Response
) => Promise<void>
