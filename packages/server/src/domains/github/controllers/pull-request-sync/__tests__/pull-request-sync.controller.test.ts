import { describe, expect, it, vi } from 'vitest'
import { makePullRequestSyncController } from '../pull-request-sync.controller'
import { PullRequestEvent } from '@octokit/webhooks-types'

describe('Controller: unstallationAddedController', () => {
  it('should execute syncStatusOnCheckRun()', async () => {
    const res = {
      sendStatus: vi.fn(),
    } as any

    const syncStatusOnCheckRun = vi.fn()

    const controller = makePullRequestSyncController({
      syncStatusOnCheckRun,
    })

    await controller(
      {
        installation: {
          id: 12345,
        },
        pull_request: {
          head: {
            sha: 'head-sha',
          },
        },
        repository: {
          owner: {
            login: 'owner',
          },
          name: 'repo',
        },
      } as PullRequestEvent,
      res
    )

    expect(syncStatusOnCheckRun).toHaveBeenCalledWith({
      githubInstallationId: 12345,
      ref: 'head-sha',
      owner: 'owner',
      repo: 'repo',
    })

    expect(res.sendStatus).toHaveBeenCalledWith(200)
  })
})
