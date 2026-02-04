import axios, {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

export const baseURL = "";

export const imageUrl = baseURL;
const api = axios.create({
  baseURL: baseURL + "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    // Handle request errors here
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    // You can handle successful responses here
    return response.data; // Return only the response data
  },
  (error: AxiosError) => {
    // Handle response errors here
    if (error.response) {
      // Server responded with an error status code (4xx or 5xx)
      console.error("API Error Response:", error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("API No Response:", error.request);
    } else {
      // Something happened in setting up the request that triggered an error
      console.error("API Request Error:", error.message);
    }
    return Promise.reject(error);
  },
);

export default api;
