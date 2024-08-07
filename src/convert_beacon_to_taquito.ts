import { OpKind } from "@taquito/taquito";
import { TezosOperationType } from "./beacon_types";
import { PartialTezosOperation } from "./operations";
import { PartialParamsWithKind } from "./taquito_types";

export function convertToPartialParamsWithKind (op: PartialTezosOperation): PartialParamsWithKind {
  switch (op.kind) {
    case TezosOperationType.ACTIVATE_ACCOUNT:
      return {
        kind: OpKind.ACTIVATION,
        pkh: op.pkh,
        secret: op.secret,
      };
    case TezosOperationType.DELEGATION:
      return {
        kind: OpKind.DELEGATION,
        source: op.source ? op.source : undefined,
        delegate: op.delegate,
        fee: op.fee ? Number(op.fee) : undefined,
        gasLimit: op.gas_limit ? Number(op.gas_limit) : undefined,
        storageLimit: op.storage_limit ? Number(op.storage_limit) : undefined,
      };
    case TezosOperationType.FAILING_NOOP:
      return {
        kind: OpKind.FAILING_NOOP,
        arbitrary: op.arbitrary,
        basedOnBlock: 'head' 
      };
    case TezosOperationType.INCREASE_PAID_STORAGE:
      return {
        kind: OpKind.INCREASE_PAID_STORAGE,
        source: op.source,
        fee: op.fee ? Number(op.fee) : undefined,
        gasLimit: op.gas_limit ? Number(op.gas_limit) : undefined,
        storageLimit: op.storage_limit ? Number(op.storage_limit) : undefined,
        amount: Number(op.amount),
        destination: op.destination
      };
    case TezosOperationType.INCREASE_PAID_STORAGE:
      return {
        kind: OpKind.INCREASE_PAID_STORAGE,
        source: op.source,
        fee: op.fee ? Number(op.fee) : undefined,
        gasLimit: op.gas_limit ? Number(op.gas_limit) : undefined,
        storageLimit: op.storage_limit ? Number(op.storage_limit) : undefined,
        amount: Number(op.amount),
        destination: op.destination,
      };
      case TezosOperationType.ORIGINATION:
        return {
          kind: OpKind.ORIGINATION,
          balance: Number(op.balance),
          code: op.script.code,
          init: op.script.storage,
          delegate: op.delegate,
          fee: op.fee ? Number(op.fee) : undefined,
          gasLimit: op.gas_limit ? Number(op.gas_limit) : undefined,
          storageLimit: op.storage_limit ? Number(op.storage_limit) : undefined
        };
      case TezosOperationType.REGISTER_GLOBAL_CONSTANT:
        return {
          kind: OpKind.REGISTER_GLOBAL_CONSTANT,
          source: op.source,
          fee: op.fee ? Number(op.fee) : undefined,
          gasLimit: op.gas_limit ? Number(op.gas_limit) : undefined,
          storageLimit: op.storage_limit ? Number(op.storage_limit) : undefined,
          value: op.value
        };
      case TezosOperationType.SMART_ROLLUP_ADD_MESSAGES:
        return {
          kind: OpKind.SMART_ROLLUP_ADD_MESSAGES,
          source: op.source,
          fee: op.fee ? Number(op.fee) : undefined,
          gasLimit: op.gas_limit ? Number(op.gas_limit) : undefined,
          storageLimit: op.storage_limit ? Number(op.storage_limit) : undefined,
          message: op.message
        };
      case TezosOperationType.SMART_ROLLUP_EXECUTE_OUTBOX_MESSAGE:
        return {
          kind: OpKind.SMART_ROLLUP_EXECUTE_OUTBOX_MESSAGE,
          source: op.source,
          fee: op.fee ? Number(op.fee) : undefined,
          gasLimit: op.gas_limit ? Number(op.gas_limit) : undefined,
          storageLimit: op.storage_limit ? Number(op.storage_limit) : undefined,
          rollup: op.rollup,
          cementedCommitment: op.cemented_commitment,
          outputProof: op.output_proof,
        };
      case TezosOperationType.SMART_ROLLUP_ORIGINATE:
        return {
          kind: OpKind.SMART_ROLLUP_ORIGINATE,
          source: op.source,
          fee: op.fee ? Number(op.fee) : undefined,
          gasLimit: op.gas_limit ? Number(op.gas_limit) : undefined,
          storageLimit: op.storage_limit ? Number(op.storage_limit) : undefined,
          pvmKind: op.pvm_kind,
          kernel: op.kernel,
          parametersType: op.parameters_ty,
        };
      case TezosOperationType.TRANSACTION:
        return {
          kind: OpKind.TRANSACTION,
          to: op.destination,
          amount: Number(op.amount),
          source: op.source,
          fee: op.fee ? Number(op.fee) : undefined,
          gasLimit: op.gas_limit ? Number(op.gas_limit) : undefined,
          storageLimit: op.storage_limit ? Number(op.storage_limit) : undefined,
          parameter: op.parameters,
        };
      case TezosOperationType.TRANSFER_TICKET:
        return {
          kind: OpKind.TRANSFER_TICKET,
          source: op.source,
          fee: op.fee ? Number(op.fee) : undefined,
          gasLimit: op.gas_limit ? Number(op.gas_limit) : undefined,
          storageLimit: op.storage_limit ? Number(op.storage_limit) : undefined,
          ticketContents: op.ticket_contents,
          ticketTy: op.ticket_ty,
          ticketTicketer: op.ticket_ticketer,
          ticketAmount: Number(op.ticket_amount),
          destination: op.destination,
          entrypoint: op.entrypoint
        };
      case TezosOperationType.UPDATE_CONSENSUS_KEY:
        return {
          kind: OpKind.UPDATE_CONSENSUS_KEY,
          source: op.source,
          fee: op.fee ? Number(op.fee) : undefined,
          gasLimit: op.gas_limit ? Number(op.gas_limit) : undefined,
          storageLimit: op.storage_limit ? Number(op.storage_limit) : undefined,
          pk: op.pk
        };

      default:
        throw new Error(`Unsupported operation kind: ${op.kind}`);
    }
};
  