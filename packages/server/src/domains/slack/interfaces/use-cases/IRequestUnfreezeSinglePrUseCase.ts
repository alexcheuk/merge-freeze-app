import { SlashCommand } from '@slack/bolt'
import { UseCase } from '../../../../shared/interfaces/use-case'
import { ViewsOpenArguments } from '@slack/web-api'

export type IRequestUnfreezeSinglePrUseCase = UseCase<
  {
    slackTeamId: string
    prId: number
    triggerId: SlashCommand['trigger_id']
    channelId: SlashCommand['channel_id']
  },
  ViewsOpenArguments
>
