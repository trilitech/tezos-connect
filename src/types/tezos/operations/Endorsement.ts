import { TezosBaseOperation } from '../TezosBaseOperation'
import { TezosOperationType } from '../TezosOperationType'

export interface TezosEndorsementOperation extends TezosBaseOperation {
  kind: TezosOperationType.ENDORSEMENT
  level: string
}
