import { TezosOperationType } from '../TezosOperationType'
import { TezosBaseOperation } from '../TezosBaseOperation'
import { Optional, omittedProperties } from '../optional'

export interface TezosIncreasePaidStorageOperation extends TezosBaseOperation {
  kind: TezosOperationType.INCREASE_PAID_STORAGE
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  amount: string
  destination: string
}

export type PartialTezosIncreasePaidStorageOperation = Optional<TezosIncreasePaidStorageOperation, omittedProperties>

export function createIncreasePaidStorageOperation(params: {
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  amount: string
  destination: string
}): TezosIncreasePaidStorageOperation {
  return {
    kind: TezosOperationType.INCREASE_PAID_STORAGE,
    ...params,
  }
}

export function createPartialIncreasePaidStorageOperation(params: {
  amount: string
  destination: string
}): PartialTezosIncreasePaidStorageOperation {
  return {
    kind: TezosOperationType.INCREASE_PAID_STORAGE,
    ...params,
  }
}
