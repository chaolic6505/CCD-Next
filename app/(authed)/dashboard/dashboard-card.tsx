import {
    Card,
    CardTitle,
    CardHeader,
    CardContent,
} from "@/components/ui/card";

interface DashboardCardProps {
    index: number;
    title: string;
    icon: string;
    value: string;
    change: string;
}

export const DashboardCard = ({
    title,
    icon,
    value,
    change,
    index,
}: DashboardCardProps) => {
    return (
        <Card
            key={index}
            className="group rounded-lg border px-5 py-4 transition-colors hover:bg-slate-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <svg
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-muted-foreground"
                >
                    <path d={icon} />
                </svg>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground">{change}</p>
            </CardContent>
        </Card>
    );
};

export default DashboardCard;
