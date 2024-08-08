import { MichelineMichelsonV1Expression } from "@airgap/beacon-sdk";

// ScriptedContracts is not exported by Beacon SDK
export interface ScriptedContracts {
  code: MichelineMichelsonV1Expression[];
  storage: MichelineMichelsonV1Expression;
}

// omittedProperties is not exported by Beacon SDK
export type omittedProperties =
  | "source"
  | "fee"
  | "counter"
  | "gas_limit"
  | "storage_limit";
