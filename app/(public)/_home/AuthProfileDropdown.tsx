"use client";

import { signOutAction } from "@/app/actions/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutDashboard, LogOut, User } from "lucide-react";
import Link from "next/link";



const listItems = [
    {
        icon: User,
        property: 'Profile',
        href: '#/profile'
    },
    {
        icon: LayoutDashboard,
        property: 'Dashboard',
        href: '#/dashboard'
    }
]



interface props {
    name: string;
    email: string;
    image?: string;
}



export const title = "Profile Dropdown with Avatar";

const AuthDropdown = ({ name, email, image }: props) => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button className="relative h-10 w-10 rounded-full" variant="ghost">
                <Avatar>
                    <AvatarImage
                        alt={name || "Name"}
                        src={image || "https://github.com/shadcn.png"}
                    />
                    <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                    <p className="font-medium text-sm leading-none">{name || "Name"}</p>
                    <p className="text-muted-foreground text-xs leading-none">
                        {email}
                    </p>
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {listItems.map((item, index) => (
                <DropdownMenuItem key={index} asChild>
                    <Link href={item.href}>
                        <item.icon />
                        <span className='text-popover-foreground'>{item.property}</span>
                    </Link>
                </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={signOutAction} >
                <LogOut />
                Log out
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
);

export default AuthDropdown;
