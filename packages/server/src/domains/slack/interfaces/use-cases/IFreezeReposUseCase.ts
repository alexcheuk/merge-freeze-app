import { UseCase } from '../../../../shared/interfaces/use-case'

export type IFreezeReposUseCase = UseCase<
  {
    slackTeamId: string
    requesterId: string
    requesterName: string
    reason: string
    repos: {
      owner: string
      repo: string
    }[]
  },
  void
>
