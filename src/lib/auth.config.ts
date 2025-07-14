import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

type BackendUser = {
  id: number;
  name: string;
  email: string;
  image?: string;
  address?: string;
  joined?: string;
};

export const authConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const res = await fetch(`http://localhost:4000/users?email=${encodeURIComponent(credentials.email)}`);
        const users = await res.json();
        if (users.length === 0) return null;
        const user = users[0];
        if (user.password !== credentials.password) return null;
        // Return user object (without password)
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account, profile }) {
      // Only run on sign in
      if (account && token.email) {
        // Check if user exists in backend
        const res = await fetch(`http://localhost:4000/users?email=${encodeURIComponent(token.email)}`);
        let users = await res.json();
        let user = users[0] as BackendUser | undefined;
        if (!user && account.provider === "google" && profile) {
          // Create user in backend for Google sign-in
          const createRes = await fetch("http://localhost:4000/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: profile.name,
              email: profile.email,
              image: (profile as any)["picture"],
              address: "",
              joined: new Date().toISOString().split("T")[0],
            }),
          });
          user = await createRes.json() as BackendUser;
        }
        if (isBackendUser(user)) {
          token.userId = user.id;
          token.address = user.address || "";
        }
      }
      return token;
    },
    async session({ session, token, user }) {
      // Attach backend user id and address to session
      if (token && session.user) {
        session.user.id = token.userId;
        session.user.address = token.address;
      }
      return session;
    },
  },
};

function isBackendUser(user: any): user is BackendUser {
  return user && typeof user.id === 'number' && typeof user.email === 'string';
} 