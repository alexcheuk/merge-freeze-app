import { UseCase } from '../../../../shared/interfaces/use-case'

interface SaveInstallationFromGithubInput {
  githubUserId: number
  githubInstallationId: number
  repos: { owner: string; repo: string }[]
}

export type ISaveInstallationFromGithubUseCase = UseCase<
  SaveInstallationFromGithubInput,
  void
>
