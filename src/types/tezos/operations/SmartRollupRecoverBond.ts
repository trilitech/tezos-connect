import exp from 'constants'
import { TezosBaseOperation } from '../TezosBaseOperation'
import { TezosOperationType } from '../TezosOperationType'
import { Optional, omittedProperties } from '../optional'

export interface TezosSmartRollupRecoverBondOperation extends TezosBaseOperation {
  kind: TezosOperationType.SMART_ROLLUP_RECOVER_BOND
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  rollup: string
  staker: string
}

export type PartialTezosSmartRollupRecoverBondOperation = Optional<TezosSmartRollupRecoverBondOperation, omittedProperties>
