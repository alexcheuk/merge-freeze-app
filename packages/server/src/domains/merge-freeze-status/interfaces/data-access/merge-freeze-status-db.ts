import { Document } from 'mongoose'
import { SetFrozenStatusDTO } from '../../../installation/interfaces/dtos/set-frozen-status-dto'
import { SetUnfrozenStatusDTO } from '../../../installation/interfaces/dtos/set-unfrozen-status-dto'
import { MergeFreezeStatusDocument } from '../models/merge-freeze-status-document'

export interface MergeFreezeStatusDb {
  freeze: (
    status: SetFrozenStatusDTO
  ) => Promise<Document<MergeFreezeStatusDocument>>
  unfreeze: (
    status: SetUnfrozenStatusDTO
  ) => Promise<Document<MergeFreezeStatusDocument>>
}
