import { UseCase } from '../../../../shared/interfaces/use-case'
import { MergeFreezeStatus } from '../../data/entities/merge-freeze-status.entity'

export type IGetRepoStatusesUseCase = UseCase<
  {
    githubUserId: number
  },
  { [repo: string]: MergeFreezeStatus | null }
>
