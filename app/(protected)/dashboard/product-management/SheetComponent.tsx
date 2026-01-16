"use client"

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
import { type LucideIcon } from "lucide-react"
import FormComponent from "./FormComponent"
import { TProductSchema } from "./zod"

interface SheetComponentProps {
    title: string;
    description?: string;
    icon?: LucideIcon;
    data?: Partial<TProductSchema>;
    onSubmit: (data: TProductSchema) => void;
    open: boolean;
    setOpen: (open: boolean) => void;
    trigger?: React.ReactNode;
}

export function SheetComponent({
    title,
    description,
    icon: IconX,
    data,
    onSubmit,
    open,
    setOpen,
    trigger
}: SheetComponentProps) {
    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                {trigger ? trigger : (
                    IconX ? (
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <IconX size={18} />
                        </Button>
                    ) : (
                        <Button variant="outline">{title}</Button>
                    )
                )}
            </SheetTrigger>
            <SheetContent className="sm:max-w-md">
                <SheetHeader className="mb-6">
                    <SheetTitle className="text-2xl font-bold">{title}</SheetTitle>
                    <SheetDescription>
                        {description || "Fill in the details below. Click save to apply changes."}
                    </SheetDescription>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto py-2">
                    <FormComponent onSubmit={onSubmit} data={data} key={open ? 'open' : 'closed'} />
                </div>
                <SheetFooter className="mt-6 flex gap-2">

                    <Button type="submit" form="product-form" className="flex-1">
                        Save Product
                    </Button>
                    <SheetClose asChild>
                        <Button variant="outline" className="flex-1">Cancel</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
