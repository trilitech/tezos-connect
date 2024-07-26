import { TezosBaseOperation } from '../TezosBaseOperation'
import { TezosOperationType } from '../TezosOperationType'
import { Optional, omittedProperties } from '../optional'
import { SmartRollupPublishCommitment } from '../common'

export interface TezosSmartRollupPublishOperation extends TezosBaseOperation {
  kind: TezosOperationType.SMART_ROLLUP_PUBLISH
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  rollup: string
  commitment: SmartRollupPublishCommitment
}

export type PartialTezosSmartRollupPublishOperation = Optional<TezosSmartRollupPublishOperation, omittedProperties>
