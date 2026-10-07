"use client";

import { 
  Bot, 
  Database, 
  ShieldCheck, 
  Zap, 
  Lock, 
  Activity, 
  ArrowUpRight, 
  Layers
} from "lucide-react";

export default function Features() {
  const capabilities = [
    {
      icon: <Bot className="w-5 h-5 text-slate-900" />,
      tag: "Swarm Core",
      title: "Autonomous Multi-Agent Orchestration",
      description:
        "Coordinate specialized agent clusters that decompose complex requests, self-heal runtime discrepancies, and require consensus validation before executing writes.",
      metrics: "Parallel sub-agent synchronization",
    },
    {
      icon: <Database className="w-5 h-5 text-slate-900" />,
      tag: "Knowledge Retrieval",
      title: "Hybrid Enterprise RAG & Knowledge Graph",
      description:
        "Dense-sparse vector search blended with relational graph indexing. Ingest structured SQL schemas, technical PDFs, and live API endpoints with sub-second retrieval.",
      metrics: "<25ms vector lookup overhead",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-lime-700" />,
      tag: "Deterministic Shield",
      title: "Verifiable Guardrails & PII Sanitization",
      description:
        "Continuous neural and regex filter layers that prevent hallucinations, mask confidential PII, and enforce strict JSON schemas on every downstream response.",
      metrics: "99.9% verifiable schema guarantee",
    },
    {
      icon: <Zap className="w-5 h-5 text-slate-900" />,
      tag: "Dynamic Routing",
      title: "Sub-100ms Inference Router",
      description:
        "Intelligently route reasoning tasks across leading frontier models and open-source weights based on context size, latency constraints, and cost optimization.",
      metrics: "Up to 75% token cost reduction",
    },
    {
      icon: <Lock className="w-5 h-5 text-slate-900" />,
      tag: "Deployment",
      title: "Private VPC & Air-Gapped Clusters",
      description:
        "Deploy natively within your own secure AWS, Azure, Google Cloud, or on-premise Kubernetes environments. Maintain complete data sovereignty with zero retention.",
      metrics: "SOC2 Type II & ISO 27001 Ready",
    },
    {
      icon: <Activity className="w-5 h-5 text-slate-900" />,
      tag: "Observability",
      title: "Deep Flamegraph Agent Tracing",
      description:
        "Inspect every intermediate thought step, tool call payload, external API response, and latency profile through detailed visual traces.",
      metrics: "OpenTelemetry & Prometheus Export",
    },
  ];

  return (
    <section id="capabilities" className="py-24 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 mb-4">
            <Layers className="w-3.5 h-3.5 text-slate-600" />
            <span>Platform Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight">
            Engineered for Verifiable Precision &amp; Enterprise Scale
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Every component of Kavya Labs is architected to transition probabilistic model outputs
            into deterministic, production-grade business processes.
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {capabilities.map((item, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl bg-slate-50/70 border border-slate-200/90 p-8 hover:bg-white hover:border-slate-300 transition-all duration-200 hover:shadow-lg flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-center group-hover:scale-105 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-md bg-white text-slate-600 border border-slate-200 shadow-2xs">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-slate-950 transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/70 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-mono">{item.metrics}</span>
                <span className="text-slate-900 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Learn more <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
