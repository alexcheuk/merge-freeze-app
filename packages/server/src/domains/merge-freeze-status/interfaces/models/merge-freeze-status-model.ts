import { Document, Model } from 'mongoose'
import { MergeFreezeStatusDocument } from './merge-freeze-status-document'
import { SetFrozenStatusDTO } from '../../../installation/interfaces/dtos/set-frozen-status-dto'
import { SetUnfrozenStatusDTO } from '../../../installation/interfaces/dtos/set-unfrozen-status-dto'

export interface MergeFreezeStatusModel
  extends Model<MergeFreezeStatusDocument> {
  getStatusListByRepo: (
    owner: string,
    repo: string,
    query: any
  ) => Promise<Document<MergeFreezeStatusDocument>>
  getLastStatus: (
    owner: string,
    repo: string,
    callback: () => void
  ) => Promise<Document<MergeFreezeStatusDocument>>
  setFrozen: ({
    owner,
    repo,
    source,
    id,
    name,
    reason,
    metadata,
  }: SetFrozenStatusDTO) => Promise<Document<MergeFreezeStatusDocument>>
  setUnfrozen: ({
    owner,
    repo,
    source,
    id,
    name,
    metadata,
  }: SetUnfrozenStatusDTO) => Promise<Document<MergeFreezeStatusDocument>>
}
