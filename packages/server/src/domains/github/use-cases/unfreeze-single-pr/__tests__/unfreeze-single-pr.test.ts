import { describe, expect, it, vi } from 'vitest'
import { makeUnfreezeSinglePR } from '../unfreeze-single-pr'
import { InstallationContructorMock } from '../../../../installation/data/entities/mocks/installation.entity.mock'
import { IInstallationDb } from '../../../../installation/interfaces/data/IInstallationDb'
import { MergeFreezeStatus } from '../../../../merge-freeze-status/data/entities/merge-freeze-status.entity'
import { MergeFreezeStatusMock } from '../../../../merge-freeze-status/data/entities/mocks/merge-freeze-status.entity.mock'
import { IMergeFreezeStatusDb } from '../../../../merge-freeze-status/interfaces/data-access/IMergeFreezeStatusDb'
import { GithubAPI } from '../../../data-access/github.api'
import { Installation } from '../../../../installation/data/entities/installation.entity'

describe('Use Case: unFreezeSinglePR', () => {
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
      unfreeze: vi.fn(),
    }

    const mockGithubApi = {
      createCheck: vi.fn(),
    } as any

    const mockMakeGithubDb: GithubAPI = () => mockGithubApi

    const unfreezeSinglePR = makeUnfreezeSinglePR({
      installationDb: mockInstallationDb as IInstallationDb,
      makeGithubDb: mockMakeGithubDb,
      mergeFreezeStatusDb: mockMergeFreezeStatusDb as IMergeFreezeStatusDb,
    })

    await unfreezeSinglePR({
      githubInstallationId: 12345,
      ref: 'ABCD12345',
      owner: mergeFreezeStatusStub.repoOwner,
      repo: mergeFreezeStatusStub.repoName,
      requester: mergeFreezeStatusStub.requester,
      requesterId: mergeFreezeStatusStub.requesterId,
    })

    expect(
      mockInstallationDb.getInstallationByGithubInstallationId
    ).toHaveBeenCalledWith(12345)

    expect(mockMergeFreezeStatusDb.unfreeze).toHaveBeenCalledWith(
      expect.objectContaining({
        id: mergeFreezeStatusStub.requesterId,
        name: mergeFreezeStatusStub.requester,
        owner: mergeFreezeStatusStub.repoOwner,
        repo: mergeFreezeStatusStub.repoName,
        source: 'github-action',
      })
    )

    expect(mockGithubApi.createCheck).toHaveBeenCalledWith(
      'ABCD12345',
      expect.objectContaining({
        conclusion: 'success',
        summary: `Unfrozen by: ${mergeFreezeStatusStub.requester}`,
      })
    )
  })
})
