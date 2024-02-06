import { StaticSelect, SlashCommand } from '@slack/bolt'
import { ViewsOpenArguments } from '@slack/web-api'
import { UNFREEZE_PR_MODAL_CALLBACK_ID } from './constants'

interface BuildMergeFreezeModalOptions {
  triggerId: SlashCommand['trigger_id']
  channelId: SlashCommand['channel_id']
  repos: StaticSelect['options']
  prId: number
}

export const buildUndreezePRModal = ({
  triggerId,
  channelId,
  repos,
  prId,
}: BuildMergeFreezeModalOptions): ViewsOpenArguments => {
  return {
    trigger_id: triggerId,
    view: {
      type: 'modal',
      callback_id: UNFREEZE_PR_MODAL_CALLBACK_ID,
      title: {
        type: 'plain_text',
        text: 'Are you sure?',
      },
      submit: {
        type: 'plain_text',
        text: 'Submit',
      },
      private_metadata: channelId,
      blocks: [
        {
          type: 'input',
          block_id: 'repo_block',
          label: {
            type: 'plain_text',
            text: 'Projects',
          },
          element: {
            type: 'static_select',
            action_id: 'repo_input',
            options: repos,
            initial_option: repos?.length ? repos[0] : undefined,
          },
        },
        {
          type: 'input',
          block_id: 'prid_block',
          label: {
            type: 'plain_text',
            text: 'Pull Request ID',
          },
          element: {
            type: 'plain_text_input',
            action_id: 'prid_input',
            focus_on_load: true,
            initial_value: prId ? prId.toString() : undefined,
          },
        },
      ],
    },
  }
}
