import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Porn-Free Streak Tracker — Track Your Recovery Progress | Woyuduin',
  description: 'Track your porn-free streak with milestones, stats, and motivation. See your longest streak, total clean days, and recovery timeline. Free with Woyuduin.',
  keywords: ['nofap streak tracker', 'porn free counter', 'nofap counter app', 'porn addiction tracker', 'days without porn tracker', 'sobriety counter porn', 'nofap day counter'],
};

export default function StreakTrackerPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <Link href="/" className="text-emerald-400 hover:underline text-sm mb-8 inline-block">&larr; Back to Woyuduin</Link>

        <div className="mb-4 text-sm font-medium text-emerald-400 bg-emerald-500/10 px-4 py-1.5 rounded-full inline-block">Core Feature</div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Streak Tracker</h1>
        <p className="text-gray-400 text-lg mb-12 max-w-2xl">Every day counts. Track your porn-free streak, hit milestones, and watch your progress grow over weeks and months.</p>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            { t: 'Live Counter', d: 'Days, hours, and minutes since your last reset. Always visible on your home screen widget.' },
            { t: 'Milestone Badges', d: 'Unlock badges at 1, 3, 7, 14, 30, 60, 90, 180, and 365 days. Each one is earned, not given.' },
            { t: 'Longest Streak', d: 'Your personal record is always tracked. Beat your best — compete with yourself.' },
            { t: 'Total Clean Days', d: 'Even if you reset, your total clean days keep counting. Progress isn\'t lost on a bad day.' },
            { t: 'Calendar Heatmap', d: 'See your year at a glance. Green days are clean, red days are resets. Watch the green take over.' },
            { t: 'Recovery Timeline', d: 'See what changes happen in your brain at each stage: 7 days (dopamine rebalancing), 30 days (neural pathway weakening), 90 days (new baseline).' },
            { t: 'Home Screen Widget', d: 'Glance at your streak without opening the app. A constant, quiet reminder of how far you\'ve come.' },
            { t: 'Relapse Logging', d: 'If you reset, log what happened. Over time, patterns emerge that help you prevent future relapses.' },
            { t: 'Share Milestones', d: 'Share your milestone badges with your accountability partner or the community. Celebrate publicly or privately.' },
          ].map((f) => (
            <div key={f.t} className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <h3 className="font-bold mb-2">{f.t}</h3>
              <p className="text-gray-400 text-sm">{f.d}</p>
            </div>
          ))}
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold mb-4">What Happens When You Reset?</h2>
          <div className="space-y-4 text-gray-300">
            <p><strong className="text-white">A reset is not a failure.</strong> It's data. Woyuduin treats relapses as learning opportunities, not moral failures. Your total clean days still count. Your insights still matter.</p>
            <p><strong className="text-white">Log, learn, restart.</strong> When you reset, the app asks three quick questions: what triggered it, what you could do differently, and what you're grateful for. Then your new streak begins immediately.</p>
            <p><strong className="text-white">Progress over perfection.</strong> Someone with a 15-day streak who resets and starts again is doing better than someone who never started at all.</p>
          </div>
        </div>

        <div className="text-center">
          <Link href="/download" className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-4 rounded-2xl text-lg transition-colors">
            Download Free — Start Your Streak
          </Link>
          <p className="text-gray-500 text-sm mt-3">Your streak starts the moment you download.</p>
        </div>
      </div>
    </div>
  );
}
