import { z } from "zod";
import { stringValidation } from "./const-validation";

const passwordSchema = (fieldName: string = "Password") =>
  stringValidation(fieldName).min(8, {
    message: "Password must be at least 8 characters long",
  });
// .regex(/[A-Z]/, {
//   message: "Password must contain at least one uppercase letter",
// })
// .regex(/[a-z]/, {
//   message: "Password must contain at least one lowercase letter",
// })
// .regex(/[0-9]/, { message: "Password must contain at least one number" })
// .regex(/[!@#$%^&*(),.?":{}|<>]/, {
//   message: "Password must contain at least one special character",
// })
// .refine((val) => !/\s/.test(val), {
//   message: "Password must not contain spaces",
// });
export const registerUserZodSchema = z.object({
  name: stringValidation("Name").min(1, {
    message: `Name is required`,
  }),
  email: stringValidation("Email").email({ message: "Invalid email address" }),
  password: passwordSchema(),
});

// Infer the types from the schema for registration form
export type RegisterUserFormData = z.infer<typeof registerUserZodSchema>;

export const loginUserZodSchema = z.object({
  email: stringValidation("Email").email({ message: "Invalid email address" }),
  password: passwordSchema(),
});

// Infer the types from the schema for login form
export type LoginUserFormData = z.infer<typeof loginUserZodSchema>;

export const forgetPasswordZodSchema = z.object({
  email: stringValidation("Email").email({ message: "Invalid email address" }),
  newPassword: passwordSchema("New Password").optional(),
  code: stringValidation("Code").optional(),
});

// Define types for form data
export type ForgotPasswordForm = z.infer<typeof forgetPasswordZodSchema>;
