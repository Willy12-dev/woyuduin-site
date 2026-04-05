"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Shield, Zap, Bot, Stethoscope, BookOpen, GraduationCap,
  RefreshCw, Users, Heart, Phone, Lock, Trophy,
  Download, ArrowRight, Play, ChevronDown, Check,
  Flame, Crown, Star, Award, Smartphone, Eye,
  AlertTriangle, Clock, Wifi,
} from "lucide-react";

/* ─── DATA ─── */
const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how" },
  { label: "Pricing", href: "#pricing" },
  { label: "Brotherhood", href: "#brotherhood" },
];

const FEATURES = [
  { Icon: Shield, title: "VPN Content Blocker", desc: "Blocks 40+ adult sites at the network level. Works on EVERY app and browser.", color: "from-purple-500/20 to-purple-900/10", accent: "#7c3aed" },
  { Icon: AlertTriangle, title: "5-Step Interruption", desc: "STOP screen, breathing, distraction, reality check, action plan. Can't skip it.", color: "from-red-500/20 to-red-900/10", accent: "#ef4444" },
  { Icon: Bot, title: "AI Counselor", desc: "24/7 AI support that talks you through urges, triggers, and tough moments.", color: "from-cyan-500/20 to-cyan-900/10", accent: "#06b6d4" },
  { Icon: Stethoscope, title: "Therapist Marketplace", desc: "Book video sessions with licensed professionals who specialize in recovery.", color: "from-teal-500/20 to-teal-900/10", accent: "#14b8a6" },
  { Icon: BookOpen, title: "Journal & Mood Tracking", desc: "Daily prompts, mood tracking, and insights. Understand your patterns.", color: "from-amber-500/20 to-amber-900/10", accent: "#f59e0b" },
  { Icon: GraduationCap, title: "Recovery Curriculum", desc: "Science-backed lessons on dopamine, triggers, rewiring. 5 min daily.", color: "from-blue-500/20 to-blue-900/10", accent: "#3b82f6" },
  { Icon: RefreshCw, title: "Habit Stacking", desc: "Replace bad habits with good ones. Track exercise, reading, meditation.", color: "from-lime-500/20 to-lime-900/10", accent: "#84cc16" },
  { Icon: Users, title: "Accountability Partner", desc: "Matched with a real person. Daily check-ins, panic button, shared progress.", color: "from-green-500/20 to-green-900/10", accent: "#10b981" },
  { Icon: Heart, title: "Couples Mode", desc: "Share progress with your partner. Build trust through transparency.", color: "from-pink-500/20 to-pink-900/10", accent: "#ec4899" },
  { Icon: Phone, title: "Emergency Contacts", desc: "One-tap call your trusted people in crisis. Pre-loaded help message.", color: "from-red-500/20 to-red-900/10", accent: "#ef4444" },
  { Icon: Lock, title: "Tamper-Proof", desc: "PIN-locked, 24hr disable delay, root detection, boot auto-start.", color: "from-yellow-500/20 to-yellow-900/10", accent: "#eab308" },
  { Icon: Trophy, title: "Streak & Leaderboard", desc: "Watch your days grow. Compete globally. Earn ranks to LEGENDARY.", color: "from-indigo-500/20 to-indigo-900/10", accent: "#6366f1" },
];

const HOW_IT_WORKS = [
  { step: "01", Icon: Smartphone, title: "Install & Activate", desc: "Download from Play Store. Grant permissions. Protection starts immediately." },
  { step: "02", Icon: Shield, title: "24/7 Protection", desc: "VPN blocker + screen monitor runs silently in the background. You forget it's there." },
  { step: "03", Icon: Zap, title: "Urge Hits? We Got You", desc: "The 5-step interruption fires. Breathing, distractions, your WHY. The urge dies." },
  { step: "04", Icon: Trophy, title: "Watch Your Streak Grow", desc: "Every day clean is a win. Track progress, earn ranks, compete on the leaderboard." },
];

const TESTIMONIALS = [
  { name: "warrior_365", streak: 47, BadgeIcon: Flame, badgeColor: "#f59e0b", text: "47 days in. The sticker popup when I try to open anything caught me off guard. Now I just laugh and close the app. It works." },
  { name: "kingstate_j", streak: 90, BadgeIcon: Crown, badgeColor: "#a78bfa", text: "90 DAYS. Day 1 felt impossible. The accountability partner feature kept me going. Having someone check on you daily changes everything." },
  { name: "newchapter_mike", streak: 7, BadgeIcon: Zap, badgeColor: "#7c3aed", text: "First full week clean in 3 years. Woyuduin fired 4 times on me but it worked. The interruption system is brutal in the best way." },
  { name: "freedomseeker_t", streak: 180, BadgeIcon: Award, badgeColor: "#10b981", text: "6 months. My relationship is better. My focus at work is insane. My confidence is back. This ONE change rippled into every area of my life." },
];

const PRICING = [
  { plan: "1 Month", price: "$5", period: "/month", features: ["All premium features", "Cancel anytime"] },
  { plan: "3 Months", price: "$12", period: "/3 months", equiv: "$4/mo", badge: "SAVE 20%", savings: "Save 20%", features: ["All premium features", "Priority partner matching", "Save 20% vs monthly"] },
  { plan: "6 Months", price: "$20", period: "/6 months", equiv: "$3.33/mo", badge: "BEST VALUE", savings: "Save 33%", features: ["All premium features", "Priority partner matching", "All future updates", "Save 33% vs monthly"] },
];

const FAQ = [
  { q: "How does the VPN blocker work?", a: "Woyuduin creates a local VPN on your device that filters DNS requests. Adult sites are blocked at the network level — works on every app and browser." },
  { q: "Can I disable it when I get an urge?", a: "That's the point — you can't. PIN protection with a 24-hour disable delay means by the time you can turn it off, the urge has passed." },
  { q: "Is my data private?", a: "100%. All data stays on your device. We don't upload your browsing history, urge logs, or any personal data." },
  { q: "What coins can I pay with?", a: "300+ cryptocurrencies via NOWPayments — BTC, ETH, USDT, USDC, and more. M-Pesa and card payments coming soon." },
  { q: "Does it drain my battery?", a: "Minimal impact. The VPN blocker is lightweight. Most users don't notice any battery difference." },
  { q: "Is there a free trial?", a: "Yes! 5-day free trial with ALL features unlocked. No payment required upfront." },
];

const STATS = [
  { end: 40, suffix: "+", label: "Sites Blocked" },
  { end: 5, suffix: "-Step", label: "Interruption" },
  { end: 24, suffix: "/7", label: "Protection" },
];

/* ─── COMPONENTS ─── */

function AnimatedCounter({ end, suffix, duration = 2 }: { end: number; suffix: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = end / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return <span ref={ref} className="counter-value">{count}{suffix}</span>;
}

function Particles() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-[2px] h-[2px] bg-primary-light/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `particle-float ${8 + Math.random() * 12}s linear infinite`,
            animationDelay: `${Math.random() * 10}s`,
          }}
        />
      ))}
    </div>
  );
}

function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-primary/8 blob animate-morph" />
      <div className="absolute top-1/2 -right-32 w-[400px] h-[400px] bg-indigo-500/6 blob animate-morph" style={{ animationDelay: "-3s" }} />
      <div className="absolute -bottom-20 left-1/3 w-[350px] h-[350px] bg-purple-600/5 blob animate-morph" style={{ animationDelay: "-6s" }} />
    </div>
  );
}

function SectionReveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function GlowingLine() {
  return (
    <div className="w-full max-w-4xl mx-auto h-px relative my-2">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full glow-primary" />
    </div>
  );
}

/* ─── MAIN ─── */

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  return (
    <main className="min-h-screen overflow-hidden noise-overlay relative">
      <Particles />

      {/* ═══ NAVBAR ═══ */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/5"
        style={{ backgroundColor: `rgba(6, 6, 12, 0.8)`, backdropFilter: "blur(20px)" }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Zap className="w-4 h-4 text-primary-light" />
            </div>
            <span className="text-xl font-black tracking-tight">Woyuduin</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="text-sm text-white/40 hover:text-white transition-colors font-medium animated-underline">
                {link.label}
              </a>
            ))}
            <a href="/download" className="relative bg-primary hover:bg-primary-dark text-white text-sm font-bold px-6 py-2.5 rounded-full transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(124,58,237,0.3)]">
              Get Started
            </a>
          </div>
          <button className="md:hidden text-2xl text-white/60" onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? "✕" : "☰"}
          </button>
        </div>
        <AnimatePresence>
          {mobileMenu && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-white/5 px-6 overflow-hidden"
              style={{ background: "rgba(6, 6, 12, 0.95)" }}
            >
              <div className="py-4 flex flex-col gap-4">
                {NAV_LINKS.map((link) => (
                  <a key={link.href} href={link.href} className="text-white/60 font-medium" onClick={() => setMobileMenu(false)}>
                    {link.label}
                  </a>
                ))}
                <a href="/download" className="bg-primary text-white text-center font-bold py-3 rounded-full" onClick={() => setMobileMenu(false)}>
                  Get Started
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ═══ HERO ═══ */}
      <section className="relative pt-36 pb-24 px-6 min-h-screen flex flex-col justify-center">
        {/* Animated background */}
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-primary/15 via-indigo-600/10 to-transparent rounded-full blur-[150px] animate-pulse-glow" />
        <div className="absolute top-40 right-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px] animate-morph" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-600/5 rounded-full blur-[80px]" />

        {/* Orbiting dots */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] hidden md:block">
          <div className="animate-orbit">
            <div className="w-2 h-2 bg-primary/40 rounded-full" />
          </div>
          <div className="animate-orbit-reverse" style={{ animationDelay: "-5s" }}>
            <div className="w-1.5 h-1.5 bg-gold/30 rounded-full" />
          </div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2.5 glass-elevated rounded-full px-5 py-2.5 mb-10"
          >
            <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-sm text-primary-light font-semibold tracking-wide">5-day free trial — no card required</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl font-black leading-[1.02] mb-7 tracking-tight hero-text-glow"
          >
            What You{" "}
            <span className="text-gradient relative">
              Doing?!
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary-light to-gold rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: "left" }}
              />
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="text-lg md:text-2xl text-white/40 max-w-2xl mx-auto mb-12 leading-relaxed font-medium"
          >
            Block porn. Kill urges. Build discipline.
            <br className="hidden md:block" />
            <span className="text-white/60">Your personal bodyguard that runs 24/7.</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <a href="/download" className="group relative bg-primary hover:bg-primary-dark text-white font-black text-lg px-12 py-5 rounded-full transition-all hover:scale-105 glow-primary overflow-hidden">
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                Download App
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </a>
            <a href="#how" className="glass hover:bg-white/10 text-white/60 font-bold text-lg px-12 py-5 rounded-full transition-all hover:scale-105 hover:text-white/80">
              How It Works
            </a>
          </motion.div>

          {/* Stats with animated counters */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex justify-center gap-10 md:gap-20"
          >
            {STATS.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-black text-gradient counter-value">
                  <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                </div>
                <div className="text-[10px] text-white/25 font-bold mt-2 uppercase tracking-[4px]">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Phone Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[280px] mx-auto mt-20"
        >
          <div className="relative animate-float">
            {/* Phone glow */}
            <div className="absolute -inset-8 bg-primary/10 rounded-full blur-[60px] animate-pulse-glow" />

            <div className="relative glass-elevated rounded-[2.5rem] p-5 glow-primary">
              <div className="bg-[#06060c] rounded-[2rem] p-5 space-y-3">
                {/* Status bar */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-white/20 tracking-widest uppercase">What you doing?!</div>
                    <div className="text-base font-black mt-0.5">Woyuduin</div>
                  </div>
                  <div className="flex items-center gap-1.5 bg-success/10 border border-success/20 rounded-full px-2.5 py-1">
                    <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse" />
                    <span className="text-[9px] text-success font-bold">Protected</span>
                  </div>
                </div>

                {/* Streak ring */}
                <div className="glass rounded-2xl p-5 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
                  <div className="relative">
                    <div className="mb-1"><Shield className="w-8 h-8 text-primary mx-auto" /></div>
                    <div className="text-4xl font-black tracking-tight">47</div>
                    <div className="text-[9px] text-white/20 font-bold tracking-[4px] mt-1">DAYS CLEAN</div>
                    <div className="text-[10px] text-gold font-bold mt-2 flex items-center justify-center gap-1">
                      <Flame className="w-3 h-3" /> ON FIRE
                    </div>
                  </div>
                </div>

                {/* Stats row */}
                <div className="flex gap-2">
                  {[
                    { n: "142", l: "Blocked" },
                    { n: "1128", l: "Hours" },
                    { n: "6", l: "Weeks" },
                  ].map((stat, i) => (
                    <div key={i} className="flex-1 glass rounded-xl p-2.5 text-center">
                      <div className="text-sm font-black">{stat.n}</div>
                      <div className="text-[8px] text-white/20 uppercase tracking-wider">{stat.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] text-white/20 uppercase tracking-[4px]">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 border border-white/10 rounded-full flex justify-center pt-1.5"
          >
            <div className="w-1 h-1.5 bg-white/30 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══ SOCIAL PROOF BAR ═══ */}
      <SectionReveal>
        <div className="py-8 border-y border-white/5 overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 flex items-center justify-center gap-12 md:gap-20 flex-wrap">
            {[
              { num: "2,500+", label: "Active Warriors" },
              { num: "180+", label: "Longest Streak" },
              { num: "50K+", label: "Urges Defeated" },
              { num: "4.9", label: "App Rating" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-xl md:text-2xl font-black text-white/90">{s.num}</div>
                <div className="text-[10px] text-white/30 font-bold uppercase tracking-widest mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </SectionReveal>

      {/* ═══ VIDEO SHOWCASE ═══ */}
      <section className="py-28 px-6 relative">
        <FloatingOrbs />
        <div className="max-w-5xl mx-auto relative z-10">
          <SectionReveal>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6 text-xs text-white/40 font-semibold uppercase tracking-widest">
                <span className="w-1.5 h-1.5 bg-danger rounded-full animate-pulse" /> See it in action
              </div>
              <h2 className="text-3xl md:text-5xl font-black mb-4">
                Watch How It <span className="text-gradient">Protects You</span>
              </h2>
              <p className="text-white/35 text-lg max-w-xl mx-auto">Your digital bodyguard in action. Real protection, real results.</p>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <div className="video-container aspect-video relative group cursor-pointer">
              {/* Animated border glow */}
              <div className="absolute -inset-[1px] rounded-[25px] bg-gradient-to-r from-primary/40 via-transparent to-gold/30 animate-gradient-shift opacity-60" style={{ backgroundSize: "200% 200%" }} />

              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-[#06060c] to-indigo-900/10 rounded-3xl flex items-center justify-center">
                {/* Grid overlay */}
                <div className="absolute inset-0 bg-grid opacity-30 rounded-3xl" />

                {/* Play button */}
                <div className="relative z-10 flex flex-col items-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center backdrop-blur-sm group-hover:bg-primary/30 transition-all"
                  >
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary flex items-center justify-center glow-primary">
                      <Play className="w-6 h-6 md:w-7 md:h-7 text-white ml-0.5" fill="currentColor" />
                    </div>
                  </motion.div>
                  <span className="text-sm text-white/40 font-semibold tracking-wide">Watch Demo</span>
                </div>

                {/* Corner decorations */}
                <div className="absolute top-6 left-6 flex items-center gap-2">
                  <Eye className="w-3.5 h-3.5 text-danger animate-pulse" />
                  <span className="text-[10px] text-white/20 font-bold uppercase tracking-widest">Live Demo</span>
                </div>
                <div className="absolute bottom-6 right-6 text-[10px] text-white/15 font-mono">00:00 / 2:45</div>
              </div>
            </div>
          </SectionReveal>

          {/* Video feature pills */}
          <SectionReveal delay={0.4}>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {["VPN Blocking", "Interruption System", "AI Counselor", "Streak Tracking"].map((label, i) => (
                <div key={i} className="glass rounded-full px-4 py-2 text-xs text-white/30 font-semibold flex items-center gap-2 hover:text-white/50 hover:bg-white/[0.04] transition-all cursor-pointer">
                  <div className="w-1 h-1 bg-primary rounded-full" />
                  {label}
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section id="features" className="py-28 px-6 relative">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="max-w-6xl mx-auto relative z-10">
          <SectionReveal>
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6 text-xs text-white/40 font-semibold uppercase tracking-widest">
                Features
              </div>
              <h2 className="text-3xl md:text-6xl font-black mb-5">
                Everything You Need to <span className="text-gradient">Win</span>
              </h2>
              <p className="text-white/35 text-lg max-w-2xl mx-auto">Built by someone who gets it. Every feature exists because it solves a real problem.</p>
            </div>
          </SectionReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <SectionReveal key={i} delay={i * 0.05}>
                <div className="gradient-border rounded-2xl p-7 hover-lift card-shine group h-full">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <f.Icon className="w-6 h-6" style={{ color: f.accent }} />
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-white transition-colors">{f.title}</h3>
                  <p className="text-white/35 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <GlowingLine />

      {/* ═══ HOW IT WORKS ═══ */}
      <section id="how" className="py-28 px-6 relative">
        <FloatingOrbs />
        <div className="max-w-4xl mx-auto relative z-10">
          <SectionReveal>
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6 text-xs text-white/40 font-semibold uppercase tracking-widest">
                How it works
              </div>
              <h2 className="text-3xl md:text-6xl font-black mb-5">
                Simple. Brutal. <span className="text-gradient">Effective.</span>
              </h2>
              <p className="text-white/35 text-lg">Four steps between you and freedom.</p>
            </div>
          </SectionReveal>

          <div className="relative">
            {/* Vertical connector line */}
            <div className="absolute left-[35px] md:left-[39px] top-0 bottom-0 w-px bg-gradient-to-b from-primary/30 via-primary/10 to-transparent hidden sm:block" />

            <div className="space-y-6">
              {HOW_IT_WORKS.map((item, i) => (
                <SectionReveal key={i} delay={i * 0.15}>
                  <div className="gradient-border rounded-2xl p-6 md:p-8 flex items-start gap-6 hover-lift card-shine">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group">
                        <item.Icon className="w-7 h-7 text-primary" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-white text-[10px] font-black flex items-center justify-center">
                        {item.step}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-white/35 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <GlowingLine />

      {/* ═══ BROTHERHOOD ═══ */}
      <section id="brotherhood" className="py-28 px-6 relative">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="max-w-6xl mx-auto relative z-10">
          <SectionReveal>
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6 text-xs text-white/40 font-semibold uppercase tracking-widest">
                Testimonials
              </div>
              <h2 className="text-3xl md:text-6xl font-black mb-5">
                The <span className="text-gradient">Brotherhood</span>
              </h2>
              <p className="text-white/35 text-lg">Real men. Real streaks. Real results.</p>
            </div>
          </SectionReveal>

          <div className="grid md:grid-cols-2 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <div className="gradient-border rounded-2xl p-7 hover-lift card-shine h-full">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-full bg-primary/15 border border-primary/20 flex items-center justify-center">
                      <t.BadgeIcon className="w-5 h-5" style={{ color: t.badgeColor }} />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-white/90">{t.name}</div>
                      <div className="text-xs text-gold font-bold flex items-center gap-1">
                        <span className="inline-block w-4 h-[2px] bg-gold/50 rounded" />
                        Day {t.streak}
                      </div>
                    </div>
                    <div className="ml-auto glass rounded-full px-3 py-1 text-[10px] text-white/30 font-bold">
                      Verified
                    </div>
                  </div>
                  <p className="text-white/40 text-sm leading-relaxed italic">&ldquo;{t.text}&rdquo;</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <GlowingLine />

      {/* ═══ PRICING ═══ */}
      <section id="pricing" className="py-28 px-6 relative">
        <FloatingOrbs />
        <div className="max-w-5xl mx-auto relative z-10">
          <SectionReveal>
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6 text-xs text-white/40 font-semibold uppercase tracking-widest">
                Pricing
              </div>
              <h2 className="text-3xl md:text-6xl font-black mb-5">
                Start Your <span className="text-gradient">Journey</span>
              </h2>
              <p className="text-white/35 text-lg">5-day free trial. Pay with crypto or M-Pesa.</p>
            </div>
          </SectionReveal>

          <div className="grid md:grid-cols-3 gap-5 items-start">
            {PRICING.map((p, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <div className={`rounded-2xl p-7 relative hover-lift ${i === 1 ? "gradient-border glass-elevated glow-primary md:scale-105" : "gradient-border"}`}>
                  {p.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-primary-dark text-white text-xs font-black px-5 py-1.5 rounded-full shadow-lg shadow-primary/20">
                      {p.badge}
                    </div>
                  )}
                  <div className="text-center mb-7 pt-2">
                    <h3 className="text-lg font-bold mb-2 text-white/70">{p.plan}</h3>
                    <div className="text-5xl font-black">{p.price}</div>
                    <div className="text-sm text-white/25 mt-1">{p.period}</div>
                    {p.equiv && <div className="text-sm text-primary-light font-semibold mt-2">{p.equiv}</div>}
                    {p.savings && <div className="text-xs text-success font-bold mt-1">{p.savings}</div>}
                  </div>
                  <ul className="space-y-3 mb-8">
                    {p.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm text-white/40">
                        <Check className="w-4 h-4 text-success flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href="/download" className={`block text-center font-bold py-4 rounded-full transition-all ${i === 1 ? "bg-primary hover:bg-primary-dark text-white hover:shadow-[0_0_30px_rgba(124,58,237,0.3)]" : "glass hover:bg-white/10 text-white/60 hover:text-white/80"}`}>
                    Download App
                  </a>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={0.3}>
            <div className="text-center mt-10 flex flex-wrap justify-center gap-3">
              {[
                { Icon: Wifi, text: "BTC, ETH, USDT + 300 coins" },
                { Icon: Smartphone, text: "M-Pesa coming soon" },
                { Icon: Star, text: "Card payments coming soon" },
              ].map((m, i) => (
                <div key={i} className="glass rounded-full px-4 py-2 text-xs text-white/25 font-medium flex items-center gap-2">
                  <m.Icon className="w-3.5 h-3.5" /> {m.text}
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      <GlowingLine />

      {/* ═══ FAQ ═══ */}
      <section className="py-28 px-6 relative">
        <div className="max-w-3xl mx-auto relative z-10">
          <SectionReveal>
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6 text-xs text-white/40 font-semibold uppercase tracking-widest">
                FAQ
              </div>
              <h2 className="text-3xl md:text-5xl font-black">Questions?</h2>
            </div>
          </SectionReveal>

          <div className="space-y-3">
            {FAQ.map((item, i) => (
              <SectionReveal key={i} delay={i * 0.05}>
                <div className="gradient-border rounded-xl overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between p-5 md:p-6 text-left group"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="font-bold text-sm pr-4 group-hover:text-primary-light transition-colors">{item.q}</span>
                    <motion.span
                      animate={{ rotate: openFaq === i ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-white/30 shrink-0 w-6 h-6 flex items-center justify-center"
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 md:px-6 pb-5 md:pb-6">
                          <div className="w-8 h-px bg-primary/30 mb-3" />
                          <p className="text-white/35 text-sm leading-relaxed">{item.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="py-28 px-6 relative">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <SectionReveal>
            <div className="relative rounded-3xl p-14 md:p-20 overflow-hidden">
              {/* Background effects */}
              <div className="absolute inset-0 glass-elevated rounded-3xl" />
              <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent rounded-3xl" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />
              <div className="absolute inset-0 bg-grid opacity-30 rounded-3xl" />

              {/* Orbiting elements */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] hidden md:block">
                <div className="animate-orbit" style={{ animationDuration: "25s" }}>
                  <div className="w-1.5 h-1.5 bg-primary/30 rounded-full" />
                </div>
              </div>

              <div className="relative z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  viewport={{ once: true }}
                  className="mb-6 flex justify-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center">
                    <Zap className="w-8 h-8 text-primary-light" />
                  </div>
                </motion.div>
                <h2 className="text-3xl md:text-6xl font-black mb-5 hero-text-glow">Ready to Take Control?</h2>
                <p className="text-white/35 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
                  Every day you wait is a day you could have been free. Start now.
                </p>
                <a href="/download" className="group relative inline-block bg-primary hover:bg-primary-dark text-white font-black text-lg px-14 py-6 rounded-full transition-all hover:scale-105 glow-primary overflow-hidden">
                  <span className="relative z-10 flex items-center gap-3">
                    Start Your 5-Day Free Trial
                    <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}><ArrowRight className="w-5 h-5" /></motion.span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </a>
                <p className="text-white/15 text-xs mt-8">No card required. Cancel anytime.</p>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-white/5 py-14 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
                <Zap className="w-4 h-4 text-primary-light" />
              </div>
              <div>
                <span className="font-black text-lg">Woyuduin</span>
                <span className="text-white/15 text-sm ml-3">by Flowi Group</span>
              </div>
            </div>
            <div className="flex gap-8 text-sm text-white/25">
              <a href="/privacy" className="hover:text-white/50 transition-colors animated-underline">Privacy</a>
              <a href="#" className="hover:text-white/50 transition-colors animated-underline">Terms</a>
              <a href="/affiliate" className="hover:text-white/50 transition-colors animated-underline">Affiliates</a>
              <a href="#" className="hover:text-white/50 transition-colors animated-underline">Support</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-xs text-white/10">
              &copy; {new Date().getFullYear()} Flowi Group. All rights reserved.
            </div>
            <div className="text-[10px] text-white/10 uppercase tracking-widest">
              Built with purpose. Designed to protect.
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-primary-light to-gold z-[60] origin-left"
        style={{ scaleX: scrollYProgress }}
      />
    </main>
  );
}
