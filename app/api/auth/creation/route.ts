import prisma from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GERT () {

    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user || user === null  || !user.id) {
        throw new Error("User not found");
    }

    let dbUser = await prisma.user.findUnique({
        where: {
            id: user.id,
        },
    });

    if(!dbUser) {
        dbUser = await prisma.user.create({
            data: {
                id: user.id,
                email: user.email ?? "",
                firstName: user.given_name ?? "",
                lastName: user.family_name ?? "",
                profileImage: user.picture ?? "https://utfs.io/f/f41e86b4-9d2a-45b3-89ba-746fe220ed8e-ke5lr6.png",
            },
        });
    }

    return NextResponse.redirect("/invoices");
}