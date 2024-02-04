import { Chip, Spinner } from '@nextui-org/react'
import { useConfigurationViewController } from './useConfigurationViewController'
import { Header } from '@/core/components/Header'
import { Tabs } from '@/core/components/Tabs'
import { Outlet } from 'react-router-dom'
import { Space } from '@/core/components/Space'

export const ConfigurationView = () => {
  const { isLoading, showOnboardingSteps } = useConfigurationViewController()

  return isLoading ? (
    <Spinner />
  ) : (
    <div className='max-w-2xl'>
      <Header as='h1'>Configurations</Header>

      <Space size='xlarge'>
        <Tabs>
          <Tabs.Item to='/manage/general'>General</Tabs.Item>
          <Tabs.Item to='/manage/integrations'>
            Integrations{' '}
            {showOnboardingSteps ? (
              <Chip color='warning' size='sm'>
                Required setup
              </Chip>
            ) : null}
          </Tabs.Item>
        </Tabs>

        <Outlet />
      </Space>
    </div>
  )
}
