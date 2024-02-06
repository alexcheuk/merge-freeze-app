import { UseCase } from '../../../../shared/interfaces/use-case'

export type IUnfreezeRepoUseCase = UseCase<
  {
    slackTeamId: string
    requesterId: string
    requesterName: string
    reason: string
    repo: {
      owner: string
      repo: string
    }
    installationId?: number
  },
  void
>
