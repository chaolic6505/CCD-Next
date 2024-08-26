
import Link from "next/link";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import UserAuthForm from "@/components/forms/user-auth-form";

export default async function HomePage() {
    const { isAuthenticated } = getKindeServerSession();
    if ((await isAuthenticated())) return redirect("/invoices");

    return (
        <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="flex h-full items-center p-4 lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Chao Chao Dog
                        </h1>
                    </div>
                    <Suspense>
                        <UserAuthForm />
                    </Suspense>
                    <p className="px-8 text-center text-sm text-muted-foreground">
                        By clicking continue, you agree to our{" "}
                        <Link
                            href="/"
                            className="underline underline-offset-4 hover:text-primary"
                        >
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                            href="/"
                            className="underline underline-offset-4 hover:text-primary"
                        >
                            Privacy Policy
                        </Link>
                        .
                    </p>
                </div>
            </div>
        </div>
    );
}
