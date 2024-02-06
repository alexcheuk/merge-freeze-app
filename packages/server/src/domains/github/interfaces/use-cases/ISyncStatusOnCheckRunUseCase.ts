import { UseCase } from '../../../../shared/interfaces/use-case'

interface SyncStatusOnCheckRunUseCaseInput {
  githubInstallationId: number
  ref: string
  owner: string
  repo: string
}

export type ISyncStatusOnCheckRunUseCase = UseCase<
  SyncStatusOnCheckRunUseCaseInput,
  void
>
