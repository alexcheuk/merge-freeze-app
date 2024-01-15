import { Response } from 'express'
import {
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

const installationCreated = async (event: InstallationEvent, res: Response) => {
  await saveInstallationFromGithub(
    event.sender.id,
    event.installation.id,
    event.repositories?.map((repo) => {
      const [owner, repoName] = repo.full_name.split('/')

      return {
        owner,
        repo: repoName,
      }
    }) || []
  )

  res.sendStatus(200)
}

const installationDeleted = async (event: InstallationEvent, res: Response) => {
  await uninstall({
    githubUserId: event.sender.id,
  })

  res.sendStatus(200)
}

const checkRunRerequested = async (event: CheckRunEvent, res: Response) => {
  if (!event.installation?.id) {
    return res.sendStatus(200)
  }

  await syncStatusOnCheckRun({
    ref: event.check_run.head_sha,
    githubInstallationId: event.installation?.id,
    owner: event.repository.owner.login,
    repo: event.repository.name,
  })

  res.sendStatus(200)
}

const unfreezeSinglePRAction = async (event: CheckRunEvent, res: Response) => {
  if (!event.installation?.id) return res.sendStatus(200)

  await unfreezeSinglePR({
    ref: event.check_run.head_sha,
    githubInstallationId: event.installation?.id,
    owner: event.repository.owner.login,
    repo: event.repository.name,
    requester: event.sender.login,
    requesterId: event.sender.id.toString(),
  })

  res.sendStatus(200)
}

const checkSuiteRequested = async (event: CheckSuiteEvent, res: Response) => {
  if (!event.installation?.id) return res.sendStatus(200)

  await syncStatusOnCheckRun({
    ref: event.check_suite.head_sha,
    githubInstallationId: event.installation?.id,
    owner: event.repository.owner.login,
    repo: event.repository.name,
  })

  res.sendStatus(200)
}

const checkSuiteRerequested = async (event: CheckSuiteEvent, res: Response) => {
  if (!event.installation?.id) return res.sendStatus(200)

  await syncStatusOnCheckRun({
    ref: event.check_suite.head_sha,
    githubInstallationId: event.installation?.id,
    owner: event.repository.owner.login,
    repo: event.repository.name,
  })

  res.sendStatus(200)
}

const pullRequestSync = async (event: PullRequestEvent, res: Response) => {
  if (!event.installation?.id) return res.sendStatus(200)

  await syncStatusOnCheckRun({
    ref: event.pull_request.head.sha,
    githubInstallationId: event.installation?.id,
    owner: event.repository.owner.login,
    repo: event.repository.name,
  })

  res.sendStatus(200)
}

export default {
  installationCreated,
  installationDeleted,
  checkRunRerequested,
  unfreezeSinglePRAction,
  checkSuiteRequested,
  checkSuiteRerequested,
  pullRequestSync,
}
