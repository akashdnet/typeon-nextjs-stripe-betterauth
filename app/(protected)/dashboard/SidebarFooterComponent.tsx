"use client"

import { signOutAction } from "@/app/actions/auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SidebarFooter } from "@/components/ui/sidebar"

export function SidebarFooterComponent({ session }: { session?: any }) {
    const user = {
        name: session?.user?.name || "User",
        email: session?.user?.email || "user@example.com",
        image: session?.user?.image || "https://github.com/shadcn.png",
        plan: session?.user?.plan || "Basic Plan",
    }

    const isBasic = user.plan === "Basic Plan"

    return (
        <SidebarFooter className="border-t p-4 flex flex-col gap-4">
            <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                    <AvatarImage src={user.image} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <span className="text-sm font-semibold">{user.name}</span>
                    <span className="text-xs text-muted-foreground">{user.email}</span>
                    {isBasic && (
                        <Badge variant="outline" className="mt-1 text-yellow-700 border-yellow-600">
                            {user.plan}
                        </Badge>
                    )}
                </div>
            </div>

            <Button
                variant={"destructive"}
                size="sm"
                onClick={signOutAction}
                className="w-full"
            >
                Logout
            </Button>
        </SidebarFooter>
    )
}
