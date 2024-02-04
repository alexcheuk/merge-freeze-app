import { Header } from '@/core/components/Header'
import { Space } from '@/core/components/Space'
import { ConfigurationHeader } from '@/modules/configurations/components/ConfigurationHeader'
import { ConfigurationItem } from '@/modules/configurations/components/ConfigurationItem'
import { Button, Divider, Spinner } from '@nextui-org/react'
import { useGetRepoStatuses } from './useGetRepoStatuses'

export const DashboardView = () => {
  const { isLoading, repoStatuses } = useGetRepoStatuses()

  return !isLoading ? (
    <div className='max-w-2xl'>
      <Header as='h1'>Dashboard</Header>

      <Space size='xlarge'>
        <Divider />

        <ConfigurationHeader title='Projects status' />

        {repoStatuses.map((status) => (
          <ConfigurationItem
            title={status.repoFullName}
            description={`Last Modified: ${status.lastModified}`}
            rightControl
            status={status.isFrozen ? 'Frozen' : 'Unfrozen'}
            statusColor={status.isFrozen ? 'danger' : 'success'}
          >
            <Button variant='bordered'>Freeze</Button>
          </ConfigurationItem>
        ))}
      </Space>
    </div>
  ) : (
    <Spinner />
  )
}
