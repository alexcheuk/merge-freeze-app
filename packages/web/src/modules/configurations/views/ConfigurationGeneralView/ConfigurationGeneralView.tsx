import { Space } from '@/core/components/Space'
import { ConfigurationItem } from '@/modules/configurations/components/ConfigurationItem'
import { Input, Spinner, Textarea } from '@nextui-org/react'
import { useConfigurationGeneralViewController } from './useConfigurationGeneralViewController'
import { ConfigurationHeader } from '../../components/ConfigurationHeader'

export const ConfigurationGeneralView = () => {
  const { isLoading } = useConfigurationGeneralViewController()

  return !isLoading ? (
    <Space size='xlarge'>
      <ConfigurationHeader title='Slack' />

      <ConfigurationItem
        title='Allowed channels'
        description='Channels that are allowed to call merge freeze commands'
      >
        <Input
          variant='faded'
          placeholder='ie. development, deployment'
          isReadOnly
        />
      </ConfigurationItem>

      <ConfigurationItem
        title='Freeze message template (/mf)'
        description='Message that the bot will broadcast to the channel when a merge freeze is called.'
      >
        <Textarea
          variant='faded'
          value={`❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️
*MERGE FREEZE* - TEXT
❄️❄️❄️❄️❄️❄️❄️❄️❄️❄️`}
          isReadOnly
        />
      </ConfigurationItem>

      <ConfigurationItem
        title='Unfreeze message template (!mf)'
        description='Message that the bot will broadcast to the channel when a merge freeze is called off.'
      >
        <Textarea
          variant='faded'
          value={`☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️
*MERGE FREEZE* - TEXT
☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️`}
          isReadOnly
        />
      </ConfigurationItem>
    </Space>
  ) : (
    <Spinner />
  )
}
