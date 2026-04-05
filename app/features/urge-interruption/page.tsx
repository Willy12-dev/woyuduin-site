import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How to Stop Porn Urges — 5-Step Urge Interruption System | Woyuduin',
  description: 'Woyuduin\'s 5-step urge interruption system activates the moment you try to access porn. STOP screen, breathing, distraction, reality check, action plan.',
  keywords: ['stop porn urges', 'how to resist porn urges', 'urge management porn', 'porn urge stopper', 'resist temptation porn', 'interrupt porn habit'],
};

export default function UrgeInterruptionPage() {
  const steps = [
    { num: '01', title: 'STOP Screen', desc: 'A full-screen red warning appears instantly. This breaks the automatic pattern and forces conscious awareness of what you\'re about to do.', color: 'text-red-400' },
    { num: '02', title: 'Guided Breathing', desc: '60-second breathing exercise (4-4-4 pattern). This activates your parasympathetic nervous system, reducing the urge intensity by 40-60%.', color: 'text-blue-400' },
    { num: '03', title: 'Distraction Task', desc: 'A quick mental task (math, word puzzle) that engages your prefrontal cortex. You can\'t think about the urge and solve a problem simultaneously.', color: 'text-yellow-400' },
    { num: '04', title: 'Reality Check', desc: 'A personalized message reminding you WHY you\'re doing this. Your goals, your values, who you want to be. You wrote this during a clear moment.', color: 'text-green-400' },
    { num: '05', title: 'Action Plan', desc: 'Three options: call your accountability partner, do a physical activity, or journal about what triggered this urge. You choose, then act.', color: 'text-purple-400' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <Link href="/" className="text-red-400 hover:underline text-sm mb-8 inline-block">&larr; Back to Woyuduin</Link>

        <div className="mb-4 text-sm font-medium text-red-400 bg-red-500/10 px-4 py-1.5 rounded-full inline-block">Signature Feature</div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">5-Step Urge Interruption</h1>
        <p className="text-gray-400 text-lg mb-12 max-w-2xl">Most blockers just show an error page. Woyuduin activates a science-backed intervention that transforms the moment of weakness into a moment of growth.</p>

        <div className="space-y-6 mb-16">
          {steps.map((s) => (
            <div key={s.num} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex gap-6 items-start">
              <span className={`text-3xl font-black ${s.color} shrink-0`}>{s.num}</span>
              <div>
                <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-gray-400">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold mb-4">The Science Behind It</h2>
          <div className="space-y-4 text-gray-300">
            <p><strong className="text-white">Urges are waves, not commands.</strong> Neuroscience shows that a typical urge lasts 10-20 minutes and follows a wave pattern — it rises, peaks, and falls. You don't have to act on it.</p>
            <p><strong className="text-white">The 5 steps take ~3 minutes.</strong> By the time you complete all 5 steps, the peak of the urge has passed. Most users report that by step 3, they no longer want to continue.</p>
            <p><strong className="text-white">Can't be skipped.</strong> Unlike a simple "are you sure?" popup, each step must be completed before moving to the next. This is intentional — it gives your rational brain time to override the impulsive one.</p>
          </div>
        </div>

        <div className="text-center">
          <Link href="/download" className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-2xl text-lg transition-colors">
            Download Free — Kill Urges
          </Link>
          <p className="text-gray-500 text-sm mt-3">Activates automatically. No configuration needed.</p>
        </div>
      </div>
    </div>
  );
}
