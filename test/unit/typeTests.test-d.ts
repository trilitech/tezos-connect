import { expectType } from 'tsd';
import {
    TezosOperationType,
    PartialTezosDelegationOperation,
    PartialTezosOriginationOperation
} from '../../';

// Delegation tests

// everything is default; undelegation
const partialTezosDelegationOpNone: PartialTezosDelegationOperation = {kind: TezosOperationType.DELEGATION};
expectType<PartialTezosDelegationOperation>(partialTezosDelegationOpNone);

// all optional parameters are defined
const partialTezosDelegationOpAll: PartialTezosDelegationOperation = {
    kind: TezosOperationType.DELEGATION,
    source: 'tz1VSU...Yt8G',
    fee: '1000',
    counter: '123456',
    gas_limit: '2000',
    storage_limit: '0',
    delegate: 'tz1VSU...Yt8G'
};
expectType<PartialTezosDelegationOperation>(partialTezosDelegationOpAll);

// a part of optional parameters defined
const partialTezosDelegationOpPart: PartialTezosDelegationOperation = {
    kind: TezosOperationType.DELEGATION,
    source: 'tz1VSU...Yt8G',
    delegate: 'tz1VSU...Yt8G'
};
expectType<PartialTezosDelegationOperation>(partialTezosDelegationOpPart);

// Origination tests

// all optional args are default
const partialTezosOriginationOpNone: PartialTezosOriginationOperation = {
    kind: TezosOperationType.ORIGINATION,
    balance: '0',
    script: {
        code: [
          { prim: "parameter", args: [{ prim: "unit" }] },
          { prim: "storage", args: [{ prim: "int" }] },
          {
            prim: "code",
            args: [[
              { prim: "CDR" },
              { prim: "PUSH", args: [{ prim: "int" }, { int: "10" }] },
              { prim: "ADD" },
              { prim: "NIL", args: [{ prim: "operation" }] },
              { prim: "PAIR" }
            ]]
          }
        ],
        storage: { int: "0" }
    }
};
expectType<PartialTezosOriginationOperation>(partialTezosOriginationOpNone);

// all optional parameters are defined
const partialTezosOriginationOpAll: PartialTezosOriginationOperation = {
    kind: TezosOperationType.ORIGINATION,
    source: 'tz1VSU...Yt8G',
    fee: '1000',
    counter: '123456',
    gas_limit: '2000',
    storage_limit: '0',
    balance: '1000000',
    delegate: 'tz1VSU...Yt8G',
    script: {
        code: [
          { prim: "parameter", args: [{ prim: "unit" }] },
          { prim: "storage", args: [{ prim: "unit" }] },
          {
            prim: "code",
            args: [[
              { prim: "CDR" },
              { prim: "PUSH", args: [{ prim: "int" }, { int: "10" }] },
              { prim: "ADD" },
              { prim: "NIL", args: [{ prim: "operation" }] },
              { prim: "PAIR" }
            ]]
          }
        ],
        storage: { prim: "Unit" }
    }
};
expectType<PartialTezosOriginationOperation>(partialTezosOriginationOpAll);
