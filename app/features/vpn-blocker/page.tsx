import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Free VPN Porn Blocker for Android — Block Adult Sites on Every App',
  description: 'Woyuduin blocks porn at the network level using VPN-based DNS filtering. Works on every app and browser. 40+ adult domains blocked. Free, no subscription.',
  keywords: ['vpn porn blocker', 'porn blocker vpn free', 'block porn android vpn', 'dns porn blocker', 'network level porn blocker', 'block adult sites all apps', 'free porn blocker vpn android'],
  openGraph: { title: 'Free VPN Porn Blocker — Blocks Porn on Every App', description: 'VPN-based DNS filtering blocks 40+ adult domains across all apps and browsers. Free.' },
};

export default function VpnBlockerPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <Link href="/" className="text-purple-400 hover:underline text-sm mb-8 inline-block">&larr; Back to Woyuduin</Link>

        <div className="mb-4 text-sm font-medium text-purple-400 bg-purple-500/10 px-4 py-1.5 rounded-full inline-block">Core Feature</div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">VPN Content Blocker</h1>
        <p className="text-gray-400 text-lg mb-12 max-w-2xl">Block porn at the network level. Works on every app, every browser, 24/7. No way to accidentally stumble onto adult content.</p>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {[
            { t: '40+ Adult Domains Blocked', d: 'Covers all major porn sites and their mirrors. Updated regularly.' },
            { t: 'Works on EVERY App', d: 'Unlike browser extensions that only work in one browser, VPN-level blocking covers Chrome, Firefox, TikTok, Twitter, Reddit — everything.' },
            { t: 'Can\'t Be Bypassed Easily', d: 'You can\'t just open a different browser or use incognito mode. The VPN blocks at the DNS level before the page even loads.' },
            { t: '24-Hour Disable Delay', d: 'Want to turn it off? You have to wait 24 hours. Urges pass in 10-20 minutes — by the time it unlocks, you won\'t want to anymore.' },
            { t: 'PIN Protection', d: 'Set a PIN that only you (or your accountability partner) knows. Can\'t uninstall without it.' },
            { t: 'Zero Battery Drain', d: 'Optimized to run 24/7 with minimal battery impact. You won\'t even notice it\'s running.' },
          ].map((f) => (
            <div key={f.t} className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-2">{f.t}</h3>
              <p className="text-gray-400 text-sm">{f.d}</p>
            </div>
          ))}
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold mb-4">How It Works</h2>
          <ol className="space-y-4 text-gray-300">
            <li className="flex gap-4"><span className="text-purple-400 font-bold text-lg">1.</span><span>Woyuduin creates a local VPN on your device (no data leaves your phone)</span></li>
            <li className="flex gap-4"><span className="text-purple-400 font-bold text-lg">2.</span><span>All DNS requests are routed through this VPN</span></li>
            <li className="flex gap-4"><span className="text-purple-400 font-bold text-lg">3.</span><span>When any app tries to load an adult domain, the request is blocked instantly</span></li>
            <li className="flex gap-4"><span className="text-purple-400 font-bold text-lg">4.</span><span>Instead of porn, you see the 5-step urge interruption system</span></li>
          </ol>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold mb-4">VPN Blocker vs. Other Methods</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead><tr className="border-b border-white/10 text-gray-400">
                <th className="py-3 pr-4">Method</th><th className="py-3 pr-4">Coverage</th><th className="py-3 pr-4">Bypass Difficulty</th><th className="py-3">Price</th>
              </tr></thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-white/5 bg-purple-500/5"><td className="py-3 pr-4 font-bold text-purple-400">Woyuduin VPN</td><td className="py-3 pr-4">All apps & browsers</td><td className="py-3 pr-4">Hard</td><td className="py-3">Free</td></tr>
                <tr className="border-b border-white/5"><td className="py-3 pr-4">Browser extension</td><td className="py-3 pr-4">One browser only</td><td className="py-3 pr-4">Easy</td><td className="py-3">Free-$5/mo</td></tr>
                <tr className="border-b border-white/5"><td className="py-3 pr-4">DNS change</td><td className="py-3 pr-4">All apps</td><td className="py-3 pr-4">Easy (can change back)</td><td className="py-3">Free</td></tr>
                <tr className="border-b border-white/5"><td className="py-3 pr-4">Covenant Eyes</td><td className="py-3 pr-4">All apps (monitoring)</td><td className="py-3 pr-4">Medium</td><td className="py-3">$16.99/mo</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center">
          <Link href="/download" className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-4 rounded-2xl text-lg transition-colors">
            Download Free — Block Porn Now
          </Link>
          <p className="text-gray-500 text-sm mt-3">Android only. No subscription. No ads.</p>
        </div>
      </div>
    </div>
  );
}
