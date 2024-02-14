import { Space } from '@/infrastructure/components/Space'
import { ConfigurationItem } from '@/features/configurations/components/ConfigurationItem'
import { Button, Link, Spinner } from '@nextui-org/react'
import { FaSlack, FaGithub } from 'react-icons/fa'
import { useConfigurationIntegrationsViewController } from './useConfigurationIntegrationsViewController'
import { ConfigurationHeader } from '../../components/ConfigurationHeader'

export const ConfigurationIntegrationsView = () => {
  const {
    installation,
    removeInstallation,
    isLoading,
    githubStatusText,
    isGithubConnected,
    isSlackConnected,
    slackStatusText,
  } = useConfigurationIntegrationsViewController()

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <Space size='xlarge'>
        <ConfigurationHeader title='Connections' />
        <ConfigurationItem
          icon={<FaSlack display={'inline'} fontSize={24} />}
          title='Github'
          description='Connect with your Github projects to start safeguarding your projects.'
          rightControl
          status={githubStatusText}
          statusColor={isGithubConnected ? 'success' : 'danger'}
        >
          {installation?.isGithubIntegrated ? (
            <Button
              as={Link}
              href={installation?.githubConfigurationUrl || undefined}
              color={'default'}
              variant='bordered'
              target='_blank'
            >
              Configure
            </Button>
          ) : (
            <Button
              as={Link}
              href={`https://github.com/apps/${process.env.GITHUB_APP_NAME}/installations/new`}
              color={'primary'}
              variant='bordered'
            >
              Connect with Github
            </Button>
          )}
        </ConfigurationItem>
        <ConfigurationItem
          icon={<FaGithub display={'inline'} fontSize={24} />}
          title='Slack'
          description='Connect with your Slack workspace to enable merge freeze commands.'
          rightControl
          status={slackStatusText}
          statusColor={isSlackConnected ? 'success' : 'danger'}
        >
          {installation?.isSlackIntegrated ? (
            <Button
              as={Link}
              href={installation?.slackConfigurationUrl || undefined}
              color={'default'}
              variant='bordered'
              target='_blank'
            >
              Configure
            </Button>
          ) : (
            <Button
              as={Link}
              href='/auth/slack/install'
              color='primary'
              variant='bordered'
            >
              Connect with Slack Workspace
            </Button>
          )}
        </ConfigurationItem>

        <ConfigurationHeader title='Remove connections' />

        <ConfigurationItem
          title='Uninstall'
          description='Uninstall Merge Freeze app from Github and Slack.'
          rightControl
        >
          <Button
            variant='bordered'
            color='danger'
            onClick={removeInstallation}
            isDisabled={!installation?.isInstallationCompleted}
          >
            Remove installation
          </Button>
        </ConfigurationItem>
      </Space>
    </>
  )
}
