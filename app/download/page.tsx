import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download Woyuduin - Block Porn & Build Discipline",
  description:
    "Download Woyuduin for Android. The #1 app to block porn, kill urges, and build discipline. Free download, no Play Store needed. VPN-based DNS blocker + 5-step urge interruption system.",
  keywords: [
    "block porn app",
    "porn blocker android",
    "anti porn app",
    "nofap app",
    "porn addiction recovery app",
    "block adult content android",
    "discipline app",
    "urge blocker app",
    "free porn blocker",
    "woyuduin download",
  ],
  openGraph: {
    title: "Download Woyuduin - Block Porn & Build Discipline",
    description: "The #1 app to block porn and build discipline. Free Android download.",
    url: "https://woyuduin.com/download",
  },
};

export default function Download() {
  return (
    <main
      className="min-h-screen flex items-center justify-center px-6"
      style={{ backgroundColor: "#08080f" }}
    >
      <div className="w-full max-w-lg text-center">
        <span className="text-6xl block mb-6">⚡</span>
        <h1 className="text-3xl md:text-4xl font-black text-white mb-4">
          Get Woyuduin
        </h1>
        <p className="text-white/40 text-lg mb-10">
          Block porn. Kill urges. Build discipline.
          <br />
          Your personal bodyguard that runs 24/7.
        </p>

        <div className="space-y-4">
          {/* Android - Direct Download */}
          <div className="glass rounded-2xl p-6 text-center">
            <span className="text-3xl block mb-3">🤖</span>
            <h3 className="text-white font-bold text-lg mb-1">Android</h3>
            <p className="text-white/40 text-sm mb-2">
              Direct download — no Play Store needed
            </p>
            <p className="text-white/20 text-xs mb-4">v1.0 &bull; 52 MB &bull; Android 8.0+</p>
            <a
              href="/woyuduin.apk"
              download
              className="block bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-bold py-4 rounded-full text-sm transition-all hover:scale-105 active:scale-95"
            >
              Download APK — Free
            </a>
            <p className="text-white/20 text-xs mt-3">
              You may need to enable &quot;Install from unknown sources&quot; in
              your Android settings
            </p>
          </div>

          {/* iOS - future */}
          <div className="glass rounded-2xl p-6 text-center opacity-50">
            <span className="text-3xl block mb-3">🍎</span>
            <h3 className="text-white font-bold text-lg mb-1">iOS</h3>
            <p className="text-white/40 text-sm mb-4">iPhone &amp; iPad</p>
            <div className="bg-white/10 text-white/50 font-bold py-3 rounded-full text-sm">
              Coming 2026
            </div>
          </div>
        </div>

        {/* How to install */}
        <div className="mt-10 glass rounded-2xl p-6 text-left">
          <h3 className="text-white font-bold mb-4 text-center">
            How to Install
          </h3>
          <ol className="space-y-3 text-white/60 text-sm">
            <li className="flex items-start gap-3">
              <span className="bg-purple-600/30 text-purple-300 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                1
              </span>
              <span>
                Tap <strong className="text-white/80">Download APK</strong>{" "}
                above
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-purple-600/30 text-purple-300 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                2
              </span>
              <span>
                Open the downloaded file (check your notifications or
                Downloads folder)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-purple-600/30 text-purple-300 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                3
              </span>
              <span>
                If prompted, tap{" "}
                <strong className="text-white/80">Settings</strong> →{" "}
                enable <strong className="text-white/80">&quot;Allow from this source&quot;</strong>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-purple-600/30 text-purple-300 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                4
              </span>
              <span>
                Tap <strong className="text-white/80">Install</strong> → Open
                the app → Set up your PIN
              </span>
            </li>
          </ol>
        </div>

        {/* Trust signals */}
        <div className="mt-6 flex items-center justify-center gap-6 text-white/30 text-xs">
          <span>🔒 No data collection</span>
          <span>🛡️ VPN-based blocking</span>
          <span>💯 100% free</span>
        </div>

        <a
          href="/"
          className="inline-block mt-8 text-white/30 text-sm hover:text-white/50 transition-colors"
        >
          ← Back to Home
        </a>

        <p className="text-white/20 text-xs mt-8">
          &copy; {new Date().getFullYear()} Flowi Group. All rights reserved.
        </p>
      </div>
    </main>
  );
}
