"use client"

import { deleteProductAction, updateProductAction } from '@/app/actions/product'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { MoreHorizontal, Package, PencilIcon, Trash2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'
import { toast } from 'sonner'
import PaginationComponent from './PaginationComponent'
import { SheetComponent } from './SheetComponent'
import { TProductSchema } from './zod'

interface IProduct {
    id: string
    name: string
    price: number
    description: string
    image: string
}

interface TableComponentProps {
    initialProducts: IProduct[];
    initialMeta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

const TableComponent = ({ initialProducts, initialMeta }: TableComponentProps) => {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [products, setProducts] = useState<IProduct[]>(initialProducts)
    const [isEditing, setIsEditing] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null)
    const [productToDelete, setProductToDelete] = useState<string | null>(null)

    useEffect(() => {
        setProducts(initialProducts);
    }, [initialProducts]);

    const fetchProducts = async () => {
        startTransition(() => {
            router.refresh()
        })
    }

    const handleEdit = (product: IProduct) => {
        setSelectedProduct(product)
        setIsEditing(true)
    }

    const confirmDelete = async () => {
        if (!productToDelete) return

        const tId = toast.loading("Deleting product...")
        try {
            const response = await deleteProductAction(productToDelete)
            if (response.success) {
                toast.success(response.message, { id: tId })
                setProductToDelete(null)
                startTransition(() => {
                    router.refresh()
                })
            } else {
                toast.error(response.message, { id: tId })
            }
        } catch (error) {
            toast.error("An unexpected error occurred", { id: tId })
        }
    }

    const onEditSubmit = async (data: TProductSchema) => {
        if (!selectedProduct) return

        const tId = toast.loading("Updating product...")
        try {
            const response = await updateProductAction(selectedProduct.id, data, selectedProduct.image)
            if (response.success) {
                toast.success(response.message, { id: tId })
                setIsEditing(false)
                startTransition(() => {
                    router.refresh()
                })
            } else {
                toast.error(response.message, { id: tId })
            }
        } catch (error) {
            toast.error("An unexpected error occurred", { id: tId })
        }
    }

    return (
        <div className='space-y-6 relative'>
            {isPending && (
                <div className="absolute inset-x-0 -top-1 h-1 bg-primary/20 overflow-hidden rounded-full z-50">
                    <div className="h-full bg-primary animate-pulse w-full" />
                </div>
            )}

            <div className={`rounded-xl border bg-card shadow-sm overflow-hidden transition-opacity duration-300 ${isPending ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                <Table>
                    <TableHeader className='bg-muted/50'>
                        <TableRow>
                            <TableHead className='font-semibold'>Product</TableHead>
                            <TableHead className='font-semibold'>Price</TableHead>
                            <TableHead className='w-12 text-right px-6'>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.length === 0 && !isPending ? (
                            <TableRow>
                                <TableCell colSpan={4} className='h-24 text-center text-muted-foreground'>
                                    No products found.
                                </TableCell>
                            </TableRow>
                        ) : products.map(item => (
                            <TableRow key={item.id} className='group hover:bg-muted/30 transition-colors border-b last:border-0'>
                                <TableCell className='py-2 px-6'>
                                    <div className='flex items-center gap-4'>
                                        <div className='relative h-9 w-9 rounded-lg overflow-hidden border bg-muted/20 flex items-center justify-center shrink-0 shadow-sm'>
                                            {item.image ? (
                                                <Avatar className='h-full w-full rounded-none'>
                                                    <AvatarImage src={item.image} alt={item.name} className='object-cover' />
                                                    <AvatarFallback><Package className='text-muted-foreground' /></AvatarFallback>
                                                </Avatar>
                                            ) : (
                                                <Package className='text-muted-foreground' />
                                            )}
                                        </div>
                                        <div className='flex flex-col'>
                                            <span className='font-bold text-sm leading-tight text-foreground'>{item.name}</span>
                                            <span className='text-xs text-muted-foreground line-clamp-1 mt-1 max-w-[200px]'>{item.description}</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className='py-2 px-4'>
                                    <span className='font-semibold text-sm'>
                                        {new Intl.NumberFormat("en-BD", {
                                            style: "currency",
                                            currency: "BDT",
                                            currencyDisplay: "narrowSymbol"
                                        }).format(Number(item.price))}
                                    </span>
                                </TableCell>
                                <TableCell className='py-2 px-6 text-right'>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant='ghost' size='icon' className='h-8 w-8 rounded border hover:bg-muted '>
                                                <MoreHorizontal size={18} />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className='w-56 p-2 shadow-lg'>
                                            <DropdownMenuItem onClick={() => handleEdit(item)} className='cursor-pointer gap-3 py-2.5 rounded-md'>
                                                <PencilIcon size={16} className='text-blue-500' />
                                                <span className="font-medium">Edit Details</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                onClick={() => setProductToDelete(item.id)}
                                                className='cursor-pointer gap-3 py-2.5 rounded-md text-destructive focus:bg-destructive/10 focus:text-destructive'
                                            >
                                                <Trash2Icon size={16} />
                                                <span className="font-bold">Delete Product</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className='flex flex-col sm:flex-row items-center justify-between gap-4 py-4 border-t mt-4'>
                <p className='text-sm text-muted-foreground'>
                    Showing <span className='font-semibold text-foreground'>{products.length}</span> of <span className='font-semibold text-foreground'>{initialMeta?.total || 0}</span> products
                </p>
                <PaginationComponent totalPages={initialMeta?.totalPages || 1} />
            </div>

            {selectedProduct && (
                <SheetComponent
                    title="Edit Product"
                    description="Make changes to your product here. All fields are required."
                    open={isEditing}
                    setOpen={(val) => {
                        setIsEditing(val)
                        if (!val) setSelectedProduct(null)
                    }}
                    data={selectedProduct}
                    onSubmit={onEditSubmit}
                    trigger={<div className="hidden" />}
                />
            )}

            <AlertDialog open={!!productToDelete} onOpenChange={(open) => !open && setProductToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the product from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Delete Product
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default TableComponent
