import React from 'react';
import { Check } from 'lucide-react';

const PricingPage = () => {
  const pricingPlans = [
    {
      name: 'Free',
      price: '$0',
      features: ['3 Resume Templates', 'Basic Editing Tools', 'PDF Export', 'Community Support'],
      popular: false
    },
    {
      name: 'Pro',
      price: '$9.99',
      period: '/month',
      features: ['Unlimited Templates', 'AI-Powered Suggestions', 'Priority Support', 'Custom Branding', 'Analytics Dashboard', 'Multiple Formats'],
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$29.99',
      period: '/month',
      features: ['Everything in Pro', 'Team Collaboration', 'API Access', 'Custom Templates', 'White Label', 'Dedicated Support'],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">Choose Your Plan</h1>
          <p className="text-gray-400 text-lg">Start free, upgrade when you need more power</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, idx) => (
            <div 
              key={idx} 
              className={`relative p-8 rounded-2xl border transition-all hover:scale-105 ${
                plan.popular 
                  ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500 scale-105' 
                  : 'bg-white/5 backdrop-blur-xl border-white/10'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-sm font-semibold rounded-full">
                  Most Popular
                </div>
              )}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
                <div className="text-5xl font-bold text-white mb-2">
                  {plan.price}
                  {plan.period && <span className="text-lg text-gray-400">{plan.period}</span>}
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <Check className="text-cyan-400 flex-shrink-0" size={20} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button 
                className={`w-full py-3 rounded-lg font-semibold transition-all ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:shadow-xl hover:shadow-purple-500/50' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;