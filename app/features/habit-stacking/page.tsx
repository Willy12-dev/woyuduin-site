import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Habit Stacking for Porn Recovery — Replace Bad Habits | Woyuduin',
  description: 'Replace porn habits with healthy ones using science-backed habit stacking. Morning routines, exercise triggers, dopamine replacements. Free with Woyuduin.',
  keywords: ['habit stacking porn recovery', 'replace porn habit', 'healthy habits nofap', 'dopamine replacement porn', 'morning routine nofap', 'quit porn habits'],
};

export default function HabitStackingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <Link href="/" className="text-orange-400 hover:underline text-sm mb-8 inline-block">&larr; Back to Woyuduin</Link>

        <div className="mb-4 text-sm font-medium text-orange-400 bg-orange-500/10 px-4 py-1.5 rounded-full inline-block">Behavior Change</div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Habit Stacking</h1>
        <p className="text-gray-400 text-lg mb-12 max-w-2xl">You can't just remove a habit — you have to replace it. Woyuduin's habit stacking system fills the gap that porn leaves with healthy dopamine sources.</p>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4">How Habit Stacking Works</h2>
          <div className="space-y-4 text-gray-300">
            <p><strong className="text-white">The science is simple:</strong> attach a new behavior to an existing trigger. When you used to reach for porn (bored at night, stressed after work, alone in your room), you now have a pre-planned replacement behavior.</p>
            <p><strong className="text-white">Example stack:</strong> "When I feel the urge at night → I do 20 pushups → then I journal for 3 minutes → then I listen to a 5-minute guided meditation."</p>
            <p><strong className="text-white">Over 21 days,</strong> the new stack becomes automatic. Your brain rewires. The trigger still fires, but the response is different.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {[
            { t: 'Pre-Built Stacks', d: 'Choose from 15+ proven habit stacks: morning energy, stress relief, boredom buster, evening wind-down, weekend productivity.' },
            { t: 'Custom Stacks', d: 'Build your own stack from 50+ healthy habits. Drag and drop to create the perfect sequence for your triggers.' },
            { t: 'Trigger Matching', d: 'The app learns your trigger patterns (from your journal) and suggests habit stacks specifically designed for YOUR triggers.' },
            { t: 'Streak Tracking', d: 'Each habit stack has its own streak. See which stacks you\'re nailing and which need work.' },
            { t: 'Dopamine Menu', d: 'A curated list of healthy dopamine sources: exercise, cold showers, music, creative projects, social connection, learning.' },
            { t: 'Reminders', d: 'Set smart reminders that activate during your high-risk times. "It\'s 10pm — time for your evening wind-down stack."' },
          ].map((f) => (
            <div key={f.t} className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-2">{f.t}</h3>
              <p className="text-gray-400 text-sm">{f.d}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-white/10 rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold mb-4">Why "Just Stop" Doesn't Work</h2>
          <p className="text-gray-300 mb-4">Your brain doesn't delete habits — it overwrites them. Trying to "just stop" watching porn leaves a void that your brain will fill with the old behavior. Habit stacking fills that void intentionally, with behaviors that give you real satisfaction.</p>
          <p className="text-gray-400 text-sm">Based on James Clear's <em>Atomic Habits</em> and BJ Fogg's <em>Tiny Habits</em> methodology.</p>
        </div>

        <div className="text-center">
          <Link href="/download" className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-bold px-8 py-4 rounded-2xl text-lg transition-colors">
            Download Free — Build Better Habits
          </Link>
          <p className="text-gray-500 text-sm mt-3">15+ pre-built stacks included free.</p>
        </div>
      </div>
    </div>
  );
}
