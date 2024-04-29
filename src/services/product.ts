import {
  ICreateProduct,
  IProduct,
  ProductWithPagination,
} from "../types/product"
import { getBackendErrorMessage } from "../utils/error"
import api from "./api"

export const fetchProductsService = async (
  params?: string
): Promise<ProductWithPagination> => {
  try {
    let url = "/products"

    if (params && params.length) {
      url = url + `?${params}`
    }

    const { data, status } = await api.get(url)

    if (!status) {
      // Handle Fetch products error, e.g., display an error message to the user
      throw new Error("Fetch products failed: " + getBackendErrorMessage(data))
    }

    return data
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error("Fetch products error:", getBackendErrorMessage(error))

    // Re-throw the error to propagate it up the call stack if needed
    throw getBackendErrorMessage(error)
  }
}

export const createProductService = async (
  product: ICreateProduct
): Promise<IProduct> => {
  try {
    const { data, status } = await api.post<IProduct>("/products", product)

    if (!status) {
      // Handle Create product error, e.g., display an error message to the user
      throw new Error("Create product failed: " + getBackendErrorMessage(data))
    }

    return data
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error("Create product error:", getBackendErrorMessage(error))

    // Re-throw the error to propagate it up the call stack if needed
    throw getBackendErrorMessage(error)
  }
}

export const fetchProductBySlugService = async (
  slug: string
): Promise<IProduct> => {
  try {
    const { data, status } = await api.get<IProduct>(`/products/${slug}`)

    if (!status) {
      // Handle Fetch product error, e.g., display an error message to the user
      throw new Error("Fetch product failed: " + getBackendErrorMessage(data))
    }

    return data
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error("Fetch product error:", getBackendErrorMessage(error))

    // Re-throw the error to propagate it up the call stack if needed
    throw getBackendErrorMessage(error)
  }
}

export const updateProductService = async (
  id: string,
  product: ICreateProduct
): Promise<IProduct> => {
  try {
    const { data, status } = await api.put<IProduct>(`/products/${id}`, product)

    if (!status) {
      // Handle Update product error, e.g., display an error message to the user
      throw new Error("Update product failed: " + getBackendErrorMessage(data))
    }

    return data
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error("Update product error:", getBackendErrorMessage(error))

    // Re-throw the error to propagate it up the call stack if needed
    throw getBackendErrorMessage(error)
  }
}

export const deleteProductService = async (id: string): Promise<boolean> => {
  try {
    const { status, data } = await api.delete<IProduct>(`/products/${id}`)

    if (!status) {
      // Handle Delete product error, e.g., display an error message to the user
      throw new Error("Delete product failed: " + getBackendErrorMessage(data))
    }

    return true
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error("Delete product error:", getBackendErrorMessage(error))

    // Re-throw the error to propagate it up the call stack if needed
    throw getBackendErrorMessage(error)
  }
}
