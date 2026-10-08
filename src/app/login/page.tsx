"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { ArrowLeft, ArrowRight, ShieldCheck, Lock, CheckCircle, AlertCircle, Sparkles } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (err) {
      setError("Failed to initiate Google Sign In. Please try again.");
      setLoading(false);
    }
  };

  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your work email.");
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const res = await signIn("credentials", {
        email: email.trim().toLowerCase(),
        password: password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid email or password. Please try again.");
        setLoading(false);
      } else {
        window.location.href = "/dashboard";
      }
    } catch (err) {
      setError("Authentication failed. Please check your credentials.");
      setLoading(false);
    }
  };

  const handleDemoSignIn = async (roleEmail: string) => {
    try {
      setLoading(true);
      setError(null);
      const isDev = roleEmail.includes("developer");
      const res = await signIn("credentials", {
        email: roleEmail,
        password: isDev ? "devPassword123" : "adminPassword123",
        redirect: false,
      });

      if (res?.error) {
        setError("Demo login failed.");
        setLoading(false);
      } else {
        window.location.href = "/dashboard";
      }
    } catch (err) {
      setError("Demo sign in failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 selection:bg-slate-900 selection:text-white">
      {/* Top navigation back button */}
      <div className="absolute top-6 left-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-2xs hover:shadow-xs transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Brand Logo */}
        <div className="inline-flex items-center justify-center relative w-12 h-12 rounded-xl overflow-hidden border border-slate-200 shadow-2xs bg-white mb-4">
          <Image
            src="/logo.png"
            alt="Kavya Labs Logo"
            width={48}
            height={48}
            className="w-full h-full object-contain p-1"
            priority
          />
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
          Sign In to Kavya Labs
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
          Autonomous AI Swarm Infrastructure &amp; Enterprise Control Plane
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-lg border border-slate-200 rounded-3xl space-y-6">
          {/* Error alert */}
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Primary: Google OAuth Sign In */}
          <div>
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-3 px-5 py-3.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm shadow-2xs hover:shadow-xs transition-all cursor-pointer active:scale-[0.99] disabled:opacity-60"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{loading ? "Redirecting to Google..." : "Continue with Google"}</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-[11px] font-mono text-slate-400 uppercase tracking-wider relative">
              or demo workspace
            </span>
            <div className="border-t border-slate-200 w-full" />
          </div>

          {/* 1-Click Fast Demo Logins */}
          <div className="space-y-2">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Instant 1-Click Demo Accounts
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleDemoSignIn("developer@kavyalabs.com")}
                disabled={loading}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 text-left transition-all cursor-pointer"
              >
                <div className="text-xs font-bold text-slate-900">Developer</div>
                <div className="text-[10px] text-slate-500 truncate">developer@kavyalabs</div>
              </button>
              <button
                type="button"
                onClick={() => handleDemoSignIn("admin@kavyalabs.com")}
                disabled={loading}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 text-left transition-all cursor-pointer"
              >
                <div className="text-xs font-bold text-slate-900">Admin</div>
                <div className="text-[10px] text-slate-500 truncate">admin@kavyalabs</div>
              </button>
            </div>
          </div>

          {/* Standard Credentials Form */}
          <form onSubmit={handleCredentialsSignIn} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Work Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm shadow-sm transition-all cursor-pointer active:scale-[0.99] disabled:opacity-60"
            >
              <span>{loading ? "Authenticating..." : "Sign In with Email"}</span>
              <ArrowRight className="w-4 h-4 text-slate-300" />
            </button>
          </form>

          {/* Signup Link */}
          <div className="pt-2 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-600">
              Don&apos;t have an enterprise account?{" "}
              <Link
                href="/signup"
                className="font-bold text-slate-900 hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>

          {/* Security badge footer */}
          <div className="pt-1 flex items-center justify-center gap-2 text-[11px] text-slate-500">
            <Lock className="w-3.5 h-3.5 text-lime-600" />
            <span>Encrypted OAuth 2.0 &amp; JWT Session Handling</span>
          </div>
        </div>
      </div>
    </div>
  );
}
