"use client";

import { useState } from "react";
import { ArrowRight, Play, CheckCircle2, Terminal, Cpu, Shield, Sparkles, Layers } from "lucide-react";

export default function Hero() {
  const [activeWorkflow, setActiveWorkflow] = useState<"audit" | "engineering" | "operations">("audit");

  const workflows = {
    audit: {
      title: "Automated Financial & Regulatory Audit",
      query: "Analyze quarterly transactional logs, detect compliance discrepancies, and format statutory filings.",
      steps: [
        { node: "Ingestion Engine", detail: "Streamed 45,000 ledger entries via secure RPC pipeline", latency: "18ms", status: "Verified" },
        { node: "Reasoning Agent", detail: "Evaluated transactions against IFRS & statutory guidelines", latency: "36ms", status: "Verified" },
        { node: "Deterministic Guardrail", detail: "Zero hallucination verified. Structured JSON ledger compiled", latency: "14ms", status: "Verified" },
      ],
      result: "Audit Dossier Generated • 0 Anomalies • Cryptographic Hash Locked",
      totalLatency: "68ms",
    },
    engineering: {
      title: "Autonomous Code Validation & Patching",
      query: "Identify concurrency race conditions across distributed microservices and verify non-breaking patch.",
      steps: [
        { node: "Static Analysis Swarm", detail: "Analyzed AST dependency graph across 84 core modules", latency: "29ms", status: "Verified" },
        { node: "Synthesis Worker", detail: "Drafted atomic mutex lock with deterministic backoff policy", latency: "44ms", status: "Verified" },
        { node: "Sandbox Validator", detail: "Passed 15,000 synthetic concurrency edge cases with 0 drops", latency: "22ms", status: "Verified" },
      ],
      result: "Pull Request #892 validated • 100% test coverage • Production Ready",
      totalLatency: "95ms",
    },
    operations: {
      title: "Cross-System Enterprise Data Synchronization",
      query: "Reconcile customer subscription tier variations between Stripe, Salesforce, and internal ERP database.",
      steps: [
        { node: "Schema Adapter", detail: "Retrieved customer contract schema and verified field mappings", latency: "15ms", status: "Verified" },
        { node: "Discrepancy Resolver", detail: "Identified billing mismatch for enterprise account ID #9041", latency: "28ms", status: "Verified" },
        { node: "Action Dispatcher", detail: "Synchronized billing records and emitted webhook events", latency: "19ms", status: "Verified" },
      ],
      result: "3 Systems Unified • Zero data drift • Audit trail recorded",
      totalLatency: "62ms",
    },
  };

  const current = workflows[activeWorkflow];

  return (
    <section id="platform" className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden bg-slate-50">
      {/* Subtle background gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-slate-200/50 via-slate-100/40 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header content */}
        <div className="flex flex-col items-center text-center">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-2xs mb-8">
            <span className="w-2 h-2 rounded-full bg-lime-600" />
            <span className="text-xs font-medium text-slate-700">
              Kavya Labs Platform 2.0
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-xs font-semibold text-slate-900 flex items-center">
              Deterministic AI Infrastructure <ArrowRight className="w-3 h-3 ml-1 text-slate-500" />
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-950 max-w-5xl leading-[1.1]">
            Autonomous Intelligence for the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900">
              Modern Enterprise
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-3xl leading-relaxed">
            Orchestrate autonomous agent swarms, dynamic contextual retrieval, and high-throughput
            reasoning pipelines with verifiable precision and sub-second execution.
          </p>

          {/* CTA Group */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <a
              href="#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 shadow-sm hover:shadow-md transition-all active:scale-[0.99]"
            >
              Start Free Trial
              <ArrowRight className="w-4 h-4 text-slate-300" />
            </a>
            <a
              href="#architecture"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-medium text-slate-700 bg-white hover:bg-slate-100/80 border border-slate-200 shadow-2xs transition-all"
            >
              <Terminal className="w-4 h-4 text-slate-500" />
              Explore SDK Architecture
            </a>
          </div>

          {/* Value Highlights */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-600">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-lime-600" />
              <span className="font-medium">Sub-100ms Inference</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-lime-600" />
              <span className="font-medium">Deterministic Guardrails</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-lime-600" />
              <span className="font-medium">Private Cloud &amp; VPC</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-lime-600" />
              <span className="font-medium">Zero Data Retention</span>
            </div>
          </div>
        </div>

        {/* Eloquent Studio & Execution Preview */}
        <div className="mt-16 mx-auto max-w-5xl rounded-2xl bg-white border border-slate-200/90 shadow-xl overflow-hidden">
          {/* Top Window Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 bg-slate-100/70 border-b border-slate-200 text-xs">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
              </div>
              <span className="text-slate-300 ml-1">|</span>
              <span className="font-mono text-slate-500 font-medium flex items-center gap-1.5 ml-1">
                <Layers className="w-3.5 h-3.5 text-slate-600" />
                kavya-runtime // orchestrator-node-01
              </span>
            </div>

            {/* Workflow selector */}
            <div className="flex items-center gap-1 bg-slate-200/60 p-1 rounded-lg">
              <button
                onClick={() => setActiveWorkflow("audit")}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                  activeWorkflow === "audit"
                    ? "bg-white text-slate-900 shadow-2xs font-semibold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Financial Audit
              </button>
              <button
                onClick={() => setActiveWorkflow("engineering")}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                  activeWorkflow === "engineering"
                    ? "bg-white text-slate-900 shadow-2xs font-semibold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Code Synthesis
              </button>
              <button
                onClick={() => setActiveWorkflow("operations")}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                  activeWorkflow === "operations"
                    ? "bg-white text-slate-900 shadow-2xs font-semibold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Data Sync
              </button>
            </div>
          </div>

          {/* Workflow details */}
          <div className="p-6 sm:p-8 space-y-6 bg-white">
            {/* Mission Prompt Box */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono">
                Mission Objective
              </div>
              <p className="text-slate-800 text-sm sm:text-base font-medium mt-1">
                &ldquo;{current.query}&rdquo;
              </p>
            </div>

            {/* Step execution pipeline */}
            <div className="space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Agent Swarm Pipeline
              </div>

              {current.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-50/60 border border-slate-200/70 hover:border-slate-300 transition-all text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-md bg-white border border-slate-200 text-slate-700 flex items-center justify-center font-bold text-[11px] shadow-2xs">
                      {idx + 1}
                    </span>
                    <div>
                      <span className="font-semibold text-slate-900">{step.node}: </span>
                      <span className="text-slate-600">{step.detail}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 sm:pl-4">
                    <span className="font-mono text-slate-500">⚡ {step.latency}</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] bg-lime-50 text-lime-700 border border-lime-200 font-medium">
                      {step.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary footer */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-700 font-medium">
                <Shield className="w-4 h-4 text-lime-600" />
                <span>{current.result}</span>
              </div>
              <div className="flex items-center gap-3 font-mono text-slate-500">
                <span>
                  Total Overhead: <strong className="text-slate-900">{current.totalLatency}</strong>
                </span>
                <span>•</span>
                <span className="text-slate-700 font-medium">Deterministic Rate: 99.8%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enterprise Logos Bar */}
        <div className="mt-20 pt-8 border-t border-slate-200 text-center">
          <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-6">
            Architected for enterprise interoperability &amp; modern cloud stacks
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-75">
            <span className="text-xs sm:text-sm font-bold tracking-wider text-slate-500 hover:text-slate-800 transition-colors">
              SNOWFLAKE
            </span>
            <span className="text-xs sm:text-sm font-bold tracking-wider text-slate-500 hover:text-slate-800 transition-colors">
              DATABRICKS
            </span>
            <span className="text-xs sm:text-sm font-bold tracking-wider text-slate-500 hover:text-slate-800 transition-colors">
              AMAZON BEDROCK
            </span>
            <span className="text-xs sm:text-sm font-bold tracking-wider text-slate-500 hover:text-slate-800 transition-colors">
              GOOGLE CLOUD
            </span>
            <span className="text-xs sm:text-sm font-bold tracking-wider text-slate-500 hover:text-slate-800 transition-colors">
              POSTGRESQL
            </span>
            <span className="text-xs sm:text-sm font-bold tracking-wider text-slate-500 hover:text-slate-800 transition-colors">
              HUGGING FACE
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
