"use client";
import JumbotronComponent from "@/components/jumbotron";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterUserFormData,
  registerUserZodSchema,
} from "@/lib/zod/user-zod-validation";
import axiosInstance from "@/lib/axios-instance";
import { useState } from "react";
import { toast } from "react-toastify";
import SpinnerLoader from "@/components/loader";
import Link from "next/link";

const RegisterClientPage = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterUserFormData>({
    resolver: zodResolver(registerUserZodSchema), // Connect Zod schema with react-hook-form
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (inputs: RegisterUserFormData) => {
    try {
      setIsLoading(true);
      const { data } = await axiosInstance.post(`/auth/register`, inputs);
      if (data?.success) toast.success(data?.message);
      reset();
    } catch (error) {
      console.log("response error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <JumbotronComponent text="Register" />

      <div className="max-w-screen-lg w-full md:w-1/3 pb-5 mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  id="name"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/60"
                  placeholder="Enter your name"
                />
              )}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="email"
                  id="email"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/60"
                  placeholder="Enter your email"
                />
              )}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="password"
                  id="password"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/60"
                  placeholder="Enter your password"
                />
              )}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="mt-4 text-center">
            <button
              disabled={isLoading}
              type="submit"
              className="w-full flex justify-center items-center gap-2 px-4 py-2 bg-primary text-white font-semibold disabled:bg-primary-foreground rounded-md hover:text-primary hover:bg-white border border-transparent hover:border-primary transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/60"
            >
              Register {isLoading ? <SpinnerLoader size={16} /> : ""}
            </button>
          </div>
        </form>
        <p className="text-center p-3">
          Already registered?{" "}
          <Link href={`/login`} className="text-blue-500">
            Login
          </Link>
        </p>
        <p className="text-center ">
          <Link href={"/forgot-password"}>
            <span className="text-blue-500">Forget password</span>
          </Link>
        </p>
      </div>
    </>
  );
};

export default RegisterClientPage;
