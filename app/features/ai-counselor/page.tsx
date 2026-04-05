import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AI Counselor for Porn Addiction — 24/7 Free Support | Woyuduin',
  description: 'Talk to an AI counselor anytime you feel an urge or need support. Available 24/7, completely private, no judgment. Free with Woyuduin.',
  keywords: ['ai counselor porn addiction', 'ai therapy porn', 'porn addiction chatbot', 'free porn addiction help', '24/7 addiction support', 'ai recovery coach'],
};

export default function AiCounselorPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <Link href="/" className="text-cyan-400 hover:underline text-sm mb-8 inline-block">&larr; Back to Woyuduin</Link>

        <div className="mb-4 text-sm font-medium text-cyan-400 bg-cyan-500/10 px-4 py-1.5 rounded-full inline-block">AI-Powered</div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">AI Counselor</h1>
        <p className="text-gray-400 text-lg mb-12 max-w-2xl">A judgment-free AI that talks you through urges, helps you understand triggers, and supports your recovery — available 24/7.</p>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {[
            { t: 'Available 24/7', d: 'Urges don\'t follow office hours. The AI counselor is there at 3am, weekends, holidays — whenever you need it.' },
            { t: 'Completely Private', d: 'Your conversations never leave your device. No data collected, no cloud storage, no human reads your messages.' },
            { t: 'No Judgment', d: 'Unlike talking to a friend or partner, the AI never judges you. Just support, strategies, and understanding.' },
            { t: 'Evidence-Based Responses', d: 'Trained on CBT and ACT principles — the same approaches licensed therapists use for compulsive behaviors.' },
            { t: 'Urge-Specific Support', d: 'Tell it you\'re having an urge and it walks you through breathing exercises, distraction techniques, and reality checks.' },
            { t: 'Pattern Recognition', d: 'Over time, it helps you identify your trigger patterns — time of day, emotions, situations that lead to urges.' },
          ].map((f) => (
            <div key={f.t} className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-2">{f.t}</h3>
              <p className="text-gray-400 text-sm">{f.d}</p>
            </div>
          ))}
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold mb-4">What You Can Talk About</h2>
          <ul className="space-y-3 text-gray-300">
            {['I\'m having a strong urge right now — help me through it', 'Why do I keep relapsing at night?', 'How do I tell my partner about my addiction?', 'I relapsed and I feel terrible — what do I do?', 'Help me build a morning routine to replace old habits', 'What\'s happening in my brain when I get an urge?'].map((q) => (
              <li key={q} className="flex gap-3 items-start"><span className="text-cyan-400 mt-1">&#x2794;</span><span>{q}</span></li>
            ))}
          </ul>
        </div>

        <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-white/10 rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold mb-3">AI Counselor + Human Therapist</h2>
          <p className="text-gray-300 mb-4">The AI counselor is great for immediate support, but it doesn't replace professional therapy. Woyuduin also includes a <Link href="/therapist" className="text-cyan-400 hover:underline">Therapist Marketplace</Link> where you can book sessions with licensed professionals who specialize in recovery.</p>
          <p className="text-gray-400 text-sm">Use the AI for daily support. Use a therapist for deeper work.</p>
        </div>

        <div className="text-center">
          <Link href="/download" className="inline-block bg-cyan-600 hover:bg-cyan-700 text-white font-bold px-8 py-4 rounded-2xl text-lg transition-colors">
            Download Free — Talk to AI Now
          </Link>
          <p className="text-gray-500 text-sm mt-3">Free. Private. No signup required.</p>
        </div>
      </div>
    </div>
  );
}
