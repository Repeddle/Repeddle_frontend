export type PaystackResponse = {
  reference: string
  trans: string
  status: string
  message: string
  transaction: string
  trxref: string
  redirecturl: string
}

export type PayStackCallback = {
  transaction_id: string
  type: string
}
