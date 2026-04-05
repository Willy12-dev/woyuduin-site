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
      name: 'Free',
      price: '$0',
      period: 'forever',
      color: 'border-white/10',
      cta: 'Download Free',
      ctaColor: 'bg-white/10 hover:bg-white/20 text-white',
      features: [
        'VPN content blocker',
        'Streak tracker with milestones',
        '5-step urge interruption',
        'Basic journal & mood tracking',
        'Accountability partner matching',
        'Recovery curriculum (first 30 days)',
        'Habit stacking (5 pre-built stacks)',
        'Community access',
      ],
    },
    {
      name: 'Premium',
      price: '$4.99',
      period: '/month',
      color: 'border-amber-500',
      cta: 'Start Free Trial',
      ctaColor: 'bg-amber-600 hover:bg-amber-700 text-white',
      popular: true,
      features: [
        'Everything in Free, plus:',
        'Unlimited AI counselor sessions',
        'Full 90-day recovery curriculum',
        'Advanced trigger pattern analysis',
        'Custom habit stacks (unlimited)',
        'Couples mode',
        'Priority accountability matching',
        'Weekly progress reports',
        'Export journal & data',
      ],
    },
    {
      name: 'Family',
      price: '$9.99',
      period: '/month',
      color: 'border-white/10',
      cta: 'Start Free Trial',
      ctaColor: 'bg-white/10 hover:bg-white/20 text-white',
      features: [
        'Everything in Premium, plus:',
        'Up to 5 family members',
        'Parental content controls',
        'Family dashboard',
        'Per-device configuration',
        'Therapist marketplace discounts',
        'Priority support',
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
          <h2 className="text-2xl font-bold mb-3">7-Day Free Trial on All Paid Plans</h2>
          <p className="text-gray-400 max-w-xl mx-auto">Try Premium or Family free for 7 days. Cancel anytime. No credit card required to start. If you can't afford it, email us — we'll give you Premium free. Recovery shouldn't depend on your wallet.</p>
        </div>
      </div>
    </div>
  );
}
