import { installationDb } from '../../../installation/data'
import { slackApi } from '../../data'
import { makeSaveSlackIntegration } from './save-slack-integration'

export const saveSlackIntegration = makeSaveSlackIntegration({
  installationDb,
  slackAPI: slackApi,
})
