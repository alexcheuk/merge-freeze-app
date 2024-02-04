import { describe, expect, it, vi } from 'vitest'
import { makeInstallationAddedController } from '../installation-added.controller'
import { InstallationRepositoriesAddedEvent } from '@octokit/webhooks-types'

describe('Controller: unstallationAddedController', () => {
  it('should execute syncInstalledRepos()', async () => {
    const res = {
      sendStatus: vi.fn(),
    } as any

    const syncInstalledRepos = vi.fn()

    const controller = makeInstallationAddedController({
      syncInstalledRepos,
    })

    await controller(
      {
        installation: {
          id: 12345,
        },
      } as InstallationRepositoriesAddedEvent,
      res
    )

    expect(syncInstalledRepos).toHaveBeenCalledWith(
      expect.objectContaining({
        githubInstallationId: 12345,
      })
    )
    expect(res.sendStatus).toHaveBeenCalledWith(200)
  })
})
