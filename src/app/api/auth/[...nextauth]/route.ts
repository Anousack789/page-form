import { prisma } from "@/lib/db/prisma";
import { env } from "@/lib/env";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  secret: env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma as PrismaClient) as Adapter,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email!;
        const password = credentials?.password!;

        const user = await prisma.user.findFirst({
          where: {
            email,
          },
        });
        if (!user) {
          throw new Error("Not Found User");
        }
        const isPasswordMatch = user.isHashedPassword
          ? bcrypt.compareSync(password, user.password ?? "")
          : user.password === password;
        if (!isPasswordMatch) {
          throw new Error("Password Invalid");
        }

        return {
          id: user.id + "",
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],
  callbacks: {
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
        },
      };
    },
    jwt({ token, user }) {
      if (user?.id) {
        return { ...token, id: user.id, role: (user as any).role };
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
