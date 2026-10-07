"use client";

import { Clock, ShieldCheck, Zap, TrendingUp } from "lucide-react";

export default function Metrics() {
  const benchmarks = [
    {
      metric: "<85ms",
      title: "Inference Latency Overhead",
      description: "Sub-100ms end-to-end multi-agent synchronization and consensus verification.",
      icon: <Clock className="w-5 h-5 text-slate-800" />,
    },
    {
      metric: "99.98%",
      title: "Guaranteed Uptime SLA",
      description: "Distributed multi-region active-active cluster failover architecture.",
      icon: <ShieldCheck className="w-5 h-5 text-lime-700" />,
    },
    {
      metric: "75%",
      title: "Token Cost Optimization",
      description: "Automated semantic caching and dynamic context-window pruning.",
      icon: <Zap className="w-5 h-5 text-slate-800" />,
    },
    {
      metric: "50M+",
      title: "Verified Transactions",
      description: "Deterministic decisions executed across production enterprise workloads.",
      icon: <TrendingUp className="w-5 h-5 text-slate-800" />,
    },
  ];

  return (
    <section id="benchmarks" className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benchmarks.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-slate-300 transition-all hover:shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="p-2 rounded-lg bg-white border border-slate-200 shadow-2xs">
                  {item.icon}
                </span>
                <span className="text-[11px] font-mono font-medium text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200 shadow-2xs">
                  VERIFIED
                </span>
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
                {item.metric}
              </div>
              <h4 className="text-sm font-bold text-slate-900 mt-2">{item.title}</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
