import { Metadata } from "next";
import { notFound } from "next/navigation";

import Modal from "@/components/modal";
import { Breadcrumbs } from "@/components/breadcrumbs";
import EditInvoiceForm from "../../../(authed)/invoices/(shared)/edit-form";

import { fetchCustomers } from "@/lib/actions/customer.actions";
import { fetchInvoiceById } from "@/lib/actions/invoice.actions";
import { ScrollArea } from "@/components/ui/scroll-area";
export const metadata: Metadata = {
    title: "Edit Invoice",
};

export default async function Page({ params }: { params: { id: string; }; }) {
    const id = params.id;
    const [invoice, customers] = await Promise.all([
        fetchInvoiceById(id),
        fetchCustomers(),
    ]);

    if (!invoice) {
        notFound();
    }

    return (
        <Modal>
            <ScrollArea>

                <Breadcrumbs
                    items={[
                        { title: "Invoices", link: "/invoices" },
                        {
                            title: "Edit Invoice",
                            link: `/invoices/${id}/edit`,
                        },
                    ]}
                />
                <EditInvoiceForm invoice={invoice} customers={customers} />
            </ScrollArea>
        </Modal>
    );
}
