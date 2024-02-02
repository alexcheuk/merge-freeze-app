import { expect, test, vi } from 'vitest'
import { makeSaveInstallationFromGithub } from '../save-installation-from-github'
import { IInstallationDb } from '../../../../installation/interfaces/data/IInstallationDb'

test('Use Case: saveInstallationFromGithub', async () => {
  const mockInstallationDb: Partial<IInstallationDb> = {
    upsertGithubInstallation: vi.fn(),
  }

  const useCase = makeSaveInstallationFromGithub({
    installationDb: mockInstallationDb as IInstallationDb,
  })

  await useCase({
    githubUserId: 56789,
    githubInstallationId: 12345,
    repos: [
      {
        owner: 'owner',
        repo: 'repo',
      },
    ],
  })

  expect(mockInstallationDb.upsertGithubInstallation).toHaveBeenCalledWith(
    56789,
    12345,
    expect.arrayContaining([
      {
        owner: 'owner',
        repo: 'repo',
      },
    ])
  )
})
