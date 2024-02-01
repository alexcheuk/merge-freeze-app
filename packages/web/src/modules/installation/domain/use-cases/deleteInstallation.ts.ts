import { IUseCase, MakeUseCase } from '@/interfaces/IUseCase'
import { type InstallationModel } from '../../models/InstallationModel'

type UseDeleteInstallationInput = void
type UseDeleteInstallationOutput = void

export const makeDeleteInstallation: MakeUseCase<
  {
    InstallationModel: InstallationModel
  },
  IUseCase<UseDeleteInstallationInput, UseDeleteInstallationOutput>
> = ({ InstallationModel }) => {
  return () => {
    return InstallationModel.deleteInstallation()
  }
}
