import { MergeFreezeStatusDTO } from './merge-freeze-status-dto'

export interface SetFrozenStatusDTO
  extends Omit<MergeFreezeStatusDTO, 'isFrozen'> {}
