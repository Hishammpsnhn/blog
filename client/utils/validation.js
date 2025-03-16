import { object, string } from "yup";

export const loginSchema = object({
  email: string().email().required("Email is required"),
  password: string()
    .min(3, "Password must be at least 3 characters long")
    .required("Password is required"),
});
