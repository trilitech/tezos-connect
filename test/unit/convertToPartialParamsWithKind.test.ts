import { OpKind } from "@taquito/taquito";
import {
  PartialTezosDelegationOperation,
  PartialTezosTransactionOperation,
  TezosOperationType,
  PartialTezosRegisterGlobalConstantOperation,
  PartialTezosSmartRollupAddMessagesOperation,
  PartialTezosSmartRollupExecuteOutboxMessageOperation,
  PartialTezosSmartRollupOriginateOperation,
  PartialTezosTransferTicketOperation,
  PartialTezosUpdateConsensusKeyOperation,
} from "../../src/beacon_types";
import { PartialTezosOriginationOperation } from "../../src/operations";
import { convertToPartialParamsWithKind } from "../../src/convert_beacon_to_taquito";
import { PartialParamsWithKind } from "../../src/taquito_types";
import { PvmKind } from "@taquito/rpc";


describe("convertToPartialParamsWithKind", () => {
  it("should convert ORIGINATION operation correctly", () => {
    const originationOp: PartialTezosOriginationOperation = {
      kind: TezosOperationType.ORIGINATION,
      balance: "1000000",
      script: { code: [], storage: [] },
      delegate: "tz1VSU...Yt8G",
      fee: "1000",
      gas_limit: "2000",
      storage_limit: "0",
    };

    const result = convertToPartialParamsWithKind(originationOp);

    expect(result).toEqual({
      kind: OpKind.ORIGINATION,
      balance: 1000000,
      code: [],
      init: [],
      delegate: "tz1VSU...Yt8G",
      fee: 1000,
      gasLimit: 2000,
      storageLimit: 0,
    });
  });

  it("should convert DELEGATION operation correctly", () => {
    const delegationOp: PartialTezosDelegationOperation = {
      kind: TezosOperationType.DELEGATION,
      source: "tz1VSU...Yt8G",
      delegate: "tz1VSU...Yt8G",
      fee: "1000",
      gas_limit: "2000",
      storage_limit: "0",
    };

    const result: PartialParamsWithKind = convertToPartialParamsWithKind(delegationOp);

    expect(result).toEqual({
      kind: OpKind.DELEGATION,
      source: "tz1VSU...Yt8G",
      delegate: "tz1VSU...Yt8G",
      fee: 1000,
      gasLimit: 2000,
      storageLimit: 0,
    });
  });

  it("should convert TRANSACTION operation correctly", () => {
    const transactionOp: PartialTezosTransactionOperation = {
      kind: TezosOperationType.TRANSACTION,
      destination: "tz1VSU...Yt8G",
      amount: "1000000",
      source: "tz1VSU...Yt8G",
      fee: "1000",
      gas_limit: "2000",
      storage_limit: "0",
      parameters: { entrypoint: "default", value: [] },
    };

    const result: PartialParamsWithKind = convertToPartialParamsWithKind(transactionOp);

    expect(result).toEqual({
      kind: OpKind.TRANSACTION,
      to: "tz1VSU...Yt8G",
      amount: 1000000,
      source: "tz1VSU...Yt8G",
      fee: 1000,
      gasLimit: 2000,
      storageLimit: 0,
      parameter: { entrypoint: "default", value: [] },
    });
  });

  it("should handle partial TRANSACTION operation", () => {
    const tezosTransactionOperation: PartialTezosTransactionOperation = {
      kind: TezosOperationType.TRANSACTION,
      destination: "tz1VSU...Yt8G",
      amount: "100",
    };

    const result: PartialParamsWithKind = convertToPartialParamsWithKind(tezosTransactionOperation);

    expect(result).toEqual({
      kind: OpKind.TRANSACTION,
      amount: 100,
      fee: undefined,
      gasLimit: undefined,
      parameter: undefined,
      source: undefined,
      storageLimit: undefined,
      to: "tz1VSU...Yt8G",
    });
  });

  it("should handle ORIGINATION operation with complex script", () => {
    const tezosOriginationOperation: PartialTezosOriginationOperation = {
      kind: TezosOperationType.ORIGINATION,
      balance: "1",
      script: {
        code: [
          { prim: "parameter", args: [{ prim: "unit" }] },
          { prim: "storage", args: [{ prim: "int" }] },
          {
            prim: "code",
            args: [
              [
                { prim: "CDR" },
                { prim: "PUSH", args: [{ prim: "int" }, { int: "10" }] },
                { prim: "ADD" },
                { prim: "NIL", args: [{ prim: "operation" }] },
                { prim: "PAIR" },
              ],
            ],
          },
        ],
        storage: { int: "0" },
      },
    };

    const result: PartialParamsWithKind = convertToPartialParamsWithKind(tezosOriginationOperation);

    expect(result).toEqual({
      balance: 1,
      code: [
        { prim: "parameter", args: [{ prim: "unit" }] },
        { prim: "storage", args: [{ prim: "int" }] },
        {
          prim: "code",
          args: [
            [
              { prim: "CDR" },
              { prim: "PUSH", args: [{ prim: "int" }, { int: "10" }] },
              { prim: "ADD" },
              { prim: "NIL", args: [{ prim: "operation" }] },
              { prim: "PAIR" },
            ],
          ],
        },
      ],
      delegate: undefined,
      fee: undefined,
      gasLimit: undefined,
      init: { int: "0" },
      kind: OpKind.ORIGINATION,
      storageLimit: undefined,
    });
  });

  it("should handle contract call TRANSACTION operation", () => {
    const tezosContractCallOperation: PartialTezosTransactionOperation = {
      kind: TezosOperationType.TRANSACTION,
      destination: "$(contractAddress)",
      amount: "0",
      parameters: { entrypoint: "default", value: { prim: "Unit" } },
    };

    const result: PartialParamsWithKind = convertToPartialParamsWithKind(tezosContractCallOperation);

    expect(result).toEqual({
      amount: 0,
      fee: undefined,
      gasLimit: undefined,
      kind: OpKind.TRANSACTION,
      parameter: { entrypoint: "default", value: { prim: "Unit" } },
      source: undefined,
      storageLimit: undefined,
      to: "$(contractAddress)",
    });
  });

  it("should handle DELEGATION operation", () => {
    const tezosDelegationOperation: PartialTezosDelegationOperation = {
      kind: TezosOperationType.DELEGATION,
      delegate: "tz3ZmB8oWUmi8YZXgeRpgAcPnEMD8VgUa4Ve", // Tezos Foundation Ghost Baker
    };

    const result: PartialParamsWithKind = convertToPartialParamsWithKind(tezosDelegationOperation);

    expect(result).toEqual({
      delegate: "tz3ZmB8oWUmi8YZXgeRpgAcPnEMD8VgUa4Ve",
      fee: undefined,
      gasLimit: undefined,
      kind: OpKind.DELEGATION,
      source: undefined,
      storageLimit: undefined,
    });
  });

  it("should handle undelegation operation", () => {
    const tezosUndelegationOperation: PartialTezosDelegationOperation = {
      kind: TezosOperationType.DELEGATION,
    };

    const result: PartialParamsWithKind = convertToPartialParamsWithKind(tezosUndelegationOperation);

    expect(result).toEqual({
      delegate: undefined,
      fee: undefined,
      gasLimit: undefined,
      kind: OpKind.DELEGATION,
      source: undefined,
      storageLimit: undefined,
    });
  });
    
  it("should convert REGISTER_GLOBAL_CONSTANT operation correctly", () => {
    const registerGlobalConstantOp: PartialTezosRegisterGlobalConstantOperation = {
      kind: TezosOperationType.REGISTER_GLOBAL_CONSTANT,
      source: "tz1VSU...Yt8G",
      fee: "1000",
      gas_limit: "2000",
      storage_limit: "0",
      value: { prim: "Pair", args: [] },
    };

    const result: PartialParamsWithKind = convertToPartialParamsWithKind(registerGlobalConstantOp);

    expect(result).toEqual({
      kind: OpKind.REGISTER_GLOBAL_CONSTANT,
      source: "tz1VSU...Yt8G",
      fee: 1000,
      gasLimit: 2000,
      storageLimit: 0,
      value: { prim: "Pair", args: [] },
    });
  });

  it("should convert SMART_ROLLUP_ADD_MESSAGES operation correctly", () => {
    const smartRollupAddMessagesOp: PartialTezosSmartRollupAddMessagesOperation = {
      kind: TezosOperationType.SMART_ROLLUP_ADD_MESSAGES,
      source: "tz1VSU...Yt8G",
      fee: "1000",
      gas_limit: "2000",
      storage_limit: "0",
      message: ["message1", "message2"],
    };

    const result: PartialParamsWithKind = convertToPartialParamsWithKind(smartRollupAddMessagesOp);

    expect(result).toEqual({
      kind: OpKind.SMART_ROLLUP_ADD_MESSAGES,
      source: "tz1VSU...Yt8G",
      fee: 1000,
      gasLimit: 2000,
      storageLimit: 0,
      message: ["message1", "message2"],
    });
  });

  it("should convert SMART_ROLLUP_EXECUTE_OUTBOX_MESSAGE operation correctly", () => {
    const smartRollupExecuteOutboxMessageOp: PartialTezosSmartRollupExecuteOutboxMessageOperation = {
      kind: TezosOperationType.SMART_ROLLUP_EXECUTE_OUTBOX_MESSAGE,
      source: "tz1VSU...Yt8G",
      fee: "1000",
      gas_limit: "2000",
      storage_limit: "0",
      rollup: "sr1VSU...Yt8G",
      cemented_commitment: "commitment_hash",
      output_proof: "proof_data",
    };

    const result: PartialParamsWithKind = convertToPartialParamsWithKind(smartRollupExecuteOutboxMessageOp);

    expect(result).toEqual({
      kind: OpKind.SMART_ROLLUP_EXECUTE_OUTBOX_MESSAGE,
      source: "tz1VSU...Yt8G",
      fee: 1000,
      gasLimit: 2000,
      storageLimit: 0,
      rollup: "sr1VSU...Yt8G",
      cementedCommitment: "commitment_hash",
      outputProof: "proof_data",
    });
  });

  it("should convert SMART_ROLLUP_ORIGINATE operation correctly", () => {
    const smartRollupOriginateOp: PartialTezosSmartRollupOriginateOperation = {
      kind: TezosOperationType.SMART_ROLLUP_ORIGINATE,
      source: "tz1VSU...Yt8G",
      fee: "1000",
      gas_limit: "2000",
      storage_limit: "0",
      pvm_kind: PvmKind.WASM2,
      kernel: "kernel_data",
      parameters_ty: { prim: 'int' } 
    };

    const result: PartialParamsWithKind = convertToPartialParamsWithKind(smartRollupOriginateOp);

    expect(result).toEqual({
      kind: OpKind.SMART_ROLLUP_ORIGINATE,
      source: "tz1VSU...Yt8G",
      fee: 1000,
      gasLimit: 2000,
      storageLimit: 0,
      pvmKind: PvmKind.WASM2,
      kernel: "kernel_data",
      parametersType: { prim: 'int' } 
    });
  });

  it("should convert TRANSFER_TICKET operation correctly", () => {
    const transferTicketOp: PartialTezosTransferTicketOperation = {
      kind: TezosOperationType.TRANSFER_TICKET,
      source: "tz1VSU...Yt8G",
      fee: "1000",
      gas_limit: "2000",
      storage_limit: "0",
      ticket_contents: { prim: 'int' } ,
      ticket_ty: { prim: 'int' } ,
      ticket_ticketer: "tz1VSU...Yt8G",
      ticket_amount: "100",
      destination: "tz1VSU...Yt8G",
      entrypoint: "default",
    };

    const result: PartialParamsWithKind = convertToPartialParamsWithKind(transferTicketOp);

    expect(result).toEqual({
      kind: OpKind.TRANSFER_TICKET,
      source: "tz1VSU...Yt8G",
      fee: 1000,
      gasLimit: 2000,
      storageLimit: 0,
      ticketContents: { prim: 'int' } ,
      ticketTy: { prim: 'int' } ,
      ticketTicketer: "tz1VSU...Yt8G",
      ticketAmount: 100,
      destination: "tz1VSU...Yt8G",
      entrypoint: "default",
    });
  });

  it("should convert UPDATE_CONSENSUS_KEY operation correctly", () => {
    const updateConsensusKeyOp: PartialTezosUpdateConsensusKeyOperation = {
      kind: TezosOperationType.UPDATE_CONSENSUS_KEY,
      source: "tz1VSU...Yt8G",
      fee: "1000",
      gas_limit: "2000",
      storage_limit: "0",
      pk: "public_key_data",
    };

    const result: PartialParamsWithKind = convertToPartialParamsWithKind(updateConsensusKeyOp);

    expect(result).toEqual({
      kind: OpKind.UPDATE_CONSENSUS_KEY,
      source: "tz1VSU...Yt8G",
      fee: 1000,
      gasLimit: 2000,
      storageLimit: 0,
      pk: "public_key_data",
    });
  });
});
