import { createContext, PropsWithChildren, useState } from "react"
import useAuth from "../hooks/useAuth"
import { CreateReturn, IReturn } from "../types/order"
import {
  createReturnService,
  fetchAdminReturnService,
  fetchPurchaseReturnService,
  fetchReturnByIdService,
  fetchSoldReturnService,
  updateReturnAddressService,
  updateReturnStatusAdminService,
  updateReturnStatusService,
} from "../services/return"

type ContextType = {
  returns: IReturn[]
  loading: boolean
  error: string
  fetchSoldReturns: () => Promise<boolean>
  fetchPurchaseReturns: () => Promise<boolean>
  fetchAdminReturns: (status?: string) => Promise<boolean>
  createReturns: (body: CreateReturn) => Promise<IReturn | null>
  fetchReturnById: (id: string) => Promise<IReturn | null>
  updateReturnStatusAdmin: (
    id: string,
    body: { status: string; adminReason: string }
  ) => Promise<IReturn | null>
  updateReturnStatus: (
    id: string,
    body: { status: string; trackingNumber?: string }
  ) => Promise<IReturn | null>
  updateReturnAddress: (
    id: string,
    body: { method: string; fee: number }
  ) => Promise<IReturn | null>
}

// Create return context
export const ReturnContext = createContext<ContextType | undefined>(undefined)

export const ReturnProvider = ({ children }: PropsWithChildren) => {
  const { setAuthErrorModalOpen } = useAuth()
  const [returns, setReturns] = useState<IReturn[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleError = (error: any) => {
    setLoading(false)

    // Check if the error indicates an invalid or expired token
    if (error === "Token expired" || error === "Invalid token") {
      setError("")
      // Set the state to open the auth error modal
      setAuthErrorModalOpen(true)
    } else {
      setError(error || "An error occurred.")
    }
  }

  // Function to fetch returns
  const fetchSoldReturns = async () => {
    try {
      setError("")
      setLoading(true)
      const result = await fetchSoldReturnService()
      setReturns(result)
      setLoading(false)
      return true
    } catch (error) {
      handleError(error as string)
      setLoading(false)
      return false
    }
  }
  const fetchPurchaseReturns = async () => {
    try {
      setError("")
      setLoading(true)
      const result = await fetchPurchaseReturnService()
      setReturns(result)
      setLoading(false)
      return true
    } catch (error) {
      handleError(error as string)
      setLoading(false)
      return false
    }
  }

  const fetchAdminReturns = async (status?: string) => {
    try {
      setError("")
      setLoading(true)
      const result = await fetchAdminReturnService(status)
      setReturns(result)
      setLoading(false)
      return true
    } catch (error) {
      handleError(error as string)
      setLoading(false)
      return false
    }
  }

  // Function to create returns
  const createReturns = async (body: CreateReturn) => {
    try {
      setError("")
      setLoading(true)
      const result = await createReturnService(body)
      setReturns((prev) => [result, ...prev])

      setLoading(false)
      return result
    } catch (error) {
      handleError(error as string)
      setLoading(false)
      return null
    }
  }

  // Function to fetch return byId
  const fetchReturnById = async (id: string) => {
    setLoading(true)
    try {
      const result = await fetchReturnByIdService(id)

      return result
    } catch (error) {
      handleError(error)
      return null
    }
  }

  const updateReturnStatusAdmin = async (
    id: string,
    body: { status: string; adminReason: string }
  ) => {
    try {
      const result = await updateReturnStatusAdminService(id, body)

      return result
    } catch (error) {
      handleError(error)
      return null
    }
  }

  const updateReturnStatus = async (
    id: string,
    body: { status: string; trackingNumber?: string }
  ) => {
    try {
      const result = await updateReturnStatusService(id, body)

      return result
    } catch (error) {
      handleError(error)
      return null
    }
  }

  const updateReturnAddress = async (
    id: string,
    body: { method: string; fee: number }
  ) => {
    try {
      const result = await updateReturnAddressService(id, body)

      return result
    } catch (error) {
      handleError(error)
      return null
    }
  }

  return (
    <ReturnContext.Provider
      value={{
        fetchAdminReturns,
        fetchPurchaseReturns,
        fetchSoldReturns,
        createReturns,
        fetchReturnById,
        returns,
        loading,
        error,
        updateReturnStatusAdmin,
        updateReturnStatus,
        updateReturnAddress,
      }}
    >
      {children}
    </ReturnContext.Provider>
  )
}
