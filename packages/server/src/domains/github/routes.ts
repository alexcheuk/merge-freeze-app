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
    const eventHandlers = {
      'installation': (eventPayload) => {
        const { action } = eventPayload;
        if (action === 'created') {
          GithubEventsController.installationCreated(eventPayload, res);
        } else if (action === 'deleted') {
          GithubEventsController.installationDeleted(eventPayload, res);
        }
      },
      'installation_repositories': () => {
        res.sendStatus(200);
      },
      'check_run': (eventPayload) => {
        const { action, requested_action } = eventPayload;
        if (action === 'rerequested') {
          GithubEventsController.checkRunRerequested(eventPayload, res);
        } else if (action === 'requested_action' && requested_action?.identifier === 'unfreeze_pr') {
          GithubEventsController.unfreezeSinglePRAction(eventPayload, res);
        }
      },
      'check_suite': (eventPayload) => {
        const { action } = eventPayload;
        if (action === 'rerequested') {
          GithubEventsController.checkSuiteRerequested(eventPayload, res);
        } else if (action === 'requested') {
          GithubEventsController.checkSuiteRequested(eventPayload, res);
        }
      },
      'pull_request': (eventPayload) => {
        const { action } = eventPayload;
        if (['opened', 'reopened', 'synchronize'].includes(action)) {
          GithubEventsController.pullRequestSync(eventPayload, res);
        }
      }
    };

    const event = req.headers['x-github-event'] as WebhookEventName;
    const eventPayload = req.body;

    console.log(`Received Github Event: ${event}`);
    console.log(`Received Github Payload:`, eventPayload);

    try {
      const handler = eventHandlers[event];
      if (handler) {
        handler(eventPayload);
      } else {
        res.status(200).send();
      }
    } catch (e) {
      next(e);
    }
  }
)

export default router
