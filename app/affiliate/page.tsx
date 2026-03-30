import Link from "next/link";

const STEPS = [
  {
    num: "1",
    icon: "📝",
    title: "Sign Up",
    desc: "Create your free affiliate account in under 60 seconds. No fees, no commitments.",
  },
  {
    num: "2",
    icon: "🔗",
    title: "Share Your Link",
    desc: "Get a unique referral link. Share it on social media, WhatsApp, YouTube, blogs — anywhere.",
  },
  {
    num: "3",
    icon: "💰",
    title: "Earn Cash",
    desc: "Earn 20% recurring commission every time someone you refer pays for a subscription. Paid via M-Pesa.",
  },
];

const BENEFITS = [
  { icon: "🔄", title: "Recurring Commission", desc: "Earn 20% on every payment your referrals make — not just the first one." },
  { icon: "📱", title: "M-Pesa Payouts", desc: "Get paid directly to your M-Pesa. Minimum payout is just $10." },
  { icon: "📊", title: "Real-Time Dashboard", desc: "Track clicks, signups, conversions, and earnings in your affiliate dashboard." },
  { icon: "🌍", title: "Global Program", desc: "Refer users from anywhere in the world. No geographic restrictions." },
  { icon: "🎯", title: "High Conversion", desc: "Woyuduin sells itself. 5-day free trial means your referrals can try before they buy." },
  { icon: "🤝", title: "Lifetime Attribution", desc: "Once someone signs up with your link, they are attributed to you permanently." },
];

export default function AffiliatePage() {
  return (
    <main className="min-h-screen overflow-hidden">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            <span className="text-xl font-black tracking-tight">Woyuduin</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/affiliate/login" className="text-sm text-white/50 hover:text-white transition-colors font-medium">
              Login
            </Link>
            <Link href="/affiliate/signup" className="bg-primary hover:bg-primary-dark text-white text-sm font-bold px-6 py-2.5 rounded-full transition-colors">
              Join Program
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 glass-elevated rounded-full px-5 py-2 mb-8">
            <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-sm text-primary-light font-semibold">Affiliate Program</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black leading-[1.05] mb-6 tracking-tight">
            Earn <span className="text-gradient">20% Commission</span> on Every Paying User You Refer
          </h1>
          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
            Help men break free from porn addiction and get paid for it. Share Woyuduin, earn recurring income.
          </p>
          <Link
            href="/affiliate/signup"
            className="inline-block bg-primary hover:bg-primary-dark text-white font-black text-lg px-10 py-4 rounded-full transition-all hover:scale-105 glow-primary"
          >
            Join the Affiliate Program
          </Link>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4">How It <span className="text-gradient">Works</span></h2>
            <p className="text-white/40 text-lg">Three simple steps to start earning.</p>
          </div>
          <div className="space-y-6">
            {STEPS.map((step, i) => (
              <div key={i} className="glass rounded-2xl p-6 md:p-8 flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-black text-lg shrink-0">
                  {step.num}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{step.icon}</span>
                    <h3 className="text-lg font-bold">{step.title}</h3>
                  </div>
                  <p className="text-white/40 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMISSION STRUCTURE */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4">Commission <span className="text-gradient">Structure</span></h2>
          </div>
          <div className="glass-elevated rounded-2xl p-8 md:p-12 glow-primary">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-black text-gradient mb-2">20%</div>
                <div className="text-sm text-white/50">Recurring commission on all payments</div>
              </div>
              <div>
                <div className="text-4xl font-black text-gradient mb-2">$10</div>
                <div className="text-sm text-white/50">Minimum payout threshold</div>
              </div>
              <div>
                <div className="text-4xl font-black text-gradient mb-2">M-Pesa</div>
                <div className="text-sm text-white/50">Direct payout to your phone</div>
              </div>
            </div>
            <div className="mt-10 glass rounded-xl p-6">
              <h3 className="font-bold mb-4 text-center">Example Earnings</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-white/50">
                  <span>10 referrals on 1-month plan ($5)</span>
                  <span className="text-success font-bold">$10/mo</span>
                </div>
                <div className="flex justify-between text-white/50">
                  <span>50 referrals on 3-month plan ($12)</span>
                  <span className="text-success font-bold">$120/quarter</span>
                </div>
                <div className="flex justify-between text-white/50">
                  <span>100 referrals on 6-month plan ($20)</span>
                  <span className="text-success font-bold">$400/6 months</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4">Why <span className="text-gradient">Join?</span></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map((b, i) => (
              <div key={i} className="glass rounded-2xl p-7 hover:bg-white/[0.06] transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-900/10 flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform">
                  {b.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{b.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{b.desc}</p>
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
              <h2 className="text-3xl md:text-5xl font-black mb-4">Ready to Start Earning?</h2>
              <p className="text-white/40 text-lg mb-8 max-w-lg mx-auto">
                Join the Woyuduin affiliate program and earn 20% on every subscription.
              </p>
              <Link
                href="/affiliate/signup"
                className="inline-block bg-primary hover:bg-primary-dark text-white font-black text-lg px-12 py-5 rounded-full transition-all hover:scale-105 glow-primary"
              >
                Join the Affiliate Program
              </Link>
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
            <span className="text-white/20 text-sm ml-2">Affiliate Program</span>
          </div>
          <div className="flex gap-8 text-sm text-white/30">
            <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
            <Link href="/affiliate/login" className="hover:text-white/60 transition-colors">Login</Link>
            <Link href="/affiliate/signup" className="hover:text-white/60 transition-colors">Sign Up</Link>
          </div>
          <div className="text-xs text-white/15">
            &copy; {new Date().getFullYear()} Flowi Group. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
