import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
import EmailProvider from "next-auth/providers/email"
import GoogleProvider from "next-auth/providers/google"

import { siteConfig } from "@/config/site"
import MagicLinkEmail from "@/emails/magic-link-email"
import { env } from "@/env.mjs"
import { prisma } from "@/lib/db"
import { resend } from "./email"
import { kv } from "@vercel/kv"
import Crypto from "crypto"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    EmailProvider({
      sendVerificationRequest: async ({ identifier, url, provider }) => {
        const user = await prisma.user.findUnique({
          where: {
            email: identifier,
          },
          select: {
            name: true,
            emailVerified: true,
          },
        });

        const userVerified = user?.emailVerified ? true : false;
        const authSubject = userVerified ? `Sign-in link for ${siteConfig.name}` : "Activate your account";

        try {
          const result = await resend.emails.send({
            from: 'SaaS Starter App <onboarding@resend.dev>',
            to: process.env.NODE_ENV === "development" ? 'delivered@resend.dev' : identifier,
            subject: authSubject,
            react: MagicLinkEmail({
              firstName: user?.name as string,
              actionUrl: url,
              mailType: userVerified ? "login" : "register",
              siteName: siteConfig.name
            }),
            // Set this to prevent Gmail from threading emails.
            // More info: https://resend.com/changelog/custom-email-headers
            headers: {
              'X-Entity-Ref-ID': new Date().getTime() + "",
            },
          });

          // console.log(result)
        } catch (error) {
          throw new Error("Failed to send verification email.")
        }
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
      }

      return session
    },
    async jwt({ token, user }) {
      const dbUser = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
      })

      if (!dbUser) {
        if (user) {
          token.id = user?.id
        }
        return token
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      }
    },
  },
  events: {
    createUser: async ({ user }) => {
      const apiKey = Crypto.randomBytes(30)
                 .toString('base64')
                 .slice(0, 30) 
      console.log(user);
      kv.hset(`api:${apiKey}`, JSON.parse(JSON.stringify({'uid' : user.email, 'n_token' : 100000})))
      kv.set(`user:${user.email}:api`, apiKey)
    }
  },
  // debug: process.env.NODE_ENV !== "production"
}
