import { z } from "zod";

export const userValidator = z.object({
  userame: z
    .string()
    .min(5, "Minimum Length should be 5")
    .max(100, "Maximum Length should be 100")
    .regex(/[A-Z]/, "username must contain at least one uppercase letter")
    .regex(/[a-z]/, "username must contain at least one lowercase letter")
    .regex(/[0-9]/, "username must contain at least one number"),
  password: z
    .string()
    .min(5)
    .max(50)
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[@$!%*?&]/,
      "Password must contain at least one special character (@, $, !, %, *, ?, &)"
    ),
  email: z.string().min(10).max(100).email(),
});

export const userSigninValidator = z.object({
  email: z.string().min(10).max(100).email(),
  password: z
    .string()
    .min(5)
    .max(50)
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[@$!%*?&]/,
      "Password must contain at least one special character (@, $, !, %, *, ?, &)"
    ),
});

