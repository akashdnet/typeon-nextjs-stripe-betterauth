import { SheetComponent } from "./product-management/SheetComponent";
import SearchComponent from "./SearchComponent";
import TableComponent from "./TableComponent";

export default function Page() {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-3">
      <section className="p-2 mb-10 shadow-xl rounded-sm">
        <h1 className="text-2xl font-bold text-center">Product Management</h1>
        <p className="text-center text-muted-foreground mt-2">Manage your products here</p>
      </section>
      <div className="flex items-center justify-between">
        <SheetComponent />
        <SearchComponent />
      </div>
      <TableComponent />

    </div>
  )
}
