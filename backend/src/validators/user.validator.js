import { z } from "zod";

export const registerUserSchema = z.object({
    username : z
    .string()
    .trim()
    .min(3,"username must be at least 3 characters")
    .max(30,"username cannot exceed more than 30 characters"),

    email: z
    .email("invalid email address")
    .trim()
    .toLowerCase(),

    password: z
    .string()
    .min(8,"password must be at least 8 characters")
    .max(30,"password must not exceed 30 characters")
});

