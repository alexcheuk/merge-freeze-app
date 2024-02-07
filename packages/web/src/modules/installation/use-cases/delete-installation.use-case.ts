import { IInstallationApi } from '../interfaces/api/IInstallationApi'
import { IDeleteInstallationUseCase } from '../interfaces/use-cases/IDeleteInstallationUseCase'

interface Dependency {
  installationApi: IInstallationApi
}

export const makeDeleteInstallationUseCase = ({
  installationApi,
}: Dependency): IDeleteInstallationUseCase => {
  return () => {
    return installationApi.delete()
  }
}
