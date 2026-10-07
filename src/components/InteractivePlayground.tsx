"use client";

import { useState } from "react";
import { Copy, Check, Code2, Layers, Cpu, ShieldCheck } from "lucide-react";

export default function InteractivePlayground() {
  const [copied, setCopied] = useState(false);

  const codeSnippet = `import { KavyaSwarm } from "@kavya-labs/sdk";

// 1. Initialize enterprise orchestrator
const swarm = new KavyaSwarm({
  apiKey: process.env.KAVYA_API_KEY,
  cluster: "in-south-1",
  guardrails: { zeroHallucination: true, strictSchema: true }
});

// 2. Dispatch mission with consensus verification
const result = await swarm.execute({
  mission: "Reconcile corporate invoices & produce compliance verification",
  agents: ["retriever", "auditor"],
  timeoutMs: 1500
});

console.log("Decision verified in:", result.latencyMs, "ms");`;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="architecture" className="py-16 sm:py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs mb-3 sm:mb-4">
            <Code2 className="w-3.5 h-3.5 text-slate-600" />
            <span>Developer Architecture</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight">
            Developer-First SDKs Built for Simplicity
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-slate-600">
            Integrate autonomous swarms into existing production systems in fewer than 15 lines of code.
          </p>
        </div>

        {/* Static Workflow Diagram + Clean Static Code Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          {/* Static Workflow Diagram */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 font-mono">
              Execution Architecture
            </h3>

            <div className="space-y-3">
              <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 flex items-center justify-center shrink-0">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">1. Coordinator Agent</h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    Deconstructs business tasks into dependency graphs and coordinates worker sub-agents.
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 flex items-center justify-center shrink-0">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">2. Neural Execution Agents</h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    Queries private vector databases, external ERP APIs, and sandboxes concurrently.
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 text-lime-700 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">3. Deterministic Consensus</h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    Cross-validates answers, scrubs PII, and seals output with cryptographic audit hashes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Static Code Snippet Block */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-slate-900 border border-slate-800 shadow-xl overflow-hidden">
              <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-slate-950/90 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block" />
                  <span className="text-xs font-mono text-slate-400 font-medium ml-2">
                    quickstart.ts
                  </span>
                </div>

                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 transition-colors border border-slate-700 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-lime-400" />
                      <span className="text-lime-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-4 sm:p-6 overflow-x-auto">
                <pre className="font-mono text-xs sm:text-sm text-slate-200 leading-relaxed">
                  <code>{codeSnippet}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
