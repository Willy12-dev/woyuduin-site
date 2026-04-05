import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Accountability Partner for Porn Addiction — Get Matched Free | Woyuduin',
  description: 'Get matched with a real accountability partner who understands your struggle. Daily check-ins, panic button, shared progress. Free with Woyuduin.',
  keywords: ['accountability partner porn', 'porn addiction accountability', 'nofap accountability partner', 'accountability app porn', 'recovery partner matching'],
};

export default function AccountabilityPartnerPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <Link href="/" className="text-green-400 hover:underline text-sm mb-8 inline-block">&larr; Back to Woyuduin</Link>

        <div className="mb-4 text-sm font-medium text-green-400 bg-green-500/10 px-4 py-1.5 rounded-full inline-block">Community Feature</div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Accountability Partner</h1>
        <p className="text-gray-400 text-lg mb-12 max-w-2xl">Research shows people with accountability partners are 65% more likely to maintain behavior change. Get matched with someone who gets it.</p>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {[
            { t: 'Smart Matching', d: 'Matched based on timezone, goals, and recovery stage. Not random — intentional pairing for maximum support.' },
            { t: 'Daily Check-ins', d: 'Quick daily messages to confirm you\'re still on track. Simple "I\'m good" or "I need help" — takes 10 seconds.' },
            { t: 'Panic Button', d: 'In the middle of a strong urge? Hit the panic button and your partner gets an instant notification to reach out.' },
            { t: 'Shared Progress', d: 'See each other\'s streak and milestones. Celebrate wins together. Pick each other up after setbacks.' },
            { t: 'Anonymous Option', d: 'Use a username, not your real name. Share as much or as little as you\'re comfortable with.' },
            { t: 'Complete Privacy', d: 'Messages are encrypted. Your partner only sees what you choose to share — no browsing data or activity logs.' },
          ].map((f) => (
            <div key={f.t} className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-2">{f.t}</h3>
              <p className="text-gray-400 text-sm">{f.d}</p>
            </div>
          ))}
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold mb-4">Why Accountability Works</h2>
          <div className="space-y-4 text-gray-300">
            <p><strong className="text-white">Addiction thrives in isolation.</strong> The moment you share your struggle with someone, it loses power. Shame can't survive being spoken.</p>
            <p><strong className="text-white">External motivation bridges willpower gaps.</strong> When your willpower is at zero, knowing someone is counting on you can be the one thing that stops a relapse.</p>
            <p><strong className="text-white">The data backs it up.</strong> A study by the American Society of Training and Development found that having a specific accountability partner increases your probability of completing a goal by 95%.</p>
          </div>
        </div>

        <div className="text-center">
          <Link href="/download" className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-2xl text-lg transition-colors">
            Download Free — Get Your Partner
          </Link>
          <p className="text-gray-500 text-sm mt-3">Free matching. Anonymous option available.</p>
        </div>
      </div>
    </div>
  );
}
