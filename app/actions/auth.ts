"use server"

import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";
import { headers } from "next/headers";
import { TLoginSchema } from "../(public)/(auth)/login/zod";
import { TRegisterSchema } from "../(public)/(auth)/register/zod";

interface TResponse {
    success: boolean;
    message: string;
}

export const signUpAction = async (formData: TRegisterSchema): Promise<TResponse> => {
    const email = formData.email;
    const password = formData.password;
    const name = formData.name;

    try {
        await auth.api.signUpEmail({
            body: {
                email,
                password,
                name
            },
        })

        return {
            success: true,
            message: "Registered successfully",
        }
    } catch (error) {
        console.log("Register error:", error)
        if (error instanceof APIError) {
            return {
                success: false,
                message: error?.message || "Registered failed",
            }
        }
    }


    return {
        success: false,
        message: "UnKnown register error",
    }


}



export const signInAction = async (formData: TLoginSchema): Promise<TResponse> => {
    const email = formData.email;
    const password = formData.password;

    try {
        await auth.api.signInEmail({
            body: {
                email,
                password
            },
        })

        return {
            success: true,
            message: "Logged in successfully",
        }
    } catch (error) {
        console.log("login error:", error)
        if (error instanceof APIError) {
            return {
                success: false,
                message: error?.message || "Loged in failed",
            }
        }
    }

    return {
        success: false,
        message: "UnKnown login error",
    }




}


export const signOutAction = async (): Promise<TResponse> => {

    try {
        await auth.api.signOut({
            headers: await headers()
        })

        return {
            success: true,
            message: "Loged out successfully",
        }
    } catch (error) {
        console.log("login error:", error)
        if (error instanceof APIError) {
            return {
                success: false,
                message: error?.message || "Loged out failed",
            }
        }
    }

    return {
        success: false,
        message: "UnKnown loged out error",
    }



}