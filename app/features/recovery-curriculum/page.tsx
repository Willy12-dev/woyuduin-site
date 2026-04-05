import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Porn Addiction Recovery Program — Step-by-Step Curriculum | Woyuduin',
  description: 'A structured 90-day recovery curriculum based on CBT, ACT, and neuroscience. Daily lessons, exercises, and milestones. Free with Woyuduin.',
  keywords: ['porn addiction recovery program', 'nofap program', 'porn addiction course', 'quit porn program', '90 day nofap', 'porn addiction recovery steps', 'how to quit porn step by step'],
};

export default function RecoveryCurriculumPage() {
  const phases = [
    { week: 'Week 1–2', title: 'Foundation', desc: 'Understand the neuroscience of addiction. Set up your environment, identify your triggers, and build your first-week streak. Daily lessons on dopamine, habit loops, and why willpower alone fails.', color: 'text-violet-400', bg: 'bg-violet-500/10' },
    { week: 'Week 3–4', title: 'Rewiring', desc: 'Replace old patterns with new habits. Learn CBT techniques to challenge automatic thoughts. Start building a morning routine, exercise habit, and healthy dopamine sources.', color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { week: 'Week 5–8', title: 'Deepening', desc: 'Explore the emotional roots of your addiction. ACT exercises for sitting with discomfort. Relationship repair skills. Handling flatline periods and motivation dips.', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { week: 'Week 9–12', title: 'Independence', desc: 'Build a relapse prevention plan. Stress-test your new habits. Graduate with a personalized maintenance strategy. You\'re not "recovering" — you\'ve recovered.', color: 'text-amber-400', bg: 'bg-amber-500/10' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <Link href="/" className="text-violet-400 hover:underline text-sm mb-8 inline-block">&larr; Back to Woyuduin</Link>

        <div className="mb-4 text-sm font-medium text-violet-400 bg-violet-500/10 px-4 py-1.5 rounded-full inline-block">Guided Program</div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">90-Day Recovery Curriculum</h1>
        <p className="text-gray-400 text-lg mb-12 max-w-2xl">Not just a blocker — a complete recovery program. Daily lessons, exercises, and milestones based on CBT, ACT, and neuroscience research.</p>

        <div className="space-y-6 mb-16">
          {phases.map((p) => (
            <div key={p.week} className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className={`text-sm font-bold ${p.bg} ${p.color} px-3 py-1 rounded-full`}>{p.week}</span>
                <h3 className="font-bold text-xl">{p.title}</h3>
              </div>
              <p className="text-gray-400">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            { t: 'Daily Lessons', d: '5-minute audio or text lessons. Learn one concept per day — small enough to stick, deep enough to matter.' },
            { t: 'Practical Exercises', d: 'Each lesson includes a hands-on exercise. Journaling prompts, breathing techniques, habit-building challenges.' },
            { t: 'Progress Milestones', d: 'Unlock badges at 7, 14, 30, 60, and 90 days. Each milestone comes with a reflection exercise.' },
            { t: 'Science-Based', d: 'Built on peer-reviewed research in addiction neuroscience, cognitive behavioral therapy, and acceptance commitment therapy.' },
            { t: 'Self-Paced', d: 'Miss a day? No problem. The curriculum adapts. Fall behind? It adjusts. Relapse? It has a specific restart protocol.' },
            { t: 'Community Support', d: 'Each phase has a group discussion. Share wins, ask questions, and support others at the same stage.' },
          ].map((f) => (
            <div key={f.t} className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <h3 className="font-bold mb-2">{f.t}</h3>
              <p className="text-gray-400 text-sm">{f.d}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/download" className="inline-block bg-violet-600 hover:bg-violet-700 text-white font-bold px-8 py-4 rounded-2xl text-lg transition-colors">
            Download Free — Start Day 1
          </Link>
          <p className="text-gray-500 text-sm mt-3">Full 90-day curriculum included free.</p>
        </div>
      </div>
    </div>
  );
}
