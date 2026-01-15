import { SidebarHeader } from "@/components/ui/sidebar"
import { House } from "lucide-react"
import Link from "next/link"

export default function SidebarHeaderComponent() {
    return (
        <SidebarHeader className="shadow-xl ">
            <Link href="/">
                <div className="flex items-center gap-2 bg-gray-500 p-2 rounded-lg text-white">
                    <House />
                    <span className="text-lg font-bold">TypeOn</span>
                </div>
            </Link>
        </SidebarHeader>
    )
}
