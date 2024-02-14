import { Installation } from '../entities/installation.entity'
import { IInstallationApi } from '../../../data/installation/interfaces/api/IInstallationApi'
import { IGetInstallation } from '../interfaces/use-cases/IGetInstallation'

interface Dependency {
  installationApi: IInstallationApi
  Installation: typeof Installation
}

export const makeGetInstallationUseCase = ({
  installationApi,
  Installation,
}: Dependency): IGetInstallation => {
  return () => {
    return installationApi
      .get()
      .then((res) => res.data)
      .then((installation) => {
        return new Installation(installation)
      })
  }
}
