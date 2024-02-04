import { UseCase } from '../../../../shared/interfaces/use-case'

export type IUnfreezeSinglePrUseCase = UseCase<
  {
    slackTeamId: string
    requesterId: string
    requesterName: string
    reason: string
    repo: {
      owner: string
      repo: string
    }
    prId: number
  },
  void
>
