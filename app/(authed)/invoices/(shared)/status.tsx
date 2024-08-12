import { Badge } from "@/components/ui/badge";
import { CheckIcon, ClockIcon } from "lucide-react";

export default function InvoiceStatus({ className, status }: { status: string, className?: string; }) {
    return (
        <Badge
            className={className}
            variant={status === "paid" ? "secondary" : "default"}>
            {status === "pending" ? (
                <>
                    Pending
                    <ClockIcon className="ml-1 w-4" />
                </>
            ) : null}
            {status === "paid" ? (
                <>
                    Paid
                    <CheckIcon className="ml-1 w-4" />
                </>
            ) : null}
        </Badge>
    );
}
