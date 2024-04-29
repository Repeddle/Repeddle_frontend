import { ICategory, ICreateCategory } from "../types/category"
import { getBackendErrorMessage } from "../utils/error"
import api from "./api"

export const fetchCategoriesService = async (): Promise<ICategory[]> => {
  try {
    const { data, status } = await api.get<ICategory[]>("/categories")

    if (!status) {
      // Handle Fetch categories error, e.g., display an error message to the user
      throw new Error(
        "Fetch categories failed: " + getBackendErrorMessage(data)
      )
    }

    return data
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error("Fetch categories error:", getBackendErrorMessage(error))

    // Re-throw the error to propagate it up the call stack if needed
    throw getBackendErrorMessage(error)
  }
}

export const createCategoryService = async (
  category: ICreateCategory
): Promise<ICategory> => {
  try {
    const { data, status } = await api.post<ICategory>("/categories", category)

    if (!status) {
      // Handle Create categories error, e.g., display an error message to the user
      throw new Error(
        "Create categories failed: " + getBackendErrorMessage(data)
      )
    }

    return data
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error("Create categories error:", getBackendErrorMessage(error))

    // Re-throw the error to propagate it up the call stack if needed
    throw getBackendErrorMessage(error)
  }
}

export const fetchCategoryByIdService = async (
  id: string
): Promise<ICategory> => {
  try {
    const { data, status } = await api.get<ICategory>(`/categories/${id}`)

    if (!status) {
      // Handle Fetch category error, e.g., display an error message to the user
      throw new Error("Fetch category failed: " + getBackendErrorMessage(data))
    }

    return data
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error("Fetch category error:", getBackendErrorMessage(error))

    // Re-throw the error to propagate it up the call stack if needed
    throw getBackendErrorMessage(error)
  }
}

export const updateCategoryService = async (
  id: string,
  category: ICreateCategory
): Promise<ICategory> => {
  try {
    const { data, status } = await api.put<ICategory>(
      `/categories/${id}`,
      category
    )

    if (!status) {
      // Handle Update category error, e.g., display an error message to the user
      throw new Error("Update category failed: " + getBackendErrorMessage(data))
    }

    return data
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error("Update category error:", getBackendErrorMessage(error))

    // Re-throw the error to propagate it up the call stack if needed
    throw getBackendErrorMessage(error)
  }
}

export const deleteCategoryService = async (id: string): Promise<boolean> => {
  try {
    const { status, data } = await api.delete<ICategory>(`/categories/${id}`)

    if (!status) {
      // Handle Delete category error, e.g., display an error message to the user
      throw new Error("Delete category failed: " + getBackendErrorMessage(data))
    }

    return true
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error("Delete category error:", getBackendErrorMessage(error))

    // Re-throw the error to propagate it up the call stack if needed
    throw getBackendErrorMessage(error)
  }
}
