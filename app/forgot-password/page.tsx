"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import SpinnerLoader from "@/components/loader";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios-instance";
import {
  frontendErrorResponse,
  frontendSuccessResponse,
} from "@/lib/frontend-toast-response";
import JumbotronComponent from "@/components/jumbotron";
import { useState } from "react";
import { ForgotPasswordForm } from "@/lib/zod/user-zod-validation";

const ForgotPassword = () => {
  // State
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Router
  const router = useRouter();

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>();

  // Function to send email and receive temp pass
  const onSubmit: SubmitHandler<ForgotPasswordForm> = async (data) => {
    try {
      setLoading(true);
      const { email, code, newPassword } = data;

      if (success) {
        // Reset password logic
        const { data: resetData } = await axiosInstance.post(
          "/auth/reset-password",
          {
            email,
            code,
            newPassword,
          }
        );
        if (resetData.success) {
          frontendSuccessResponse(resetData?.message);
          router.push("/login");
        }
      } else {
        // Forgot password logic
        const { data: forgotData } = await axiosInstance.post(
          "/auth/forgot-password",
          {
            email,
          }
        );
        console.log({ forgotData });
        if (forgotData.success) {
          frontendSuccessResponse(forgotData.message);
          setSuccess(true);
          return;
        }
        return frontendErrorResponse(forgotData.message);
      }
    } catch (e) {
      console.error("Error in forgot password:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <JumbotronComponent text="Forgot password" />
      <div className="container mx-auto max-w-md pb-5">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Input */}
          <div>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-4 border rounded-md shadow-sm"
              placeholder="Enter email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {success && (
            <>
              {/* Secret Code Input */}
              <div>
                <input
                  type="text"
                  {...register("code", { required: "Code is required" })}
                  className="w-full p-4 border rounded-md shadow-sm"
                  placeholder="Enter secret code"
                />
                {errors.code && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.code.message}
                  </p>
                )}
              </div>

              {/* New Password Input */}
              <div>
                <input
                  type="password"
                  {...register("newPassword", {
                    required: "New password is required",
                  })}
                  className="w-full p-4 border rounded-md shadow-sm"
                  placeholder="Enter new password"
                />
                {errors.newPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>
            </>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? (
                <span className="flex justify-center items-center w-full">
                  <SpinnerLoader size={20} />
                </span>
              ) : success ? (
                "Reset Password"
              ) : (
                "Send Code"
              )}
            </button>
          </div>
          {!success ? (
            <>
              <p className="text-center ">
                {`If you've key then `}
                <button
                  type="button"
                  onClick={() => setSuccess(true)}
                  className="text-blue-500"
                >
                  click here
                </button>
              </p>
            </>
          ) : (
            <></>
          )}
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
