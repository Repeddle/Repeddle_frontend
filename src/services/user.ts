import {
  CompleteUser,
  CompleteUsersWithPagination,
  IUser,
  TopSellers,
  UpdateFields,
} from "../types/user"
import { getBackendErrorMessage } from "../utils/error"
import api from "./api"

// User UserList

export async function getAllUserAdminService(): Promise<CompleteUsersWithPagination> {
  try {
    const data: CompleteUsersWithPagination & { status: boolean } =
      await api.get("/users/admin")

    if (!data.status) {
      // Handle all users error, e.g., display an error message to the user
      throw new Error("Get all users failed: " + getBackendErrorMessage(data))
    }

    return data
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error("Get all users error:", getBackendErrorMessage(error))

    // Re-throw the error to propagate it up the call stack if needed
    throw getBackendErrorMessage(error)
  }
}

export async function getTopSellersService(): Promise<TopSellers[]> {
  try {
    const data: { topSellers: TopSellers[]; status: boolean } = await api.get(
      "/users/top-sellers"
    )

    if (!data.status) {
      // Handle all top sellers error, e.g., display an error message to the user
      throw new Error("Get top sellers failed: " + getBackendErrorMessage(data))
    }

    return data.topSellers
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error("Get top sellers error:", getBackendErrorMessage(error))

    // Re-throw the error to propagate it up the call stack if needed
    throw getBackendErrorMessage(error)
  }
}

export async function getUserByUsernameService(
  username: string
): Promise<IUser> {
  try {
    const data: { user: IUser; status: boolean } = await api.get(
      `/users/${username}`
    )

    if (!data.status) {
      // Handle get all user by username error, e.g., display an error message to the user
      throw new Error(
        "Get user by username failed: " + getBackendErrorMessage(data)
      )
    }

    return data.user
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error("Get user by username error:", getBackendErrorMessage(error))

    // Re-throw the error to propagate it up the call stack if needed
    throw getBackendErrorMessage(error)
  }
}

export async function unFollowUserService(userId: string): Promise<string> {
  try {
    const data: { message: string; status: boolean } = await api.delete(
      `/users/unfollow/${userId}`
    )

    if (!data.status) {
      // Handle unfollow user error, e.g., display an error message to the user
      throw new Error("unFollow user failed: " + getBackendErrorMessage(data))
    }

    return data.message
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error("unFollow user error:", getBackendErrorMessage(error))

    // Re-throw the error to propagate it up the call stack if needed
    throw getBackendErrorMessage(error)
  }
}

export async function followUserService(userId: string): Promise<string> {
  try {
    const data: { message: string; status: boolean } = await api.post(
      `/users/follow/${userId}`
    )

    if (!data.status) {
      // Handle follow user error, e.g., display an error message to the user
      throw new Error("Follow user failed: " + getBackendErrorMessage(data))
    }

    return data.message
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error("Follow user error:", getBackendErrorMessage(error))

    // Re-throw the error to propagate it up the call stack if needed
    throw getBackendErrorMessage(error)
  }
}

export async function getUserByIdService(id: string): Promise<CompleteUser> {
  try {
    const data: { user: CompleteUser; status: boolean; message: string } =
      await api.get(`/users/user/${id}`)

    if (!data.status) {
      // Handle all users error, e.g., display an error message to the user
      throw new Error("Get all failed: " + getBackendErrorMessage(data))
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

export async function updateUserByIdService(
  id: string,
  userData: UpdateFields
): Promise<CompleteUser> {
  try {
    const response: { user: CompleteUser; status: boolean; message: string } =
      await api.put(`/users/update-profile/${id}`, userData)

    console.log(response)
    if (!response.status) {
      // Handle all users error, e.g., display an error message to the user
      throw new Error("Update failed: " + getBackendErrorMessage(response))
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
