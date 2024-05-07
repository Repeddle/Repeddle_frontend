import { getBackendErrorMessage } from "../utils/error"
import api from "./api"

export const saveImageService = async (formData: FormData) => {
  try {
    const response = await api.post<{ secure_url: string }>(
      "/api/upload",
      formData
    )

    const data = response.data
    return data.secure_url
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error("Error uploading image:", getBackendErrorMessage(error))

    // Re-throw the error to propagate it up the call stack if needed
    throw getBackendErrorMessage(error)
  }
}
