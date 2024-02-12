import { Button, Link, Spacer } from '@nextui-org/react'

export interface ISetupStepsProps {
  githubIntegrated: boolean
  slackIntegrated: boolean
}

export const SetupSteps = ({
  githubIntegrated,
  slackIntegrated,
}: ISetupStepsProps) => {
  return (
    <>
      <div className={githubIntegrated ? 'opacity-25' : ''}>
        <h4 className='text-slate-900 font-extrabold text-4xl sm:text-xl dark:text-white'>
          {githubIntegrated ? '✅' : '❌'} Install Github App to your projects
        </h4>

        <Spacer y={4} />

        {githubIntegrated ? (
          <Button color={'default'} isDisabled variant='bordered'>
            Installed to Github
          </Button>
        ) : (
          <Button
            as={Link}
            href={`https://github.com/apps/slash-merge-freeze-dev/installations/new`}
            color={'primary'}
            variant='bordered'
          >
            Install to Github
          </Button>
        )}
      </div>
      <Spacer y={8} />
      <div className={slackIntegrated ? 'opacity-25' : ''}>
        <h4 className='text-slate-900 font-extrabold text-4xl sm:text-xl dark:text-white'>
          {slackIntegrated ? '✅' : '❌'} Install Slack App into Workspace
        </h4>

        <Spacer y={4} />

        {slackIntegrated ? (
          <Button color='default' isDisabled variant='bordered'>
            Added to Slack Workspace
          </Button>
        ) : (
          <Button
            as={Link}
            href='/auth/slack/install'
            color='primary'
            variant='bordered'
          >
            Add to Slack Workspace
          </Button>
        )}
      </div>
    </>
  )
}
