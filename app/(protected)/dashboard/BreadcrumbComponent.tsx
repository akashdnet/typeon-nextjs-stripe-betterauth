"use client"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

export default function BreadcrumbComponent() {




    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">
                        Dashboard
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                {/* <BreadcrumbItem>
                    <BreadcrumbPage>{path}</BreadcrumbPage>
                </BreadcrumbItem> */}
            </BreadcrumbList>
        </Breadcrumb>
    )
}
