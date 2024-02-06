import { describe, expect, it, vi } from 'vitest'
import { makeCheckSuiteRerequestedController } from '../check-suite-rerequested.controller'
import { CheckSuiteEvent } from '@octokit/webhooks-types'

describe('Controller: checkSuiteRerequestedController', () => {
  it('should execute syncStatusOnCheckRun()', async () => {
    const res = {
      sendStatus: vi.fn(),
    } as any

    const syncStatusOnCheckRun = vi.fn()

    const controller = makeCheckSuiteRerequestedController({
      syncStatusOnCheckRun,
    })

    await controller(
      {
        action: 'rerequested',
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
