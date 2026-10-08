"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  ShieldCheck, 
  User, 
  LogOut, 
  Home, 
  Layers, 
  Activity, 
  Cpu, 
  CheckCircle2, 
  Lock,
  ArrowRight
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-600 font-mono text-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-900 animate-ping" />
          <span>Verifying encrypted session...</span>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated" || !session) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-4 text-center">
        <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center justify-center text-slate-900 mb-4">
          <Lock className="w-6 h-6 text-slate-700" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-950">Authentication Required</h1>
        <p className="mt-2 text-sm text-slate-600 max-w-md">
          This is a protected enterprise route. Please sign in with Google or your Kavya Labs demo credentials to access the workspace.
        </p>
        <div className="mt-6 flex items-center gap-3">
          <Link
            href="/login"
            className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 shadow-sm transition-all"
          >
            Sign In Now
          </Link>
          <Link
            href="/"
            className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-100 transition-all"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-slate-900 selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* User Welcome Banner */}
        <div className="rounded-3xl p-6 sm:p-8 bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-slate-200 shadow-xs bg-slate-100 flex items-center justify-center">
              {session.user?.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-slate-900 text-white flex items-center justify-center font-bold text-2xl">
                  {session.user?.name ? session.user.name[0].toUpperCase() : "U"}
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-950">
                  Welcome, {session.user?.name || "Kavya Engineer"}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-lime-50 text-lime-700 border border-lime-200 text-[11px] font-semibold">
                  Authenticated
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                {session.user?.email} • Enterprise Workspace Member
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              href="/"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-2xs transition-all"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Landing Page</span>
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-xs font-semibold text-rose-700 transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Live Session Telemetry Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Security Level</span>
              <ShieldCheck className="w-4 h-4 text-lime-600" />
            </div>
            <div className="text-xl font-bold text-slate-900">OAuth 2.0 / JWT</div>
            <p className="text-[11px] text-slate-500">Secure cookie session active</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Active Swarm Instances</span>
              <Layers className="w-4 h-4 text-slate-700" />
            </div>
            <div className="text-xl font-bold text-slate-900">3 Orchestrators</div>
            <p className="text-[11px] text-slate-500">Cluster: in-south-blr-1</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Reasoning Accuracy</span>
              <CheckCircle2 className="w-4 h-4 text-lime-600" />
            </div>
            <div className="text-xl font-bold text-slate-900">99.8% Deterministic</div>
            <p className="text-[11px] text-slate-500">0 schema validation errors</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Average Swarm Latency</span>
              <Activity className="w-4 h-4 text-slate-700" />
            </div>
            <div className="text-xl font-bold text-slate-900">72ms Overhead</div>
            <p className="text-[11px] text-slate-500">Sub-100ms benchmark met</p>
          </div>
        </div>

        {/* Week 3 Preview Card */}
        <div className="p-8 rounded-3xl bg-slate-900 text-white shadow-xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-xs font-medium text-slate-300 border border-slate-700">
            <span className="w-2 h-2 rounded-full bg-lime-400" />
            <span>Next Milestone: Week 3 Sprint</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold">
            Admin Dashboard &amp; Analytics Control Plane
          </h2>

          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Authentication successfully verified for Week 2! In Week 3, this area will expand into the comprehensive Admin Dashboard featuring user management tables, role assignments, real-time token telemetry, and investor demo analytics.
          </p>

          <div className="pt-2 flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 text-lime-400 font-medium">
              <CheckCircle2 className="w-4 h-4" /> Week 1: Landing Page (Shipped)
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-lime-400 font-medium">
              <CheckCircle2 className="w-4 h-4" /> Week 2: User Authentication (Complete)
            </span>
            <span>•</span>
            <span className="text-slate-400">Week 3: Admin Dashboard (Ready)</span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
