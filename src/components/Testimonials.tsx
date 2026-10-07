"use client";

import { MessageSquare, Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "Kavya Labs delivered the exact deterministic reliability our compliance team required. We replaced brittle prompt chains with an autonomous multi-agent swarm that runs with zero hallucinations.",
      author: "Aditi Rao",
      role: "VP of AI Systems",
      company: "FinScale Corporation",
    },
    {
      quote:
        "The latency numbers speak for themselves. Sub-100ms multi-agent coordination deployed inside our private AWS VPC has made autonomous reasoning viable for our live customer-facing workflows.",
      author: "Vikram Nambiar",
      role: "Chief Technology Officer",
      company: "HyperCloud Infrastructure",
    },
    {
      quote:
        "The developer ergonomics are simply unmatched. Our engineering teams went from initial evaluation to orchestrating complex distributed workflows in less than a week.",
      author: "Priya Sharma",
      role: "Principal Infrastructure Architect",
      company: "Aether Dynamics",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs mb-3 sm:mb-4">
            <MessageSquare className="w-3.5 h-3.5 text-slate-600" />
            <span>Enterprise Feedback</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Trusted by Engineering Leaders Worldwide
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            See how forward-thinking technology organizations scale their autonomous AI infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-slate-900">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-slate-900 text-slate-900" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-700 text-xs">
                  {t.author.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{t.author}</h4>
                  <p className="text-xs text-slate-500">
                    {t.role} • <span className="text-slate-800 font-medium">{t.company}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
