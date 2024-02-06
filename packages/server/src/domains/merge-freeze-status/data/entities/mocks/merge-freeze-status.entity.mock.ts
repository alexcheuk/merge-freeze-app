import * as Factory from 'factory.ts'
import { faker } from '@faker-js/faker'
import { MergeFreezeStatusConstructor } from '../merge-freeze-status.entity'

export const MergeFreezeStatusMock =
  Factory.Sync.makeFactory<MergeFreezeStatusConstructor>({
    datetime: Factory.each(() => faker.date.anytime()),
    isFrozen: false,
    reason: Factory.each(() => faker.word.words(5)),
    repoName: Factory.each(() => faker.word.noun()),
    repoOwner: Factory.each(() => faker.word.adjective()),
    requester: Factory.each(() => faker.internet.displayName()),
    requesterId: Factory.each(() => faker.string.uuid()),
    source: '',
  })
