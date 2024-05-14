export type ITransaction = {
  _id: string
  txnType: string
  purpose: string
  amount: number
  accountId: string
  reference: string
  balanceBefore: number
  balanceAfter: number
  metadata: {
    senderId?: string
    purpose: string
    recipientId?: string
    transaction_id?: string | number
  }
  transactionId?: string
  createdAt: string
  updatedAt: string
}

export type IPayment = {
  _id: string
  userId: {
    _id: string
    username: string
  }
  amount: number
  status: string
  meta: {
    Type: string
    from: string
    to: string
    currency: string
    detail?: {
      accountName: string
      bankName: string
      accountNumber: number
    }
    typeName?: string
    id?: string
    typeNpame?: string
  }
  paymentId: string
  createdAt: string
  updatedAt: string
}