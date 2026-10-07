import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import InteractivePlayground from "@/components/InteractivePlayground";
import Metrics from "@/components/Metrics";
import Testimonials from "@/components/Testimonials";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased selection:bg-slate-900 selection:text-white">
      {/* Navigation */}
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Core Capabilities */}
        <Features />

        {/* Developer Architecture & Code Showcase */}
        <InteractivePlayground />

        {/* Benchmarks & Performance Metrics */}
        <Metrics />

        {/* Enterprise Testimonials */}
        <Testimonials />

        {/* Enterprise CTA & Request Access */}
        <CtaSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
