import { describe, expect, it, vi } from 'vitest'
import { makeUnfreezeSinglePrActionController } from '../unfreeze-single-pr-action.controller'
import { CheckRunEvent } from '@octokit/webhooks-types'

describe('Controller: unstallationAddedController', () => {
  it('should execute unfreezeSinglePR()', async () => {
    const res = {
      sendStatus: vi.fn(),
    } as any

    const unfreezeSinglePR = vi.fn()

    const controller = makeUnfreezeSinglePrActionController({
      unfreezeSinglePR,
    })

    await controller(
      {
        installation: {
          id: 12345,
        },
        repository: {
          owner: {
            login: 'owner',
          },
          name: 'repo',
        },
        sender: {
          login: 'requester',
          id: 12345,
        },
        check_run: {
          head_sha: 'head-sha',
        },
      } as CheckRunEvent,
      res
    )

    expect(unfreezeSinglePR).toHaveBeenCalledWith({
      githubInstallationId: 12345,
      ref: 'head-sha',
      owner: 'owner',
      repo: 'repo',
      requester: 'requester',
      requesterId: '12345',
    })

    expect(res.sendStatus).toHaveBeenCalledWith(200)
  })
})
