import { CheckRunEvent } from '@octokit/webhooks-types'
import { Response } from 'express'

export type IUnfreezeSinglePrActionController = (
  event: CheckRunEvent,
  res: Response
) => Promise<void>
