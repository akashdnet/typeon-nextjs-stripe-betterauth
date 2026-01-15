import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious
} from '@/components/ui/pagination'


const PaginationComponent = () => {
    return (
        <Pagination className='w-fit mr-0'>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href='#' className='rounded-full' />
                </PaginationItem>
                <PaginationItem className='rounded-full bg-gray-200 px-3 py-1 font-semibold'>
                    3
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext href='#' className='rounded-full' />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default PaginationComponent
