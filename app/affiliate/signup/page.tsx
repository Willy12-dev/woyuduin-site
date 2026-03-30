"use client";

/*
-- Supabase SQL: Run these in the Supabase SQL Editor before using this page.

-- affiliates table
CREATE TABLE affiliates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  referral_code TEXT NOT NULL UNIQUE,
  social_media JSONB,
  total_referrals INTEGER DEFAULT 0,
  total_earned NUMERIC(10,2) DEFAULT 0,
  available_balance NUMERIC(10,2) DEFAULT 0,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- referrals table
CREATE TABLE referrals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  affiliate_id UUID REFERENCES affiliates(id) ON DELETE CASCADE,
  referred_user_id UUID REFERENCES auth.users(id),
  referred_email TEXT,
  status TEXT DEFAULT 'signed_up' CHECK (status IN ('signed_up', 'subscribed', 'churned')),
  commission_earned NUMERIC(10,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- affiliate_withdrawals table
CREATE TABLE affiliate_withdrawals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  affiliate_id UUID REFERENCES affiliates(id) ON DELETE CASCADE,
  amount NUMERIC(10,2) NOT NULL,
  mpesa_number TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  processed_at TIMESTAMPTZ
);
*/

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

function generateReferralCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export default function AffiliateSignup() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    twitter: "",
    instagram: "",
    youtube: "",
    tiktok: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1. Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });

      if (authError) {
        setError(authError.message);
        setLoading(false);
        return;
      }

      if (!authData.user) {
        setError("Failed to create account. Please try again.");
        setLoading(false);
        return;
      }

      // 2. Generate unique referral code
      const referralCode = generateReferralCode();

      // 3. Build social media object
      const socialMedia: Record<string, string> = {};
      if (form.twitter) socialMedia.twitter = form.twitter;
      if (form.instagram) socialMedia.instagram = form.instagram;
      if (form.youtube) socialMedia.youtube = form.youtube;
      if (form.tiktok) socialMedia.tiktok = form.tiktok;

      // 4. Insert into affiliates table
      const { error: insertError } = await supabase.from("affiliates").insert({
        user_id: authData.user.id,
        full_name: form.fullName,
        email: form.email,
        phone: form.phone,
        referral_code: referralCode,
        social_media: Object.keys(socialMedia).length > 0 ? socialMedia : null,
      });

      if (insertError) {
        setError(insertError.message);
        setLoading(false);
        return;
      }

      // 5. Redirect to dashboard
      router.push("/affiliate/dashboard");
    } catch {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

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
              Already have an account?
            </Link>
          </div>
        </div>
      </nav>

      <section className="relative pt-32 pb-20 px-6">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="max-w-lg mx-auto relative z-10">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-black mb-3">Join the <span className="text-gradient">Affiliate Program</span></h1>
            <p className="text-white/40">Create your account and start earning 20% commission.</p>
          </div>

          <form onSubmit={handleSubmit} className="glass-elevated rounded-2xl p-8 space-y-5">
            {error && (
              <div className="bg-danger/10 border border-danger/20 text-danger text-sm rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-white/60 mb-1.5">Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-primary/50 transition-colors"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-white/60 mb-1.5">Email *</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-primary/50 transition-colors"
                placeholder="you@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-white/60 mb-1.5">Password *</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-primary/50 transition-colors"
                placeholder="Min 6 characters"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-white/60 mb-1.5">Phone (M-Pesa) *</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-primary/50 transition-colors"
                placeholder="+254 7XX XXX XXX"
              />
            </div>

            <div className="pt-2">
              <p className="text-xs text-white/30 font-bold uppercase tracking-widest mb-3">Social Media (Optional)</p>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  name="twitter"
                  value={form.twitter}
                  onChange={handleChange}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="Twitter/X"
                />
                <input
                  type="text"
                  name="instagram"
                  value={form.instagram}
                  onChange={handleChange}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="Instagram"
                />
                <input
                  type="text"
                  name="youtube"
                  value={form.youtube}
                  onChange={handleChange}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="YouTube"
                />
                <input
                  type="text"
                  name="tiktok"
                  value={form.tiktok}
                  onChange={handleChange}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="TikTok"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-dark text-white font-black text-base py-4 rounded-full transition-all hover:scale-[1.02] glow-primary disabled:opacity-50 disabled:hover:scale-100"
            >
              {loading ? "Creating Account..." : "Create Affiliate Account"}
            </button>

            <p className="text-center text-xs text-white/20">
              Already have an account?{" "}
              <Link href="/affiliate/login" className="text-primary-light hover:underline">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
