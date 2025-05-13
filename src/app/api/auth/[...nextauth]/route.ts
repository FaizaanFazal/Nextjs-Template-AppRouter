import NextAuth from 'next-auth/next';
import GitHubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/lib/prisma';
import type { AuthOptions, SessionStrategy } from 'next-auth';

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      authorization: {
        params: { login: "" }
      }
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  session: {
    strategy: 'database' as SessionStrategy,  // narrow to the literal type
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith("chrome-extension://")) return url;
      if (url.startsWith(baseUrl)) return url;
      return baseUrl;
    },
  },
};

// Initialize NextAuth handler
const handler = NextAuth(authOptions);

// Tell Next.js “this route” (all /api/auth/… paths) supports GET & POST
export { handler as GET, handler as POST };
