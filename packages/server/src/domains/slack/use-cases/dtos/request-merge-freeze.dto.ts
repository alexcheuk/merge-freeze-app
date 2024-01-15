import { SlashCommand } from '@slack/bolt'

export interface RequestMergeFreezeDTO {
  slackTeamId: string
  triggerId: SlashCommand['trigger_id']
  channelId: SlashCommand['channel_id']
  reason?: string
}
