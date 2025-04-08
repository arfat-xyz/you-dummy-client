"use client";
import JumbotronComponent from "@/components/jumbotron";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { registerUserZodSchema } from "@/lib/zod/user-zod-validation";

// Define the validation schema using Zod

// Infer the types from the schema
type FormData = z.infer<typeof registerUserZodSchema>;

const RegisterPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registerUserZodSchema), // Connect Zod schema with react-hook-form
  });

  const onSubmit = async (inputs: FormData) => {
    const data = await axios.post(
      `http://localhost:5000/api/v1/auth/register`,
      inputs
    );
    console.log({ data });
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
              type="submit"
              className="w-full px-4 py-2 bg-primary text-white font-semibold rounded-md hover:text-primary hover:bg-white border border-transparent hover:border-primary transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/60"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
