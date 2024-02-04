import { Installation } from '@slack/bolt'
import { UseCase } from '../../../../shared/interfaces/use-case'

export type ISaveSlackIntegrationUseCase = UseCase<
  {
    slackInstallation: Installation<'v2'>
    githubUserId: number
  },
  void
>
