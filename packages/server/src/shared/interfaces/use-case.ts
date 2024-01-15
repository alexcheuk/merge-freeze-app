export type UseCase<Input, Output> = (input: Input) => Promise<Output | null>
