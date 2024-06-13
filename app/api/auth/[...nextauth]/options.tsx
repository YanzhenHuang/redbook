import type { Awaitable, NextAuthOptions } from "next-auth";
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { AuthWithPassword } from "@/lib/user";
import { IUserAuthWithPassword, IUserAuthWithPasswordCallback } from "@/types";

export const options: NextAuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                identity: {
                    label: "User Name or Email",
                    type: "text",
                    placeholder: "User Name or Email",
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Password",
                },
            },
            async authorize(credentials: any) {
                // TODO: Hard coding right now. 
                // Need to retrieve data from db in the future.
                // const user = { id: "42", name: "Dave", password: "nextauth" };

                // if (credentials?.username == user.name && credentials?.password === user.password) {
                //     return user;
                // } else {
                //     return null;
                // }

                // Promise<IUserAuthWithPasswordCallback | undefined >

                const user = await AuthWithPassword(credentials);
                if (user) {
                    return {
                        id: user.record.id,
                        name: JSON.stringify(user),
                        email: user.record.email,
                        avatarURL: user.record.avatarURL
                    };
                } else {
                    return null;
                }

            }
        }),
    ],
    callbacks: {
        // Somehow the subject of the JWT token is the user id.
        // In this case, pass out the user id as a key for further data retrieval.
        session({ session, token, user }) {
            // console.log(token);
            return { ...session, user: { ...session.user, id: token.sub } };
        }
    }
};