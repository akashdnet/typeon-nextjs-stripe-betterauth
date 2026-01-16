"use client"

import InputComponent from "@/components/form/InputComponent";
import NumberInputComponent from "@/components/form/NumberInputComponent";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ProductSchema, TProductSchema } from "./zod";

interface FormComponentProps {
    onSubmit: (data: TProductSchema) => void;
    data?: Partial<TProductSchema>;
}

export default function FormComponent({ onSubmit, data }: FormComponentProps) {
    const form = useForm<TProductSchema>({
        resolver: zodResolver(ProductSchema),
        defaultValues: {
            name: data?.name || "",
            price: data?.price ? Number(data.price) : 0,
            description: data?.description || "",
        }
    })

    return (
        <div className="px-6 py-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} id="product-form" className="space-y-6">
                    <InputComponent
                        form={form}
                        name="name"
                        placeholder="e.g. Wireless Headphones"
                        label="Product Name"
                    />
                    <NumberInputComponent
                        form={form}
                        name="price"
                        placeholder="0.00"
                        label="Price (BDT)"
                    />
                    <InputComponent
                        form={form}
                        name="description"
                        placeholder="Briefly describe the product..."
                        label="Description"
                    />
                </form>
            </Form>
        </div>
    )
}