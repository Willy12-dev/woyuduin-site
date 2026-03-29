export default function Download() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: "#08080f" }}>
      <div className="w-full max-w-lg text-center">
        <span className="text-6xl block mb-6">⚡</span>
        <h1 className="text-3xl md:text-4xl font-black text-white mb-4">Get Woyuduin</h1>
        <p className="text-white/40 text-lg mb-10">
          Block porn. Kill urges. Build discipline.<br />
          Your personal bodyguard that runs 24/7.
        </p>

        <div className="space-y-4">
          {/* Play Store - coming soon */}
          <div className="glass rounded-2xl p-6 text-center">
            <span className="text-3xl block mb-3">🤖</span>
            <h3 className="text-white font-bold text-lg mb-1">Android</h3>
            <p className="text-white/40 text-sm mb-4">Available on Google Play Store</p>
            <div className="bg-white/10 text-white/50 font-bold py-3 rounded-full text-sm">
              Coming Soon to Play Store
            </div>
          </div>

          {/* iOS - future */}
          <div className="glass rounded-2xl p-6 text-center opacity-50">
            <span className="text-3xl block mb-3">🍎</span>
            <h3 className="text-white font-bold text-lg mb-1">iOS</h3>
            <p className="text-white/40 text-sm mb-4">iPhone & iPad</p>
            <div className="bg-white/10 text-white/50 font-bold py-3 rounded-full text-sm">
              Coming 2026
            </div>
          </div>
        </div>

        <div className="mt-10 glass rounded-2xl p-6">
          <h3 className="text-white font-bold mb-2">Join the Waitlist</h3>
          <p className="text-white/40 text-sm mb-4">Be the first to know when we launch on the Play Store.</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 glass rounded-xl px-4 py-3 text-white text-sm outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button className="bg-primary hover:bg-primary-dark text-white font-bold px-6 py-3 rounded-xl transition-all text-sm">
              Notify Me
            </button>
          </div>
        </div>

        <a href="/" className="inline-block mt-8 text-white/30 text-sm hover:text-white/50 transition-colors">
          ← Back to Home
        </a>

        <p className="text-white/20 text-xs mt-8">
          &copy; {new Date().getFullYear()} Flowi Group. All rights reserved.
        </p>
      </div>
    </main>
  );
}
