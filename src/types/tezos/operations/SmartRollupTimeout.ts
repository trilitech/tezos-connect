import { TezosBaseOperation } from '../TezosBaseOperation'
import { TezosOperationType } from '../TezosOperationType'
import { Optional, omittedProperties } from '../optional'

export interface TezosSmartRollupTimeoutOperation extends TezosBaseOperation {
  kind: TezosOperationType.SMART_ROLLUP_TIMEOUT
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  rollup: string
  stakers: SmartRollupTimeoutStakers
}

export type PartialTezosSmartRollupTimeoutOperation = Optional<TezosSmartRollupTimeoutOperation, omittedProperties>

export interface SmartRollupTimeoutStakers {
  alice: string
  bob: string
}
