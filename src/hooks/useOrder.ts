import { useContext } from "react"
import { OrderContext } from "../context/OrderContext"

const useOrder = () => {
  const context = useContext(OrderContext)

  if (!context)
    throw new Error("useOrder must be used within a category context")

  return context
}

export default useOrder
