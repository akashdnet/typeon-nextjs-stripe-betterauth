import z from "zod";


export const ProductSchema = z.object({
    name: z.string().min(3),
    price: z.number(),
    description: z.string().min(6)
})

export type TProductSchema = z.infer<typeof ProductSchema>
