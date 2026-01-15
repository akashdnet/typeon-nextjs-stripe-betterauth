import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

export default function SearchComponent() {
    return (
        <section className='max-w-64 '>
            <div className='relative'>
                <Input type="text" placeholder="Search" className='pl-10' />
                <Search className='absolute left-2 top-2 border-r-2 pr-2 border-gray-300' />
            </div>
        </section>
    )
}
