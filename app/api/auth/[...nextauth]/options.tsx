import type { NextAuthOptions } from "next-auth";
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';

export const options: NextAuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username: ",
                    type: "text",
                    placeholder: "User Name",
                },
                password: {
                    label: "Password: ",
                    type: "password",
                    placeholder: "Password",
                },
            },
            async authorize(credentials: any) {
                // TODO: Hard coding right now. 
                // Need to retrieve data from db in the future.
                const user = { id: "42", name: "Dave", password: "nextauth" };

                if (credentials?.username == user.name && credentials?.password === user.password) {
                    return user;
                } else {
                    return null;
                }
            }
        }),
    ],
};