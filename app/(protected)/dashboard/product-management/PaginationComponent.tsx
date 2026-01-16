"use client"

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from '@/components/ui/pagination';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface PaginationComponentProps {
    totalPages: number;
}

const PaginationComponent = ({ totalPages }: PaginationComponentProps) => {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()

    const currentPage = Number(searchParams.get('page')) || 1

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams)
        params.set('page', pageNumber.toString())
        return `${pathname}?${params.toString()}`
    }

    return (
        <Pagination className='w-fit mr-0'>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href={currentPage > 1 ? createPageURL(currentPage - 1) : '#'}
                        className={currentPage <= 1 || totalPages === 0 ? 'pointer-events-none opacity-50 cursor-not-allowed' : ''}
                    />
                </PaginationItem>

                {totalPages > 0 ? [...Array(totalPages)].map((_, i) => {
                    const page = i + 1;
                    return (
                        <PaginationItem key={page}>
                            <PaginationLink
                                href={createPageURL(page)}
                                isActive={currentPage === page}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    )
                }) : (
                    <PaginationItem>
                        <PaginationLink href="#" isActive={true}>1</PaginationLink>
                    </PaginationItem>
                )}

                <PaginationItem>
                    <PaginationNext
                        href={currentPage < totalPages ? createPageURL(currentPage + 1) : '#'}
                        className={currentPage >= totalPages || totalPages === 0 ? 'pointer-events-none opacity-50 cursor-not-allowed' : ''}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default PaginationComponent
