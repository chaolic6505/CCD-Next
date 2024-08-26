import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useTranslations } from "next-intl";
import { inter } from "@/components/shared/fonts";
import { link } from "fs";
import { ScrollArea } from "@/components/ui/scroll-area";

export const metadata = {
    title: "Pricing",
};

const plans = [
    {
        name: "Free",
        price: 0,
        link: "/invoices",
        features: [
            "1 image allow per upload",
            "Upload up to 10000 Invoices",
            "Upload up to 10000 Collections",
            "Custom analytics table with rich insights",
            "Sort and filter your date any way you like",
        ],

    },
    {
        name: "Pro",
        price: 10,
        link: "/invoices",
        features: [
            "Upload Unlimited Invoices",
            "Upload Unlimited Collections",
            "10 images allow per upload",
            'Access to all "Free" features',
        ],
    },
    {
        name: "Premium",
        price: 20,
        link: "/invoices",
        features: [
            "AI Analytics",
            "Premium Support",
            "100 images allow per upload",
            'Access to all "Pro" features',
        ],
    },
];


const PricingCard = ({ link, name, price, features }: {
    link: string;
    name: string;
    price: number;
    features: string[];
}) => {
    return (
        <div className="grid w-full items-start gap-10 rounded-lg border p-10 md:grid-cols-[1fr_200px]">
            <div className="grid gap-6">
                <h3 className="text-xl font-bold sm:text-2xl">
                    What&apos;s included in the {name} plan
                </h3>
                <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                    {features.map((feature) => (
                        <li className="flex items-center">
                            <Icons.check className="mr-2 h-4 w-4" /> {feature}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex flex-col gap-4 text-center">
                <div>
                    <h4 className="text-7xl font-bold">
                        ${price}
                    </h4>
                    <p className="text-xs font-medium text-muted-foreground mt-2">
                        Billed Monthly
                    </p>
                </div>
                <Link href={link} className={cn(buttonVariants({ size: "lg" }))}>
                    Get Started
                </Link>
            </div>
        </div>
    );
};

export default function PricingPage() {
    const t = useTranslations("pricing");

    return (
        <ScrollArea className="h-screen">
            <div className="flex-1 space-y-4  p-4 pt-1 md:p-8">
                <div className="mx-auto flex w-full flex-col gap-4 md:max-w-[58rem]">
                    <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
                        {t("title")}
                    </h2>
                    <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                        {t("subtitle")}
                    </p>
                </div>

                {plans.map((plan) => <PricingCard key={plan.name} {...plan} />)}

            </div>
        </ScrollArea>
    );
}