import { PullRequestEvent } from '@octokit/webhooks-types'
import { Response } from 'express'

export type IPullRequestSyncController = (
  event: PullRequestEvent,
  res: Response
) => Promise<void>
