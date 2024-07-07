import z from "zod"

export const user = z.object({
    firstname: z.string(),
    lastname: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    phone: z.string().length(10),
})
export const userLogin = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})