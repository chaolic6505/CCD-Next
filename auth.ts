import { z } from "zod";
import NextAuth from "next-auth";
import { compare } from "bcryptjs";
import credentials from "next-auth/providers/credentials";

import { authConfig } from "./auth.config";
import { getUser } from "./lib/actions/user.actions";

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({
                        email: z.string().email(),
                        password: z.string().min(6),
                    })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUser(email);
                    if (!user) return null;
                    const passwordsMatch = await compare(
                        password,
                        user.password
                    );
                    if (passwordsMatch) return user;
                }
                return null;
            },
        }),
    ],
});
