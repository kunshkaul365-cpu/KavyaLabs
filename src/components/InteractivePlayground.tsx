"use client";

import { useState } from "react";
import { Terminal, Copy, Check, Code2, Layers, Cpu, ShieldCheck } from "lucide-react";

export default function InteractivePlayground() {
  const [activeTab, setActiveTab] = useState<"ts" | "python" | "architecture">("ts");
  const [copied, setCopied] = useState(false);

  const snippets = {
    ts: `import { KavyaSwarm, Agent } from "@kavya-labs/sdk";

// Initialize Kavya enterprise orchestrator
const swarm = new KavyaSwarm({
  apiKey: process.env.KAVYA_API_KEY,
  cluster: "in-south-1",
  guardrails: { zeroHallucination: true, strictSchema: true }
});

// Configure specialized agents
const retriever = swarm.agent({ role: "context-indexer", vectorStore: "vpc-qdrant" });
const analyst = swarm.agent({ role: "statutory-auditor", model: "claude-3-7-sonnet" });

// Dispatch mission with consensus verification
const execution = await swarm.execute({
  mission: "Reconcile corporate invoices & produce compliance verification",
  agents: [retriever, analyst],
  timeoutMs: 2000
});

console.log("Execution verified in:", execution.latencyMs, "ms");
console.log(execution.report);`,

    python: `from kavya import Swarm, Agent, Guardrails

# Connect to private enterprise cluster
client = Swarm(
    api_key="kavya_prod_live_key",
    endpoint="https://ai-gateway.internal.corp",
    guardrails=Guardrails(zero_hallucination=True, pii_masking=True)
)

# Register task agents
indexer = client.create_agent(name="SchemaIndexer", tools=["sql_catalog", "docs_vector"])
synthesizer = client.create_agent(name="DecisionEngine", model="gpt-4o")

# Run autonomous mission pipeline
pipeline = client.dispatch_pipeline(
    task="Scan 20,000 ledger transactions for tax variance discrepancies",
    agents=[indexer, synthesizer],
    require_consensus=True
)

for trace in pipeline.stream_traces():
    print(f"[{trace.agent}] {trace.action} -> {trace.status}")

final_report = pipeline.get_result()
print("Cryptographic Audit Hash:", final_report.audit_hash)`,
  };

  const handleCopy = () => {
    const textToCopy = activeTab === "ts" ? snippets.ts : snippets.python;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="architecture" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs mb-4">
            <Code2 className="w-3.5 h-3.5 text-slate-600" />
            <span>Developer Experience</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight">
            Developer-First SDKs Built for Simplicity
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Integrate autonomous swarms into existing codebases in fewer than 20 lines of code.
            End-to-end type safety, async streaming, and enterprise guardrails standard.
          </p>
        </div>

        {/* Code & Architecture Showcase */}
        <div className="max-w-4xl mx-auto rounded-2xl bg-slate-900 border border-slate-800 shadow-xl overflow-hidden">
          {/* Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 bg-slate-950/80 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab("ts")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === "ts"
                    ? "bg-slate-800 text-white shadow-2xs"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                TypeScript / Node.js
              </button>
              <button
                onClick={() => setActiveTab("python")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === "python"
                    ? "bg-slate-800 text-white shadow-2xs"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Python SDK
              </button>
              <button
                onClick={() => setActiveTab("architecture")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === "architecture"
                    ? "bg-slate-800 text-white shadow-2xs"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Distributed Topology
              </button>
            </div>

            {activeTab !== "architecture" && (
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 transition-colors border border-slate-700"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-lime-400" />
                    <span className="text-lime-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Snippet</span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === "architecture" ? (
              <div className="py-6 space-y-6">
                <div className="text-center max-w-md mx-auto">
                  <h4 className="text-white font-bold text-base">Hierarchical Distributed Swarm Runtime</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Multi-tier coordination separating intent parsing, parallel execution, and deterministic validation.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700 text-center space-y-2">
                    <div className="w-9 h-9 mx-auto rounded-lg bg-slate-700 text-slate-200 flex items-center justify-center">
                      <Layers className="w-4 h-4" />
                    </div>
                    <h5 className="font-semibold text-white text-xs sm:text-sm">1. Coordinator Node</h5>
                    <p className="text-xs text-slate-400">
                      Parses business intent, constructs DAG dependencies, and assigns agent privileges.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700 text-center space-y-2">
                    <div className="w-9 h-9 mx-auto rounded-lg bg-slate-700 text-slate-200 flex items-center justify-center">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <h5 className="font-semibold text-white text-xs sm:text-sm">2. Neural Execution Agents</h5>
                    <p className="text-xs text-slate-400">
                      Parallel workers querying private vector stores, databases, and tool environments.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700 text-center space-y-2">
                    <div className="w-9 h-9 mx-auto rounded-lg bg-slate-700 text-lime-400 flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <h5 className="font-semibold text-white text-xs sm:text-sm">3. Guardrail Consensus</h5>
                    <p className="text-xs text-slate-400">
                      Cross-agent consistency checks, PII scrubbing, and cryptographic audit locking.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <pre className="font-mono text-xs sm:text-sm text-slate-200 overflow-x-auto leading-relaxed">
                <code>{snippets[activeTab]}</code>
              </pre>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
