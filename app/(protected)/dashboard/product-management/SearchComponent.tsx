"use client"

import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'

export default function SearchComponent() {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()

    const [text, setText] = useState(searchParams.get('query') || '')
    const [query] = useDebounce(text, 500)

    useEffect(() => {
        const params = new URLSearchParams(searchParams)
        const currentQuery = searchParams.get('query') || ''

        if (query === currentQuery) return

        if (query) {
            params.set('query', query)
        } else {
            params.delete('query')
        }
        params.set('page', '1')
        replace(`${pathname}?${params.toString()}`)
    }, [query, pathname, replace, searchParams])

    return (
        <section className='w-full max-w-sm'>
            <div className='relative'>
                <Input
                    type="text"
                    placeholder="Search products..."
                    className='pl-10 h-10 bg-background shadow-xs'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground' size={18} />
            </div>
        </section>
    )
}
