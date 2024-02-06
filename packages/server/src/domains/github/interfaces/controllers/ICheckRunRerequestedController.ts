import { CheckRunEvent } from '@octokit/webhooks-types'
import { Response } from 'express'

export type ICheckRunRerequestedController = (
  event: CheckRunEvent,
  res: Response
) => Promise<void>
