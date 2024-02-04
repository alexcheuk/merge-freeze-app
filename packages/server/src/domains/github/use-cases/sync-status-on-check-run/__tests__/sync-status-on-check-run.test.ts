import { describe, expect, it, vi } from 'vitest'
import { IInstallationDb } from '../../../../installation/interfaces/data/IInstallationDb'
import { makeSyncStatusOnCheckRun } from '../sync-status-on-check-run'
import { GithubAPI } from '../../../data-access/github.api'
import { IMergeFreezeStatusDb } from '../../../../merge-freeze-status/interfaces/data-access/IMergeFreezeStatusDb'
import { Installation } from '../../../../installation/data/entities/installation.entity'
import { InstallationContructorMock } from '../../../../installation/data/entities/mocks/installation.entity.mock'
import { MergeFreezeStatus } from '../../../../merge-freeze-status/data/entities/merge-freeze-status.entity'
import { MergeFreezeStatusMock } from '../../../../merge-freeze-status/data/entities/mocks/merge-freeze-status.entity.mock'

describe('Use Case: syncStatusOnCheckRun', () => {
  it('should execute if installation is found', async () => {
    const mockInstallationDb: Partial<IInstallationDb> = {
      getInstallationByGithubInstallationId: vi.fn(
        async (githubInstallationId) =>
          new Installation(
            InstallationContructorMock.build({
              githubInstallationId,
            })
          )
      ),
    }

    const mergeFreezeStatusStub = new MergeFreezeStatus(
      MergeFreezeStatusMock.build()
    )
    const mockMergeFreezeStatusDb: Partial<IMergeFreezeStatusDb> = {
      getLatestStatus: vi.fn(async () => mergeFreezeStatusStub),
    }

    const mockGithubApi = {
      createCheck: vi.fn(),
    } as any

    const mockMakeGithubDb: GithubAPI = () => mockGithubApi

    const useCase = makeSyncStatusOnCheckRun({
      installationDb: mockInstallationDb as IInstallationDb,
      makeGithubDb: mockMakeGithubDb,
      mergeFreezeStatusDb: mockMergeFreezeStatusDb as IMergeFreezeStatusDb,
    })

    await useCase({
      githubInstallationId: 12345,
      owner: mergeFreezeStatusStub.repoOwner,
      repo: mergeFreezeStatusStub.repoName,
      ref: 'ABCD12345',
    })

    expect(mockMergeFreezeStatusDb.getLatestStatus).toHaveBeenCalledWith(
      mergeFreezeStatusStub.repoOwner,
      mergeFreezeStatusStub.repoName
    )

    expect(mockGithubApi.createCheck).toHaveBeenCalledWith(
      'ABCD12345',
      expect.objectContaining({
        conclusion: 'success',
        summary: `Unfrozen by: ${mergeFreezeStatusStub.requester}`,
      })
    )
  })

  it('should exit execution if installation is not found', async () => {
    const mockInstallationDb: Partial<IInstallationDb> = {
      getInstallationByGithubInstallationId: vi.fn(async () => null),
    }

    const mockMergeFreezeStatusDb: Partial<IMergeFreezeStatusDb> = {
      getLatestStatus: vi.fn(),
    }

    const mockGithubApi = {
      createCheck: vi.fn(),
    } as any

    const mockMakeGithubDb: GithubAPI = () => mockGithubApi

    const useCase = makeSyncStatusOnCheckRun({
      installationDb: mockInstallationDb as IInstallationDb,
      makeGithubDb: mockMakeGithubDb,
      mergeFreezeStatusDb: mockMergeFreezeStatusDb as IMergeFreezeStatusDb,
    })

    expect(async () => {
      await useCase({
        githubInstallationId: 12345,
        owner: '',
        repo: '',
        ref: '',
      })
    }).rejects.toThrowError('Installation not found')

    expect(mockMergeFreezeStatusDb.getLatestStatus).not.toHaveBeenCalled()
    expect(mockGithubApi.createCheck).not.toHaveBeenCalled()
  })
})
