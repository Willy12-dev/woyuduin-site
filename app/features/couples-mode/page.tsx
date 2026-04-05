import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Couples Mode — Rebuild Trust After Porn Addiction | Woyuduin',
  description: 'Share your recovery progress with your partner. Transparent, honest, rebuilding trust together. Woyuduin Couples Mode makes recovery a team effort.',
  keywords: ['porn addiction relationship', 'porn addiction partner', 'rebuild trust after porn', 'couples porn recovery', 'porn addiction couples therapy', 'partner porn addiction help'],
};

export default function CouplesModePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <Link href="/" className="text-pink-400 hover:underline text-sm mb-8 inline-block">&larr; Back to Woyuduin</Link>

        <div className="mb-4 text-sm font-medium text-pink-400 bg-pink-500/10 px-4 py-1.5 rounded-full inline-block">Relationship Feature</div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Couples Mode</h1>
        <p className="text-gray-400 text-lg mb-12 max-w-2xl">Porn addiction doesn't just affect you — it affects your relationship. Couples Mode lets you rebuild trust through transparency, together.</p>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {[
            { t: 'Shared Streak Visibility', d: 'Your partner can see your recovery streak. Transparency builds trust faster than promises.' },
            { t: 'Milestone Celebrations', d: 'Both get notified when you hit milestones (7 days, 30 days, 90 days). Celebrate wins together.' },
            { t: 'Partner Dashboard', d: 'Your partner gets their own view — supportive, not surveillance. They see progress, not browsing data.' },
            { t: 'Communication Prompts', d: 'Weekly conversation starters to help you discuss recovery openly. Guided by therapist-designed questions.' },
            { t: 'Crisis Notifications', d: 'If you hit the panic button, your partner can be one of the people notified (with your permission).' },
            { t: 'Privacy Controls', d: 'YOU choose what to share. Partner sees streak and milestones — never journal entries, chat logs, or browsing data.' },
          ].map((f) => (
            <div key={f.t} className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-2">{f.t}</h3>
              <p className="text-gray-400 text-sm">{f.d}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-white/10 rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold mb-4">For Partners: You're Not Alone Either</h2>
          <p className="text-gray-300 mb-4">Discovering your partner's addiction is painful. Couples Mode isn't about monitoring — it's about healing together. Your partner chose to share their progress with you, which is itself an act of trust.</p>
          <p className="text-gray-400 text-sm">For deeper work, explore our <Link href="/therapist" className="text-pink-400 hover:underline">Therapist Marketplace</Link> for couples specialists.</p>
        </div>

        <div className="text-center">
          <Link href="/download" className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-bold px-8 py-4 rounded-2xl text-lg transition-colors">
            Download Free — Start Together
          </Link>
          <p className="text-gray-500 text-sm mt-3">Both partners download. Connect in-app.</p>
        </div>
      </div>
    </div>
  );
}
