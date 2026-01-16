"use client"
import { createProductAction } from '@/app/actions/product'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import SearchComponent from './SearchComponent'
import { SheetComponent } from './SheetComponent'
import { TProductSchema } from './zod'

export default function HeaderComponent() {
    const router = useRouter()
    const image = "https://cdn-icons-png.flaticon.com/512/5987/5987424.png"
    const [open, setOpen] = useState(false)
    const onSubmit = async (data: TProductSchema) => {
        const tId = toast.loading("Creating product...");
        try {
            const response = await createProductAction(data, image);
            if (response.success) {
                toast.success(response.message || "Product created successfully", { id: tId });
                setOpen(false);
                router.refresh();
            } else {
                toast.error(response.message || "Product creation failed", { id: tId });
            }
        } catch (error) {
            toast.error("An unexpected error occurred", { id: tId });
        }
    }
    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-card  rounded-xl  mb-5">
            <div className="flex items-center gap-4 w-full sm:w-auto">
                <SheetComponent
                    title="Create New Product"
                    description="Enter the details for your new product. Click save to add it to your catalog."
                    onSubmit={onSubmit}
                    data={{}}
                    open={open}
                    setOpen={setOpen}
                    trigger={
                        <Button className="gap-2 px-4">
                            <Plus size={18} />
                            <span>Add Product</span>
                        </Button>
                    }
                />
            </div>
            <SearchComponent />

        </div>
    )
}
