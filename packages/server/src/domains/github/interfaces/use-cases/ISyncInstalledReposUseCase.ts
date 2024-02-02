import { UseCase } from '../../../../shared/interfaces/use-case'

interface Input {
  githubInstallationId: number
}

export type ISyncInstalledReposUseCase = UseCase<Input, void>
