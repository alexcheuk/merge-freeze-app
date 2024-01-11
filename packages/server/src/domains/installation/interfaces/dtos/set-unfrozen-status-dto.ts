import { MergeFreezeStatusDTO } from './merge-freeze-status-dto'

export interface SetUnfrozenStatusDTO
  extends Omit<MergeFreezeStatusDTO, 'isFrozen' | 'reason'> {}
