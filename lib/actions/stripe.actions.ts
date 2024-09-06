

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function createSubscription() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) return;

}