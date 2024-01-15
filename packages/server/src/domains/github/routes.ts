import { Router } from 'express'
import { verifyGithubPayload } from './middlewares/verify-github-payload.middleware'
import { NextFunction, Request, Response } from 'express'
import GithubEventsController from './controllers/github.controller'
import {
  CheckRunEvent,
  CheckSuiteEvent,
  InstallationEvent,
  PullRequestEvent,
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
      switch (event) {
        case 'installation':
          const installationEvent: InstallationEvent = req.body

          switch (installationEvent.action) {
            case 'created':
              GithubEventsController.installationCreated(installationEvent, res)
              break
            case 'deleted':
              GithubEventsController.installationDeleted(installationEvent, res)
              break
            default:
              return res.status(200).send()
          }

        case 'installation_repositories':
          // const repoEvent: InstallationRepositoriesEvent = req.body
          return res.sendStatus(200)

        case 'check_run':
          const checkRunEvent: CheckRunEvent = req.body

          switch (checkRunEvent.action) {
            case 'rerequested':
              GithubEventsController.checkRunRerequested(checkRunEvent, res)
              break
            case 'requested_action':
              if (
                checkRunEvent.requested_action?.identifier === 'unfreeze_pr'
              ) {
                GithubEventsController.unfreezeSinglePRAction(
                  checkRunEvent,
                  res
                )
              }
              break
            default:
              return res.sendStatus(200)
          }

        case 'check_suite':
          const checkSuiteEvent: CheckSuiteEvent = req.body

          switch (checkSuiteEvent.action) {
            case 'rerequested':
              GithubEventsController.checkSuiteRerequested(checkSuiteEvent, res)
              break
            case 'requested':
              GithubEventsController.checkSuiteRequested(checkSuiteEvent, res)
              break
            default:
              return res.sendStatus(200)
          }

        case 'pull_request':
          const pullRequestEvent: PullRequestEvent = req.body

          if (
            pullRequestEvent.action === 'opened' ||
            pullRequestEvent.action === 'reopened' ||
            pullRequestEvent.action === 'synchronize'
          ) {
            GithubEventsController.pullRequestSync(pullRequestEvent, res)

            return res.sendStatus(200)
          }

          return res.status(200).send()

        default:
          return res.status(200).send()
      }
    } catch (e) {
      next(e)
    }
  }
)

export default router
