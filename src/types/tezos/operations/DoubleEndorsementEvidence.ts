import { TezosBaseOperation } from '../TezosBaseOperation'
import { TezosOperationType } from '../TezosOperationType'

export interface InlinedEndorsement {
  branch: string
  operations: InlinedEndorsementContents
  signature?: string
}

export interface InlinedEndorsementContents extends TezosBaseOperation {
  kind: TezosOperationType.ENDORSEMENT
  level: string
}

export interface TezosDoubleEndorsementEvidenceOperation extends TezosBaseOperation {
  kind: TezosOperationType.DOUBLE_ENDORSEMENT_EVIDENCE
  op1: InlinedEndorsement
  op2: InlinedEndorsement
}
