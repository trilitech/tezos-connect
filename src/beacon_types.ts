export {
  TezosOperationType,
  type PartialTezosDalPublishCommitmentOperation,
  type PartialTezosDelegationOperation,
  type PartialTezosIncreasePaidStorageOperation,
  type PartialTezosRegisterGlobalConstantOperation,
  type PartialTezosRevealOperation,
  type PartialTezosSetDepositsLimitOperation,
  type PartialTezosSmartRollupAddMessagesOperation,
  type PartialTezosSmartRollupCementOperation,
  type PartialTezosSmartRollupExecuteOutboxMessageOperation,
  type PartialTezosSmartRollupOriginateOperation,
  type PartialTezosSmartRollupPublishOperation,
  type PartialTezosSmartRollupRecoverBondOperation,
  type PartialTezosSmartRollupRefuteOperation,
  type PartialTezosSmartRollupTimeoutOperation,
  type PartialTezosTransactionOperation,
  type PartialTezosTransferTicketOperation,
  type PartialTezosUpdateConsensusKeyOperation,
  type TezosActivateAccountOperation,
  type TezosAttestationOperation,
  type TezosAttestationWithSlotOperation,
  type TezosBallotOperation,
  type TezosDoubleAttestationEvidenceOperation,
  type TezosDoubleBakingEvidenceOperation,
  type TezosDoublePreAttestationEvidenceOperation,
  type TezosDoublePreEndorsementEvidenceOperation,
  type TezosDrainDelegateOperation,
  type TezosEndorsementOperation,
  type TezosEndorsementWithSlotOperation,
  type TezosFailingNoopOperation,
  type TezosPreAttestationOperation,
  type TezosProposalOperation,
  type TezosSeedNonceRevelationOperation,
  type TezosVdfRevelationOperation
 } from "@airgap/beacon-sdk";

import {
  MichelineMichelsonV1Expression,
  PartialTezosOriginationOperation,
  type PartialTezosOperation,
  type TezosOriginationOperation,
} from "@airgap/beacon-sdk";

export interface ScriptedContracts {
  code: MichelineMichelsonV1Expression[];
  storage: MichelineMichelsonV1Expression;
}

export interface TezosOriginationOperationOverride
  extends Omit<TezosOriginationOperation, "script"> {
  script: ScriptedContracts;
}

export interface PartialTezosOriginationOperationOverride
  extends Omit<PartialTezosOriginationOperation, "script"> {
  script: ScriptedContracts;
}

type PartialTezosOperationOverride =
  | Exclude<PartialTezosOperation, PartialTezosOriginationOperation>
  | PartialTezosOriginationOperationOverride;

export { type PartialTezosOperationOverride as PartialTezosOperation };
export { type PartialTezosOriginationOperationOverride as PartialTezosOriginationOperation };
