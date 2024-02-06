import { describe, expect, it, vi } from 'vitest'
import { makeEventsController } from '../events.controller'

describe('Github Event Controller', () => {
  it('should route events to proper controllers', async () => {
    const checkRunRerequestedControllerMock = vi.fn()
    const checkSuiteRequestedControllerMock = vi.fn()
    const checkSuiteRerequestedControllerMock = vi.fn()
    const installationCreatedControllerMock = vi.fn()
    const installationDeletedControllerMock = vi.fn()
    const pullRequestSyncControllerMock = vi.fn()
    const unfreezeSinglePRActionControllerMock = vi.fn()
    const installationAddedControllerMock = vi.fn()
    const installationRemovedControllerMock = vi.fn()

    const controller = makeEventsController({
      checkRunRerequestedController: checkRunRerequestedControllerMock,
      checkSuiteRequestedController: checkSuiteRequestedControllerMock,
      checkSuiteRerequestedController: checkSuiteRerequestedControllerMock,
      installationCreatedController: installationCreatedControllerMock,
      installationDeletedController: installationDeletedControllerMock,
      pullRequestSyncController: pullRequestSyncControllerMock,
      unfreezeSinglePRActionController: unfreezeSinglePRActionControllerMock,
      installationAddedController: installationAddedControllerMock,
      installationRemovedController: installationRemovedControllerMock,
    })

    const resMock = {
      sendStatus: vi.fn(),
    } as any

    await controller(
      {
        headers: { 'x-github-event': 'installation' },
        body: {
          action: 'created',
        },
      } as any,
      resMock,
      () => undefined
    )

    expect(installationCreatedControllerMock).toHaveBeenLastCalledWith(
      expect.objectContaining({ action: 'created' }),
      resMock
    )

    await controller(
      {
        headers: { 'x-github-event': 'installation' },
        body: {
          action: 'deleted',
        },
      } as any,
      resMock,
      () => undefined
    )

    expect(installationDeletedControllerMock).toHaveBeenLastCalledWith(
      expect.objectContaining({ action: 'deleted' }),
      resMock
    )

    await controller(
      {
        headers: { 'x-github-event': 'installation_repositories' },
        body: {
          action: 'added',
        },
      } as any,
      resMock,
      () => undefined
    )

    expect(installationAddedControllerMock).toHaveBeenLastCalledWith(
      expect.objectContaining({ action: 'added' }),
      resMock
    )

    await controller(
      {
        headers: { 'x-github-event': 'installation_repositories' },
        body: {
          action: 'removed',
        },
      } as any,
      resMock,
      () => undefined
    )

    expect(installationRemovedControllerMock).toHaveBeenLastCalledWith(
      expect.objectContaining({ action: 'removed' }),
      resMock
    )

    await controller(
      {
        headers: { 'x-github-event': 'check_run' },
        body: {
          action: 'rerequested',
        },
      } as any,
      resMock,
      () => undefined
    )

    expect(checkRunRerequestedControllerMock).toHaveBeenLastCalledWith(
      expect.objectContaining({ action: 'rerequested' }),
      resMock
    )

    await controller(
      {
        headers: { 'x-github-event': 'check_run' },
        body: {
          action: 'requested_action',
          requested_action: {
            identifier: 'unfreeze_pr',
          },
        },
      } as any,
      resMock,
      () => undefined
    )

    expect(unfreezeSinglePRActionControllerMock).toHaveBeenLastCalledWith(
      expect.objectContaining({ action: 'requested_action' }),
      resMock
    )

    await controller(
      {
        headers: { 'x-github-event': 'check_suite' },
        body: {
          action: 'rerequested',
        },
      } as any,
      resMock,
      () => undefined
    )

    expect(checkSuiteRerequestedControllerMock).toHaveBeenLastCalledWith(
      expect.objectContaining({ action: 'rerequested' }),
      resMock
    )

    await controller(
      {
        headers: { 'x-github-event': 'check_suite' },
        body: {
          action: 'requested',
        },
      } as any,
      resMock,
      () => undefined
    )

    expect(checkSuiteRequestedControllerMock).toHaveBeenLastCalledWith(
      expect.objectContaining({ action: 'requested' }),
      resMock
    )

    await controller(
      {
        headers: { 'x-github-event': 'pull_request' },
        body: {
          action: 'opened',
        },
      } as any,
      resMock,
      () => undefined
    )

    expect(pullRequestSyncControllerMock).toHaveBeenLastCalledWith(
      expect.objectContaining({ action: 'opened' }),
      resMock
    )

    await controller(
      {
        headers: { 'x-github-event': 'pull_request' },
        body: {
          action: 'reopened',
        },
      } as any,
      resMock,
      () => undefined
    )

    expect(pullRequestSyncControllerMock).toHaveBeenLastCalledWith(
      expect.objectContaining({ action: 'reopened' }),
      resMock
    )

    await controller(
      {
        headers: { 'x-github-event': 'pull_request' },
        body: {
          action: 'synchronize',
        },
      } as any,
      resMock,
      () => undefined
    )

    expect(pullRequestSyncControllerMock).toHaveBeenLastCalledWith(
      expect.objectContaining({ action: 'synchronize' }),
      resMock
    )
  })
})
