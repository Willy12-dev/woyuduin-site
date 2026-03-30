"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const FEATURES_HIGHLIGHT = [
  { icon: "🛡️", title: "VPN Content Blocker", desc: "Blocks 40+ adult sites at the network level on every app." },
  { icon: "💥", title: "5-Step Interruption", desc: "Fires the moment you slip. Breathing, distractions, your WHY." },
  { icon: "🤖", title: "AI Counselor", desc: "24/7 AI-powered support to talk you through urges." },
  { icon: "🤝", title: "Accountability Partner", desc: "Get matched with a real man on the same journey." },
  { icon: "📊", title: "Streak Tracker", desc: "Watch your days grow. Compete on the leaderboard." },
  { icon: "🔒", title: "Tamper-Proof", desc: "PIN-locked, 24-hour disable delay, can't be bypassed." },
];

const PRICING = [
  { plan: "1 Month", price: "$5", period: "/month", features: ["All premium features", "Cancel anytime"] },
  { plan: "3 Months", price: "$12", period: "/3 months", equiv: "$4/mo", badge: "SAVE 20%", savings: "Save 20%", features: ["All premium features", "Priority partner matching", "Save 20% vs monthly"] },
  { plan: "6 Months", price: "$20", period: "/6 months", equiv: "$3.33/mo", badge: "BEST VALUE", savings: "Save 33%", features: ["All premium features", "Priority partner matching", "All future updates", "Save 33% vs monthly"] },
];

export default function ReferralPage() {
  const params = useParams();
  const code = params.code as string;
  const [affiliateName, setAffiliateName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    async function loadAffiliate() {
      if (!code) {
        setLoading(false);
        return;
      }

      // Store referral code in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("woyuduin_ref", code);
      }

      // Also store in cookie for server-side access
      document.cookie = `woyuduin_ref=${code}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`;

      // Fetch affiliate info
      const { data } = await supabase
        .from("affiliates")
        .select("full_name")
        .eq("referral_code", code)
        .single();

      if (data) {
        setAffiliateName(data.full_name.split(" ")[0]);
      }

      setLoading(false);
    }

    loadAffiliate();
  }, [code]);

  const FAQ = [
    { q: "How does the VPN blocker work?", a: "Woyuduin creates a local VPN on your device that filters DNS requests. Adult sites are blocked at the network level. Works on every app and browser." },
    { q: "Is there a free trial?", a: "Yes! 5-day free trial with ALL premium features unlocked. No payment required upfront." },
    { q: "Is my data private?", a: "100%. All data stays on your device. We don't upload your browsing history or any personal data." },
    { q: "What payment methods?", a: "Crypto (300+ coins via NOWPayments), M-Pesa, and card payments." },
  ];

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-white/40 text-lg">Loading...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-hidden">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            <span className="text-xl font-black tracking-tight">Woyuduin</span>
          </Link>
          <a href="/download" className="bg-primary hover:bg-primary-dark text-white text-sm font-bold px-6 py-2.5 rounded-full transition-colors">
            Download App
          </a>
        </div>
      </nav>

      {/* Referral Badge */}
      {affiliateName && (
        <div className="fixed top-[73px] left-0 right-0 z-40 bg-primary/10 border-b border-primary/20">
          <div className="max-w-6xl mx-auto px-6 py-2 flex items-center justify-center gap-2">
            <span className="text-sm text-primary-light font-medium">
              Referred by <span className="font-bold text-white">{affiliateName}</span>
            </span>
            <span className="text-xs text-success bg-success/10 px-2 py-0.5 rounded-full font-bold">5-day free trial</span>
          </div>
        </div>
      )}

      {/* HERO */}
      <section className={`relative ${affiliateName ? "pt-40" : "pt-32"} pb-20 px-6`}>
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 glass-elevated rounded-full px-5 py-2 mb-8">
            <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-sm text-primary-light font-semibold">5-day free trial — no card required</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-[1.05] mb-6 tracking-tight">
            What You <span className="text-gradient">Doing?!</span>
          </h1>

          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
            Block porn. Kill urges. Build discipline.
            <br className="hidden md:block" />
            Your personal bodyguard that runs 24/7.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a href="/download" className="bg-primary hover:bg-primary-dark text-white font-black text-lg px-10 py-4 rounded-full transition-all hover:scale-105 glow-primary">
              Download Free
            </a>
          </div>

          <div className="flex justify-center gap-8 md:gap-16">
            {[
              { num: "40+", label: "Sites Blocked" },
              { num: "5-Step", label: "Interruption" },
              { num: "24/7", label: "Protection" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-3xl font-black text-gradient">{stat.num}</div>
                <div className="text-xs text-white/30 font-bold mt-1 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES HIGHLIGHT */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4">Everything You Need to <span className="text-gradient">Win</span></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES_HIGHLIGHT.map((f, i) => (
              <div key={i} className="glass rounded-2xl p-7 hover:bg-white/[0.06] transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-900/10 flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4">Start Your <span className="text-gradient">Journey</span></h2>
            <p className="text-white/40 text-lg">5-day free trial. Pay with crypto or M-Pesa.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {PRICING.map((p, i) => (
              <div key={i} className={`glass rounded-2xl p-7 relative ${i === 2 ? "glass-elevated glow-primary md:scale-105" : ""}`}>
                {p.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-black px-4 py-1 rounded-full">
                    {p.badge}
                  </div>
                )}
                <div className="text-center mb-6 pt-2">
                  <h3 className="text-lg font-bold mb-1">{p.plan}</h3>
                  <div className="text-4xl font-black">{p.price}</div>
                  <div className="text-sm text-white/30">{p.period}</div>
                  {p.equiv && <div className="text-sm text-primary-light font-semibold mt-1">{p.equiv}</div>}
                  {p.savings && <div className="text-xs text-success font-bold mt-1">{p.savings}</div>}
                </div>
                <ul className="space-y-3 mb-8">
                  {p.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-white/50">
                      <span className="text-success text-xs">&#10003;</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="/download" className={`block text-center font-bold py-3.5 rounded-full transition-all ${i === 2 ? "bg-primary hover:bg-primary-dark text-white" : "glass hover:bg-white/10 text-white/70"}`}>
                  Download App
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4">Questions?</h2>
          </div>
          <div className="space-y-3">
            {FAQ.map((item, i) => (
              <div key={i} className="glass rounded-xl overflow-hidden">
                <button className="w-full flex items-center justify-between p-5 text-left" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="font-bold text-sm pr-4">{item.q}</span>
                  <span className="text-white/30 text-xl shrink-0">{openFaq === i ? "\u2212" : "+"}</span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="text-white/40 text-sm leading-relaxed">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="glass-elevated rounded-3xl p-12 md:p-16 glow-primary relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-black mb-4">Ready to Take Control?</h2>
              <p className="text-white/40 text-lg mb-8 max-w-lg mx-auto">
                Every day you wait is a day you could have been free. Start now.
              </p>
              <a href="/download" className="inline-block bg-primary hover:bg-primary-dark text-white font-black text-lg px-12 py-5 rounded-full transition-all hover:scale-105 glow-primary">
                Start Your 5-Day Free Trial
              </a>
              <p className="text-white/20 text-xs mt-6">No card required. Cancel anytime.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚡</span>
            <span className="font-black">Woyuduin</span>
            <span className="text-white/20 text-sm ml-2">by Flowi Group</span>
          </div>
          <div className="flex gap-8 text-sm text-white/30">
            <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
            <Link href="/affiliate" className="hover:text-white/60 transition-colors">Affiliates</Link>
          </div>
          <div className="text-xs text-white/15">
            &copy; {new Date().getFullYear()} Flowi Group. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
