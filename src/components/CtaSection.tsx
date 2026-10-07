"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Shield, Lock, Send } from "lucide-react";

export default function CtaSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-14 bg-slate-900 text-white shadow-xl text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-800 text-xs font-medium text-slate-300 border border-slate-700">
            <span className="w-2 h-2 rounded-full bg-lime-400" />
            <span>Enterprise Preview</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight max-w-2xl mx-auto leading-tight">
            Accelerate Your Enterprise AI Roadmap Today
          </h2>

          <p className="text-slate-300 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
            Get access to the Kavya Labs SDK, private sandboxes, and dedicated enterprise support.
          </p>

          {submitted ? (
            <div className="max-w-md mx-auto p-6 rounded-2xl bg-slate-800/90 border border-slate-700 text-slate-200 space-y-2">
              <CheckCircle2 className="w-8 h-8 mx-auto text-lime-400" />
              <h4 className="font-bold text-lg text-white">Access Request Received</h4>
              <p className="text-xs text-slate-300">
                A verification link and trial credentials have been sent to{" "}
                <strong className="text-lime-300">{email}</strong>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your corporate email..."
                className="flex-1 px-5 py-3.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-950 bg-white hover:bg-slate-100 shadow-sm transition-all shrink-0"
              >
                <span>Request Access</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-slate-400" /> SOC2 Type II Certified
            </span>
            <span>•</span>
            <span>99.98% High Availability SLA</span>
            <span>•</span>
            <span>Dedicated VPC Support</span>
          </div>
        </div>
      </div>
    </section>
  );
}
