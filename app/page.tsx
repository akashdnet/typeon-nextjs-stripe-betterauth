import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  return (
    <div className="text-center flex-1 flex items-center justify-center">
      {session ? (
        <div>
          <h1 className="text-2xl ">Welcome, {session.user?.name}</h1>
          <h1 className="">User ID: {session.user?.id}</h1>
        </div>
      ) : (
        <h1 className="text-2xl ">Please Login</h1>
      )}
    </div>
  );
}
