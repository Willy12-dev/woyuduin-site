import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Recovery Journal & Mood Tracker — Track Your Progress | Woyuduin',
  description: 'Daily journaling and mood tracking for porn addiction recovery. Understand your triggers, track patterns, and see your progress over time. Free.',
  keywords: ['porn addiction journal', 'nofap journal app', 'mood tracker recovery', 'trigger tracking porn', 'recovery journal app', 'addiction recovery diary'],
};

export default function JournalPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <Link href="/" className="text-amber-400 hover:underline text-sm mb-8 inline-block">&larr; Back to Woyuduin</Link>

        <div className="mb-4 text-sm font-medium text-amber-400 bg-amber-500/10 px-4 py-1.5 rounded-full inline-block">Self-Awareness Tool</div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Journal & Mood Tracking</h1>
        <p className="text-gray-400 text-lg mb-12 max-w-2xl">Understanding your triggers is half the battle. Track your moods, identify patterns, and build self-awareness that prevents relapse.</p>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            { t: 'Daily Prompts', d: 'Guided questions so you never stare at a blank page. "What triggered me today?" "What am I grateful for?"' },
            { t: 'Mood Tracking', d: 'Quick mood check-in with emoji scale. See how your mood correlates with urges over time.' },
            { t: 'Trigger Patterns', d: 'After 7+ days, the app identifies your most common triggers — time, emotion, situation.' },
            { t: 'Private & Encrypted', d: 'Your journal stays on your device. Not synced, not readable by anyone.' },
            { t: 'Progress Insights', d: 'Weekly summaries showing mood trends, urge frequency, and streak milestones.' },
            { t: '3-Minute Sessions', d: 'Designed to be quick. You\'re more likely to journal if it only takes 3 minutes.' },
          ].map((f) => (
            <div key={f.t} className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <h3 className="font-bold mb-2">{f.t}</h3>
              <p className="text-gray-400 text-sm">{f.d}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/download" className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-bold px-8 py-4 rounded-2xl text-lg transition-colors">
            Download Free — Start Journaling
          </Link>
        </div>
      </div>
    </div>
  );
}
