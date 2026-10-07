"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-100/80 border-t border-slate-200 text-slate-600 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-slate-200 bg-white shadow-2xs flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Kavya Labs Logo"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain p-0.5"
                />
              </div>
              <span className="font-bold text-base text-slate-900 tracking-tight">
                Kavya Labs
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-slate-500 max-w-sm leading-relaxed">
              Autonomous AI Swarm Infrastructure for enterprise engineering organizations.
              Deterministic multi-agent execution with sub-100ms reasoning latency.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white hover:bg-slate-200/60 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors shadow-2xs"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white hover:bg-slate-200/60 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors shadow-2xs"
                aria-label="X"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white hover:bg-slate-200/60 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors shadow-2xs"
                aria-label="LinkedIn"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 1: Capabilities */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 font-mono">
              Platform
            </h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li>
                <a href="#capabilities" className="hover:text-slate-900 transition-colors">
                  Multi-Agent Swarm
                </a>
              </li>
              <li>
                <a href="#capabilities" className="hover:text-slate-900 transition-colors">
                  Knowledge Graph &amp; RAG
                </a>
              </li>
              <li>
                <a href="#capabilities" className="hover:text-slate-900 transition-colors">
                  Inference Router
                </a>
              </li>
              <li>
                <a href="#capabilities" className="hover:text-slate-900 transition-colors">
                  Deterministic Guardrails
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Developers */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 font-mono">
              Developers
            </h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li>
                <a href="#architecture" className="hover:text-slate-900 transition-colors">
                  TypeScript SDK
                </a>
              </li>
              <li>
                <a href="#architecture" className="hover:text-slate-900 transition-colors">
                  Python SDK
                </a>
              </li>
              <li>
                <a href="#architecture" className="hover:text-slate-900 transition-colors">
                  API Reference
                </a>
              </li>
              <li>
                <span className="inline-flex items-center gap-1.5 text-lime-700 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime-600" />
                  Systems Operational
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: Enterprise */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 font-mono">
              Enterprise
            </h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li>
                <a href="#contact" className="hover:text-slate-900 transition-colors">
                  Private VPC Deployment
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-slate-900 transition-colors">
                  SOC2 Compliance
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-slate-900 transition-colors">
                  Enterprise Support
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-slate-900 transition-colors">
                  Contact Sales
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <span>© 2026 Kavya Labs Inc. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
