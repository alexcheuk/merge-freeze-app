import { Router } from 'express'
import { verifyGithubPayload } from './middlewares/verify-github-payload.middleware'
import { NextFunction, Request, Response } from 'express'
import GithubEventsController from './controllers/github.controller'
import {
  CheckRunEvent,
  CheckSuiteEvent,
  InstallationEvent,
  PullRequestEvent,
  Schema,
  WebhookEventName,
} from '@octokit/webhooks-types'

const router = Router()

router.post(
  '/github/events',
  verifyGithubPayload,
  async (req: Request, res: Response, next: NextFunction) => {
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
            GithubEventsController.installationCreated(event, res)
          } else if (action === 'deleted') {
            GithubEventsController.installationDeleted(event, res)
          } else {
            res.sendStatus(200)
          }
        },
        check_run: (event: CheckRunEvent) => {
          const { action } = event

          if (action === 'rerequested') {
            GithubEventsController.checkRunRerequested(event, res)
          } else if (action === 'requested_action') {
            if (event.requested_action?.identifier === 'unfreeze_pr') {
              GithubEventsController.unfreezeSinglePRAction(event, res)
            }
          } else {
            res.sendStatus(200)
          }
        },
        check_suite: (event: CheckSuiteEvent) => {
          const { action } = event

          if (action === 'rerequested') {
            GithubEventsController.checkSuiteRerequested(event, res)
          } else if (action === 'requested') {
            GithubEventsController.checkSuiteRequested(event, res)
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
            GithubEventsController.pullRequestSync(event, res)
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
)

export default router
