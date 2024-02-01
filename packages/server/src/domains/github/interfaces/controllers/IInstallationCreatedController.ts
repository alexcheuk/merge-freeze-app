import { InstallationEvent } from '@octokit/webhooks-types'
import { Response } from 'express'

export type IInstallationCreatedController = (
  event: InstallationEvent,
  res: Response
) => Promise<void>
