"use client"

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EyeClosedIcon, EyeIcon, Lock } from "lucide-react";
import { useState } from "react";

export default function PasswordComponent({ form, name, placeholder, label }: any) {
    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => setShowPassword(!showPassword);
    const Icon = showPassword ? EyeIcon : EyeClosedIcon;
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <div className="relative">
                            <Input {...field} placeholder={placeholder} type={showPassword ? "text" : "password"} className="pl-10" />
                            <Icon onClick={togglePassword} className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer" />
                            <Lock className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer border-r border-gray-300 pr-2" />
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
