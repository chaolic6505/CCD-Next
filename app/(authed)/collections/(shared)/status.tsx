import { useTranslations } from "next-intl";
import { CheckIcon, ClockIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";

export default function InvoiceStatus({ className, status }: { status: string, className?: string; }) {
    const t = useTranslations('InvoicePage');

    return (
        <Badge
            className={className}
            variant={status === "paid" ? "secondary" : "default"}>
            {status === "pending" ? (
                <>
                    {t('pending')}
                    <ClockIcon className="ml-1 w-4" />
                </>
            ) : null}
            {status === "paid" ? (
                <>
                    {t('paid')}
                    <CheckIcon className="ml-1 w-4" />
                </>
            ) : null}
        </Badge>
    );
}
