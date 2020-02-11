import { getInstallationClient } from './github.auth'
import { generateMergeFreezeStatus, generateMergeUnfreezeStatus } from '../helpers/github.checks'

export const mergeFreeze = async (owner, repo, name, reason) => {
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

export const mergeUnfreeze = async (owner, repo, name) => {
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

export const mergeUnfreezePR = async (owner, repo, prID, name) => {
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

export const mergeUnfreezeRunID = async (owner, repo, runID, name) => {
  const client = await getInstallationClient(owner, repo)

  client.checks.update({
    check_run_id: runID,
    owner,
    repo,
    name: 'merge-freeze',
    ...generateMergeUnfreezeStatus(name)
  })
}
