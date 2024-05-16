// AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from "react"
import {
  registerUserService,
  deleteUserService,
  forgetPasswordService,
  getUserService,
  loginUser,
  logoutUser,
  sendVerifyEmailService,
  updateUserService,
  verifyEmailService,
  resetUserPasswordService,
  getSuggestUsernameService,
} from "../services/auth"
import { IUser, UpdateFields } from "../types/user"

interface Props {
  children?: ReactNode
}

export const AuthContext = createContext<{
  user: IUser | null
  error: string | null
  loading: boolean
  authErrorModalOpen: boolean
  setAuthErrorModalOpen: (value: boolean) => void
  sendVerifyEmail: (credentials: { email: string }) => Promise<boolean>
  verifyEmail: (credentials: { token: string }) => Promise<boolean>
  registerUser: (tokenData: {
    token: string
    username: string
    password: string
    firstName: string
    lastName: string
    phone: string
  }) => Promise<boolean>
  login: (credentials: { email: string; password: string }) => Promise<boolean>
  sendForgetPasswordEmail: (credentials: { email: string }) => Promise<boolean>
  getUser: () => Promise<IUser | null>
  updateUser: (userData: UpdateFields) => Promise<IUser | null>
  logout: () => void
  deleteUser: (id: string) => Promise<boolean | null>
  resetPassword: (password: string, token: string) => Promise<boolean>
  getSuggestUsername: (body: {
    firstName: string
    lastName: string
    otherText?: string
  }) => Promise<string[]>
} | null>(null)

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null)
  const [authToken, setAuthToken] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [authErrorModalOpen, setAuthErrorModalOpen] = useState(false)

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

  const sendVerifyEmail = async (userData: { email: string }) => {
    try {
      setError("")
      setLoading(true)
      const response = await sendVerifyEmailService(userData)
      setLoading(false)
      return !!response
    } catch (error) {
      handleError(error)
      return false
    }
  }

  const verifyEmail = async (tokenData: { token: string }) => {
    try {
      setError("")
      const response = await verifyEmailService(tokenData)
      return !!response
    } catch (error) {
      handleError(error)
      return false
    }
  }

  const registerUser = async (tokenData: {
    token: string
    username: string
    password: string
    firstName: string
    lastName: string
    phone: string
  }) => {
    try {
      setError("")
      const response = await registerUserService(tokenData)
      return !!response
    } catch (error) {
      handleError(error)
      return false
    }
  }

  const login = async (credentials: { email: string; password: string }) => {
    try {
      setError("")
      setLoading(true)
      const authenticatedToken = await loginUser(credentials)
      if (authenticatedToken) {
        setAuthToken(authenticatedToken)
        setLoading(false)
        setAuthErrorModalOpen(false)
        return true
      }
      setLoading(false)
      return false
    } catch (error) {
      handleError(error)
      return false
    }
  }

  const sendForgetPasswordEmail = async (userData: { email: string }) => {
    try {
      setError("")
      setLoading(true)
      const response = await forgetPasswordService(userData)
      setLoading(false)
      return !!response
    } catch (error) {
      handleError(error)
      return false
    }
  }

  const getSuggestUsername = async (body: {
    firstName: string
    lastName: string
    otherText?: string
  }) => {
    try {
      const response = await getSuggestUsernameService(body)

      return response
    } catch (error) {
      console.error(error)
      return []
    }
  }

  const getUser = async () => {
    try {
      setError("")
      setLoading(true)
      const authenticatedUser = await getUserService()
      if (authenticatedUser) {
        setUser(authenticatedUser)
        return authenticatedUser
      }
      return null
    } catch (error) {
      handleError(error)
      return null
    } finally {
      setLoading(false)
    }
  }

  const updateUser = async (userData: UpdateFields) => {
    try {
      setError("")
      const updatedUser = await updateUserService(userData)
      if (updatedUser) {
        setUser(updatedUser)
        return updatedUser
      }
      return null
    } catch (error) {
      handleError(error)
      return null
    }
  }

  const deleteUser = async (id: string) => {
    try {
      setError("")
      const result = await deleteUserService(id)
      if (result) {
        // getAllUser()
        return result
      }
      return null
    } catch (error) {
      handleError(error)
      return null
    }
  }

  const resetPassword = async (password: string, token: string) => {
    try {
      setError("")
      setLoading(true)
      const response = await resetUserPasswordService(password, token)
      setLoading(false)
      return !!response
    } catch (error) {
      handleError(error)
      return false
    }
  }

  const logout = () => {
    logoutUser()
    setUser(null)
    localStorage.removeItem("authToken")
  }

  useEffect(() => {
    const checkUser = async () => {
      const savedToken = authToken || localStorage.getItem("authToken")
      if (savedToken) {
        await getUser()
      }
      setLoading(false)
    }
    checkUser()
  }, [authToken])

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        loading,
        authErrorModalOpen,
        setAuthErrorModalOpen,
        sendVerifyEmail,
        verifyEmail,
        registerUser,
        login,
        sendForgetPasswordEmail,
        getUser,
        updateUser,
        resetPassword,
        logout,
        deleteUser,
        getSuggestUsername,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
