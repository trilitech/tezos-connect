export { TezosOperationType } from "@airgap/beacon-sdk";

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

export interface PartialTezosOriginationOperationOverride
  extends Omit<TezosOriginationOperation, "script"> {
  script: ScriptedContracts;
}

type PartialTezosOperationOverride =
  | Exclude<PartialTezosOperation, PartialTezosOriginationOperation>
  | PartialTezosOriginationOperationOverride;

export { type PartialTezosOperationOverride as PartialTezosOperation };
