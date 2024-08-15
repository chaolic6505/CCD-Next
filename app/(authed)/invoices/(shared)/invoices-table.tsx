import { columns } from "./columns";

import { Invoice } from "@/types";
import { DataTable } from "@/components/ui/data-table";

export default async function InvoicesTable({
    invoices,
    hideSearchBar,
    hidePagination,
}: {
    invoices: Invoice[];
    hideSearchBar?: boolean
    hidePagination?: boolean
}) {
    return (
        <DataTable
            data={invoices}
            columns={columns}
            hideSearchBar={hideSearchBar}
            hidePagination={hidePagination}

            defaultSorting={[{ id: "created_at", desc: true }]}
        />
    );
}
