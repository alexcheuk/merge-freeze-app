import { InstallationEvent } from '@octokit/webhooks-types'
import { Response } from 'express'
import { IInstallationCreatedController } from '../../interfaces/controllers/IInstallationCreatedController'
import { ISaveInstallationFromGithubUseCase } from '../../interfaces/use-cases/ISaveInstallationFromGithubUseCase'

export const makeInstallationCreatedController = ({
  saveInstallationFromGithub,
}: {
  saveInstallationFromGithub: ISaveInstallationFromGithubUseCase
}): IInstallationCreatedController => {
  return async (event: InstallationEvent, res: Response) => {
    await saveInstallationFromGithub({
      githubInstallationId: event.installation.id,
      githubUserId: event.sender.id,
      repos:
        event.repositories?.map((repo) => {
          const [owner, repoName] = repo.full_name.split('/')

          return {
            owner,
            repo: repoName,
          }
        }) || [],
    })

    res.sendStatus(200)
  }
}
