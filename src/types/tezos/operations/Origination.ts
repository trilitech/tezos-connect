import { TezosBaseOperation } from '../TezosBaseOperation'
import { TezosOperationType } from '../TezosOperationType'
import { Optional, omittedProperties } from '../optional'

export interface TezosOriginationOperation extends TezosBaseOperation {
  kind: TezosOperationType.ORIGINATION
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  balance: string
  delegate?: string
  script: string
}

export type PartialTezosOriginationOperation = Optional<TezosOriginationOperation, omittedProperties>

export function createOriginationOperation(params: {
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  balance: string
  delegate?: string
  script: string
}): TezosOriginationOperation {
  return {
    kind: TezosOperationType.ORIGINATION,
    ...params,
  }
}

export function createPartialOriginationOperation(params: {
  balance: string
  script: string
}): PartialTezosOriginationOperation {
  return {
    kind: TezosOperationType.ORIGINATION,
    ...params,
  }
}
