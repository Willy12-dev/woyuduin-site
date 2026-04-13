import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Woyuduin Pricing — Free Porn Blocker & Recovery App | Woyuduin',
  description: 'Woyuduin is free forever for core features. Premium unlocks advanced AI counseling, therapist marketplace access, and family plans. See pricing.',
  keywords: ['woyuduin pricing', 'porn blocker free', 'nofap app pricing', 'porn addiction app cost', 'free porn blocker app'],
};

export default function PricingPage() {
  const plans = [
    {
      name: 'Basic',
      price: '$5',
      period: '/month',
      yearly: '$30/yr ($2.50/mo)',
      lifetime: '$100 one-time',
      color: 'border-white/10',
      cta: 'Download App',
      ctaColor: 'bg-white/10 hover:bg-white/20 text-white',
      features: [
        'VPN content blocker (40+ sites)',
        'PIN protection with 24hr disable delay',
        'Basic urge interruption (3 steps)',
        'Streak tracker with milestones',
        'Community access',
      ],
    },
    {
      name: 'Pro',
      price: '$12',
      period: '/month',
      yearly: '$80/yr ($6.67/mo)',
      lifetime: '$250 one-time',
      color: 'border-amber-500',
      cta: 'Start Free Trial',
      ctaColor: 'bg-amber-600 hover:bg-amber-700 text-white',
      popular: true,
      features: [
        'Everything in Basic, plus:',
        'Full 5-step urge interruption',
        'Journal & mood tracking',
        'Habit stacking (unlimited)',
        'AI Counselor',
        'Accountability partner matching',
        'Recovery curriculum (90 lessons)',
        'Therapist marketplace',
        'Weekly progress reports',
      ],
    },
    {
      name: 'Couples',
      price: '$18',
      period: '/month',
      yearly: '$130/yr ($10.83/mo)',
      lifetime: '$400 one-time',
      color: 'border-white/10',
      cta: 'Start Free Trial',
      ctaColor: 'bg-white/10 hover:bg-white/20 text-white',
      features: [
        'Everything in Pro, plus:',
        'Couples mode',
        'Shared streak & urge reports',
        'Partner dashboard',
        'Dual device support',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="max-w-5xl mx-auto px-4 py-20">
        <Link href="/" className="text-gray-400 hover:underline text-sm mb-8 inline-block">&larr; Back to Woyuduin</Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Simple, Honest Pricing</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Recovery shouldn't be paywalled. Core features are free forever. Premium unlocks deeper tools for those who want more.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {plans.map((plan) => (
            <div key={plan.name} className={`relative bg-white/5 border-2 ${plan.color} rounded-2xl p-8 flex flex-col`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-600 text-white text-xs font-bold px-4 py-1 rounded-full">Most Popular</div>
              )}
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-extrabold">{plan.price}</span>
                <span className="text-gray-400 text-sm">{plan.period}</span>
                <div className="flex gap-2 mt-3">
                  <span className="text-xs text-amber-400/80 bg-amber-500/10 rounded-full px-3 py-1">{plan.yearly}</span>
                  <span className="text-xs text-emerald-400/80 bg-emerald-500/10 rounded-full px-3 py-1">{plan.lifetime}</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2 text-sm text-gray-300">
                    <span className="text-emerald-400 shrink-0">&#10003;</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link href="/download" className={`block text-center font-bold py-3 rounded-xl transition-colors ${plan.ctaColor}`}>
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">5-Day Free Trial on Pro & Couples</h2>
          <p className="text-gray-400 max-w-xl mx-auto">Try Pro or Couples free for 5 days. Cancel anytime. No credit card required to start. If you can&apos;t afford it, email us — we&apos;ll give you Pro free. Recovery shouldn&apos;t depend on your wallet.</p>
        </div>
      </div>
    </div>
  );
}
