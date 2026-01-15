import {
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar"
import { navList } from "@/utils/constant"
import Link from "next/link"



export default function SidebarContentComponent() {
    const role = "admin"
    return (
        <SidebarContent className="mt-4">
            {navList[role].map((item) => (
                <SidebarGroup key={item.label}>
                    <SidebarGroupLabel className="text-lg font-semibold">{item.label}</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {item.list.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={item.isActive}>
                                        <Link href={item.href} className="flex items-center gap-2">
                                            <item.icon />
                                            {item.title}
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            ))}
        </SidebarContent>
    )
}
