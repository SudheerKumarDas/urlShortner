import { z } from "zod";

export const createUrlSchema = z.object({
    originalUrl : z.string().url("please provide a valid URL")
})