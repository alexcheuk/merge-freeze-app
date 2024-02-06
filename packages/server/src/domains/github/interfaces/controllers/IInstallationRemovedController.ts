import { InstallationRepositoriesEvent } from '@octokit/webhooks-types'
import { Response } from 'express'

export type IInstallationRemovedController = (
  event: InstallationRepositoriesEvent,
  res: Response
) => Promise<void>
