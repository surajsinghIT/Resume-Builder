import React, { useEffect } from 'react';
import { Zap, Layout, Sparkles } from 'lucide-react';

const AboutPage = () => {
  const features = [
    { label: 'Lightning Fast', icon: Zap, description: 'Create stunning resumes in minutes' },
    { label: 'Beautiful Templates', icon: Layout, description: 'Professional designs that stand out' },
    { label: 'Easy to Use', icon: Sparkles, description: 'Intuitive interface, powerful results' }
  ];

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">About Resume Builder</h1>
          <p className="text-gray-400 text-lg">Crafting professional resumes made simple</p>
        </div>

        {/* Main Content */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 md:p-12 mb-12">
          <div className="prose prose-invert max-w-none">
            <p className="text-xl text-gray-300 leading-relaxed mb-6">
              We believe creating a professional resume shouldn't be complicated. Our platform combines 
              elegant design with powerful features to help you showcase your skills and experience effectively.
            </p>
            <p className="text-lg text-gray-400 leading-relaxed mb-6">
              Built with modern web technology, our resume builder offers a seamless experience from start 
              to finish. Whether you're a recent graduate or a seasoned professional, we provide the tools 
              you need to create a resume that makes an impact.
            </p>
            <p className="text-lg text-gray-400 leading-relaxed">
              Every template is carefully crafted to ensure your resume looks polished and professional, 
              helping you make the best first impression with potential employers.
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl border border-white/10 p-8 text-center hover:border-cyan-500/50 transition-all">
                <Icon className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <div className="text-2xl font-bold text-white mb-2">{feature.label}</div>
                <div className="text-gray-400">{feature.description}</div>
              </div>
            );
          })}
        </div>

        {/* Mission Section */}
        <div className="mt-12 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-xl rounded-2xl border border-cyan-500/30 p-8 md:p-12">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">Our Vision</h2>
          <p className="text-gray-300 text-lg leading-relaxed text-center max-w-3xl mx-auto">
            To empower everyone with the tools to create exceptional resumes that open doors to new 
            opportunities and help them achieve their career goals.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;