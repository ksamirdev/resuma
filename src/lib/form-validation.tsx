import { z } from "zod";

export const resumeFormValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name is too long"),
  phone: z
    .string()
    .min(7, "Phone number is too short")
    .max(20, "Phone number is too long")
    .optional(),
  email: z.string().email("Invalid email address").optional(),
  location: z
    .string()
    .min(2, "Location is too short")
    .max(100, "Location is too long")
    .optional(),
});
