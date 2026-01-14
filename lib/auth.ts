import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { prisma } from "./prisma";


export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "mongodb",
    }),
    advanced: {
        database: {
            generateId: false
        }
    },
    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
    },
    plugins: [
        nextCookies()
    ],
    baseURL: process.env.BETTER_AUTH_URL,
    secret: process.env.BETTER_AUTH_SECRET,
});
