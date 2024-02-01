import {
  Button,
  Input,
  Link,
  Spacer,
  Spinner,
  Tab,
  Tabs,
  Textarea,
} from '@nextui-org/react'
import { useManageViewController } from './useManageViewController'
import { Header } from '@/core/components/Header'
import { SetupSteps } from '../../components/SetupSteps'

export const ManageView = () => {
  const {
    installation,
    isLoading,
    showOnboardingSteps,
    githubConfigurationUrl,
    slackConfigurationUrl,
    removeInstallation,
  } = useManageViewController()

  return isLoading ? (
    <Spinner />
  ) : showOnboardingSteps ? (
    <div className='max-w-md'>
      <SetupSteps
        githubIntegrated={installation?.isGithubIntegrated || false}
        slackIntegrated={installation?.isSlackIntegrated || false}
      />
    </div>
  ) : (
    <div className='max-w-lg'>
      <Tabs aria-label='Options'>
        <Tab key='photos' title='Configuration'>
          <Button
            as={Link}
            href={githubConfigurationUrl || undefined}
            color={'default'}
            variant='bordered'
            target='_blank'
          >
            Configure Github Installation
          </Button>

          <Button
            as={Link}
            href={slackConfigurationUrl || undefined}
            color={'default'}
            variant='bordered'
            target='_blank'
          >
            Configure Slack Installation
          </Button>

          <Spacer y={2} />

          <Header as='h4'>Allowed channels</Header>

          <Spacer y={2} />
          <Input placeholder='ie. development, deployment' isDisabled />
          <Spacer y={8} />

          <Header as='h4'>Merge message</Header>

          <Spacer y={2} />
          <Textarea
            value={`:snowflake::snowflake::snowflake::snowflake::snowflake::snowflake::snowflake::snowflake::snowflake::snowflake:
        *MERGE FREEZE* - TEXT
        :snowflake::snowflake::snowflake::snowflake::snowflake::snowflake::snowflake::snowflake::snowflake::snowflake:`}
            isDisabled
          />
          <Spacer y={8} />

          <Button color='primary'>Save</Button>
          <Spacer y={2} />
          <Button color='danger' onClick={removeInstallation}>
            Remove installation
          </Button>
        </Tab>
        <Tab key='music' title='History'></Tab>
      </Tabs>
    </div>
  )
}
