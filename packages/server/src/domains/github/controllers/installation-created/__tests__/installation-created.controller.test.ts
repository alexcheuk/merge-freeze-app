import { describe, expect, it, vi } from 'vitest'
import { makeInstallationCreatedController } from '../installation-created.controller'
import { InstallationEvent } from '@octokit/webhooks-types'

describe('Controller: unstallationAddedController', () => {
  it('should execute saveInstallationFromGithub()', async () => {
    const res = {
      sendStatus: vi.fn(),
    } as any

    const saveInstallationFromGithub = vi.fn()

    const controller = makeInstallationCreatedController({
      saveInstallationFromGithub,
    })

    await controller(
      {
        installation: {
          id: 12345,
        },
        sender: {
          id: 1111,
        },
        repositories: [
          {
            full_name: 'owner/repo',
          },
        ],
      } as InstallationEvent,
      res
    )

    expect(saveInstallationFromGithub).toHaveBeenCalledWith(
      expect.objectContaining({
        githubInstallationId: 12345,
        githubUserId: 1111,
        repos: expect.arrayContaining([
          {
            owner: 'owner',
            repo: 'repo',
          },
        ]),
      })
    )
    expect(res.sendStatus).toHaveBeenCalledWith(200)
  })
})
