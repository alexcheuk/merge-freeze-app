import { InstallationEvent } from '@octokit/webhooks-types'
import { Response } from 'express'

export type IInstallationDeletedController = (
  event: InstallationEvent,
  res: Response
) => Promise<void>
