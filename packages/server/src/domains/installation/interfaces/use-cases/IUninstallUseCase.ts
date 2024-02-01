import { UseCase } from '../../../../shared/interfaces/use-case'

interface IUninstallUseCaseInput {
  githubUserId: number
}

export type IUninstallUseCase = UseCase<IUninstallUseCaseInput, void>
