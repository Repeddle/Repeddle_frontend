// AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from "react"
import {
  registerUserService,
  deleteUserService,
  forgetPasswordService,
  getAllUserService,
  getUserByIdService,
  getUserService,
  loginUser,
  logoutUser,
  sendVerifyEmailService,
  updateUserByIdService,
  updateUserService,
  verifyEmailService,
  resetUserPasswordService,
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
  getAllUser: () => Promise<IUser[] | null>
  getUserById: (id: string) => Promise<IUser | null>
  updateUser: (userData: UpdateFields) => Promise<IUser | null>
  updateUserById: (id: string, userData: UpdateFields) => Promise<IUser | null>
  logout: () => void
  deleteUser: (id: string) => Promise<boolean | null>
  resetPassword: (password: string, token: string) => Promise<boolean>
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

  const getAllUser = async () => {
    try {
      setError("")
      setLoading(true)
      const allUser = await getAllUserService()
      if (allUser) {
        return allUser
      }
      return null
    } catch (error) {
      handleError(error)
      return null
    } finally {
      setLoading(false)
    }
  }

  const getUserById = async (id: string) => {
    try {
      setError("")
      setLoading(true)
      const user = await getUserByIdService(id)
      if (user) {
        return user
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

  const updateUserById = async (id: string, userData: UpdateFields) => {
    try {
      setError("")
      const updatedUser: IUser | null = await updateUserByIdService(
        id,
        userData
      )
      if (updatedUser) {
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
        getAllUser()
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
        getAllUser,
        getUserById,
        updateUser,
        updateUserById,
        resetPassword,
        logout,
        deleteUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
