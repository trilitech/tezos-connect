import { TezosOperationType, TezosBaseOperation, Optional } from '../beacon_types';
import { ScriptedContracts, omittedProperties } from '../common'

// The only difference between TezosOriginationOperation defined here and the one in the
// Beacon SDK is that the script property is defined as ScriptedContracts instead of string.
// We believe this is a bug in the Beacon SDK, and it should be fixed there.
// Meanwhile, we need to redefine the type here. This also leads to redefining
// PartialTezosOperation as it includes PartialTezosOriginationOperation.
export interface TezosOriginationOperation extends TezosBaseOperation {
  kind: TezosOperationType.ORIGINATION
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  balance: string
  delegate?: string
  script: ScriptedContracts
}

export type PartialTezosOriginationOperation = Optional<TezosOriginationOperation, omittedProperties>
