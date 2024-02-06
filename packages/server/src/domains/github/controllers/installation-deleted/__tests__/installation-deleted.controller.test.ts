import { describe, expect, it, vi } from 'vitest'
import { makeInstallationDeletedController } from '../installation-deleted.controller'
import { InstallationEvent } from '@octokit/webhooks-types'

describe('Controller: installationDeletedController', () => {
  it('should execute uninstall()', async () => {
    const res = {
      sendStatus: vi.fn(),
    } as any

    const uninstall = vi.fn()

    const controller = makeInstallationDeletedController({
      uninstall,
    })

    await controller(
      {
        sender: {
          id: 1111,
        },
      } as InstallationEvent,
      res
    )

    expect(uninstall).toHaveBeenCalledWith(
      expect.objectContaining({
        githubUserId: 1111,
      })
    )
    expect(res.sendStatus).toHaveBeenCalledWith(200)
  })
})
