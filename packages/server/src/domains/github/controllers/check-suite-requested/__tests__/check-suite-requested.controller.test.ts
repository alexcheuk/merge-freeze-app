import { describe, expect, it, vi } from 'vitest'
import { makeCheckSuiteRequestedController } from '../check-suite-requested.controller'
import { CheckSuiteEvent } from '@octokit/webhooks-types'

describe('Controller: checkSuiteRequestedController', () => {
  it('should execute syncStatusOnCheckRun()', async () => {
    const res = {
      sendStatus: vi.fn(),
    } as any

    const syncStatusOnCheckRun = vi.fn()

    const controller = makeCheckSuiteRequestedController({
      syncStatusOnCheckRun,
    })

    await controller(
      {
        action: 'requested',
        check_suite: {
          id: 123,
          head_sha: 'ABC12345',
        },
        installation: {
          id: 12345,
        },
        repository: {
          owner: {
            login: 'repo-owner',
          },
          name: 'repo-name',
        },
      } as CheckSuiteEvent,
      res
    )

    expect(syncStatusOnCheckRun).toHaveBeenCalledWith(
      expect.objectContaining({
        githubInstallationId: 12345,
        owner: 'repo-owner',
        repo: 'repo-name',
        ref: 'ABC12345',
      })
    )
    expect(res.sendStatus).toHaveBeenCalledWith(200)
  })
})
