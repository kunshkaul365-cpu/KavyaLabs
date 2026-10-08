import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const analyticsData = {
      kpis: [
        {
          label: "Total Swarm Invocations",
          value: "1,428,950",
          change: "+18.4%",
          isPositive: true,
          timeframe: "vs previous 30 days",
        },
        {
          label: "Enterprise Tokens Processed",
          value: "84.2M",
          change: "+34.1%",
          isPositive: true,
          timeframe: "optimized via cache",
        },
        {
          label: "Median Consensus Latency",
          value: "71.4ms",
          change: "-14.2ms",
          isPositive: true,
          timeframe: "P99 sub-100ms",
        },
        {
          label: "Estimated Cost Saved",
          value: "$14,820",
          change: "+76.8%",
          isPositive: true,
          timeframe: "via model routing",
        },
      ],
      dailyExecutions: [
        { day: "Mon", executions: 142000, tokens: 9.8, latency: 68 },
        { day: "Tue", executions: 189000, tokens: 12.4, latency: 74 },
        { day: "Wed", executions: 224000, tokens: 15.1, latency: 70 },
        { day: "Thu", executions: 268000, tokens: 17.6, latency: 69 },
        { day: "Fri", executions: 310000, tokens: 19.8, latency: 72 },
        { day: "Sat", executions: 165000, tokens: 10.2, latency: 65 },
        { day: "Sun", executions: 130950, tokens: 8.5, latency: 67 },
      ],
      modelDistribution: [
        { model: "Claude 3.7 Sonnet (Reasoning)", percentage: 42, color: "#6366f1" },
        { model: "OpenAI GPT-4o (Multimodal)", percentage: 31, color: "#10b981" },
        { model: "Llama 3.3 70B (Private VPC)", percentage: 18, color: "#8b5cf6" },
        { model: "DeepSeek R1 (Logic / Math)", percentage: 9, color: "#f59e0b" },
      ],
      recentAuditLogs: [
        {
          id: "tr_89140",
          agent: "Compliance Auditor Swarm",
          mission: "Quarterly Statutory Reconciliation",
          status: "Verified",
          tokens: "4,210",
          latency: "62ms",
          timestamp: "2 mins ago",
        },
        {
          id: "tr_89139",
          agent: "Code Synthesis Agent",
          mission: "Atomic Mutex Deadlock Elimination",
          status: "Verified",
          tokens: "6,890",
          latency: "94ms",
          timestamp: "8 mins ago",
        },
        {
          id: "tr_89138",
          agent: "Data Integration Swarm",
          mission: "ERP Salesforce Stripe Ledger Sync",
          status: "Verified",
          tokens: "2,140",
          latency: "51ms",
          timestamp: "15 mins ago",
        },
        {
          id: "tr_89137",
          agent: "RAG Retrieval Node",
          mission: "Dense Vector Search (Qdrant VPC)",
          status: "Verified",
          tokens: "1,450",
          latency: "28ms",
          timestamp: "24 mins ago",
        },
        {
          id: "tr_89136",
          agent: "Security Guardrail Verifier",
          mission: "PII Masking & Regex Sanitization",
          status: "Verified",
          tokens: "890",
          latency: "19ms",
          timestamp: "32 mins ago",
        },
      ],
    };

    return NextResponse.json(analyticsData);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
