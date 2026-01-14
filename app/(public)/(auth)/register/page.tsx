"use client"

import { signUpAction } from "@/app/actions/auth";
import InputComponent from "@/components/form/InputComponent copy";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AtSign, Lock, Text } from "lucide-react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { RegisterSchema, TRegisterSchema } from "./zod";


export default function App() {

    const route = useRouter();

    const form = useForm<TRegisterSchema>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "Test",
            email: "test@gmail.com",
            password: "12345678",
            confirmPassword: "12345678",
        }
    })


    const onSubmit = async (data: TRegisterSchema) => {
        const tId = toast.loading("Registering...");
        const response = await signUpAction(data);
        if (response.success) {
            toast.success(response.message || "Register successful", { id: tId });
            route.refresh();
            redirect("/");
        } else {
            toast.error(response.message || "Register failed", { id: tId });
        }
    }




    return (
        <div className="flex flex-1 items-center justify-center p-4">
            <div className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-xl border border-gray-100 transition-all hover:shadow-2xl">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-extrabold text-center tracking-tight text-gray-900">Register</h1>
                        <p className="text-center text-gray-500 text-sm">Enter your credentials to register your account</p>
                    </div>
                    <Form {...form} >
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                            <div className="space-y-4">
                                <InputComponent form={form} name="name" placeholder="Enter your name" label="Name" icon={Text} />
                                <InputComponent form={form} name="email" placeholder="Enter your email" label="Email" icon={AtSign} />
                                <InputComponent form={form} name="password" placeholder="Enter your password" label="Password" icon={Lock} />
                                <InputComponent form={form} name="confirmPassword" placeholder="Enter your confirm password" label="Confirm Password" icon={Lock} />
                            </div>
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">

                                <div className="text-sm text-gray-600 text-center sm:text-right">
                                    Already have an account?
                                    <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-700 hover:underline underline-offset-4 transition-all whitespace-nowrap">
                                        Login
                                    </Link>
                                </div>

                                <Button type="submit" className="w-full sm:w-auto px-12 py-6 text-lg font-semibold rounded-xl transition-all active:scale-95">
                                    Register
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    )
}