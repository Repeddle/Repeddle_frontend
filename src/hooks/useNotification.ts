import { useContext } from "react"
import { NotificationContext } from "../context/NotificationContext"

const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error("useNotification must be used within an AuthProvider")
  }
  return context
}

export default useNotification
