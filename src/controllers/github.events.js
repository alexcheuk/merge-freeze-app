import mongoose from 'mongoose'

import { getInstallationClient } from '../services/github.auth'
import { mergeUnfreezeRunID } from '../services/github'

import { generateMergeFreezeStatus, generateMergeUnfreezeStatus } from '../helpers/github.checks'
import { saveGithubInstallation, deleteGithubInstallation } from '../db'

const MergeFreezeStatus = mongoose.model('MergeFreezeStatus')

export const postEvent = async (req, res) => {
  console.log('Event: ', req.headers['x-github-event'])
  console.log('Action: ', req.body.action)

  switch (req.headers['x-github-event']) {
    case 'installation':
      onInstallation(req.body)
      break

    case 'check_run':
      onCheckRunEvent(req.body)
      break

    case 'check_suite':
      onCheckSuiteEvent(req.body)
      break

    case 'pull_request':
      onPullRequestEvent(req.body)
      break

    default:
      break
  }

  res.json({
    status: 200
  })
}

const splitRepositoryPath = (repo) => ({
  owner: repo.split('/')[0],
  repo: repo.split('/')[1]
})

const onCheckRunEvent = async ({
  action, repository, check_run, requested_action, sender
}) => {
  const { owner, repo } = splitRepositoryPath(repository.full_name)
  const client = await getInstallationClient(owner, repo)

  if (action === 'rerequested') {
    const latestMergeStatus = await MergeFreezeStatus.getLastStatus(owner, repo)
    const isMergeFrozen = latestMergeStatus ? latestMergeStatus.isFrozen : false

    client.checks.update({
      owner,
      repo,
      check_run_id: check_run.id,
      ...(isMergeFrozen ? generateMergeFreezeStatus(latestMergeStatus.requester, latestMergeStatus.reason) : generateMergeUnfreezeStatus())
    })
  } else if (action === 'requested_action' && requested_action && requested_action.identifier === 'unfreeze_pr') {
    mergeUnfreezeRunID(owner, repo, check_run.id, sender.login)
  }
}

const onCheckSuiteEvent = async ({
  action, repository, check_suite
}) => {
  const { owner, repo } = splitRepositoryPath(repository.full_name)
  const client = await getInstallationClient(owner, repo)

  if (action === 'requested' || action === 'rerequested') {
    const latestMergeStatus = await MergeFreezeStatus.getLastStatus(owner, repo)
    const isMergeFrozen = latestMergeStatus ? latestMergeStatus.isFrozen : false

    check_suite.pull_requests.forEach(pullRequest => {
      client.checks.create({
        owner,
        repo,
        name: 'merge-freeze',
        head_sha: pullRequest.head.sha,
        ...(isMergeFrozen ? generateMergeFreezeStatus(latestMergeStatus.requester, latestMergeStatus.reason) : generateMergeUnfreezeStatus())
      })
    })
  }
}

const onPullRequestEvent = async ({ action, repository, pull_request }) => {
  const { owner, repo } = splitRepositoryPath(repository.full_name)
  const client = await getInstallationClient(owner, repo)

  if (action === 'opened' || action === 'reopened' || action === 'synchronize') {
    const latestMergeStatus = await MergeFreezeStatus.getLastStatus(owner, repo)
    const isMergeFrozen = latestMergeStatus ? latestMergeStatus.isFrozen : false

    client.checks.create({
      owner,
      repo,
      name: 'merge-freeze',
      head_sha: pull_request.head.sha,
      ...(isMergeFrozen ? generateMergeFreezeStatus(latestMergeStatus.requester, latestMergeStatus.reason) : generateMergeUnfreezeStatus())
    })
  }
}

const onInstallation = async ({ action, installation }) => {
  if (action === 'created') {
    await saveGithubInstallation(installation.account.id, installation.id)
  } else if (action === 'deleted') {
    await deleteGithubInstallation(installation.account.id, installation.id)
  }
}
