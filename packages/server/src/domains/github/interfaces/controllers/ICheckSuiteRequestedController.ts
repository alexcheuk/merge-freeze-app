import { CheckSuiteEvent } from '@octokit/webhooks-types'
import { Response } from 'express'

export type ICheckSuiteRequestedController = (
  event: CheckSuiteEvent,
  res: Response
) => Promise<void>
