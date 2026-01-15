"use client"

import { createProductAction } from "@/app/actions/product"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useState } from "react"
import { toast } from "sonner"
import FormComponent from "./FormComponent"
import { TProductSchema } from "./zod"

export function SheetComponent() {

    const [open, setOpen] = useState(false)
    const image = "https://cdn-icons-png.flaticon.com/512/5987/5987424.png"


    const onSubmit = async (data: TProductSchema) => {
        const tId = toast.loading("Creating product...");
        const response = await createProductAction(data, image);
        if (response.success) {
            toast.success(response.message || "Product created successfully", { id: tId });
            setOpen(false);
        } else {
            toast.error(response.message || "Product creation failed", { id: tId });
        }
    }
    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="outline">Create Product</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader className="text-center shadow-2xl">
                    <SheetTitle className="text-lg font-semibold">Create Product</SheetTitle>
                    <SheetDescription>
                        Create a new product here. Click save when you&apos;re done.
                    </SheetDescription>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto py-4 space-y-2 ">
                    <FormComponent onSubmit={onSubmit} />
                </div>
                <SheetFooter>
                    <Button type="submit" form="product-form">Save Product</Button>
                    <SheetClose asChild>
                        <Button variant="outline">Close</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
