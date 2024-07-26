import { TezosBaseOperation } from '../TezosBaseOperation'
import { TezosOperationType } from '../TezosOperationType'

export interface TezosBallotOperation extends TezosBaseOperation {
  kind: TezosOperationType.BALLOT
  source: string
  period: string
  proposal: string
  ballot: 'nay' | 'yay' | 'pass'
}
