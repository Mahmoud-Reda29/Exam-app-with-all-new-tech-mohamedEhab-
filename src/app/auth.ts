import { JSON_HEADER } from "@/lib/constants/shared.constant";
import { LoginResponse } from "@/lib/types/auth";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    pages:{
        signIn: "/login",
    },
    providers:[
        CredentialsProvider({
                    name: "Credentials",
                    credentials: {
                        email: { label: "Email", type: "text" },
                        password: { label: "Password", type: "password" }
                    },
                    async authorize(credentials) {
                        if(!credentials?.email || !credentials?.password){
                            throw new Error("Credentials are required");
                        }
                        try {
                            const res = await fetch(`${process.env.API}/auth/signin`, {
                                method: "POST",
                                headers: { ...JSON_HEADER },
                                body: JSON.stringify({
                                    email: credentials?.email,
                                    password: credentials?.password,
                                }),
                            });

                            const data: ApiResponse<LoginResponse> = await res.json();

                            if("code" in data){
                                throw new Error(data.message || "Failed to login");
                            }
                            return {
                                id: data.user._id,
                                accessToken: data.token,
                                user: data.user,
                            };
                        } catch (error) {
                            return null;
                        }
                    },
                }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.accessToken;
                token.user = user.user;
            }
            return token;
        },

        async session({ session, token }) {
            session.user = token.user;
            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
}
