"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";

type Tab = "overview" | "clients" | "calendar" | "earnings" | "notes" | "settings";

interface TherapistProfile {
  id: string;
  full_name: string;
  username: string;
  email: string;
  phone: string;
  speciality: string;
  bio: string;
  photo_url: string | null;
  session_rate: number;
  rating: number;
  reviews_count: number;
  years_experience: number;
}

interface Booking {
  id: string;
  client_name: string;
  client_email: string;
  date: string;
  start_time: string;
  end_time: string;
  amount: number;
  status: string;
  payment_method: string;
  created_at: string;
}

interface SessionNote {
  id: string;
  booking_id: string;
  client_name: string;
  date: string;
  note: string;
  created_at: string;
}

interface SlotEntry {
  id?: string;
  date: string;
  start_time: string;
  end_time: string;
  is_booked: boolean;
}

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: "overview", label: "Overview", icon: "📊" },
  { id: "clients", label: "Clients", icon: "👥" },
  { id: "calendar", label: "Calendar", icon: "📅" },
  { id: "earnings", label: "Earnings", icon: "💰" },
  { id: "notes", label: "Session Notes", icon: "📝" },
  { id: "settings", label: "Settings", icon: "⚙️" },
];

export default function TherapistDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [profile, setProfile] = useState<TherapistProfile | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [notes, setNotes] = useState<SessionNote[]>([]);
  const [slots, setSlots] = useState<SlotEntry[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Settings form
  const [editProfile, setEditProfile] = useState({
    full_name: "",
    bio: "",
    session_rate: "",
    phone: "",
  });
  const [settingsSaved, setSettingsSaved] = useState(false);

  // New slot form
  const [newSlotDate, setNewSlotDate] = useState("");
  const [newSlotStart, setNewSlotStart] = useState("");
  const [newSlotEnd, setNewSlotEnd] = useState("");

  // New note form
  const [noteBookingId, setNoteBookingId] = useState("");
  const [noteText, setNoteText] = useState("");

  // Withdrawal
  const [withdrawalRequested, setWithdrawalRequested] = useState(false);

  // Copied link
  const [copiedLink, setCopiedLink] = useState(false);

  const fetchData = useCallback(async (therapistId: string) => {
    // Fetch bookings
    const { data: bookingsData } = await supabase
      .from("bookings")
      .select("*")
      .eq("therapist_id", therapistId)
      .order("date", { ascending: false });

    if (bookingsData) setBookings(bookingsData);

    // Fetch notes
    const { data: notesData } = await supabase
      .from("session_notes")
      .select("*")
      .eq("therapist_id", therapistId)
      .order("created_at", { ascending: false });

    if (notesData) setNotes(notesData);

    // Fetch slots
    const { data: slotsData } = await supabase
      .from("therapist_slots")
      .select("*")
      .eq("therapist_id", therapistId)
      .gte("date", new Date().toISOString().split("T")[0])
      .order("date", { ascending: true })
      .order("start_time", { ascending: true });

    if (slotsData) setSlots(slotsData);
  }, []);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/therapist/login";
      return;
    }

    // Get therapist profile
    const { data: therapistData } = await supabase
      .from("therapists")
      .select("*")
      .eq("email", user.email)
      .single();

    if (!therapistData) {
      window.location.href = "/therapist/login";
      return;
    }

    setProfile(therapistData);
    setEditProfile({
      full_name: therapistData.full_name,
      bio: therapistData.bio || "",
      session_rate: therapistData.session_rate?.toString() || "",
      phone: therapistData.phone || "",
    });
    setAuthenticated(true);
    setLoading(false);

    await fetchData(therapistData.id);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/therapist/login";
  };

  const handleSaveSettings = async () => {
    if (!profile) return;

    await supabase
      .from("therapists")
      .update({
        full_name: editProfile.full_name,
        bio: editProfile.bio,
        session_rate: parseInt(editProfile.session_rate),
        phone: editProfile.phone,
      })
      .eq("id", profile.id);

    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);

    // Refresh profile
    const { data } = await supabase
      .from("therapists")
      .select("*")
      .eq("id", profile.id)
      .single();
    if (data) setProfile(data);
  };

  const handleAddSlot = async () => {
    if (!profile || !newSlotDate || !newSlotStart || !newSlotEnd) return;

    await supabase.from("therapist_slots").insert({
      therapist_id: profile.id,
      date: newSlotDate,
      start_time: newSlotStart,
      end_time: newSlotEnd,
      is_booked: false,
    });

    setNewSlotDate("");
    setNewSlotStart("");
    setNewSlotEnd("");

    // Refresh slots
    const { data: slotsData } = await supabase
      .from("therapist_slots")
      .select("*")
      .eq("therapist_id", profile.id)
      .gte("date", new Date().toISOString().split("T")[0])
      .order("date", { ascending: true })
      .order("start_time", { ascending: true });

    if (slotsData) setSlots(slotsData);
  };

  const handleDeleteSlot = async (slotId: string) => {
    await supabase.from("therapist_slots").delete().eq("id", slotId);
    setSlots(slots.filter((s) => s.id !== slotId));
  };

  const handleAddNote = async () => {
    if (!profile || !noteBookingId || !noteText) return;

    const booking = bookings.find((b) => b.id === noteBookingId);
    if (!booking) return;

    await supabase.from("session_notes").insert({
      therapist_id: profile.id,
      booking_id: noteBookingId,
      client_name: booking.client_name,
      date: booking.date,
      note: noteText,
      created_at: new Date().toISOString(),
    });

    setNoteText("");
    setNoteBookingId("");

    // Refresh notes
    const { data: notesData } = await supabase
      .from("session_notes")
      .select("*")
      .eq("therapist_id", profile.id)
      .order("created_at", { ascending: false });

    if (notesData) setNotes(notesData);
  };

  const handleRequestWithdrawal = async () => {
    if (!profile) return;

    await supabase.from("withdrawal_requests").insert({
      therapist_id: profile.id,
      amount: totalEarnings - pendingWithdrawal,
      status: "pending",
      created_at: new Date().toISOString(),
    });

    setWithdrawalRequested(true);
    setTimeout(() => setWithdrawalRequested(false), 5000);
  };

  const copyBookingLink = () => {
    if (!profile) return;
    const url = `${window.location.origin}/therapist/${profile.username}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Computed stats
  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();

  const sessionsThisMonth = bookings.filter((b) => {
    const d = new Date(b.date);
    return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
  });

  const totalClients = Array.from(new Set(bookings.map((b) => b.client_email))).length;
  const earningsThisMonth = sessionsThisMonth.reduce((sum, b) => sum + b.amount, 0);
  const totalEarnings = bookings
    .filter((b) => b.status === "completed" || b.status === "pending")
    .reduce((sum, b) => sum + b.amount, 0);
  const pendingWithdrawal = 0; // placeholder

  const upcomingSessions = bookings
    .filter((b) => new Date(b.date) >= now && b.status !== "cancelled")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Unique clients with their data
  const clientMap = bookings.reduce<
    Record<string, { name: string; email: string; sessions: Booking[] }>
  >((acc, b) => {
    if (!acc[b.client_email]) {
      acc[b.client_email] = { name: b.client_name, email: b.client_email, sessions: [] };
    }
    acc[b.client_email].sessions.push(b);
    return acc;
  }, {});
  const clientList = Object.values(clientMap);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <svg className="animate-spin h-8 w-8 text-primary" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </main>
    );
  }

  if (!authenticated) return null;

  return (
    <main className="min-h-screen">
      {/* Top Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-2">
              <span className="text-xl">⚡</span>
              <span className="text-lg font-black tracking-tight hidden sm:block">Woyuduin</span>
            </a>
            <span className="text-white/10">|</span>
            <span className="text-sm text-white/40 font-medium">Therapist Dashboard</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-white/40 hidden sm:block">{profile?.full_name}</span>
            <button
              onClick={handleLogout}
              className="text-sm text-white/30 hover:text-danger font-medium transition-colors"
            >
              Sign Out
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-xl text-white/40"
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </nav>

      <div className="flex pt-14">
        {/* Sidebar - Desktop */}
        <aside className="hidden md:block w-56 fixed left-0 top-14 bottom-0 glass border-r border-white/5 p-4">
          <nav className="space-y-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
                  activeTab === tab.id
                    ? "bg-primary/20 text-primary-light"
                    : "text-white/40 hover:bg-white/5 hover:text-white/60"
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-bg/95 pt-14">
            <nav className="p-4 space-y-1">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${
                    activeTab === tab.id
                      ? "bg-primary/20 text-primary-light"
                      : "text-white/40 hover:bg-white/5"
                  }`}
                >
                  <span>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 md:ml-56 p-4 md:p-8 min-h-screen">
          {/* OVERVIEW TAB */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black">Welcome back, {profile?.full_name?.split(" ")[0]}</h2>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    label: "Total Clients",
                    value: totalClients,
                    icon: "👥",
                    color: "text-primary-light",
                  },
                  {
                    label: "Sessions This Month",
                    value: sessionsThisMonth.length,
                    icon: "📅",
                    color: "text-primary-light",
                  },
                  {
                    label: "Earnings This Month",
                    value: `KSh ${earningsThisMonth.toLocaleString()}`,
                    icon: "💰",
                    color: "text-success",
                  },
                  {
                    label: "Avg Rating",
                    value: profile?.rating?.toFixed(1) || "N/A",
                    icon: "⭐",
                    color: "text-gold",
                  },
                ].map((stat, i) => (
                  <div key={i} className="glass rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl">{stat.icon}</span>
                    </div>
                    <div className={`text-2xl font-black ${stat.color}`}>{stat.value}</div>
                    <div className="text-xs text-white/30 font-semibold mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Upcoming Sessions */}
              <div className="glass rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-4">Upcoming Sessions</h3>
                {upcomingSessions.length === 0 ? (
                  <p className="text-white/30 text-sm">No upcoming sessions.</p>
                ) : (
                  <div className="space-y-3">
                    {upcomingSessions.slice(0, 5).map((session) => (
                      <div
                        key={session.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5"
                      >
                        <div>
                          <div className="font-semibold text-sm">{session.client_name}</div>
                          <div className="text-xs text-white/30">
                            {new Date(session.date).toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                            })}{" "}
                            | {session.start_time} - {session.end_time}
                          </div>
                        </div>
                        <div
                          className={`text-xs font-bold px-3 py-1 rounded-full ${
                            session.status === "confirmed"
                              ? "bg-success/10 text-success"
                              : "bg-gold/10 text-gold"
                          }`}
                        >
                          {session.status}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={copyBookingLink}
                  className="glass rounded-2xl p-5 text-left hover:bg-white/[0.06] transition-all"
                >
                  <div className="text-2xl mb-2">🔗</div>
                  <div className="font-bold text-sm">
                    {copiedLink ? "Link Copied!" : "Copy Booking Link"}
                  </div>
                  <div className="text-xs text-white/30 mt-1">Share on WhatsApp or social media</div>
                </button>
                <button
                  onClick={() => setActiveTab("calendar")}
                  className="glass rounded-2xl p-5 text-left hover:bg-white/[0.06] transition-all"
                >
                  <div className="text-2xl mb-2">📅</div>
                  <div className="font-bold text-sm">Set Availability</div>
                  <div className="text-xs text-white/30 mt-1">Update your available time slots</div>
                </button>
              </div>
            </div>
          )}

          {/* CLIENTS TAB */}
          {activeTab === "clients" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black">Clients</h2>

              {clientList.length === 0 ? (
                <div className="glass rounded-2xl p-12 text-center">
                  <div className="text-4xl mb-3">👥</div>
                  <p className="text-white/40 text-sm">
                    No clients yet. Share your booking link to get started!
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {clientList.map((client, i) => {
                    const sortedSessions = [...client.sessions].sort(
                      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
                    );
                    const lastSession = sortedSessions[0];
                    const nextSession = sortedSessions.find(
                      (s) => new Date(s.date) >= now
                    );

                    return (
                      <div key={i} className="glass rounded-2xl p-5">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="font-bold">{client.name}</div>
                            <div className="text-xs text-white/30 mt-0.5">{client.email}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-white/30">
                              {client.sessions.length} session{client.sessions.length !== 1 ? "s" : ""}
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mt-3">
                          <div className="bg-white/[0.02] rounded-lg p-2">
                            <div className="text-[10px] text-white/20 uppercase font-bold">
                              Last Session
                            </div>
                            <div className="text-xs text-white/50 mt-0.5">
                              {lastSession
                                ? new Date(lastSession.date).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                  })
                                : "N/A"}
                            </div>
                          </div>
                          <div className="bg-white/[0.02] rounded-lg p-2">
                            <div className="text-[10px] text-white/20 uppercase font-bold">
                              Next Session
                            </div>
                            <div className="text-xs text-white/50 mt-0.5">
                              {nextSession
                                ? new Date(nextSession.date).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                  })
                                : "None scheduled"}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* CALENDAR TAB */}
          {activeTab === "calendar" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black">Calendar & Availability</h2>

              {/* Add Slot */}
              <div className="glass rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-4">Add Available Slot</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/40 mb-1.5">Date</label>
                    <input
                      type="date"
                      value={newSlotDate}
                      onChange={(e) => setNewSlotDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-primary/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/40 mb-1.5">
                      Start Time
                    </label>
                    <input
                      type="time"
                      value={newSlotStart}
                      onChange={(e) => setNewSlotStart(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-primary/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/40 mb-1.5">
                      End Time
                    </label>
                    <input
                      type="time"
                      value={newSlotEnd}
                      onChange={(e) => setNewSlotEnd(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-primary/50 transition-all"
                    />
                  </div>
                </div>
                <button
                  onClick={handleAddSlot}
                  disabled={!newSlotDate || !newSlotStart || !newSlotEnd}
                  className="bg-primary hover:bg-primary-dark text-white font-bold px-6 py-2.5 rounded-full transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Slot
                </button>
              </div>

              {/* Upcoming Sessions */}
              <div className="glass rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-4">Upcoming Sessions</h3>
                {upcomingSessions.length === 0 ? (
                  <p className="text-white/30 text-sm">No upcoming sessions.</p>
                ) : (
                  <div className="space-y-2">
                    {upcomingSessions.map((session) => (
                      <div
                        key={session.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5"
                      >
                        <div>
                          <div className="font-semibold text-sm">{session.client_name}</div>
                          <div className="text-xs text-white/30">
                            {new Date(session.date).toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                            })}{" "}
                            | {session.start_time} - {session.end_time}
                          </div>
                        </div>
                        <div
                          className={`text-xs font-bold px-3 py-1 rounded-full ${
                            session.status === "confirmed"
                              ? "bg-success/10 text-success"
                              : "bg-gold/10 text-gold"
                          }`}
                        >
                          {session.status}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Available Slots */}
              <div className="glass rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-4">Your Available Slots</h3>
                {slots.filter((s) => !s.is_booked).length === 0 ? (
                  <p className="text-white/30 text-sm">No available slots. Add some above!</p>
                ) : (
                  <div className="space-y-2">
                    {slots
                      .filter((s) => !s.is_booked)
                      .map((slot) => (
                        <div
                          key={slot.id}
                          className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5"
                        >
                          <div>
                            <div className="text-sm font-medium">
                              {new Date(slot.date).toLocaleDateString("en-US", {
                                weekday: "short",
                                month: "short",
                                day: "numeric",
                              })}
                            </div>
                            <div className="text-xs text-white/30">
                              {slot.start_time} - {slot.end_time}
                            </div>
                          </div>
                          <button
                            onClick={() => slot.id && handleDeleteSlot(slot.id)}
                            className="text-xs text-danger/60 hover:text-danger font-medium transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* EARNINGS TAB */}
          {activeTab === "earnings" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black">Earnings</h2>

              {/* Earnings Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="glass rounded-2xl p-5">
                  <div className="text-xs text-white/30 font-semibold mb-2">Total Earned</div>
                  <div className="text-2xl font-black text-success">
                    KSh {totalEarnings.toLocaleString()}
                  </div>
                </div>
                <div className="glass rounded-2xl p-5">
                  <div className="text-xs text-white/30 font-semibold mb-2">This Month</div>
                  <div className="text-2xl font-black text-primary-light">
                    KSh {earningsThisMonth.toLocaleString()}
                  </div>
                </div>
                <div className="glass rounded-2xl p-5">
                  <div className="text-xs text-white/30 font-semibold mb-2">
                    Available for Withdrawal
                  </div>
                  <div className="text-2xl font-black text-gold">
                    KSh {(totalEarnings - pendingWithdrawal).toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Request Withdrawal */}
              <div className="glass rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-3">Request Withdrawal</h3>
                <p className="text-white/40 text-sm mb-4">
                  Request a withdrawal of your available earnings to your M-Pesa or bank account.
                </p>
                <button
                  onClick={handleRequestWithdrawal}
                  disabled={totalEarnings - pendingWithdrawal <= 0 || withdrawalRequested}
                  className="bg-gold hover:bg-yellow-600 text-black font-bold px-6 py-3 rounded-full transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {withdrawalRequested
                    ? "Withdrawal Requested!"
                    : `Request Withdrawal - KSh ${(totalEarnings - pendingWithdrawal).toLocaleString()}`}
                </button>
              </div>

              {/* Transaction History */}
              <div className="glass rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-4">Transaction History</h3>
                {bookings.length === 0 ? (
                  <p className="text-white/30 text-sm">No transactions yet.</p>
                ) : (
                  <div className="space-y-2">
                    {bookings.map((b) => (
                      <div
                        key={b.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5"
                      >
                        <div>
                          <div className="font-semibold text-sm">{b.client_name}</div>
                          <div className="text-xs text-white/30">
                            {new Date(b.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}{" "}
                            via {b.payment_method}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-success">
                            +KSh {b.amount.toLocaleString()}
                          </div>
                          <div
                            className={`text-[10px] font-bold ${
                              b.status === "completed"
                                ? "text-success"
                                : b.status === "pending"
                                ? "text-gold"
                                : "text-danger"
                            }`}
                          >
                            {b.status}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SESSION NOTES TAB */}
          {activeTab === "notes" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black">Session Notes</h2>

              {/* Add Note */}
              <div className="glass rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-4">Add a Note</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/40 mb-1.5">
                      Select Session
                    </label>
                    <select
                      value={noteBookingId}
                      onChange={(e) => setNoteBookingId(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-primary/50 transition-all appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-bg text-white/40">
                        Choose a session...
                      </option>
                      {bookings.map((b) => (
                        <option key={b.id} value={b.id} className="bg-bg text-white">
                          {b.client_name} -{" "}
                          {new Date(b.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/40 mb-1.5">
                      Private Note
                    </label>
                    <textarea
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      rows={4}
                      placeholder="Add your private notes about this session..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-primary/50 transition-all resize-none"
                    />
                  </div>
                  <button
                    onClick={handleAddNote}
                    disabled={!noteBookingId || !noteText}
                    className="bg-primary hover:bg-primary-dark text-white font-bold px-6 py-2.5 rounded-full transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Save Note
                  </button>
                </div>
              </div>

              {/* Notes List */}
              <div className="glass rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-4">All Notes</h3>
                {notes.length === 0 ? (
                  <p className="text-white/30 text-sm">No session notes yet.</p>
                ) : (
                  <div className="space-y-3">
                    {notes.map((note) => (
                      <div
                        key={note.id}
                        className="p-4 rounded-xl bg-white/[0.02] border border-white/5"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-semibold text-sm">{note.client_name}</div>
                          <div className="text-xs text-white/20">
                            {new Date(note.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </div>
                        </div>
                        <p className="text-sm text-white/50 leading-relaxed">{note.note}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SETTINGS TAB */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black">Settings</h2>

              {/* Edit Profile */}
              <div className="glass rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-4">Edit Profile</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-white/40 mb-1.5">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={editProfile.full_name}
                        onChange={(e) =>
                          setEditProfile({ ...editProfile, full_name: e.target.value })
                        }
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-primary/50 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/40 mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={editProfile.phone}
                        onChange={(e) =>
                          setEditProfile({ ...editProfile, phone: e.target.value })
                        }
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-primary/50 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/40 mb-1.5">
                      Session Rate (KSh)
                    </label>
                    <input
                      type="number"
                      value={editProfile.session_rate}
                      onChange={(e) =>
                        setEditProfile({ ...editProfile, session_rate: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-primary/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/40 mb-1.5">Bio</label>
                    <textarea
                      value={editProfile.bio}
                      onChange={(e) =>
                        setEditProfile({ ...editProfile, bio: e.target.value })
                      }
                      rows={4}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary/50 transition-all resize-none"
                    />
                  </div>
                  <button
                    onClick={handleSaveSettings}
                    className="bg-primary hover:bg-primary-dark text-white font-bold px-6 py-2.5 rounded-full transition-all text-sm"
                  >
                    {settingsSaved ? "Saved!" : "Save Changes"}
                  </button>
                </div>
              </div>

              {/* Booking Link */}
              <div className="glass rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-3">Your Booking Link</h3>
                <p className="text-white/40 text-sm mb-4">
                  Share this link on WhatsApp, social media, or your website so clients can book
                  sessions directly.
                </p>
                <div className="flex gap-3">
                  <div className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white/60 text-sm truncate">
                    {typeof window !== "undefined" && profile
                      ? `${window.location.origin}/therapist/${profile.username}`
                      : `/therapist/${profile?.username}`}
                  </div>
                  <button
                    onClick={copyBookingLink}
                    className="bg-primary hover:bg-primary-dark text-white font-bold px-5 py-2.5 rounded-xl transition-all text-sm shrink-0"
                  >
                    {copiedLink ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>

              {/* Account Info */}
              <div className="glass rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-3">Account</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-white/40">Email</span>
                    <span className="text-sm font-medium">{profile?.email}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-white/40">Username</span>
                    <span className="text-sm font-medium">@{profile?.username}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-white/40">Speciality</span>
                    <span className="text-sm font-medium">{profile?.speciality}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
