import * as Factory from 'factory.ts'
import { InstallationConstructor } from '../installation.entity'
import { faker } from '@faker-js/faker'

export const InstallationContructorMock =
  Factory.Sync.makeFactory<InstallationConstructor>({
    githubInstallationId: Factory.each(() => faker.number.int()),
    githubUserId: Factory.each(() => faker.number.int()),
    installedRepos: [],
    slackInstallation: undefined,
    slackTeamId: undefined,
    configuration: {},
  })
