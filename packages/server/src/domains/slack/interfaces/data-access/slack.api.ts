import {
  ChatPostMessageArguments,
  ChatPostMessageResponse,
  ConversationsJoinResponse,
} from '@slack/web-api'

export interface SlackAPI {
  getInstallationUrl: (scopes: string[]) => Promise<string>
  joinChannel: (options: {
    token: ChatPostMessageArguments['token']
    channel: ChatPostMessageArguments['channel']
  }) => Promise<ConversationsJoinResponse>
  postMessage: (options: {
    token: ChatPostMessageArguments['token']
    message: ChatPostMessageArguments
  }) => Promise<ChatPostMessageResponse>
  uninstall: (options: {
    token: ChatPostMessageArguments['token']
  }) => Promise<any>
}
