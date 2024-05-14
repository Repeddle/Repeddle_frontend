import { ITransaction } from "./../types/transactions"
import { getBackendErrorMessage } from "../utils/error"
import api from "./api"

export const fetchTransactionsService = async (): Promise<ITransaction[]> => {
  try {
    const resp: { transactions: ITransaction[]; status: boolean } =
      await api.get("/transactions")

    if (!resp.status) {
      // Handle Fetch transactions error, e.g., display an error message to the user
      throw new Error(
        "Fetch transactions failed: " + getBackendErrorMessage(resp)
      )
    }

    return resp.transactions
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error("Fetch transactions error:", getBackendErrorMessage(error))

    // Re-throw the error to propagate it up the call stack if needed
    throw getBackendErrorMessage(error)
  }
}

export const fetchUserTransactionsService = async (): Promise<
  ITransaction[]
> => {
  try {
    const resp: { transactions: ITransaction[]; status: boolean } =
      await api.get("/transactions/user")

    if (!resp.status) {
      // Handle Fetch transactions error, e.g., display an error message to the user
      throw new Error(
        "Fetch transactions failed: " + getBackendErrorMessage(resp)
      )
    }

    return resp.transactions
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error("Fetch transactions error:", getBackendErrorMessage(error))

    // Re-throw the error to propagate it up the call stack if needed
    throw getBackendErrorMessage(error)
  }
}

export const fetchTransactionByIdService = async (
  id: string
): Promise<ITransaction> => {
  try {
    const resp: { transaction: ITransaction; status: boolean } = await api.get(
      `/transactions/user/${id}`
    )

    if (!resp.status) {
      // Handle Fetch transactions error, e.g., display an error message to the user
      throw new Error(
        "Fetch transactions failed: " + getBackendErrorMessage(resp)
      )
    }

    return resp.transaction
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error("Fetch transactions error:", getBackendErrorMessage(error))

    // Re-throw the error to propagate it up the call stack if needed
    throw getBackendErrorMessage(error)
  }
}