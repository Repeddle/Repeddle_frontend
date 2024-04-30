/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUser, UpdateFields } from "../types/user"
import { getBackendErrorMessage } from "../utils/error"
import api from "./api"

export async function sendVerifyEmailService(userData: {
  email: string
}): Promise<any> {
  try {
    const data = await api.post("/users/send-verification-email", userData)

    console.log(data)
    if (!data.status) {
      const errorMessage = getBackendErrorMessage(data.data)
      throw new Error(errorMessage)
    }

    return data.status
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error("Registration error:", error)

    const errorMessage = getBackendErrorMessage(error)
    console.error(errorMessage)
    // Re-throw the error to propagate it up the call stack if needed
    throw errorMessage
  }
}

export async function forgetPasswordService(userData: {
  email: string
}): Promise<any> {
  try {
    const data = await api.post("/users/forget-password", userData)

    if (!data.status) {
      const errorMessage = getBackendErrorMessage(data.data)
      throw new Error(errorMessage)
    }

    return data.status
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error("forget password error:", error)

    const errorMessage = getBackendErrorMessage(error)
    console.error(errorMessage)
    // Re-throw the error to propagate it up the call stack if needed
    throw errorMessage
  }
}

export async function verifyEmailService(tokenData: {
  token: string
}): Promise<any> {
  try {
    const data = await api.post("/users/verify-email", tokenData)
    console.log(data)

    if (!data.status) {
      const errorMessage = getBackendErrorMessage(data.data)
      throw new Error(errorMessage)
    }

    return data.status
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error("Registration error:", error)

    const errorMessage = getBackendErrorMessage(error)
    console.error(errorMessage)
    // Re-throw the error to propagate it up the call stack if needed
    throw errorMessage
  }
}

export async function registerUserService(credentials: {
  token: string
  username: string
  password: string
  firstName: string
  lastName: string
  phone: string
}): Promise<any> {
  try {
    const data = await api.post("/users/register", credentials)

    if (!data.status) {
      const errorMessage = getBackendErrorMessage(data.data)
      throw new Error("Registration failed: " + errorMessage)
    }

    return data.status
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error("Registration error:", error)

    const errorMessage = getBackendErrorMessage(error)

    // Re-throw the error to propagate it up the call stack if needed
    throw errorMessage
  }
}

export async function loginUser(credentials: {
  email: string
  password: string
}): Promise<string> {
  try {
    const data: any = await api.post("/users/login", credentials)

    if (!data.status) {
      // Handle login error, e.g., display an error message to the user
      throw new Error("Login failed: " + getBackendErrorMessage(data.data))
    }
    console.log(data.accessToken)

    localStorage.setItem("authToken", data.accessToken)

    return data.accessToken
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error("Login error:", getBackendErrorMessage(error))

    // Re-throw the error to propagate it up the call stack if needed
    throw getBackendErrorMessage(error)
  }
}

export async function getUserService(): Promise<IUser> {
  try {
    const data: any = await api.get("/users/profile")

    if (!data.status) {
      // Handle login error, e.g., display an error message to the user
      throw new Error("Login failed: " + getBackendErrorMessage(data.data))
    }

    localStorage.setItem("email", data.user.email)
    localStorage.setItem("username", data.user.username)
    return data.user
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error("Get user error:", getBackendErrorMessage(error))

    // Re-throw the error to propagate it up the call stack if needed
    throw getBackendErrorMessage(error)
  }
}

export async function getSuggestUsernameService(body: {
  firstName: string
  lastName: string
  otherText?: string
}): Promise<string[]> {
  try {
    const data: { status: true; suggestedUsernames: string[] } = await api.post(
      "/users/suggested-username",
      body
    )

    if (!data.status) {
      // Handle suggests error, e.g., display an error message to the user
      throw new Error(
        "Suggest username failed: " + getBackendErrorMessage(data)
      )
    }

    return data.suggestedUsernames
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error("Get user error:", getBackendErrorMessage(error))

    // Re-throw the error to propagate it up the call stack if needed
    throw getBackendErrorMessage(error)
  }
}

export async function getAllUserService(): Promise<IUser[]> {
  try {
    const data: any = await api.get("/users/")

    if (!data.status) {
      // Handle login error, e.g., display an error message to the user
      throw new Error("Get all failed: " + getBackendErrorMessage(data.data))
    }

    return data.users
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error("Get user error:", getBackendErrorMessage(error))

    // Re-throw the error to propagate it up the call stack if needed
    throw getBackendErrorMessage(error)
  }
}

export async function getUserByIdService(id: string): Promise<IUser> {
  try {
    const data: any = await api.get(`/users/user/${id}`)

    if (!data.status) {
      // Handle login error, e.g., display an error message to the user
      throw new Error("Get all failed: " + getBackendErrorMessage(data.data))
    }

    return data.user
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error("Get user error:", getBackendErrorMessage(error))

    // Re-throw the error to propagate it up the call stack if needed
    throw getBackendErrorMessage(error)
  }
}

export async function updateUserService(
  userData: UpdateFields
): Promise<IUser> {
  try {
    const response: any = await api.put("/users/update-profile", userData)

    console.log(response)
    if (!response.status) {
      // Handle login error, e.g., display an error message to the user
      throw new Error("Update failed: " + getBackendErrorMessage(response.data))
    }

    return response.user
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error("Update user error:", getBackendErrorMessage(error))

    // Re-throw the error to propagate it up the call stack if needed
    throw getBackendErrorMessage(error)
  }
}

export async function updateUserByIdService(
  id: string,
  userData: UpdateFields
): Promise<IUser> {
  try {
    const response: any = await api.put(`/users/update-profile/${id}`, userData)

    console.log(response)
    if (!response.status) {
      // Handle login error, e.g., display an error message to the user
      throw new Error("Update failed: " + getBackendErrorMessage(response.data))
    }

    return response.user
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error("Update user error:", getBackendErrorMessage(error))

    // Re-throw the error to propagate it up the call stack if needed
    throw getBackendErrorMessage(error)
  }
}

export async function logoutUser(): Promise<void> {
  try {
    const { data } = await api.get("/users/logout")

    if (!data.status) {
      // Handle logout error, e.g., display an error message to the user
      throw new Error("Logout failed: " + getBackendErrorMessage(data.data))
    }

    localStorage.removeItem("authToken")
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error("Logout error:", getBackendErrorMessage(error))

    // Re-throw the error to propagate it up the call stack if needed
    throw getBackendErrorMessage(error)
  }
}

export async function deleteUserService(id: string): Promise<void | boolean> {
  try {
    const { data } = await api.delete(`/users/${id}`)

    if (!data.status) {
      // Handle logout error, e.g., display an error message to the user
      throw new Error(
        "Delete user failed: " + getBackendErrorMessage(data.data)
      )
    }
    return true
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error("Logout error:", getBackendErrorMessage(error))

    // Re-throw the error to propagate it up the call stack if needed
    throw getBackendErrorMessage(error)
  }
}

export async function resetUserPasswordService(
  password: string,
  token: string
): Promise<void | boolean> {
  try {
    const { data } = await api.post(`/users/reset-password/${token}`, {
      password,
    })

    if (!data.status) {
      // Handle reset error, e.g., display an error message to the user
      throw new Error(
        "Password change failed: " + getBackendErrorMessage(data.data)
      )
    }
    return true
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error("Password change error:", getBackendErrorMessage(error))

    // Re-throw the error to propagate it up the call stack if needed
    throw getBackendErrorMessage(error)
  }
}

// You can add more authentication-related functions here, such as checking the user's authentication status, resetting passwords, etc.
