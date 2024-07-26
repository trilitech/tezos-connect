import { TezosBaseOperation } from '../TezosBaseOperation'
import { TezosOperationType } from '../TezosOperationType'
import { Optional, omittedProperties } from '../optional'

export interface TezosDelegationOperation extends TezosBaseOperation {
  kind: TezosOperationType.DELEGATION
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  delegate?: string
}

export type PartialTezosDelegationOperation = Optional<TezosDelegationOperation, omittedProperties>

export function createDelegationOperation(params: {
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  delegate?: string
}): TezosDelegationOperation {
  return {
    kind: TezosOperationType.DELEGATION,
    ...params,
  };
}

export function createPartialDelegationOperation(params: {
  delegate?: string
}): PartialTezosDelegationOperation {
  return {
    kind: TezosOperationType.DELEGATION,
    ...params,
  };
}
