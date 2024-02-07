export type MakeUseCase<Dependency, UseCase> = (dep: Dependency) => UseCase

export type IUseCase<IInput = void, IOutput = void> = (
  input: IInput
) => Promise<IOutput>
