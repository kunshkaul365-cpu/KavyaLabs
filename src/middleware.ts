import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  // Enforces server-side authentication check on /dashboard routes
  matcher: ["/dashboard/:path*"],
};
