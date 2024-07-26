import { TezosBaseOperation } from '../TezosBaseOperation'
import { TezosOperationType } from '../TezosOperationType'
import { Optional, omittedProperties } from '../optional'

export interface TezosRevealOperation extends TezosBaseOperation {
  kind: TezosOperationType.REVEAL
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  public_key: string
}

export type PartialTezosRevealOperation = Optional<TezosRevealOperation, omittedProperties>

export function createRevealOperation(params: {
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  public_key: string
}): TezosRevealOperation {
  return {
    kind: TezosOperationType.REVEAL,
    ...params,
  }
}

export function createPartialRevealOperation(params: {
  public_key: string
}): PartialTezosRevealOperation {
  return {
    kind: TezosOperationType.REVEAL,
    ...params,
  }
}
