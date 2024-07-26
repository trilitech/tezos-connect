import { TezosBaseOperation } from '../TezosBaseOperation'
import { TezosOperationType } from '../TezosOperationType'
import { Optional, omittedProperties } from '../optional'
import { MichelineMichelsonV1Expression } from '../MichelineMichelsonV1Expression'
import { PvmKind } from '../common'

export interface TezosSmartRollupOriginateOperation extends TezosBaseOperation {
  kind: TezosOperationType.SMART_ROLLUP_ORIGINATE
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  pvm_kind: PvmKind
  kernel: string
  parameters_ty: MichelineMichelsonV1Expression
  whitelist?: string[]
}

export type PartialTezosSmartRollupOriginateOperation = Optional<TezosSmartRollupOriginateOperation, omittedProperties>
