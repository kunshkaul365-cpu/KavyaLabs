import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID || process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET || process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    Credentials({
      name: "Demo Account",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "developer@kavyalabs.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Allow instant sign in for demo / test users
        if (!credentials?.email) return null;
        
        return {
          id: "usr_kavya_01",
          name: typeof credentials.email === "string" ? credentials.email.split("@")[0].toUpperCase() : "Kavya Engineer",
          email: typeof credentials.email === "string" ? credentials.email : "developer@kavyalabs.com",
          image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user && token) {
        session.user.id = (token.id as string) || (token.sub as string);
      }
      return session;
    },
  },
});
