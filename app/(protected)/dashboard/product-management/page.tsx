import { getProductsAction } from "@/app/actions/product";
import HeaderComponent from "./HeaderComponent";
import TableComponent from "./TableComponent";

export default async function ProductManagementPage(props: {
    searchParams: Promise<{ query?: string; page?: string }>
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || "";
    const page = Number(searchParams?.page) || 1;
    const limit = 5;

    const response = await getProductsAction(page, limit, query);
    const products = response.success ? response.result : [];
    const meta = response.meta;

    return (
        <div className="w-full max-w-5xl mx-auto space-y-6">
            <section className="p-6 bg-card border rounded shadow-xl text-center">
                <h1 className="text-3xl font-extrabold tracking-tight">Product Management</h1>
                <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                    Create, update, and delete products.
                </p>
            </section>

            <HeaderComponent />
            <TableComponent
                initialProducts={products}
                initialMeta={meta}
            />
        </div>
    )
}
