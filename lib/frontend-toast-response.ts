import { toast } from "react-toastify";

/**
 * frontendErrorResponse
 * Displays a toast notification for error messages on the frontend.
 *
 * @param {Object} params - Parameters for configuring the error response
 * @param {string} params.message - The error message to display (default: "Something went wrong")
 * @returns {void} - Shows a toast notification to the user
 */
export const frontendErrorResponse = (
  message: string = "Something went wrong"
) => {
  return toast.error(message);
};

/**
 * frontendSuccessResponse
 * Displays a toast notification for successful operations on the frontend.
 *
 * @param {Object} params - Parameters for configuring the success response
 * @param {string} params.message - The success message to display (default: "Response successful")
 * @returns {void} - Shows a toast notification to the user
 */
export const frontendSuccessResponse = (
  message: string = "Response successful"
) => {
  return toast.success(message);
};
