import { installationApi } from '../../../data/installation/api/index.ts'
import { Installation } from '../entities/installation.entity.ts'
import { makeDeleteInstallationUseCase } from './delete-installation.use-case.ts'
import { makeGetInstallationUseCase } from './get-installation.use-case.ts'

export const getInstallation = makeGetInstallationUseCase({
  Installation: Installation,
  installationApi,
})

export const deleteInstallation = makeDeleteInstallationUseCase({
  installationApi,
})
