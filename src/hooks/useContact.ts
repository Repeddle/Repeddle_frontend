import { useContext } from "react"
import { ContactContext } from "../context/ContactContext"

const useContact = () => {
  const context = useContext(ContactContext)

  if (!context)
    throw new Error("useContact must be used within a category context")

  return context
}

export default useContact
