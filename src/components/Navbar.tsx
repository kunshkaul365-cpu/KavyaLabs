"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, ArrowRight, User, LogOut, LayoutDashboard, ChevronDown } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-50/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-slate-200 shadow-2xs bg-white flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Kavya Labs Logo"
                width={36}
                height={36}
                className="w-full h-full object-contain p-0.5 group-hover:scale-105 transition-transform"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base text-slate-900 tracking-tight leading-tight">
                Kavya Labs
              </span>
              <span className="text-[10px] font-medium tracking-wide text-slate-500 uppercase">
                Autonomous AI Systems
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="/#capabilities" className="hover:text-slate-900 transition-colors">
              Capabilities
            </a>
            <a href="/#platform" className="hover:text-slate-900 transition-colors">
              Platform
            </a>
            <a href="/#architecture" className="hover:text-slate-900 transition-colors">
              Architecture
            </a>
            <a href="/#benchmarks" className="hover:text-slate-900 transition-colors">
              Benchmarks
            </a>
            <Link href="/dashboard" className="hover:text-slate-900 transition-colors">
              Dashboard
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-medium text-slate-600">
              <span className="w-2 h-2 rounded-full bg-lime-600" />
              <span>Network Active</span>
            </div>

            {session?.user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-white border border-slate-200 hover:border-slate-300 shadow-2xs transition-all cursor-pointer"
                >
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || "User Avatar"}
                      width={28}
                      height={28}
                      className="w-7 h-7 rounded-full object-cover border border-slate-200"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                      {session.user.name ? session.user.name[0].toUpperCase() : "U"}
                    </div>
                  )}
                  <span className="text-xs font-semibold text-slate-800 max-w-[100px] truncate">
                    {session.user.name || "Engineer"}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-slate-200 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {session.user.name || "Kavya Engineer"}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">
                        {session.user.email}
                      </p>
                    </div>

                    <div className="py-1">
                      <Link
                        href="/dashboard"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 text-slate-500" />
                        <span>Command Dashboard</span>
                      </Link>
                    </div>

                    <div className="pt-1 border-t border-slate-100">
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          signOut({ callbackUrl: "/" });
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors rounded-lg hover:bg-slate-200/60"
                >
                  Sign In
                </Link>

                <a
                  href="/#contact"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-all hover:shadow-sm"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 text-slate-300" />
                </a>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {session?.user && (
              <Link href="/dashboard" className="p-1 rounded-full border border-slate-200 bg-white">
                <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                  {session.user.name ? session.user.name[0].toUpperCase() : "U"}
                </div>
              </Link>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <a
            href="/#capabilities"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100"
          >
            Capabilities
          </a>
          <a
            href="/#platform"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100"
          >
            Platform
          </a>
          <a
            href="/#architecture"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100"
          >
            Architecture
          </a>
          <a
            href="/#benchmarks"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100"
          >
            Benchmarks
          </a>

          <div className="pt-2 flex flex-col gap-2 border-t border-slate-100">
            {session?.user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 text-sm font-medium text-slate-800 bg-slate-100 rounded-lg"
                >
                  Command Dashboard
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="w-full text-center py-2 text-sm font-medium text-rose-600 border border-rose-200 rounded-lg hover:bg-rose-50"
                >
                  Sign Out ({session.user.name})
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 text-sm font-medium text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50"
                >
                  Sign In
                </Link>
                <a
                  href="/#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg"
                >
                  Get Started
                </a>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
