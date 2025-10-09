import React from 'react';
import { Zap, FileText, Sparkles, Shield, Users, Download } from 'lucide-react';

const FeaturesPage = () => {
  const features = [
    { icon: Zap, title: 'AI-Powered', desc: 'Smart suggestions to optimize your resume with artificial intelligence' },
    { icon: FileText, title: 'ATS-Friendly', desc: 'Pass applicant tracking systems with optimized formatting' },
    { icon: Sparkles, title: 'Beautiful Templates', desc: 'Professional designs that make you stand out' },
    { icon: Shield, title: 'Privacy First', desc: 'Your data is encrypted and completely secure' },
    { icon: Users, title: 'Team Collaboration', desc: 'Share and get feedback from peers and mentors' },
    { icon: Download, title: 'Multi-Format Export', desc: 'Download in PDF, DOCX, and other formats' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">Powerful Features</h1>
          <p className="text-gray-400 text-lg">Everything you need to create the perfect resume</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div 
                key={idx} 
                className="p-8 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-cyan-500/50 transition-all group hover:scale-105"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Additional Info Section */}
        <div className="mt-20 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-xl rounded-3xl border border-cyan-500/30 p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have landed their dream jobs with our platform
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-full hover:shadow-xl hover:shadow-purple-500/50 transition-all">
            Start Building Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;