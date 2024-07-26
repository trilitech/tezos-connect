import { TezosBaseOperation } from '../TezosBaseOperation'
import { TezosOperationType } from '../TezosOperationType'
import { Optional, omittedProperties } from '../optional'
import { MichelineMichelsonV1Expression } from '../MichelineMichelsonV1Expression'

export interface TezosTransferTicketOperation extends TezosBaseOperation {
  kind: TezosOperationType.TRANSFER_TICKET
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  ticket_contents: MichelineMichelsonV1Expression
  ticket_ty: MichelineMichelsonV1Expression
  ticket_ticketer: string
  ticket_amount: string
  destination: string
  entrypoint: string
}

export type PartialTezosTransferTicketOperation = Optional<TezosTransferTicketOperation, omittedProperties>
