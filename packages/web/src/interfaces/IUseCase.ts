export type MakeUseCase<Dependency, UseCase> = (dep: Dependency) => UseCase

export type IUseCase<IInput = any, IOutput = any> = (
  input: IInput
) => Promise<IOutput>
