import { useId } from 'react'

import { ArchiveIcon, PencilIcon, Trash2Icon } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import PaginationComponent from './PaginationComponent'

const items = [
    {
        id: '1',
        productName: 'Chair',
        model: 'Wooden Garden  Chair',
        src: 'https://cdn.shadcnstudio.com/ss-assets/products/product-1.png',
        fallback: 'WGC',
        color: 'Black',
        category: 'Furniture',
        price: 26569.09
    },
    {
        id: '2',
        productName: 'Nike Shoes',
        model: 'Jordan 1 Retro OG',
        src: 'https://cdn.shadcnstudio.com/ss-assets/products/product-2.png',
        fallback: 'J1R',
        color: 'Red',
        category: 'Sneakers',
        price: 15850.00
    },
    {
        id: '3',
        productName: 'OnePluse',
        model: 'OnePlus 7 Pro',
        src: 'https://cdn.shadcnstudio.com/ss-assets/products/product-3.png',
        fallback: 'O7P',
        color: 'Nebula Blue',
        category: 'Smartphone',
        price: 86779.00
    },
    {
        id: '4',
        productName: 'Nintendo',
        model: 'Nintendo Switch',
        src: 'https://cdn.shadcnstudio.com/ss-assets/products/product-4.png',
        fallback: 'NS',
        color: 'Neon Blue and Red',
        category: 'Console Gaming',
        price: 49339.00
    },
    {
        id: '5',
        productName: 'Apple Magic Mouse',
        model: 'Apple Magic Mouse',
        src: 'https://cdn.shadcnstudio.com/ss-assets/products/product-5.png',
        fallback: 'AMM',
        color: 'Black',
        category: 'Electronics',
        price: 11850.29
    }
]

const TableComponent = () => {
    const id = useId()

    return (
        <div className=''>
            <div className='[&>div]:rounded-sm [&>div]:border'>
                <Table>
                    <TableHeader>
                        <TableRow className='hover:bg-transparent'>

                            <TableHead>Product</TableHead>
                            <TableHead>Price (BDT)</TableHead>
                            <TableHead className='w-0'>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.map(item => (
                            <TableRow key={item.id} className='has-data-[state=checked]:bg-muted/50'>

                                <TableCell>
                                    <div className='flex items-center gap-3'>
                                        <Avatar className='rounded-sm'>
                                            <AvatarImage src={item.src} alt={item.model} />
                                            <AvatarFallback className='text-xs'>{item.fallback}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className='font-medium'>{item.productName}</div>
                                            <span className='text-muted-foreground mt-0.5 text-xs'>{item.model}</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>  {
                                    new Intl.NumberFormat("en-BD", { style: "currency", currency: "BDT", currencyDisplay: "narrowSymbol" }).format(item.price)
                                }</TableCell>
                                <TableCell className='flex items-center gap-1'>
                                    <Button variant='ghost' size='icon' className='rounded-full' aria-label={`product-${item.id}-edit`}>
                                        <PencilIcon />
                                    </Button>
                                    <Button variant='ghost' size='icon' className='rounded-full' aria-label={`product-${item.id}-remove`}>
                                        <Trash2Icon />
                                    </Button>
                                    <Button
                                        variant='ghost'
                                        size='icon'
                                        className='rounded-full'
                                        aria-label={`product-${item.id}-archive`}
                                    >
                                        <ArchiveIcon />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className='flex justify-between p-2 w-full mt-6'>
                <div><h1 >Showing <span className='rounded-full bg-gray-200 px-3 py-1 font-semibold'>5</span> of 100 products</h1></div>
                <PaginationComponent />
            </div>
        </div>
    )
}

export default TableComponent
