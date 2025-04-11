import axios from "axios";
import { IApiAxiosResponse } from "./interface/axios-interface";
import { toast } from "react-toastify";

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API, // Your API base URL
  withCredentials: true,
});

// Response interceptor for formatting data with type validation
axiosInstance.interceptors.response.use(
  <T>(response: IApiAxiosResponse<T>): IApiAxiosResponse<T> => {
    // Destructure the response to extract data and apply the custom format
    const { statusCode, success, message, data, meta } = response.data;

    // Modify the response and ensure the correct format with type validation
    return {
      ...response, // Spread the original AxiosResponse to retain required fields like `status`, `headers`, etc.
      data: {
        statusCode,
        success,
        message: message || "Response successful",
        meta: meta || null,
        data: data || null,
      },
    };
  },
  (error) => {
    console.log({ error });
    // Global error handler with toast notifications
    if (error.response) {
      toast.error(
        error.response.data.message || "An unexpected error occurred."
      );
    } else if (error.request) {
      toast.error("No response from the server.");
    } else {
      toast.error(
        error.message || "An error occurred while setting up the request."
      );
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
