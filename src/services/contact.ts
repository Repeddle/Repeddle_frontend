import { IContactMessage, ICreateContactMessage } from "../types/message"
import { getBackendErrorMessage } from "../utils/error"
import api from "./api"

export const fetchContactsService = async (): Promise<IContactMessage[]> => {
  try {
    const url = "/contactsus"

    const resp: { contactUsRequests: IContactMessage[]; status: boolean } =
      await api.get(url)

    if (!resp.status) {
      // Handle Fetch contacts error, e.g., display an error message to the user
      throw new Error("Fetch contacts failed: " + getBackendErrorMessage(resp))
    }

    return resp.contactUsRequests
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error("Fetch contacts error:", getBackendErrorMessage(error))

    // Re-throw the error to propagate it up the call stack if needed
    throw getBackendErrorMessage(error)
  }
}

export const createContactService = async (
  contact: FormData | ICreateContactMessage
): Promise<IContactMessage> => {
  try {
    const data: {
      status: boolean
      contactUs: IContactMessage
    } = await api.post("/contactsus", contact)

    if (!data.status) {
      // Handle Create contact error, e.g., display an error message to the user
      throw new Error("Create contact failed: " + getBackendErrorMessage(data))
    }

    return data.contactUs
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error("Create contact error:", getBackendErrorMessage(error))

    // Re-throw the error to propagate it up the call stack if needed
    throw getBackendErrorMessage(error)
  }
}

export const assignContactUsService = async (
  contactId: string
): Promise<string> => {
  try {
    const data: {
      status: boolean
      message: string
    } = await api.put(`/contacts/assign/${contactId}`)

    if (!data.status) {
      // Handle Update contact error, e.g., display an error message to the user
      throw new Error("Update contact failed: " + getBackendErrorMessage(data))
    }

    return data.message
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error("Update contact error:", getBackendErrorMessage(error))

    // Re-throw the error to propagate it up the call stack if needed
    throw getBackendErrorMessage(error)
  }
}

export const deleteContactService = async (
  id: string
): Promise<{ status: boolean; message: string }> => {
  try {
    const { data } = await api.delete(`/contactsus/${id}`)

    if (!data.status) {
      // Handle Delete contact error, e.g., display an error message to the user
      throw new Error("Delete contact failed: " + getBackendErrorMessage(data))
    }

    return { status: true, message: data.message }
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error("Delete contact error:", getBackendErrorMessage(error))

    // Re-throw the error to propagate it up the call stack if needed
    throw getBackendErrorMessage(error)
  }
}
