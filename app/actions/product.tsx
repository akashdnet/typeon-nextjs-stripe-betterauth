"use server"
import { prisma } from "@/lib/prisma"
import { APIError } from "better-auth/api"
import { ProductSchema, TProductSchema } from "../(protected)/dashboard/product-management/zod"

export const createProductAction = async (data: TProductSchema, image: string): Promise<{ success: boolean, message: string }> => {

    const dataValidation = ProductSchema.safeParse(data)
    if (!dataValidation.success) {
        return {
            success: false,
            message: "Invalid Product data"
        }
    }

    try {
        await prisma.product.create({
            data: {
                ...dataValidation.data,
                image: image,
            }
        })
        return {
            success: true,
            message: "Product created successfully"
        }
    } catch (error) {
        console.log("Product creation error:", error)
        if (error instanceof APIError) {
            return {
                success: false,
                message: error?.message || "Product creation failed",
            }
        }
    }

    return {
        success: false,
        message: "UnKnown error occurred while creating product",
    }



}


interface IGetProductsAction {
    success: boolean;
    message: string;
    result: TProductSchema[];
    meta: {
        total: number;
    };
}

export const getProductsAction = async (): Promise<IGetProductsAction> => {
    try {
        const products = await prisma.product.findMany()
        return {
            success: true,
            message: "Products fetched successfully",
            result: products,
            meta: {
                total: products.length
            }
        }
    } catch (error) {
        console.log("Product fetching error:", error)
        if (error instanceof APIError) {
            return {
                success: false,
                message: error?.message || "Product fetching failed",
                result: [],
                meta: {
                    total: 0
                }
            }
        }
    }

    return {
        success: false,
        message: "UnKnown error occurred while fetching products",
        result: [],
        meta: {
            total: 0
        }
    }
}