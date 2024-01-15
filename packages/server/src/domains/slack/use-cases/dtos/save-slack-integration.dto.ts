import { Installation } from '@slack/bolt'

export interface SaveSlackIntegrationDTO {
  slackInstallation: Installation<'v2'>
  githubUserId: number
}
