import { TezosBaseOperation } from '../TezosBaseOperation'
import { TezosOperationType } from '../TezosOperationType'

export interface TezosProposalOperation extends TezosBaseOperation {
  kind: TezosOperationType.PROPOSALS
  period: string
  proposals: string[]
}
