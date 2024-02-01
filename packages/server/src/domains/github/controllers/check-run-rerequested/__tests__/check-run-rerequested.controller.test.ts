import { describe, expect, it, vi } from 'vitest'
import { makeCheckRunRerequestedController } from '../check-run-rerequested.controller'
import { CheckRunEvent } from '@octokit/webhooks-types'

describe('Controller: checkRunRerequestedController', () => {
  it('should execute syncStatusOnCheckRun()', async () => {
    const res = {
      sendStatus: vi.fn(),
    } as any

    const syncStatusOnCheckRun = vi.fn()

    const controller = makeCheckRunRerequestedController({
      syncStatusOnCheckRun,
    })

    await controller(
      {
        action: 'rerequested',
        check_run: {
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
      } as CheckRunEvent,
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

  it('should not execute syncStatusOnCheckRun() if installation is null', async () => {
    const res = {
      sendStatus: vi.fn(),
    } as any

    const syncStatusOnCheckRun = vi.fn()

    const controller = makeCheckRunRerequestedController({
      syncStatusOnCheckRun,
    })

    await controller(
      {
        action: 'rerequested',
        check_run: {
          id: 123,
          head_sha: 'ABC12345',
        },
        installation: undefined,
        repository: {
          owner: {
            login: 'repo-owner',
          },
          name: 'repo-name',
        },
      } as CheckRunEvent,
      res
    )

    expect(syncStatusOnCheckRun).not.toHaveBeenCalled()
    expect(res.sendStatus).toHaveBeenCalledWith(200)
  })
})
