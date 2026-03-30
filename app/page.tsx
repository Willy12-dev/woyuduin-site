"use client";

import { useState } from "react";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how" },
  { label: "Pricing", href: "#pricing" },
  { label: "Brotherhood", href: "#brotherhood" },
];

const FEATURES = [
  {
    icon: "🛡️",
    title: "VPN Content Blocker",
    desc: "Blocks 40+ adult sites at the network level. No browser extension — works on EVERY app and browser on your phone.",
    color: "from-purple-500/20 to-purple-900/10",
  },
  {
    icon: "💥",
    title: "5-Step Interruption System",
    desc: "The moment you slip: STOP screen → forced breathing → distraction clip → reality check → action plan. You can't skip it.",
    color: "from-red-500/20 to-red-900/10",
  },
  {
    icon: "🤖",
    title: "AI Counselor",
    desc: "24/7 AI-powered support that talks you through urges, triggers, and tough moments. Like having a therapist in your pocket.",
    color: "from-cyan-500/20 to-cyan-900/10",
  },
  {
    icon: "🩺",
    title: "Therapist Marketplace",
    desc: "Book video, voice, or chat sessions with licensed professionals who specialize in porn addiction recovery. Real help, real results.",
    color: "from-teal-500/20 to-teal-900/10",
  },
  {
    icon: "📓",
    title: "Journal & Mood Tracking",
    desc: "Daily reflection prompts, mood tracking, and progress insights. Understand your patterns and watch yourself grow.",
    color: "from-amber-500/20 to-amber-900/10",
  },
  {
    icon: "📚",
    title: "Recovery Curriculum",
    desc: "Science-backed daily lessons on dopamine, triggers, rewiring, and mindset. 5 minutes a day that change your brain.",
    color: "from-blue-500/20 to-blue-900/10",
  },
  {
    icon: "🔄",
    title: "Habit Stacking",
    desc: "Replace bad habits with good ones. Track exercise, reading, meditation, cold showers — and check them off daily.",
    color: "from-lime-500/20 to-lime-900/10",
  },
  {
    icon: "🤝",
    title: "Accountability Partner",
    desc: "Get matched with a real man on the same journey. Daily check-ins, panic button, follow each other's progress.",
    color: "from-green-500/20 to-green-900/10",
  },
  {
    icon: "💑",
    title: "Couples Mode",
    desc: "Share your progress with your partner. Build trust through transparency. You control exactly what they see.",
    color: "from-pink-500/20 to-pink-900/10",
  },
  {
    icon: "🆘",
    title: "Emergency Contacts",
    desc: "One-tap call or text your trusted people when you're in crisis. Pre-loaded with a help message so you don't have to explain.",
    color: "from-red-500/20 to-red-900/10",
  },
  {
    icon: "🔒",
    title: "Tamper-Proof Protection",
    desc: "PIN-locked settings, 24-hour disable delay, root detection, and boot auto-start. Once you're in, you're IN.",
    color: "from-yellow-500/20 to-yellow-900/10",
  },
  {
    icon: "📊",
    title: "Streak Tracker & Leaderboard",
    desc: "Watch your days clean grow. Compete on the global leaderboard. Earn ranks from Fresh Start to LEGENDARY.",
    color: "from-indigo-500/20 to-indigo-900/10",
  },
];

const HOW_IT_WORKS = [
  { step: "1", icon: "📲", title: "Install & Activate", desc: "Download from Play Store. Grant permissions. Protection starts immediately." },
  { step: "2", icon: "🛡️", title: "24/7 Protection", desc: "VPN blocker + screen monitor runs silently in the background. You forget it's there." },
  { step: "3", icon: "💥", title: "Urge Hits? We Got You", desc: "The 5-step interruption fires. Breathing, distractions, your WHY. The urge dies." },
  { step: "4", icon: "📈", title: "Watch Your Streak Grow", desc: "Every day clean is a win. Track progress, earn ranks, compete on the leaderboard." },
];

const TESTIMONIALS = [
  {
    name: "warrior_365",
    streak: 47,
    badge: "🔥",
    text: "47 days in. The sticker that pops up when I try to open anything caught me off guard the first time. Now I just laugh and close the app. It works.",
  },
  {
    name: "kingstate_j",
    streak: 90,
    badge: "👑",
    text: "90 DAYS. I remember day 1 feeling impossible. The accountability partner feature is what kept me going. Having someone check on you daily changes everything.",
  },
  {
    name: "newchapter_mike",
    streak: 7,
    badge: "⚡",
    text: "First full week clean in 3 years. Woyuduin fired like 4 times on me but it worked. The interruption system is brutal in the best way.",
  },
  {
    name: "freedomseeker_t",
    streak: 180,
    badge: "🏆",
    text: "6 months. My relationship is better. My focus at work is insane. My confidence is back. This ONE change rippled into every area of my life.",
  },
];

const PRICING = [
  { plan: "1 Month", price: "$5", period: "/month", features: ["All premium features", "Cancel anytime"] },
  { plan: "3 Months", price: "$12", period: "/3 months", equiv: "$4/mo", badge: "SAVE 20%", savings: "Save 20%", features: ["All premium features", "Priority partner matching", "Save 20% vs monthly"] },
  { plan: "6 Months", price: "$20", period: "/6 months", equiv: "$3.33/mo", badge: "BEST VALUE", savings: "Save 33%", features: ["All premium features", "Priority partner matching", "All future updates", "Save 33% vs monthly"] },
];

const FAQ = [
  { q: "How does the VPN blocker work?", a: "Woyuduin creates a local VPN on your device that filters DNS requests. Adult sites are blocked at the network level — no data leaves your phone. It works on every app and browser, not just Chrome." },
  { q: "Can I disable it when I get an urge?", a: "That's the point — you can't easily disable it. PIN protection with a 24-hour disable delay means you have to wait a full day before turning protection off. By then, the urge has passed." },
  { q: "Is my data private?", a: "100%. All data stays on your device. We don't upload your browsing history, urge logs, or any personal data to any server. Your privacy is non-negotiable." },
  { q: "What coins can I pay with?", a: "We accept 300+ cryptocurrencies via NOWPayments — BTC, ETH, USDT, USDC, and more. M-Pesa and card payments coming soon." },
  { q: "Does it drain my battery?", a: "Minimal impact. The VPN blocker is lightweight and optimized. Most users don't notice any difference in battery life." },
  { q: "Is there a free trial?", a: "Yes! 5-day free trial with ALL premium features unlocked. No payment required upfront. Try everything, then decide." },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <main className="min-h-screen overflow-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            <span className="text-xl font-black tracking-tight">Woyuduin</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="text-sm text-white/50 hover:text-white transition-colors font-medium">
                {link.label}
              </a>
            ))}
            <a href="/download" className="bg-primary hover:bg-primary-dark text-white text-sm font-bold px-6 py-2.5 rounded-full transition-colors">
              Get Started
            </a>
          </div>
          <button className="md:hidden text-2xl" onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? "✕" : "☰"}
          </button>
        </div>
        {mobileMenu && (
          <div className="md:hidden glass border-t border-white/5 px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="text-white/60 font-medium" onClick={() => setMobileMenu(false)}>
                {link.label}
              </a>
            ))}
            <a href="/download" className="bg-primary text-white text-center font-bold py-3 rounded-full" onClick={() => setMobileMenu(false)}>
              Get Started
            </a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative pt-32 pb-20 px-6">
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
              Download App ⚡
            </a>
            <a href="#how" className="glass hover:bg-white/10 text-white/70 font-bold text-lg px-10 py-4 rounded-full transition-all">
              How It Works
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

        {/* Phone mockup */}
        <div className="max-w-xs mx-auto mt-16 animate-float">
          <div className="glass-elevated rounded-[2.5rem] p-6 glow-primary">
            <div className="bg-bg rounded-[2rem] p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-white/30">What you doing?!</div>
                  <div className="text-lg font-black">Woyuduin</div>
                </div>
                <div className="flex items-center gap-1.5 bg-success/10 border border-success/20 rounded-full px-3 py-1">
                  <div className="w-1.5 h-1.5 bg-success rounded-full" />
                  <span className="text-[10px] text-success font-bold">Protected</span>
                </div>
              </div>
              <div className="glass rounded-2xl p-6 text-center">
                <div className="text-3xl mb-1">🌱</div>
                <div className="text-4xl font-black">0</div>
                <div className="text-[10px] text-white/25 font-bold tracking-[4px] mt-1">DAYS CLEAN</div>
                <div className="text-xs text-success font-bold mt-2">DAY ONE. START HERE.</div>
              </div>
              <div className="flex gap-2">
                {[
                  { n: "0", l: "Blocked" },
                  { n: "0", l: "Hours" },
                  { n: "0", l: "Weeks" },
                ].map((s, i) => (
                  <div key={i} className="flex-1 glass rounded-xl p-3 text-center">
                    <div className="text-lg font-black">{s.n}</div>
                    <div className="text-[9px] text-white/25">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4">Everything You Need to <span className="text-gradient">Win</span></h2>
            <p className="text-white/40 text-lg max-w-2xl mx-auto">Built by someone who gets it. Every feature exists because it solves a real problem.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <div key={i} className="glass rounded-2xl p-7 hover:bg-white/[0.06] transition-all group">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform`}>
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4">Simple. Brutal. <span className="text-gradient">Effective.</span></h2>
            <p className="text-white/40 text-lg">Four steps between you and freedom.</p>
          </div>
          <div className="space-y-6">
            {HOW_IT_WORKS.map((item, i) => (
              <div key={i} className="glass rounded-2xl p-6 md:p-8 flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-black text-lg shrink-0">
                  {item.step}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{item.icon}</span>
                    <h3 className="text-lg font-bold">{item.title}</h3>
                  </div>
                  <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BROTHERHOOD */}
      <section id="brotherhood" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4">The <span className="text-gradient">Brotherhood</span></h2>
            <p className="text-white/40 text-lg">Real men. Real streaks. Real results.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="glass rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-lg">
                    {t.badge}
                  </div>
                  <div>
                    <div className="font-bold text-sm">{t.name}</div>
                    <div className="text-xs text-gold font-semibold">Day {t.streak}</div>
                  </div>
                </div>
                <p className="text-white/50 text-sm leading-relaxed">&ldquo;{t.text}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4">Start Your <span className="text-gradient">Journey</span></h2>
            <p className="text-white/40 text-lg">5-day free trial. Pay with crypto or M-Pesa.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {PRICING.map((p, i) => (
              <div key={i} className={`glass rounded-2xl p-7 relative ${i === 1 ? "glass-elevated glow-primary md:scale-105" : ""}`}>
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
                      <span className="text-success text-xs">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="#" className={`block text-center font-bold py-3.5 rounded-full transition-all ${i === 1 ? "bg-primary hover:bg-primary-dark text-white" : "glass hover:bg-white/10 text-white/70"}`}>
                  Download App
                </a>
              </div>
            ))}
          </div>
          <div className="text-center mt-8 flex flex-wrap justify-center gap-4">
            <div className="glass rounded-full px-4 py-2 text-xs text-white/30 font-medium flex items-center gap-2">
              <span>₿</span> BTC, ETH, USDT + 300 coins
            </div>
            <div className="glass rounded-full px-4 py-2 text-xs text-white/30 font-medium flex items-center gap-2">
              <span>📱</span> M-Pesa coming soon
            </div>
            <div className="glass rounded-full px-4 py-2 text-xs text-white/30 font-medium flex items-center gap-2">
              <span>💳</span> Card payments coming soon
            </div>
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
                  <span className="text-white/30 text-xl shrink-0">{openFaq === i ? "−" : "+"}</span>
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
                Start Your 5-Day Free Trial ⚡
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
            <a href="#" className="hover:text-white/60 transition-colors">Privacy</a>
            <a href="#" className="hover:text-white/60 transition-colors">Terms</a>
            <a href="#" className="hover:text-white/60 transition-colors">Support</a>
          </div>
          <div className="text-xs text-white/15">
            &copy; {new Date().getFullYear()} Flowi Group. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
