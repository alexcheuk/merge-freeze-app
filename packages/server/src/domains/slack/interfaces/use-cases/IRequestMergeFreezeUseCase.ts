import { SlashCommand } from '@slack/bolt'
import { UseCase } from '../../../../shared/interfaces/use-case'
import { ViewsOpenArguments } from '@slack/web-api'

export type IRequestMergeFreezeUseCase = UseCase<
  {
    slackTeamId: string
    triggerId: SlashCommand['trigger_id']
    channelId: SlashCommand['channel_id']
    reason?: string
  },
  ViewsOpenArguments
>
