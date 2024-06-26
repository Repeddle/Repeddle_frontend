import { CreateReturn, IReturn } from "../types/order"
import { getBackendErrorMessage } from "../utils/error"
import api from "./api"

export const fetchReturnService = async () => {
  try {
    const url = "/returns/user"

    const resp: {
      return: IReturn[]
      status: boolean
    } = await api.get(url)

    if (!resp.status) {
      // Handle Fetch return error, e.g., display an error message to the user
      throw new Error("Fetch return failed: " + getBackendErrorMessage(resp))
    }

    return resp.return
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error("Fetch return error:", getBackendErrorMessage(error))

    // Re-throw the error to propagate it up the call stack if needed
    throw getBackendErrorMessage(error)
  }
}

export const fetchReturnByIdService = async (id: string) => {
  try {
    const url = `/returns/${id}`

    const resp: {
      return: IReturn
      status: boolean
    } = await api.get(url)

    if (!resp.status) {
      // Handle Fetch return error, e.g., display an error message to the user
      throw new Error("Fetch return failed: " + getBackendErrorMessage(resp))
    }

    return resp.return
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error("Fetch return error:", getBackendErrorMessage(error))

    // Re-throw the error to propagate it up the call stack if needed
    throw getBackendErrorMessage(error)
  }
}

export const createReturnService = async (body: CreateReturn) => {
  try {
    const resp: { return: IReturn; status: boolean } = await api.post(
      `/returns`,
      body
    )

    if (!resp.status) {
      // Handle Fetch return error, e.g., display an error message to the user
      throw new Error("Fetch return failed: " + getBackendErrorMessage(resp))
    }

    return resp.return
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error("Fetch return error:", getBackendErrorMessage(error))

    // Re-throw the error to propagate it up the call stack if needed
    throw getBackendErrorMessage(error)
  }
}
