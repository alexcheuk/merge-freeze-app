import {
  CheckRunEvent,
  CheckSuiteEvent,
  InstallationEvent,
  PullRequestEvent,
  WebhookEventName,
} from '@octokit/webhooks-types'
import { NextFunction, Request, Response } from 'express'
import { IInstallationCreatedController } from '../interfaces/controllers/IInstallationCreatedController'
import { IInstallationDeletedController } from '../interfaces/controllers/IInstallationDeletedController'
import { ICheckRunRerequestedController } from '../interfaces/controllers/ICheckRunRerequestedController'
import { IUnfreezeSinglePrActionController } from '../interfaces/controllers/IUnfreezeSinglePrActionController'
import { ICheckSuiteRerequestedController } from '../interfaces/controllers/ICheckSuiteRerequestedController'
import { ICheckSuiteRequestedController } from '../interfaces/controllers/ICheckSuiteRequestedController'
import { IPullRequestSyncController } from '../interfaces/controllers/IPullRequestSyncController'

export const makeEventsController = ({
  installationCreatedController,
  installationDeletedController,
  checkRunRerequestedController,
  checkSuiteRequestedController,
  checkSuiteRerequestedController,
  pullRequestSyncController,
  unfreezeSinglePRActionController,
}: {
  installationCreatedController: IInstallationCreatedController
  installationDeletedController: IInstallationDeletedController
  checkRunRerequestedController: ICheckRunRerequestedController
  unfreezeSinglePRActionController: IUnfreezeSinglePrActionController
  checkSuiteRerequestedController: ICheckSuiteRerequestedController
  checkSuiteRequestedController: ICheckSuiteRequestedController
  pullRequestSyncController: IPullRequestSyncController
}) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const event = req.headers['x-github-event'] as WebhookEventName

    console.log(`Received Github Event: ${event}`)
    console.log(`Received Github Payload:`, req.body)

    try {
      const eventHandlers: {
        [key in WebhookEventName]?: (event: any) => void
      } = {
        installation: (event: InstallationEvent) => {
          const { action } = event

          if (action === 'created') {
            installationCreatedController(event, res)
          } else if (action === 'deleted') {
            installationDeletedController(event, res)
          } else {
            res.sendStatus(200)
          }
        },
        check_run: (event: CheckRunEvent) => {
          const { action } = event

          if (action === 'rerequested') {
            checkRunRerequestedController(event, res)
          } else if (action === 'requested_action') {
            if (event.requested_action?.identifier === 'unfreeze_pr') {
              unfreezeSinglePRActionController(event, res)
            }
          } else {
            res.sendStatus(200)
          }
        },
        check_suite: (event: CheckSuiteEvent) => {
          const { action } = event

          if (action === 'rerequested') {
            checkSuiteRerequestedController(event, res)
          } else if (action === 'requested') {
            checkSuiteRequestedController(event, res)
          } else {
            res.sendStatus(200)
          }
        },
        pull_request: (event: PullRequestEvent) => {
          const { action } = event

          if (
            action === 'opened' ||
            action === 'reopened' ||
            action === 'synchronize'
          ) {
            pullRequestSyncController(event, res)
          } else {
            res.sendStatus(200)
          }
        },
      }

      const handler = eventHandlers[event]

      if (handler) {
        handler(req.body)
      } else {
        res.sendStatus(200)
      }
    } catch (e) {
      next(e)
    }
  }
}
