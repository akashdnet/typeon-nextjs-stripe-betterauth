"use client"

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface IInputComponent {
    form: any;
    name: string;
    placeholder: string;
    label: string;
    icon?: any;
}


export default function InputComponent({ form, name, placeholder, label, icon: Icon }: IInputComponent) {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <div className="relative">
                            <Input {...field} placeholder={placeholder} className={`pl-${Icon ? 10 : 0}`} />
                            {Icon && <Icon className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer border-r border-gray-300 pr-2" />}
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
