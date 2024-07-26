import { TezosBaseOperation } from '../TezosBaseOperation'
import { TezosOperationType } from '../TezosOperationType'

export interface TezosSeedNonceRevelationOperation extends TezosBaseOperation {
  kind: TezosOperationType.SEED_NONCE_REVELATION
  level: string
  nonce: string
}
