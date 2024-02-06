import { InstallationModel } from '../../models/InstallationModel'
import { Installation } from '../entities/Installation'
import { makeDeleteInstallation } from './deleteInstallation.ts'
import { makeGetInstallation } from './getInstallation'

export const getInstallation = makeGetInstallation({
  Installation: Installation,
  InstallationModel: InstallationModel,
})

export const deleteInstallation = makeDeleteInstallation({
  InstallationModel: InstallationModel,
})
