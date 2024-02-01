import { IUseCase, MakeUseCase } from '@/interfaces/IUseCase'
import { type InstallationModel } from '../../models/InstallationModel'
import { Installation } from '../entities/Installation'

type UseGetInstallationInput = void
type UseGetInstallationOutput = Installation

export const makeGetInstallation: MakeUseCase<
  {
    InstallationModel: InstallationModel
    Installation: typeof Installation
  },
  IUseCase<UseGetInstallationInput, UseGetInstallationOutput>
> = ({ InstallationModel, Installation }) => {
  return () => {
    return InstallationModel.getInstallation()
      .then((res) => res.data)
      .then((installation) => {
        return new Installation(installation)
      })
  }
}
