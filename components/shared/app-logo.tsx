import Link from "next/link";
import Image from "next/image";

import { lusitana } from "./fonts";
import { APP_NAME } from "@/lib/constants/systems";

export default function AppLogo() {
    return (
        <Link href="/" className="flex-start">
            <div
                className={`${lusitana.className} flex flex-row items-end space-x-2`}
            >
                <Image
                    priority
                    width={32}
                    height={32}
                    src="/logo.png"
                    alt={`${APP_NAME} logo`}
                />
                <span className="text-xl">{APP_NAME}</span>
            </div>
        </Link>
    );
}
