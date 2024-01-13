import { NextFunction, Request, Response } from 'express'
import {
  WebhookEventName,
  InstallationEvent,
  CheckRunEvent,
  CheckSuiteEvent,
  PullRequestEvent,
} from '@octokit/webhooks-types'
import { uninstall } from '../../installation'
import {
  saveInstallationFromGithub,
  syncStatusOnCheckRun,
  unfreezeSinglePR,
} from '../use-cases'

const eventsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const event = req.headers['x-github-event'] as WebhookEventName

  console.log(`Received Github Event: ${event}`)
  console.log(`Received Github Payload:`, req.body)
  try {
    switch (event) {
      case 'installation':
        const installationEvent: InstallationEvent = req.body

        switch (installationEvent.action) {
          case 'created':
            await saveInstallationFromGithub(
              installationEvent.sender.id,
              installationEvent.installation.id,
              installationEvent.repositories?.map((repo) => {
                const [owner, repoName] = repo.full_name.split('/')

                return {
                  owner,
                  repo: repoName,
                }
              }) || []
            )

            return res.status(200).send()
          case 'deleted':
            await uninstall(installationEvent.sender.id)

            return res.status(200).send()
        }

        return res.status(200).send()

      case 'installation_repositories':
        // const repoEvent: InstallationRepositoriesEvent = req.body

        return res.status(200).send()

      case 'check_run':
        const checkRunEvent: CheckRunEvent = req.body

        if (!checkRunEvent.installation?.id) {
          return res.status(200).send()
        }

        if (checkRunEvent.action === 'rerequested') {
          if (checkRunEvent.installation?.id) {
            await syncStatusOnCheckRun({
              ref: checkRunEvent.check_run.head_sha,
              githubInstallationId: checkRunEvent.installation?.id,
              owner: checkRunEvent.repository.owner.login,
              repo: checkRunEvent.repository.name,
            })
          }
        } else if (
          checkRunEvent.action === 'requested_action' &&
          checkRunEvent.requested_action?.identifier === 'unfreeze_pr'
        ) {
          await unfreezeSinglePR({
            ref: checkRunEvent.check_run.head_sha,
            githubInstallationId: checkRunEvent.installation?.id,
            owner: checkRunEvent.repository.owner.login,
            repo: checkRunEvent.repository.name,
            requester: checkRunEvent.sender.login,
            requesterId: checkRunEvent.sender.id.toString(),
          })
        }
        return res.status(200).send()

      case 'check_suite':
        const checkSuiteEvent: CheckSuiteEvent = req.body

        if (
          checkSuiteEvent.action === 'rerequested' ||
          checkSuiteEvent.action === 'requested'
        ) {
          if (checkSuiteEvent.installation?.id) {
            await syncStatusOnCheckRun({
              ref: checkSuiteEvent.check_suite.head_sha,
              githubInstallationId: checkSuiteEvent.installation?.id,
              owner: checkSuiteEvent.repository.owner.login,
              repo: checkSuiteEvent.repository.name,
            })
          }
        }

        return res.status(200).send()

      case 'pull_request':
        const pullRequestEvent: PullRequestEvent = req.body

        if (
          pullRequestEvent.action === 'opened' ||
          pullRequestEvent.action === 'reopened' ||
          pullRequestEvent.action === 'synchronize'
        ) {
          if (pullRequestEvent.installation?.id) {
            await syncStatusOnCheckRun({
              ref: pullRequestEvent.pull_request.head.sha,
              githubInstallationId: pullRequestEvent.installation?.id,
              owner: pullRequestEvent.repository.owner.login,
              repo: pullRequestEvent.repository.name,
            })
          }
        }

        return res.status(200).send()

      default:
        return res.status(200).send()
    }
  } catch (e) {
    next(e)
  }
}

export default { eventsController }
