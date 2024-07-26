import exp from 'constants'
import { TezosOperationType } from '../TezosOperationType'
import { Optional, omittedProperties } from '../optional'
export interface TezosDalPublishCommitmentOperation {
  kind: TezosOperationType.DAL_PUBLISH_COMMITMENT
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  slot_header: {
    slot_index: number
    commitment: string
    commitment_proof: string
  }
}

export type PartialTezosDalPublishCommitmentOperation = Optional<TezosDalPublishCommitmentOperation, omittedProperties>

export function createDalPublishCommitmentOperation(params: {
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  slot_header: {
    slot_index: number
    commitment: string
    commitment_proof: string
  }
}): TezosDalPublishCommitmentOperation {
  return {
    kind: TezosOperationType.DAL_PUBLISH_COMMITMENT,
    ...params,
  }
}

export function createPartialDalPublishCommitmentOperation(params: {
  slot_header: {
    slot_index: number
    commitment: string
    commitment_proof: string
  }
}): PartialTezosDalPublishCommitmentOperation {
  return {
    kind: TezosOperationType.DAL_PUBLISH_COMMITMENT,
    ...params,
  }
}
