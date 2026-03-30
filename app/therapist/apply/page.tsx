"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

const SPECIALITIES = [
  "Porn Addiction",
  "Sexual Addiction",
  "General Counseling",
  "Relationship Therapy",
  "Trauma Therapy",
];

export default function TherapistApply() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    speciality: "",
    years_experience: "",
    license_number: "",
    bio: "",
    session_rate: "",
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let photo_url = null;

      // Upload photo if provided
      if (photoFile) {
        const fileExt = photoFile.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from("therapist-photos")
          .upload(fileName, photoFile);

        if (uploadError) {
          console.warn("Photo upload failed:", uploadError.message);
        } else {
          const { data: urlData } = supabase.storage
            .from("therapist-photos")
            .getPublicUrl(fileName);
          photo_url = urlData.publicUrl;
        }
      }

      // Insert application
      const { error: insertError } = await supabase
        .from("therapist_applications")
        .insert({
          full_name: form.full_name,
          email: form.email,
          phone: form.phone,
          speciality: form.speciality,
          years_experience: parseInt(form.years_experience),
          license_number: form.license_number,
          bio: form.bio,
          session_rate: parseInt(form.session_rate),
          photo_url,
          status: "pending",
          created_at: new Date().toISOString(),
        });

      if (insertError) throw insertError;

      setSubmitted(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 py-16 relative">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-success/10 rounded-full blur-[120px]" />
        <div className="w-full max-w-lg relative z-10 text-center">
          <div className="glass rounded-2xl p-12">
            <div className="w-20 h-20 rounded-full bg-success/20 border border-success/30 flex items-center justify-center text-4xl mx-auto mb-6">
              &#10003;
            </div>
            <h1 className="text-3xl font-black mb-3">Application Submitted!</h1>
            <p className="text-white/40 text-sm leading-relaxed mb-8">
              Thank you for applying to join the Woyuduin therapist network. We will review
              your application and get back to you within 48 hours.
            </p>
            <a
              href="/"
              className="inline-block bg-primary hover:bg-primary-dark text-white font-bold px-8 py-3 rounded-full transition-all"
            >
              Back to Home
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 py-16 relative">
      {/* Background glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />

      <div className="w-full max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-10 pt-8">
          <a href="/" className="inline-flex items-center gap-2 mb-6">
            <span className="text-3xl">⚡</span>
            <span className="text-2xl font-black tracking-tight">Woyuduin</span>
          </a>
          <h1 className="text-3xl md:text-4xl font-black mb-3">
            Join Our <span className="text-gradient">Therapist Network</span>
          </h1>
          <p className="text-white/40 text-sm max-w-md mx-auto">
            Help men break free from porn addiction. Apply to become a verified therapist
            on the Woyuduin platform.
          </p>
        </div>

        {/* Application Form */}
        <div className="glass rounded-2xl p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-danger/10 border border-danger/20 rounded-xl px-4 py-3 text-danger text-sm">
                {error}
              </div>
            )}

            {/* Photo Upload */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-white/5 border-2 border-dashed border-white/10 flex items-center justify-center overflow-hidden">
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg
                      className="w-8 h-8 text-white/20"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <label className="cursor-pointer text-sm text-primary-light hover:text-primary font-semibold transition-colors">
                Upload Profile Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhoto}
                  className="hidden"
                />
              </label>
            </div>

            {/* Name & Email */}
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-white/60 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={form.full_name}
                  onChange={handleChange}
                  required
                  placeholder="Dr. Jane Doe"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white/60 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="jane@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all"
                />
              </div>
            </div>

            {/* Phone & Speciality */}
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-white/60 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder="+254 7XX XXX XXX"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white/60 mb-2">
                  Speciality *
                </label>
                <select
                  name="speciality"
                  value={form.speciality}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all appearance-none cursor-pointer"
                >
                  <option value="" className="bg-bg text-white/40">
                    Select speciality
                  </option>
                  {SPECIALITIES.map((s) => (
                    <option key={s} value={s} className="bg-bg text-white">
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Experience & License */}
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-white/60 mb-2">
                  Years of Experience *
                </label>
                <input
                  type="number"
                  name="years_experience"
                  value={form.years_experience}
                  onChange={handleChange}
                  required
                  min="0"
                  max="50"
                  placeholder="5"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white/60 mb-2">
                  License Number *
                </label>
                <input
                  type="text"
                  name="license_number"
                  value={form.license_number}
                  onChange={handleChange}
                  required
                  placeholder="LIC-XXXXX"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all"
                />
              </div>
            </div>

            {/* Session Rate */}
            <div>
              <label className="block text-sm font-semibold text-white/60 mb-2">
                Session Rate (KSh) *
              </label>
              <input
                type="number"
                name="session_rate"
                value={form.session_rate}
                onChange={handleChange}
                required
                min="100"
                placeholder="2000"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all"
              />
              <p className="text-white/20 text-xs mt-1">Amount in Kenyan Shillings per session</p>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-semibold text-white/60 mb-2">
                Professional Bio *
              </label>
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Tell us about your experience, approach, and why you want to help men recover from porn addiction..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all resize-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-full transition-all hover:scale-[1.02] glow-primary disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Submit Application"
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/5 text-center">
            <p className="text-white/30 text-sm">
              Already a therapist?{" "}
              <a
                href="/therapist/login"
                className="text-primary-light hover:text-primary font-semibold transition-colors"
              >
                Sign in here
              </a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <a href="/" className="text-white/20 text-xs hover:text-white/40 transition-colors">
            Powered by Woyuduin
          </a>
        </div>
      </div>
    </main>
  );
}
