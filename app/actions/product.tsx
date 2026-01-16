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
    result: (TProductSchema & { id: string, image: string })[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export const getProductsAction = async (
    page: number = 1,
    limit: number = 5,
    term: string = ""
): Promise<IGetProductsAction> => {
    try {
        const skip = (page - 1) * limit;

        const where = term ? {
            OR: [
                { name: { contains: term, mode: 'insensitive' as const } },
                { description: { contains: term, mode: 'insensitive' as const } }
            ]
        } : {};

        const [products, total] = await Promise.all([
            prisma.product.findMany({
                where,
                skip,
                take: limit,
                orderBy: { id: 'desc' }
            }),
            prisma.product.count({ where })
        ]);

        return {
            success: true,
            message: "Products fetched successfully",
            result: products as (TProductSchema & { id: string, image: string })[],
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        }
    } catch (error) {
        console.log("Product fetching error:", error)
        return {
            success: false,
            message: "Product fetching failed",
            result: [],
            meta: {
                total: 0,
                page,
                limit,
                totalPages: 0
            }
        }
    }
}

export const updateProductAction = async (id: string, data: TProductSchema, image: string): Promise<{ success: boolean, message: string }> => {
    const dataValidation = ProductSchema.safeParse(data)
    if (!dataValidation.success) {
        return {
            success: false,
            message: "Invalid Product data"
        }
    }

    try {
        await prisma.product.update({
            where: { id },
            data: {
                ...dataValidation.data,
                image: image,
            }
        })
        return {
            success: true,
            message: "Product updated successfully"
        }
    } catch (error) {
        console.log("Product update error:", error)
        return {
            success: false,
            message: "Product update failed"
        }
    }
}

export const deleteProductAction = async (id: string): Promise<{ success: boolean, message: string }> => {
    try {
        await prisma.product.delete({
            where: { id }
        })
        return {
            success: true,
            message: "Product deleted successfully"
        }
    } catch (error) {
        console.log("Product deletion error:", error)
        return {
            success: false,
            message: "Product deletion failed"
        }
    }
}