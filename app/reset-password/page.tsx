"use client";

import { useState } from "react";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleReset = async () => {
    if (password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      setStatus("error");
      return;
    }
    if (password !== confirm) {
      setMessage("Passwords don't match.");
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      // Get the access token from the URL hash
      const hash = window.location.hash;
      const params = new URLSearchParams(hash.replace("#", "?"));
      const accessToken = params.get("access_token");

      if (!accessToken) {
        setMessage("Invalid or expired reset link. Please request a new one from the app.");
        setStatus("error");
        return;
      }

      const res = await fetch("https://abtluivjiudgfkszrhif.supabase.co/auth/v1/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
          "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFidGx1aXZqaXVkZ2Zrc3pyaGlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4MTE4NzQsImV4cCI6MjA5MDM4Nzg3NH0.zMQbOJSfFjHmLAehIuorYN-33VxMWyGTc-kscTLVlOk",
        },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        setMessage("Password updated! You can now sign in with your new password in the app.");
        setStatus("success");
      } else {
        const data = await res.json();
        setMessage(data.msg || data.error_description || "Failed to reset password. Try again.");
        setStatus("error");
      }
    } catch {
      setMessage("Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: "#08080f" }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-5xl">⚡</span>
          <h1 className="text-2xl font-black text-white mt-4">Reset Your Password</h1>
          <p className="text-white/40 text-sm mt-2">Enter a new password for your Woyuduin account</p>
        </div>

        {status === "success" ? (
          <div className="glass rounded-2xl p-8 text-center">
            <span className="text-4xl block mb-4">✅</span>
            <p className="text-white font-bold text-lg mb-2">Password Updated!</p>
            <p className="text-white/50 text-sm">{message}</p>
          </div>
        ) : (
          <div className="glass rounded-2xl p-6 space-y-4">
            <div>
              <label className="text-white/50 text-sm font-bold block mb-2">New Password</label>
              <input
                type="password"
                className="w-full glass rounded-xl px-4 py-3 text-white text-sm outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label className="text-white/50 text-sm font-bold block mb-2">Confirm Password</label>
              <input
                type="password"
                className="w-full glass rounded-xl px-4 py-3 text-white text-sm outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Type it again"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
            </div>

            {status === "error" && (
              <p className="text-red-400 text-sm">{message}</p>
            )}

            <button
              onClick={handleReset}
              disabled={status === "loading"}
              className="w-full bg-primary hover:bg-primary-dark text-white font-black text-base py-4 rounded-full transition-all disabled:opacity-50"
            >
              {status === "loading" ? "Updating..." : "Update Password"}
            </button>
          </div>
        )}

        <p className="text-center text-white/20 text-xs mt-8">
          &copy; {new Date().getFullYear()} Flowi Group. All rights reserved.
        </p>
      </div>
    </main>
  );
}
