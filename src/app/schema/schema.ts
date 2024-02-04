import {z} from "zod";

export const createCuisineSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1),
    detail: z.string().min(1),
    thumbnail: z.string().email().optional()
});
