import { AxiosResponse } from "axios";

// Define the API response structure
export type IApiResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  meta?: {
    total: number;
    page: number;
    limit: number;
  } | null;
  data: T | null;
};

// Extend AxiosResponse to include our custom API response type
export type IApiAxiosResponse<T> = AxiosResponse<IApiResponse<T>>;
