import { UseCase } from '../../../../shared/interfaces/use-case'

export type IGetInstallationByGithubUserIdUseCase = UseCase<
  {
    githubUserId: number
  },
  {
    githubInstallationId: number | null
    slackConfigurationUrl: string | null
    githubConfigurationUrl: string | null
    isInstallationComplete: boolean
  } | null
>
