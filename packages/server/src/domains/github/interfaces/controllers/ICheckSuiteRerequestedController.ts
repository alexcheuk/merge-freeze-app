import { CheckSuiteEvent } from '@octokit/webhooks-types'
import { Response } from 'express'

export type ICheckSuiteRerequestedController = (
  event: CheckSuiteEvent,
  res: Response
) => Promise<void>
