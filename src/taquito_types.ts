import { SmartRollupExecuteOutboxMessageParams } from "@taquito/taquito/dist/types/operations/types";
import { Optional } from "./beacon_types";
import {
    ActivationParams,
    DelegateParams,
    FailingNoopParams,
    IncreasePaidStorageParams,
    OpKind,
    OriginateParams,
    RegisterGlobalConstantParams,
    SmartRollupAddMessagesParams,
    SmartRollupOriginateParams,
    TransferParams,
    TransferTicketParams,
    UpdateConsensusKeyParams,
    withKind
} from "@taquito/taquito";

export type PartialParamsWithKind =
| withKind<OriginateParams, OpKind.ORIGINATION>
| withKind<Optional<DelegateParams, 'source'>, OpKind.DELEGATION>
| withKind<TransferParams, OpKind.TRANSACTION>
| withKind<ActivationParams, OpKind.ACTIVATION>
| withKind<RegisterGlobalConstantParams, OpKind.REGISTER_GLOBAL_CONSTANT>
| withKind<IncreasePaidStorageParams, OpKind.INCREASE_PAID_STORAGE>
| withKind<TransferTicketParams, OpKind.TRANSFER_TICKET>
| withKind<UpdateConsensusKeyParams, OpKind.UPDATE_CONSENSUS_KEY>
| withKind<SmartRollupAddMessagesParams, OpKind.SMART_ROLLUP_ADD_MESSAGES>
| withKind<FailingNoopParams, OpKind.FAILING_NOOP>
| withKind<SmartRollupOriginateParams, OpKind.SMART_ROLLUP_ORIGINATE>
| withKind<SmartRollupExecuteOutboxMessageParams, OpKind.SMART_ROLLUP_EXECUTE_OUTBOX_MESSAGE>;
