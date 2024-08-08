import {
    PartialTezosDalPublishCommitmentOperation,
    PartialTezosDelegationOperation,
    PartialTezosIncreasePaidStorageOperation,
    PartialTezosRegisterGlobalConstantOperation,
    PartialTezosRevealOperation,
    PartialTezosSetDepositsLimitOperation,
    PartialTezosSmartRollupAddMessagesOperation,
    PartialTezosSmartRollupCementOperation,
    PartialTezosSmartRollupExecuteOutboxMessageOperation,
    PartialTezosSmartRollupOriginateOperation,
    PartialTezosSmartRollupPublishOperation,
    PartialTezosSmartRollupRecoverBondOperation,
    PartialTezosSmartRollupRefuteOperation,
    PartialTezosSmartRollupTimeoutOperation,
    PartialTezosTransactionOperation,
    PartialTezosTransferTicketOperation,
    PartialTezosUpdateConsensusKeyOperation,
    TezosActivateAccountOperation,
    TezosAttestationOperation,
    TezosAttestationWithSlotOperation,
    TezosBallotOperation,
    TezosDoubleAttestationEvidenceOperation,
    TezosDoubleBakingEvidenceOperation,
    TezosDoublePreAttestationEvidenceOperation,
    TezosDoublePreEndorsementEvidenceOperation,
    TezosDrainDelegateOperation,
    TezosEndorsementOperation,
    TezosEndorsementWithSlotOperation,
    TezosFailingNoopOperation,
    TezosPreAttestationOperation,
    TezosProposalOperation,
    TezosSeedNonceRevelationOperation,
    TezosVdfRevelationOperation,
} from '../beacon_types'

import { PartialTezosOriginationOperation } from './Origination'

// This type is redefined here because of a bug in the Beacon SDK in the definition
// of TezosOriginationOperation. In the Beacon SDK, the script property is defined as string,
// but it should be ScriptedContracts instead.
// Here we redefine PartialTezosOperation to include the fixed PartialTezosOriginationOperation.
export type PartialTezosOperation =
    | PartialTezosDalPublishCommitmentOperation
    | PartialTezosDelegationOperation
    | PartialTezosIncreasePaidStorageOperation
    | PartialTezosOriginationOperation
    | PartialTezosRegisterGlobalConstantOperation
    | PartialTezosRevealOperation
    | PartialTezosSetDepositsLimitOperation
    | PartialTezosSmartRollupAddMessagesOperation
    | PartialTezosSmartRollupCementOperation
    | PartialTezosSmartRollupExecuteOutboxMessageOperation
    | PartialTezosSmartRollupOriginateOperation
    | PartialTezosSmartRollupPublishOperation
    | PartialTezosSmartRollupRecoverBondOperation
    | PartialTezosSmartRollupRefuteOperation
    | PartialTezosSmartRollupTimeoutOperation
    | PartialTezosTransactionOperation
    | PartialTezosTransferTicketOperation
    | PartialTezosUpdateConsensusKeyOperation
    | TezosActivateAccountOperation
    | TezosAttestationOperation
    | TezosAttestationWithSlotOperation
    | TezosBallotOperation
    | TezosDoubleAttestationEvidenceOperation
    | TezosDoubleBakingEvidenceOperation
    | TezosDoublePreAttestationEvidenceOperation
    | TezosDoublePreEndorsementEvidenceOperation
    | TezosDrainDelegateOperation
    | TezosEndorsementOperation
    | TezosEndorsementWithSlotOperation
    | TezosFailingNoopOperation
    | TezosPreAttestationOperation
    | TezosProposalOperation
    | TezosSeedNonceRevelationOperation
    | TezosVdfRevelationOperation

    // TezosPreEndorsementOperation is not exported by Beacon SDK
    // which means that it is not used. We also do not export it.
