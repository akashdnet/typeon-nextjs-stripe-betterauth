import { Button } from "@/components/ui/button"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import Link from "next/link"
import AuthProfileDropdown from "./AuthProfileDropdown"



export async function AuthButtons() {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if (!session) {
        return (
            <div className="flex gap-2">
                <Button><Link href="/login">Login</Link></Button>
                <Button><Link href="/register">Get Started</Link></Button>
            </div>
        )
    }

    return (
        <AuthProfileDropdown
            name={session.user.name}
            email={session.user.email}
            image={session.user.image || ""}
        />
    )
}