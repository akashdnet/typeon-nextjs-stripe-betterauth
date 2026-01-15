import { LayersPlus, LayoutDashboard, type LucideIcon, User, Users } from "lucide-react";

interface TlistItems {
    icon: LucideIcon;
    property: string;
    href: string;
}
export const listItems: TlistItems[] = [
    {
        icon: User,
        property: 'Profile',
        href: '#/profile'
    },
    {
        icon: LayoutDashboard,
        property: 'Dashboard',
        href: '/dashboard'
    }
]





interface TNavListData {
    label: string,
    list: {
        title: string,
        icon: LucideIcon,
        href: string,
        isActive?: boolean
    }[]
}


interface TNavList {
    user: TNavListData[],
    admin: TNavListData[],
}



export const navList: TNavList = {
    user: [
        {
            label: "User Dashboard",
            list: [
                {
                    title: "Dashboard",
                    icon: LayoutDashboard,
                    href: "#",
                },
                {
                    title: "Profile",
                    icon: User,
                    href: "#",
                },
            ],
        },

    ],
    admin: [
        {
            label: "Admin Dashboard",
            list: [
                {
                    title: "Dashboard",
                    icon: LayoutDashboard,
                    href: "#",
                },
                {
                    title: "User Management",
                    icon: Users,
                    href: "#",
                },
                {
                    title: "Product Management",
                    icon: LayersPlus,
                    href: "/dashboard/product-management",
                },
            ],
        },

    ],
}