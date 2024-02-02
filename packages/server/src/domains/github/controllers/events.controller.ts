import {
  CheckRunEvent,
  CheckSuiteEvent,
  InstallationEvent,
  InstallationRepositoriesEvent,
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
import { IInstallationAddedController } from '../interfaces/controllers/IInstallationAddedController'
import { IInstallationRemovedController } from '../interfaces/controllers/IInstallationRemovedController'

export const makeEventsController = ({
  installationCreatedController,
  installationDeletedController,
  installationAddedController,
  installationRemovedController,
  checkRunRerequestedController,
  checkSuiteRequestedController,
  checkSuiteRerequestedController,
  pullRequestSyncController,
  unfreezeSinglePRActionController,
}: {
  installationCreatedController: IInstallationCreatedController
  installationDeletedController: IInstallationDeletedController
  installationAddedController: IInstallationAddedController
  installationRemovedController: IInstallationRemovedController
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

    const eventHandlers: {
      [key in WebhookEventName]?: (event: any) => void
    } = {
      installation: async (event: InstallationEvent) => {
        const { action } = event

        if (action === 'created') {
          await installationCreatedController(event, res)
        } else if (action === 'deleted') {
          await installationDeletedController(event, res)
        } else {
          res.sendStatus(200)
        }
      },
      installation_repositories: async (
        event: InstallationRepositoriesEvent
      ) => {
        const { action } = event

        if (action === 'added') {
          await installationAddedController(event, res)
        } else if (action === 'removed') {
          await installationRemovedController(event, res)
        } else {
          res.sendStatus(200)
        }
      },
      check_run: async (event: CheckRunEvent) => {
        const { action } = event

        if (action === 'rerequested') {
          await checkRunRerequestedController(event, res)
        } else if (action === 'requested_action') {
          if (event.requested_action?.identifier === 'unfreeze_pr') {
            await unfreezeSinglePRActionController(event, res)
          }
        } else {
          res.sendStatus(200)
        }
      },
      check_suite: async (event: CheckSuiteEvent) => {
        const { action } = event

        if (action === 'rerequested') {
          await checkSuiteRerequestedController(event, res)
        } else if (action === 'requested') {
          await checkSuiteRequestedController(event, res)
        } else {
          res.sendStatus(200)
        }
      },
      pull_request: async (event: PullRequestEvent) => {
        const { action } = event

        if (
          action === 'opened' ||
          action === 'reopened' ||
          action === 'synchronize'
        ) {
          await pullRequestSyncController(event, res)
        } else {
          res.sendStatus(200)
        }
      },
    }

    const handler = eventHandlers[event]

    if (handler) {
      try {
        await handler(req.body)
      } catch (e) {
        next(e)
      }
    } else {
      res.sendStatus(200)
    }
  }
}
