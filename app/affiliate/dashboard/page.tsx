"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface Affiliate {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  referral_code: string;
  total_referrals: number;
  total_earned: number;
  available_balance: number;
  status: string;
}

interface Referral {
  id: string;
  referred_email: string;
  status: string;
  commission_earned: number;
  created_at: string;
}

interface Withdrawal {
  id: string;
  amount: number;
  mpesa_number: string;
  status: string;
  created_at: string;
  processed_at: string | null;
}

function obscureEmail(email: string): string {
  if (!email) return "Unknown";
  const [name] = email.split("@");
  if (name.length <= 2) return name[0] + "***";
  return name[0] + "***" + name[name.length - 1];
}

export default function AffiliateDashboard() {
  const router = useRouter();
  const [affiliate, setAffiliate] = useState<Affiliate | null>(null);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [tab, setTab] = useState<"referrals" | "earnings" | "withdraw">("referrals");

  // Withdrawal form
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawPhone, setWithdrawPhone] = useState("");
  const [withdrawLoading, setWithdrawLoading] = useState(false);
  const [withdrawError, setWithdrawError] = useState("");
  const [withdrawSuccess, setWithdrawSuccess] = useState("");

  const loadData = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      router.push("/affiliate/login");
      return;
    }

    // Fetch affiliate data
    const { data: affiliateData, error: affiliateError } = await supabase
      .from("affiliates")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (affiliateError || !affiliateData) {
      router.push("/affiliate/login");
      return;
    }

    setAffiliate(affiliateData);

    // Fetch referrals
    const { data: referralsData } = await supabase
      .from("referrals")
      .select("*")
      .eq("affiliate_id", affiliateData.id)
      .order("created_at", { ascending: false });

    if (referralsData) setReferrals(referralsData);

    // Fetch withdrawals
    const { data: withdrawalsData } = await supabase
      .from("affiliate_withdrawals")
      .select("*")
      .eq("affiliate_id", affiliateData.id)
      .order("created_at", { ascending: false });

    if (withdrawalsData) setWithdrawals(withdrawalsData);

    setLoading(false);
  }, [router]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleCopyLink = () => {
    if (!affiliate) return;
    navigator.clipboard.writeText(`https://woyuduin.com/ref/${affiliate.referral_code}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    if (!affiliate) return;
    const text = encodeURIComponent(
      `Check out Woyuduin - the app that helps men quit porn addiction. Try it free for 5 days: https://woyuduin.com/ref/${affiliate.referral_code}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const handleShareTwitter = () => {
    if (!affiliate) return;
    const text = encodeURIComponent(
      `Quit porn. Build discipline. Try @woyuduin free for 5 days:`
    );
    const url = encodeURIComponent(`https://woyuduin.com/ref/${affiliate.referral_code}`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  };

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!affiliate) return;
    setWithdrawError("");
    setWithdrawSuccess("");
    setWithdrawLoading(true);

    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount < 10) {
      setWithdrawError("Minimum withdrawal is $10.");
      setWithdrawLoading(false);
      return;
    }
    if (amount > affiliate.available_balance) {
      setWithdrawError("Insufficient balance.");
      setWithdrawLoading(false);
      return;
    }
    if (!withdrawPhone.trim()) {
      setWithdrawError("Please enter your M-Pesa number.");
      setWithdrawLoading(false);
      return;
    }

    const { error } = await supabase.from("affiliate_withdrawals").insert({
      affiliate_id: affiliate.id,
      amount,
      mpesa_number: withdrawPhone,
    });

    if (error) {
      setWithdrawError(error.message);
      setWithdrawLoading(false);
      return;
    }

    // Update available balance locally
    setAffiliate({ ...affiliate, available_balance: affiliate.available_balance - amount });
    setWithdrawAmount("");
    setWithdrawSuccess("Withdrawal request submitted! You'll receive your payout within 24-48 hours.");
    setWithdrawLoading(false);
    loadData();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/affiliate/login");
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-white/40 text-lg">Loading dashboard...</div>
      </main>
    );
  }

  if (!affiliate) return null;

  const activeReferrals = referrals.filter((r) => r.status === "subscribed").length;
  const referralLink = `https://woyuduin.com/ref/${affiliate.referral_code}`;

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
            <span className="text-sm text-white/30 hidden sm:inline">{affiliate.email}</span>
            <button onClick={handleLogout} className="text-sm text-white/50 hover:text-white transition-colors font-medium">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <section className="pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-black mb-1">Welcome back, {affiliate.full_name.split(" ")[0]}</h1>
            <p className="text-white/40 text-sm">Your affiliate dashboard</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Referrals", value: affiliate.total_referrals.toString(), icon: "👥", color: "from-purple-500/20 to-purple-900/10" },
              { label: "Active Subscribers", value: activeReferrals.toString(), icon: "✅", color: "from-green-500/20 to-green-900/10" },
              { label: "Total Earned", value: `$${Number(affiliate.total_earned).toFixed(2)}`, icon: "💰", color: "from-amber-500/20 to-amber-900/10" },
              { label: "Available Balance", value: `$${Number(affiliate.available_balance).toFixed(2)}`, icon: "🏦", color: "from-cyan-500/20 to-cyan-900/10" },
            ].map((stat, i) => (
              <div key={i} className="glass rounded-2xl p-5">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-lg mb-3`}>
                  {stat.icon}
                </div>
                <div className="text-2xl font-black">{stat.value}</div>
                <div className="text-xs text-white/30 font-medium mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Referral Link */}
          <div className="glass-elevated rounded-2xl p-6 mb-8">
            <h2 className="font-bold mb-3">Your Referral Link</h2>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white/60 truncate">
                {referralLink}
              </div>
              <button
                onClick={handleCopyLink}
                className="bg-primary hover:bg-primary-dark text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors shrink-0"
              >
                {copied ? "Copied!" : "Copy Link"}
              </button>
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleShareWhatsApp}
                className="glass hover:bg-white/10 text-white/60 text-sm font-medium px-4 py-2 rounded-full transition-colors flex items-center gap-2"
              >
                <span>📱</span> WhatsApp
              </button>
              <button
                onClick={handleShareTwitter}
                className="glass hover:bg-white/10 text-white/60 text-sm font-medium px-4 py-2 rounded-full transition-colors flex items-center gap-2"
              >
                <span>🐦</span> Twitter
              </button>
              <button
                onClick={handleCopyLink}
                className="glass hover:bg-white/10 text-white/60 text-sm font-medium px-4 py-2 rounded-full transition-colors flex items-center gap-2"
              >
                <span>🔗</span> Copy
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            {(["referrals", "earnings", "withdraw"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-colors ${
                  tab === t
                    ? "bg-primary text-white"
                    : "glass text-white/40 hover:text-white/60"
                }`}
              >
                {t === "referrals" ? "Referrals" : t === "earnings" ? "Earnings" : "Withdraw"}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {tab === "referrals" && (
            <div className="glass rounded-2xl overflow-hidden">
              <div className="p-5 border-b border-white/5">
                <h3 className="font-bold">Your Referrals</h3>
              </div>
              {referrals.length === 0 ? (
                <div className="p-10 text-center text-white/30 text-sm">
                  No referrals yet. Share your link to start earning!
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-white/30 text-xs uppercase tracking-widest">
                        <th className="text-left px-5 py-3 font-medium">User</th>
                        <th className="text-left px-5 py-3 font-medium">Date</th>
                        <th className="text-left px-5 py-3 font-medium">Status</th>
                        <th className="text-right px-5 py-3 font-medium">Commission</th>
                      </tr>
                    </thead>
                    <tbody>
                      {referrals.map((r) => (
                        <tr key={r.id} className="border-t border-white/5">
                          <td className="px-5 py-4 text-white/60">{obscureEmail(r.referred_email)}</td>
                          <td className="px-5 py-4 text-white/40">{new Date(r.created_at).toLocaleDateString()}</td>
                          <td className="px-5 py-4">
                            <span
                              className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                                r.status === "subscribed"
                                  ? "bg-success/10 text-success"
                                  : r.status === "churned"
                                  ? "bg-danger/10 text-danger"
                                  : "bg-white/5 text-white/40"
                              }`}
                            >
                              {r.status === "signed_up" ? "Signed Up" : r.status === "subscribed" ? "Subscribed" : "Churned"}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-right text-white/60 font-medium">
                            ${Number(r.commission_earned).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {tab === "earnings" && (
            <div className="glass rounded-2xl p-6">
              <h3 className="font-bold mb-4">Earnings History</h3>
              {referrals.length === 0 ? (
                <div className="py-10 text-center text-white/30 text-sm">
                  No earnings yet. Refer users to start earning commissions!
                </div>
              ) : (
                <div className="space-y-3">
                  {(() => {
                    // Group referrals by month
                    const monthMap: Record<string, { count: number; earned: number }> = {};
                    referrals.forEach((r) => {
                      const date = new Date(r.created_at);
                      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
                      if (!monthMap[key]) monthMap[key] = { count: 0, earned: 0 };
                      monthMap[key].count++;
                      monthMap[key].earned += Number(r.commission_earned);
                    });
                    const months = Object.entries(monthMap).sort(([a], [b]) => b.localeCompare(a));
                    return months.map(([month, data]) => (
                      <div key={month} className="flex items-center justify-between glass rounded-xl px-5 py-4">
                        <div>
                          <div className="font-bold text-sm">{new Date(month + "-01").toLocaleDateString("en-US", { month: "long", year: "numeric" })}</div>
                          <div className="text-xs text-white/30">{data.count} referral{data.count !== 1 ? "s" : ""}</div>
                        </div>
                        <div className="text-success font-black">${data.earned.toFixed(2)}</div>
                      </div>
                    ));
                  })()}
                </div>
              )}
            </div>
          )}

          {tab === "withdraw" && (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Withdrawal Form */}
              <div className="glass-elevated rounded-2xl p-6">
                <h3 className="font-bold mb-4">Request Payout</h3>
                <form onSubmit={handleWithdraw} className="space-y-4">
                  {withdrawError && (
                    <div className="bg-danger/10 border border-danger/20 text-danger text-sm rounded-xl px-4 py-3">
                      {withdrawError}
                    </div>
                  )}
                  {withdrawSuccess && (
                    <div className="bg-success/10 border border-success/20 text-success text-sm rounded-xl px-4 py-3">
                      {withdrawSuccess}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-bold text-white/60 mb-1.5">Amount (USD)</label>
                    <input
                      type="number"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      min="10"
                      step="0.01"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-primary/50 transition-colors"
                      placeholder="Minimum $10"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-white/60 mb-1.5">M-Pesa Number</label>
                    <input
                      type="tel"
                      value={withdrawPhone}
                      onChange={(e) => setWithdrawPhone(e.target.value)}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-primary/50 transition-colors"
                      placeholder="+254 7XX XXX XXX"
                    />
                  </div>

                  <div className="text-xs text-white/20">
                    Available balance: <span className="text-success font-bold">${Number(affiliate.available_balance).toFixed(2)}</span>
                  </div>

                  <button
                    type="submit"
                    disabled={withdrawLoading || affiliate.available_balance < 10}
                    className="w-full bg-primary hover:bg-primary-dark text-white font-bold text-sm py-3.5 rounded-full transition-all disabled:opacity-50"
                  >
                    {withdrawLoading ? "Processing..." : "Request Withdrawal"}
                  </button>
                </form>
              </div>

              {/* Withdrawal History */}
              <div className="glass rounded-2xl p-6">
                <h3 className="font-bold mb-4">Withdrawal History</h3>
                {withdrawals.length === 0 ? (
                  <div className="py-10 text-center text-white/30 text-sm">
                    No withdrawals yet.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {withdrawals.map((w) => (
                      <div key={w.id} className="glass rounded-xl px-4 py-3 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-sm">${Number(w.amount).toFixed(2)}</div>
                          <div className="text-xs text-white/30">{new Date(w.created_at).toLocaleDateString()}</div>
                        </div>
                        <span
                          className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                            w.status === "completed"
                              ? "bg-success/10 text-success"
                              : w.status === "rejected"
                              ? "bg-danger/10 text-danger"
                              : w.status === "processing"
                              ? "bg-gold/10 text-gold"
                              : "bg-white/5 text-white/40"
                          }`}
                        >
                          {w.status.charAt(0).toUpperCase() + w.status.slice(1)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
