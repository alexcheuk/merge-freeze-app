import { UseCase } from '../../../../shared/interfaces/use-case'

interface IUnfreezeSinglePRUseCaseInput {
  githubInstallationId: number
  ref: string
  owner: string
  repo: string
  requester: string
  requesterId: string
}

export type IUnfreezeSinglePRUseCase = UseCase<
  IUnfreezeSinglePRUseCaseInput,
  void
>
