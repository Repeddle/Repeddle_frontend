import { createContext, PropsWithChildren, useState } from "react"
import useAuth from "../hooks/useAuth"
import { IContactMessage, ICreateContactMessage } from "../types/message"
import {
  assignContactUsService,
  createContactService,
  deleteContactService,
  fetchContactsService,
} from "../services/contact"

type ContextType = {
  contacts: IContactMessage[]
  loading: boolean
  error: string
  fetchContacts: () => Promise<boolean>
  createContact: (contact: ICreateContactMessage | FormData) => Promise<boolean>
  assignContact: (id: string) => Promise<string | null>
  deleteContact: (id: string) => Promise<{ message?: string }>
}

// Create contact context
export const ContactContext = createContext<ContextType | undefined>(undefined)

export const ContactProvider = ({ children }: PropsWithChildren) => {
  const { setAuthErrorModalOpen } = useAuth()
  const [contacts, setContacts] = useState<IContactMessage[]>([])
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

  // Function to fetch contacts
  const fetchContacts = async () => {
    try {
      setError("")
      setLoading(true)
      const result = await fetchContactsService()
      setContacts(result)
      setLoading(false)
      return true
    } catch (error) {
      handleError(error as string)
      setLoading(false)
      return false
    }
  }

  const createContact = async (contact: ICreateContactMessage | FormData) => {
    try {
      setError("")
      setLoading(true)
      const result = await createContactService(contact)
      setContacts((prevContacts) => [...prevContacts, result])
      setLoading(false)
      return true
    } catch (error) {
      handleError(error as string)
      setLoading(false)
      return false
    }
  }

  const assignContact = async (id: string) => {
    try {
      setError("")
      setLoading(true)
      const result = await assignContactUsService(id)

      setLoading(false)
      return result
    } catch (error) {
      handleError(error as string)
      setLoading(false)
      return null
    }
  }

  const deleteContact = async (id: string) => {
    try {
      setError("")
      setLoading(true)
      const data = await deleteContactService(id)
      setContacts((prevContacts) =>
        prevContacts.filter((Contact) => Contact._id !== id)
      )
      setLoading(false)
      return { message: data.message }
    } catch (error) {
      handleError(error as string)
      setLoading(false)
      return {}
    }
  }

  return (
    <ContactContext.Provider
      value={{
        fetchContacts,
        createContact,
        contacts,
        loading,
        error,
        deleteContact,
        assignContact,
      }}
    >
      {children}
    </ContactContext.Provider>
  )
}
