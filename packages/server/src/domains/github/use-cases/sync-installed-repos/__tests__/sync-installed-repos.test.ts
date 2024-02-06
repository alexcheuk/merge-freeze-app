import { describe, expect, it, vi } from 'vitest'
import { IInstallationDb } from '../../../../installation/interfaces/data/IInstallationDb'
import { GithubAPI } from '../../../data-access/github.api'
import { makeSyncInstalledRepos } from '../sync-installed-repos'

describe('Use Case: syncInstalledRepos', () => {
  it('should execute if installation is found', async () => {
    const mockInstallationDb: Partial<IInstallationDb> = {
      updateInstalledRepos: vi.fn(),
    }

    const mockGithubApi = {
      getInstalledRepos: vi.fn(() => [
        {
          full_name: 'test-owner/test-repo',
        },
      ]),
    } as any

    const mockMakeGithubDb: GithubAPI = () => mockGithubApi

    const useCase = makeSyncInstalledRepos({
      installationDb: mockInstallationDb as IInstallationDb,
      makeGithubApi: mockMakeGithubDb,
    })

    await useCase({
      githubInstallationId: 12345,
    })

    expect(mockGithubApi.getInstalledRepos).toHaveBeenCalled()

    expect(mockInstallationDb.updateInstalledRepos).toHaveBeenCalledWith(
      12345,
      expect.arrayContaining([
        expect.objectContaining({
          owner: 'test-owner',
          repo: 'test-repo',
        }),
      ])
    )
  })
})
