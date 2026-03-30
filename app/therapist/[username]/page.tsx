"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface Therapist {
  id: string;
  full_name: string;
  username: string;
  speciality: string;
  bio: string;
  photo_url: string | null;
  session_rate: number;
  rating: number;
  reviews_count: number;
  years_experience: number;
}

interface TimeSlot {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  is_booked: boolean;
}

const PAYMENT_METHODS = [
  {
    id: "mpesa",
    name: "M-Pesa",
    icon: "📱",
    desc: "Pay via M-Pesa",
    color: "from-green-500/20 to-green-900/10",
  },
  {
    id: "crypto",
    name: "Crypto",
    icon: "₿",
    desc: "BTC, ETH, USDT",
    color: "from-amber-500/20 to-amber-900/10",
  },
  {
    id: "card",
    name: "Card",
    icon: "💳",
    desc: "Visa / Mastercard",
    color: "from-blue-500/20 to-blue-900/10",
  },
];

export default function TherapistProfile() {
  const params = useParams();
  const username = params.username as string;

  const [therapist, setTherapist] = useState<Therapist | null>(null);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Booking state
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [bookingStep, setBookingStep] = useState(0); // 0=browse, 1=select time, 2=payment, 3=confirmed
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchTherapist();
  }, [username]);

  const fetchTherapist = async () => {
    setLoading(true);
    const { data: therapistData, error } = await supabase
      .from("therapists")
      .select("*")
      .eq("username", username)
      .single();

    if (error || !therapistData) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    setTherapist(therapistData);

    // Fetch available slots
    const { data: slotsData } = await supabase
      .from("therapist_slots")
      .select("*")
      .eq("therapist_id", therapistData.id)
      .eq("is_booked", false)
      .gte("date", new Date().toISOString().split("T")[0])
      .order("date", { ascending: true })
      .order("start_time", { ascending: true });

    if (slotsData) setSlots(slotsData);
    setLoading(false);
  };

  const handleBook = async () => {
    if (!therapist || !selectedSlot || !selectedPayment || !clientName || !clientEmail) return;

    setBookingLoading(true);

    try {
      const slot = slots.find((s) => s.id === selectedSlot);
      if (!slot) return;

      const { error } = await supabase.from("bookings").insert({
        therapist_id: therapist.id,
        slot_id: selectedSlot,
        client_name: clientName,
        client_email: clientEmail,
        payment_method: selectedPayment,
        amount: therapist.session_rate,
        status: "pending",
        date: slot.date,
        start_time: slot.start_time,
        end_time: slot.end_time,
        created_at: new Date().toISOString(),
      });

      if (error) throw error;

      // Mark slot as booked
      await supabase
        .from("therapist_slots")
        .update({ is_booked: true })
        .eq("id", selectedSlot);

      setBookingStep(3);
    } catch (err) {
      console.error("Booking error:", err);
    } finally {
      setBookingLoading(false);
    }
  };

  const shareLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Group slots by date
  const slotsByDate = slots.reduce<Record<string, TimeSlot[]>>((acc, slot) => {
    if (!acc[slot.date]) acc[slot.date] = [];
    acc[slot.date].push(slot);
    return acc;
  }, {});

  const availableDates = Object.keys(slotsByDate);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-8 w-8 text-primary mx-auto mb-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-white/40 text-sm">Loading therapist profile...</p>
        </div>
      </main>
    );
  }

  if (notFound) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-black mb-2">Therapist Not Found</h1>
          <p className="text-white/40 text-sm mb-6">
            The therapist profile you are looking for does not exist.
          </p>
          <a
            href="/"
            className="inline-block bg-primary hover:bg-primary-dark text-white font-bold px-8 py-3 rounded-full transition-all"
          >
            Go Home
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 py-16 relative">
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />

      <div className="w-full max-w-4xl mx-auto relative z-10 pt-8">
        {/* Header / Logo */}
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            <span className="text-xl font-black tracking-tight">Woyuduin</span>
          </a>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* LEFT: Therapist Profile */}
          <div className="lg:col-span-1">
            <div className="glass rounded-2xl p-6 text-center sticky top-24">
              {/* Photo */}
              <div className="w-28 h-28 rounded-full bg-white/5 border-2 border-primary/30 mx-auto mb-4 overflow-hidden">
                {therapist?.photo_url ? (
                  <img
                    src={therapist.photo_url}
                    alt={therapist.full_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl text-white/20">
                    {therapist?.full_name?.charAt(0) || "T"}
                  </div>
                )}
              </div>

              <h1 className="text-xl font-black mb-1">{therapist?.full_name}</h1>
              <div className="inline-flex items-center gap-1.5 bg-primary/10 border border-primary/20 rounded-full px-3 py-1 mb-3">
                <span className="text-xs text-primary-light font-semibold">
                  {therapist?.speciality}
                </span>
              </div>

              {/* Rating */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-sm ${
                        star <= Math.round(therapist?.rating || 0)
                          ? "text-gold"
                          : "text-white/10"
                      }`}
                    >
                      &#9733;
                    </span>
                  ))}
                </div>
                <span className="text-white/40 text-sm">
                  {therapist?.rating?.toFixed(1)} ({therapist?.reviews_count} reviews)
                </span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="glass rounded-xl p-3 text-center">
                  <div className="text-lg font-black text-primary-light">
                    {therapist?.years_experience}
                  </div>
                  <div className="text-[10px] text-white/30 font-bold uppercase">Years Exp.</div>
                </div>
                <div className="glass rounded-xl p-3 text-center">
                  <div className="text-lg font-black text-success">
                    KSh {therapist?.session_rate?.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-white/30 font-bold uppercase">Per Session</div>
                </div>
              </div>

              <p className="text-white/40 text-sm leading-relaxed mb-4">
                {therapist?.bio}
              </p>

              {/* Share */}
              <button
                onClick={shareLink}
                className="w-full glass hover:bg-white/10 text-white/60 font-semibold py-2.5 rounded-full transition-all text-sm"
              >
                {copied ? "Link Copied!" : "Share Profile Link"}
              </button>
            </div>
          </div>

          {/* RIGHT: Booking Flow */}
          <div className="lg:col-span-2">
            {bookingStep === 3 ? (
              /* Confirmation */
              <div className="glass rounded-2xl p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-success/20 border border-success/30 flex items-center justify-center text-4xl mx-auto mb-6">
                  &#10003;
                </div>
                <h2 className="text-2xl font-black mb-3">Booking Confirmed!</h2>
                <p className="text-white/40 text-sm mb-6 max-w-md mx-auto">
                  Your session with {therapist?.full_name} has been booked. You will receive
                  a confirmation email with session details.
                </p>
                <div className="glass rounded-xl p-4 max-w-sm mx-auto mb-6">
                  <div className="text-sm text-white/60 mb-1">Session Details</div>
                  <div className="text-white font-bold">
                    {selectedDate &&
                      new Date(selectedDate).toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                      })}
                  </div>
                  <div className="text-primary-light text-sm">
                    {slots.find((s) => s.id === selectedSlot)?.start_time} -{" "}
                    {slots.find((s) => s.id === selectedSlot)?.end_time}
                  </div>
                </div>
                <a
                  href="/"
                  className="inline-block bg-primary hover:bg-primary-dark text-white font-bold px-8 py-3 rounded-full transition-all"
                >
                  Back to Home
                </a>
              </div>
            ) : (
              <>
                {/* Step Indicator */}
                <div className="flex items-center gap-2 mb-6">
                  {["Select Date", "Choose Time", "Payment"].map((step, i) => (
                    <div key={i} className="flex items-center gap-2 flex-1">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                          bookingStep >= i
                            ? "bg-primary text-white"
                            : "bg-white/5 text-white/20"
                        }`}
                      >
                        {i + 1}
                      </div>
                      <span
                        className={`text-xs font-semibold hidden sm:block ${
                          bookingStep >= i ? "text-white/80" : "text-white/20"
                        }`}
                      >
                        {step}
                      </span>
                      {i < 2 && (
                        <div
                          className={`flex-1 h-px ${
                            bookingStep > i ? "bg-primary/50" : "bg-white/5"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* Step 0/1: Select Date & Time */}
                {bookingStep <= 1 && (
                  <div className="glass rounded-2xl p-6">
                    <h2 className="text-xl font-black mb-1">Book a Session</h2>
                    <p className="text-white/40 text-sm mb-6">
                      Choose a date and time that works for you.
                    </p>

                    {availableDates.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="text-4xl mb-3">📅</div>
                        <p className="text-white/40 text-sm">
                          No available slots at the moment. Please check back later.
                        </p>
                      </div>
                    ) : (
                      <>
                        {/* Date Selection */}
                        <div className="mb-6">
                          <label className="block text-sm font-semibold text-white/60 mb-3">
                            Available Dates
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {availableDates.map((date) => {
                              const d = new Date(date);
                              return (
                                <button
                                  key={date}
                                  onClick={() => {
                                    setSelectedDate(date);
                                    setSelectedSlot(null);
                                    setBookingStep(1);
                                  }}
                                  className={`px-4 py-3 rounded-xl text-center transition-all ${
                                    selectedDate === date
                                      ? "bg-primary text-white"
                                      : "glass hover:bg-white/10 text-white/60"
                                  }`}
                                >
                                  <div className="text-xs font-bold">
                                    {d.toLocaleDateString("en-US", { weekday: "short" })}
                                  </div>
                                  <div className="text-lg font-black">{d.getDate()}</div>
                                  <div className="text-[10px]">
                                    {d.toLocaleDateString("en-US", { month: "short" })}
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Time Slots */}
                        {selectedDate && (
                          <div>
                            <label className="block text-sm font-semibold text-white/60 mb-3">
                              Available Times
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                              {slotsByDate[selectedDate]?.map((slot) => (
                                <button
                                  key={slot.id}
                                  onClick={() => {
                                    setSelectedSlot(slot.id);
                                    setBookingStep(2);
                                  }}
                                  className={`p-3 rounded-xl text-sm font-semibold transition-all ${
                                    selectedSlot === slot.id
                                      ? "bg-primary text-white"
                                      : "glass hover:bg-white/10 text-white/60"
                                  }`}
                                >
                                  {slot.start_time} - {slot.end_time}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}

                {/* Step 2: Payment */}
                {bookingStep === 2 && (
                  <div className="glass rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <button
                        onClick={() => setBookingStep(1)}
                        className="text-white/40 hover:text-white transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <h2 className="text-xl font-black">Complete Your Booking</h2>
                    </div>

                    {/* Session Summary */}
                    <div className="glass-elevated rounded-xl p-4 mb-6">
                      <div className="text-xs text-white/40 mb-1">Session with</div>
                      <div className="font-bold">{therapist?.full_name}</div>
                      <div className="text-sm text-primary-light mt-1">
                        {selectedDate &&
                          new Date(selectedDate).toLocaleDateString("en-US", {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                          })}{" "}
                        | {slots.find((s) => s.id === selectedSlot)?.start_time} -{" "}
                        {slots.find((s) => s.id === selectedSlot)?.end_time}
                      </div>
                      <div className="text-lg font-black text-success mt-2">
                        KSh {therapist?.session_rate?.toLocaleString()}
                      </div>
                    </div>

                    {/* Client Info */}
                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="block text-sm font-semibold text-white/60 mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          required
                          placeholder="Your full name"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-white/60 mb-2">
                          Your Email *
                        </label>
                        <input
                          type="email"
                          value={clientEmail}
                          onChange={(e) => setClientEmail(e.target.value)}
                          required
                          placeholder="you@example.com"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all"
                        />
                      </div>
                    </div>

                    {/* Payment Methods */}
                    <label className="block text-sm font-semibold text-white/60 mb-3">
                      Payment Method
                    </label>
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      {PAYMENT_METHODS.map((pm) => (
                        <button
                          key={pm.id}
                          onClick={() => setSelectedPayment(pm.id)}
                          className={`p-4 rounded-xl text-center transition-all ${
                            selectedPayment === pm.id
                              ? "bg-primary/20 border-primary/40 border"
                              : "glass hover:bg-white/10"
                          }`}
                        >
                          <div className="text-2xl mb-1">{pm.icon}</div>
                          <div className="text-sm font-bold">{pm.name}</div>
                          <div className="text-[10px] text-white/30">{pm.desc}</div>
                        </button>
                      ))}
                    </div>

                    {/* Payment Info */}
                    {selectedPayment === "mpesa" && (
                      <div className="glass rounded-xl p-4 mb-6">
                        <p className="text-sm text-white/60">
                          You will receive an M-Pesa STK push to complete payment after booking.
                          Ensure your phone number is active.
                        </p>
                      </div>
                    )}
                    {selectedPayment === "crypto" && (
                      <div className="glass rounded-xl p-4 mb-6">
                        <p className="text-sm text-white/60">
                          Payment address and instructions will be sent to your email after booking.
                          We accept BTC, ETH, USDT, and 300+ coins via NOWPayments.
                        </p>
                      </div>
                    )}
                    {selectedPayment === "card" && (
                      <div className="glass rounded-xl p-4 mb-6">
                        <p className="text-sm text-white/60">
                          You will be redirected to a secure payment page to complete your
                          card payment after booking.
                        </p>
                      </div>
                    )}

                    {/* Confirm Button */}
                    <button
                      onClick={handleBook}
                      disabled={
                        !clientName || !clientEmail || !selectedPayment || bookingLoading
                      }
                      className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-full transition-all hover:scale-[1.02] glow-primary disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                    >
                      {bookingLoading ? (
                        <span className="inline-flex items-center gap-2">
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        `Confirm Booking - KSh ${therapist?.session_rate?.toLocaleString()}`
                      )}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pb-4">
          <a href="/" className="text-white/20 text-xs hover:text-white/40 transition-colors">
            Powered by Woyuduin
          </a>
        </div>
      </div>
    </main>
  );
}
