import { signOutAction } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import Link from "next/link"



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
        <div className="flex gap-2">
            <Button><Link href="/dashboard">Dashboard</Link></Button>
            <Button variant="destructive" onClick={signOutAction}>Log Out</Button>

        </div>
    )
}