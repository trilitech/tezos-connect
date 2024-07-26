import {
  TezosActivateAccountOperation,
  TezosBallotOperation,
  TezosDelegationOperation,
  TezosDoubleBakingEvidenceOperation,
  TezosEndorsementOperation,
  TezosOriginationOperation,
  TezosProposalOperation,
  TezosRevealOperation,
  TezosSeedNonceRevelationOperation,
  TezosTransactionOperation
} from './operations'

export type TezosOperation =
  | TezosActivateAccountOperation
  | TezosBallotOperation
  | TezosDelegationOperation
  | TezosDoubleBakingEvidenceOperation
  | TezosEndorsementOperation
  | TezosOriginationOperation
  | TezosProposalOperation
  | TezosRevealOperation
  | TezosSeedNonceRevelationOperation
  | TezosTransactionOperation
