"use client"

import InputComponent from "@/components/form/InputComponent copy";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ProductSchema, TProductSchema } from "./zod";


export default function FormComponent({ onSubmit }: { onSubmit: (data: TProductSchema) => void }) {


    const form = useForm<TProductSchema>({
        resolver: zodResolver(ProductSchema),
        defaultValues: {
            name: "Test ",
            price: 40,
            description: "Description ",
        }
    })






    return (
        <div className="p-6">
            <Form {...form}  >
                <form onSubmit={form.handleSubmit(onSubmit)} id="product-form" className="space-y-5">
                    <InputComponent form={form} name="name" placeholder="Enter your name" label="Product Name" />
                    <InputComponent form={form} name="price" placeholder="Enter your price" label="Price" />
                    <InputComponent form={form} name="description" placeholder="Enter your description" label="Description" />
                </form>
            </Form>
        </div>

    )
}