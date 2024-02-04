import { UseCase } from '../../../../shared/interfaces/use-case'
import { InstallationRepo } from '../../../installation/data/entities/installation.entity'

export type IUnfreezeReposUseCase = UseCase<
  {
    slackTeamId: string
    requesterId: string
    requesterName: string
    reason: string
  },
  InstallationRepo[]
>
