import axios from "axios";

import { UniversalProvider, Metadata } from "@walletconnect/universal-provider";
import { KeyValueStorageOptions } from "@walletconnect/keyvaluestorage";
import { Logger } from "@walletconnect/logger";
import { TezosToolkit } from "@taquito/taquito";
import {
  PartialTezosDalPublishCommitmentOperation,
  PartialTezosDelegationOperation,
  PartialTezosIncreasePaidStorageOperation,
  PartialTezosOperation as PartialTezosOperationOriginal,
  PartialTezosOriginationOperation as PartialTezosOriginationOperationOriginal,
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
  TezosBallotOperation,
  TezosFailingNoopOperation,
  TezosOperationType,
  TezosProposalOperation,
} from "@airgap/beacon-types";

import { ScriptedContracts } from "@taquito/rpc";
import {
  AssetData,
  ChainsMap,
  TezosConnectionError,
  TezosConnectOpts,
  TezosGetAccountResponse,
  TezosInitializationError,
  TezosMethod,
  TezosProviderError,
  TezosSendResponse,
  TezosSignResponse,
} from "./types";
import {
  DefaultTezosMethods,
  RelayUrl,
  TezosChainDataMainnet,
  TezosChainDataTestnet,
  TezosChainMap,
  UnsupportedOperations,
} from "./constants";
import { SessionTypes } from "@walletconnect/types";

interface PartialTezosOriginationOperation
  extends Omit<PartialTezosOriginationOperationOriginal, "script"> {
  script: ScriptedContracts;
}

type PartialTezosOperation =
  | Exclude<PartialTezosOperationOriginal, PartialTezosOriginationOperationOriginal>
  | PartialTezosOriginationOperation;

export interface TezosProviderOpts {
  projectId: string;
  metadata: Metadata;
  relayUrl?: string;
  storageOptions?: KeyValueStorageOptions;
  disableProviderPing?: boolean;
  logger?: string | Logger; // default: "info"
}

// Provides a way to interact with the Tezos blockchain.
// Secures that WalletConnect is used with PartialTezosOperation
export class TezosProvider {
  public namespace: string = "tezos";
  public signer?: InstanceType<typeof UniversalProvider> = undefined;
  private tezosToolkit?: TezosToolkit;
  public address?: string;
  public isConnected: boolean = false;
  public config?: TezosProviderOpts;
  public chainId: string = "";
  public chainMap: ChainsMap = TezosChainMap;
  public accounts: string[] = [];

  constructor() {}

  static init = async (
    opts: TezosProviderOpts = {
      projectId: "",
      metadata: {} as Metadata,
      relayUrl: RelayUrl, // default relay
      storageOptions: {} as KeyValueStorageOptions,
      disableProviderPing: false, // default is to enable ping
      logger: "info", // default log level
    },
  ): Promise<TezosProvider> => {
    const provider = new TezosProvider();
    await provider.initialize(opts);
    return provider;
  };

  protected initialize = async (opts: TezosProviderOpts): Promise<void> => {
    this.config = {
      ...opts,
    };
    this.signer = await UniversalProvider.init({
      ...opts,
    });

    this.signer.on("connect", () => {
      this.isConnected = true;
    });
    this.signer.on("disconnect", () => {
      this.isConnected = false;
    });
  };

  static extractChainId = (chain: string): string => {
    return chain.includes(":") ? chain.split(":")[1] : chain;
  };

  static formatTezosBalance = (asset: AssetData): string => {
    const formattedBalance = (asset.balance / 1_000_000).toFixed(6);
    return `${asset.name}: ${formattedBalance} ${asset.symbol}`;
  };

  // Override connect method
  public connect = async (
    opts: TezosConnectOpts = {
      chains: [TezosChainDataTestnet, TezosChainDataMainnet],
      methods: DefaultTezosMethods,
      events: [],
    },
  ): Promise<SessionTypes.Struct | undefined> => {
    if (!this.signer || !this.config) {
      throw new TezosInitializationError();
    }
    if (!opts.chains || !opts.chains.length) {
      throw new TezosProviderError("No chains provided");
    }

    this.chainId = opts.chains[0].id;

    // convert chain data to map with chain id as a key
    this.chainMap = opts.chains.reduce((acc, chain) => {
      acc[chain.id] = chain;
      return acc;
    }, {} as ChainsMap);

    let res = await this.signer.connect({
      namespaces: {
        tezos: {
          chains: opts.chains.map((chain) => chain.id),
          methods: opts.methods ?? DefaultTezosMethods,
          events: opts.events ?? [],
        },
      },
    });
    this.isConnected = true;

    const rpcUrl = this.chainMap[this.chainId].rpc[0];
    this.tezosToolkit = new TezosToolkit(rpcUrl);

    // Set the address if the session exists
    if (this.signer.session) {
      let accounts =
        this.signer.session.namespaces.tezos?.accounts.map((account) => account.split(":")[2]) ??
        [];
      if (!accounts.length) {
        throw new TezosProviderError("No accounts found in session");
      }
      // Ensure accounts array is unique
      this.accounts = [...new Set(accounts)];
      this.setAddress(this.accounts[0]);
    }
    return res;
  };

  public setAddress = (address: string): void => {
    if (!this.accounts.includes(address)) {
      throw new TezosProviderError(
        `Address ${address} not found in accounts ${this.accounts}. Get Accounts first.`,
      );
    }
    this.address = address;
  };

  public getChainId = (): string | undefined => {
    if (!this.config) {
      throw new TezosInitializationError();
    }
    return this.chainId;
  };

  // Method to get account balance
  public getBalance = async (): Promise<AssetData> => {
    if (!this.address) {
      throw new TezosConnectionError();
    }
    if (!this.tezosToolkit) {
      throw new TezosProviderError("tezosToolkit is not initialized");
    }
    const balance = await this.tezosToolkit.tz.getBalance(this.address);
    const balanceInTez = balance.toNumber();
    return {
      balance: balanceInTez,
      symbol: "ꜩ",
      name: "XTZ",
    };
  };

  public getFormattedBalance = async (): Promise<string> => {
    const balance = await this.getBalance();
    return `${balance.balance.toFixed(6)} ꜩ`;
  };

  public getContractAddress = async (hash: string): Promise<string[]> => {
    if (!hash) {
      throw new TezosProviderError(`No hash provided`);
    }

    const api = this.chainMap[this.chainId].api;
    const path = `${api}/operations/${hash}`;
    const response = await axios.get(path);
    const data = response.data;

    return data
      .map((op: any) => {
        const address =
          op?.status === "applied" && op?.originatedContract?.kind === "smart_contract"
            ? op.originatedContract.address
            : "";
        return address;
      })
      .filter((address: string) => address.length);
  };

  public getCurrentProposal = async (): Promise<string | null> => {
    if (!this.tezosToolkit) {
      throw new TezosProviderError("tezosToolkit is not initialized");
    }
    const currentProposal = await this.tezosToolkit.rpc.getCurrentProposal();
    return currentProposal;
  };

  public checkConnection = (): boolean => {
    if (!this.isConnected || !this.address) {
      throw new TezosConnectionError();
    }
    return true;
  };

  // Requests using the WalletConnect connection

  public tezosGetAccounts = async (): Promise<TezosGetAccountResponse> => {
    if (!this.signer) {
      throw new TezosInitializationError();
    }
    this.checkConnection();

    const result = await this.signer.request<TezosGetAccountResponse>(
      {
        method: TezosMethod.GET_ACCOUNTS,
        params: {},
      },
      this.chainId,
    );
    this.accounts = result.map((account) => account.address);

    return result;
  };

  // Method to sign a message
  public tezosSign = async (payload: string): Promise<TezosSignResponse> => {
    if (!this.signer) {
      throw new TezosInitializationError();
    }
    this.checkConnection();

    const result = await this.signer.request<TezosSignResponse>(
      {
        method: TezosMethod.SIGN,
        params: {
          account: this.address,
          payload,
        },
      },
      this.chainId,
    );

    return result;
  };

  // Method to send operations
  public tezosSend = async (op: PartialTezosOperation): Promise<TezosSendResponse> => {
    if (!this.signer) {
      throw new TezosInitializationError();
    }
    if (!this.address) {
      throw new TezosConnectionError();
    }
    if (UnsupportedOperations.includes(op.kind)) {
      throw new TezosProviderError(`Operation ${op.kind} is not supported for wallets`);
    }

    this.checkConnection();

    const result = await this.signer.request<TezosSendResponse>(
      {
        method: TezosMethod.SEND,
        params: {
          account: this.address,
          operations: [op],
        },
      },
      this.chainId,
    );
    return result;
  };

  // Method to send a transaction
  public tezosSendTransaction = async (
    op: PartialTezosTransactionOperation,
  ): Promise<TezosSendResponse> => {
    return await this.tezosSend(op);
  };

  // Method to send a delegation
  public tezosSendDelegation = async (
    op: PartialTezosDelegationOperation,
  ): Promise<TezosSendResponse> => {
    return await this.tezosSend(op);
  };

  // Method to send an undelegation
  public tezosSendUndelegation = async (): Promise<TezosSendResponse> => {
    const op: PartialTezosDelegationOperation = { kind: TezosOperationType.DELEGATION };
    return await this.tezosSend(op);
  };

  // Method to originate a contract
  public tezosSendOrigination = async (
    op: PartialTezosOriginationOperation,
  ): Promise<TezosSendResponse> => {
    return await this.tezosSend(op);
  };

  // Method to call a smart contract: destination is the contract address, entrypoint as defined in the contract
  public tezosSendContractCall = async (
    op: PartialTezosTransactionOperation,
  ): Promise<TezosSendResponse> => {
    return await this.tezosSend(op);
  };

  public tezosSendStake = async (
    op: PartialTezosTransactionOperation,
  ): Promise<TezosSendResponse> => {
    if (!this.address) {
      throw new TezosConnectionError();
    }
    return await this.tezosSend({
      ...op,
      destination: this.address,
      parameters: { entrypoint: "stake", value: { prim: "Unit" } },
    });
  };

  public tezosSendUnstake = async (
    op: PartialTezosTransactionOperation,
  ): Promise<TezosSendResponse> => {
    if (!this.address) {
      throw new TezosConnectionError();
    }
    return await this.tezosSend({
      ...op,
      destination: this.address,
      parameters: { entrypoint: "unstake", value: { prim: "Unit" } },
    });
  };

  public tezosSendFinalizeUnstake = async (
    op: PartialTezosTransactionOperation,
  ): Promise<TezosSendResponse> => {
    if (!this.address) {
      throw new TezosConnectionError();
    }
    return await this.tezosSend({
      ...op,
      destination: this.address,
      parameters: { entrypoint: "finalize_unstake", value: { prim: "Unit" } },
    });
  };

  public tezosSendActivateAccount = async (
    op: TezosActivateAccountOperation,
  ): Promise<TezosSendResponse> => {
    if (!this.address) {
      throw new TezosConnectionError();
    }
    return await this.tezosSend({ ...op, pkh: this.address });
  };

  public tezosSendBallot = async (op: TezosBallotOperation): Promise<TezosSendResponse> => {
    return await this.tezosSend(op);
  };

  public tezosSendDalPublishCommitment = async (
    op: PartialTezosDalPublishCommitmentOperation,
  ): Promise<TezosSendResponse> => {
    return await this.tezosSend(op);
  };

  public tezosSendFailingNoop = async (
    op: TezosFailingNoopOperation,
  ): Promise<TezosSendResponse> => {
    return await this.tezosSend(op);
  };

  public tezosSendIncreasePaidStorage = async (
    op: PartialTezosIncreasePaidStorageOperation,
  ): Promise<TezosSendResponse> => {
    return await this.tezosSend(op);
  };

  public tezosSendProposal = async (op: TezosProposalOperation): Promise<TezosSendResponse> => {
    return await this.tezosSend(op);
  };

  public tezosSendRegisterGlobalConstant = async (
    op: PartialTezosRegisterGlobalConstantOperation,
  ): Promise<TezosSendResponse> => {
    return await this.tezosSend(op);
  };

  public tezosSendReveal = async (op: PartialTezosRevealOperation): Promise<TezosSendResponse> => {
    return await this.tezosSend(op);
  };

  public tezosSendSetDepositsLimit = async (
    op: PartialTezosSetDepositsLimitOperation,
  ): Promise<TezosSendResponse> => {
    return await this.tezosSend(op);
  };

  public tezosSendSmartRollupAddMessages = async (
    op: PartialTezosSmartRollupAddMessagesOperation,
  ): Promise<TezosSendResponse> => {
    return await this.tezosSend(op);
  };

  public tezosSendSmartRollupCement = async (
    op: PartialTezosSmartRollupCementOperation,
  ): Promise<TezosSendResponse> => {
    return await this.tezosSend(op);
  };

  public tezosSendSmartRollupExecuteOutboxMessage = async (
    op: PartialTezosSmartRollupExecuteOutboxMessageOperation,
  ): Promise<TezosSendResponse> => {
    return await this.tezosSend(op);
  };

  public tezosSendSmartRollupOriginate = async (
    op: PartialTezosSmartRollupOriginateOperation,
  ): Promise<TezosSendResponse> => {
    return await this.tezosSend(op);
  };

  public tezosSendSmartRollupPublish = async (
    op: PartialTezosSmartRollupPublishOperation,
  ): Promise<TezosSendResponse> => {
    return await this.tezosSend(op);
  };

  public tezosSendSmartRollupRecoverBond = async (
    op: PartialTezosSmartRollupRecoverBondOperation,
  ): Promise<TezosSendResponse> => {
    return await this.tezosSend(op);
  };

  public tezosSendSmartRollupRefute = async (
    op: PartialTezosSmartRollupRefuteOperation,
  ): Promise<TezosSendResponse> => {
    return await this.tezosSend(op);
  };

  public tezosSendSmartRollupTimeout = async (
    op: PartialTezosSmartRollupTimeoutOperation,
  ): Promise<TezosSendResponse> => {
    return await this.tezosSend(op);
  };

  public tezosSendTransferTicket = async (
    op: PartialTezosTransferTicketOperation,
  ): Promise<TezosSendResponse> => {
    return await this.tezosSend(op);
  };

  public tezosSendUpdateConsensusKey = async (
    op: PartialTezosUpdateConsensusKeyOperation,
  ): Promise<TezosSendResponse> => {
    return await this.tezosSend(op);
  };
}

export default TezosProvider;
