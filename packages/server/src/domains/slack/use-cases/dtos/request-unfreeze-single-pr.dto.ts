import { SlashCommand } from '@slack/bolt'

export interface RequestUnfreezeSinglePRDTO {
  slackTeamId: string
  prId: number
  triggerId: SlashCommand['trigger_id']
  channelId: SlashCommand['channel_id']
}
