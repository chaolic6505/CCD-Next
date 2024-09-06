
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";

import { Button } from "@/components/ui/button";

export default async function UserAuthForm() {

    return (
        <div className="flex justify-center gap-6">
            <LoginLink postLoginRedirectURL={process.env.KINDE_POST_LOGIN_REDIRECT_URL}>
                <Button className="rounded-md px-6 py-2.5 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Sign in
                </Button>
            </LoginLink>

            <RegisterLink postLoginRedirectURL={process.env.KINDE_POST_LOGIN_REDIRECT_URL}>
                <Button className="rounded-md px-6 py-2.5 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Sign up
                </Button>
            </RegisterLink>
        </div>
    );
}
