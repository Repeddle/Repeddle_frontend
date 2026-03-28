import { getBackendErrorMessage } from "../utils/error";
import api from "./api";

export const saveImageService = async (formData: FormData) => {
  try {
    const response: { imageUrl: string } = await api.post("/images", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(response);
    return response.imageUrl;
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error("Error uploading image:", getBackendErrorMessage(error));

    // Re-throw the error to propagate it up the call stack if needed
    throw getBackendErrorMessage(error);
  }
};

export const deleteImageService = async (url: string) => {
  try {
    const response: { message: string } = await api.delete(`/images/${url}`);

    console.log(response);
    return response.message;
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error("Error uploading image:", getBackendErrorMessage(error));

    // Re-throw the error to propagate it up the call stack if needed
    throw getBackendErrorMessage(error);
  }
};

export const saveVideoService = async (formData: FormData) => {
  try {
    const response: { videoUrl: string } = await api.post("/videos", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(response);
    return response.videoUrl;
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error("Error uploading video:", getBackendErrorMessage(error));

    // Re-throw the error to propagate it up the call stack if needed
    throw getBackendErrorMessage(error);
  }
};

export const deleteVideoService = async (url: string) => {
  try {
    const response: { message: string } = await api.delete(`/videos/${url}`);

    console.log(response);
    return response.message;
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error("Error deleting video:", getBackendErrorMessage(error));

    // Re-throw the error to propagate it up the call stack if needed
    throw getBackendErrorMessage(error);
  }
};
