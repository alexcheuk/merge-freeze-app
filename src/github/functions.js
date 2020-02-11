import { getInstallationClient } from './auth'
import { getLatestStatus } from '../db'
import { generateMergeFreezeStatus, generateMergeUnfreezeStatus } from './utils'

const splitRepositoryPath = (repo) => ({
  owner: repo.split('/')[0],
  repo: repo.split('/')[1]
})

const checkRun = async ({
  action, repository, check_run, requested_action, pull_requests, sender
}) => {
  const { owner, repo } = splitRepositoryPath(repository.full_name)
  const client = await getInstallationClient(owner, repo)

  if (action === 'rerequested') {
    const latestMergeStatus = await getLatestStatus(owner, repo)
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

const onCheckSuite = async ({
  action, repository, check_suite
}) => {
  const { owner, repo } = splitRepositoryPath(repository.full_name)
  const client = await getInstallationClient(owner, repo)

  if (action === 'requested' || action === 'rerequested') {
    const latestMergeStatus = await getLatestStatus(owner, repo)
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

const onPullRequest = async ({ action, repository, pull_request: pullRequest }) => {
  const { owner, repo } = splitRepositoryPath(repository.full_name)
  const client = await getInstallationClient(owner, repo)

  if (action === 'opened' || action === 'reopened' || action === 'synchronize') {
    const latestMergeStatus = await getLatestStatus(owner, repo)
    const isMergeFrozen = latestMergeStatus ? latestMergeStatus.isFrozen : false

    client.checks.create({
      owner,
      repo,
      name: 'merge-freeze',
      head_sha: pullRequest.head.sha,
      ...(isMergeFrozen ? generateMergeFreezeStatus(latestMergeStatus.requester, latestMergeStatus.reason) : generateMergeUnfreezeStatus())
    })
  }
}

const mergeFreeze = async (owner, repo, name, reason) => {
  const client = await getInstallationClient(owner, repo)

  const { data: openPRs } = await client.pulls.list({
    owner,
    repo,
    state: 'open',
    base: process.env.MASTER_BRANCH
  })

  openPRs.forEach(async (pr) => {
    const { data: { check_runs: checkRuns } } = await client.checks.listForRef({
      owner,
      repo,
      ref: pr.head.sha,
      check_name: 'merge-freeze'
    })

    if (checkRuns && checkRuns.length) {
      checkRuns.forEach(async (check) => {
        await client.checks.update({
          check_run_id: check.id,
          owner,
          repo,
          name: 'merge-freeze',
          ...generateMergeFreezeStatus(name, reason)
        })
      })
    } else {
      await client.checks.create({
        owner,
        repo,
        name: 'merge-freeze',
        head_sha: pr.head.sha,
        ...generateMergeFreezeStatus(name, reason)
      })
    }
  })

  return {
    numPRs: openPRs.length
  }
}

const mergeUnfreeze = async (owner, repo, name) => {
  const client = await getInstallationClient(owner, repo)

  const { data: openPRs } = await client.pulls.list({
    owner,
    repo,
    state: 'open',
    base: process.env.MASTER_BRANCH
  })

  openPRs.forEach(async (pr) => {
    const { data: { check_runs: checkRuns } } = await client.checks.listForRef({
      owner,
      repo,
      ref: pr.head.sha,
      check_name: 'merge-freeze'
    })

    checkRuns.forEach(async (check) => {
      await client.checks.update({
        check_run_id: check.id,
        owner,
        repo,
        name: 'merge-freeze',
        ...generateMergeUnfreezeStatus(name)
      })
    })
  })

  return {
    numPRs: openPRs.length
  }
}

const mergeUnfreezePR = async (owner, repo, prID, name) => {
  const client = await getInstallationClient(owner, repo)

  const { data: pr } = await client.pulls.get({
    owner,
    repo,
    pull_number: prID
  })

  const { data: { check_runs: checkRuns } } = await client.checks.listForRef({
    owner,
    repo,
    ref: pr.head.sha,
    check_name: 'merge-freeze'
  })

  checkRuns.forEach(async (check) => {
    await client.checks.update({
      check_run_id: check.id,
      owner,
      repo,
      name: 'merge-freeze',
      ...generateMergeUnfreezeStatus(name)
    })
  })
}

const mergeUnfreezeRunID = async (owner, repo, runID, name) => {
  const client = await getInstallationClient(owner, repo)

  client.checks.update({
    check_run_id: runID,
    owner,
    repo,
    name: 'merge-freeze',
    ...generateMergeUnfreezeStatus(name)
  })
}

export {
  checkRun,
  onPullRequest,
  mergeFreeze,
  mergeUnfreeze,
  mergeUnfreezePR,
  onCheckSuite
}
