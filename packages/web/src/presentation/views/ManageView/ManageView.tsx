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

export const ManageView = () => {
  const {
    isLoading,
    showOnboardingSteps,
    isMissingGithubInstallation,
    isMissingSlackIntegration,
    githubConfigurationUrl,
    slackConfigurationUrl,
    removeInstallation,
  } = useManageViewController()

  return isLoading ? (
    <Spinner />
  ) : showOnboardingSteps ? (
    <div className='max-w-md'>
      <div className={!isMissingGithubInstallation ? 'opacity-25' : ''}>
        <h4 className='text-slate-900 font-extrabold text-4xl sm:text-xl dark:text-white'>
          1. Install Github App to your projects
        </h4>

        <Spacer y={4} />

        {isMissingGithubInstallation ? (
          <Button
            as={Link}
            href={`https://github.com/apps/slash-merge-freeze-dev/installations/new`}
            color={'primary'}
            variant='bordered'
          >
            Install to Github
          </Button>
        ) : (
          <Button
            as={Link}
            href={`https://github.com/apps/slash-merge-freeze-dev/installations/new`}
            color={'default'}
            isDisabled
            variant='bordered'
          >
            Installed to Github
          </Button>
        )}
      </div>

      <Spacer y={8} />

      <h4 className='text-slate-900 font-extrabold text-4xl sm:text-xl dark:text-white'>
        2. Install Slack App into Workspace
      </h4>

      <Spacer y={4} />

      <Button
        as={Link}
        href='/slack/install'
        color='primary'
        disabled={!isMissingSlackIntegration}
      >
        Add to Slack Workspace
      </Button>
    </div>
  ) : (
    <div className='max-w-lg'>
      {/* <p className='text-slate-900 font-bold sm:text-l'>
        Status:{' '}
        <Chip variant={'bordered'} color='warning'>
          Unfrozen
        </Chip>
        <Button color='primary'>Merge freeze</Button>
      </p>
      <Spacer y={8} /> */}

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

          <h4 className='text-slate-900 font-bold sm:text-l'>
            Allowed channels
          </h4>
          <Spacer y={2} />
          <Input placeholder='ie. development, deployment' isDisabled />
          <Spacer y={8} />

          <h4 className='text-slate-900 font-bold sm:text-l'>Merge message</h4>
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
