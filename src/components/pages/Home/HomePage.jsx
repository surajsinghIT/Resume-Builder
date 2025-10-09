import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, FileText, Sparkles } from 'lucide-react';
import { BUILDER, TEMPLATES } from '../../../utils/RouteList';

const HomePage = () => {
  const features = [
    { icon: Zap, title: 'AI-Powered', desc: 'Smart suggestions to optimize your resume' },
    { icon: FileText, title: 'ATS-Friendly', desc: 'Pass applicant tracking systems easily' },
    { icon: Sparkles, title: 'Beautiful Templates', desc: 'Professional designs that stand out' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="inline-block">
              <span className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-sm font-semibold text-white shadow-lg shadow-purple-500/50">
                🚀 Next-Gen Resume Builder
              </span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-white tracking-tight">
              Build Your
              <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
              style={{lineHeight:"6rem"}}>
                Future-Ready Resume
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Create stunning, resumes in minutes 
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to={BUILDER} className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-full hover:shadow-xl hover:shadow-purple-500/50 transition-all flex items-center gap-2">
                Start Building <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              {/* <Link to={TEMPLATES} className="px-8 py-4 bg-white/10 backdrop-blur-lg text-white font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-all">
                View Templates
              </Link> */}
            </div>
          </div>

          {/* Floating Cards Animation */}
          <div className="mt-20 relative h-96">
            <div className="absolute top-0 left-1/4 w-64 h-80 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-xl rounded-2xl border border-cyan-500/30 transform rotate-6 hover:rotate-3 transition-transform shadow-2xl shadow-cyan-500/20"></div>
            <div className="absolute top-8 right-1/4 w-64 h-80 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-2xl border border-purple-500/30 transform -rotate-6 hover:-rotate-3 transition-transform shadow-2xl shadow-purple-500/20"></div>
            <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-72 h-96 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 backdrop-blur-xl rounded-2xl border border-indigo-500/40 hover:scale-105 transition-transform shadow-2xl shadow-indigo-500/30"></div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      {/* <div className="py-24 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Powered by Advanced Technology</h2>
            <p className="text-gray-400 text-lg">Everything you need to land your dream job</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="p-8 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all group">
                  <Icon className="w-12 h-12 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default HomePage;