import z from "zod";


export const RegisterSchema = z.object({
    name: z.string().min(3),
    email: z.email(),
    password: z.string().min(6),
    confirmPassword: z.string(),
}).refine((data) => {
    return data.password === data.confirmPassword
}, {
    path: ["confirmPassword"],
    error: "Passwords do not match"
})

export type TRegisterSchema = z.infer<typeof RegisterSchema>
