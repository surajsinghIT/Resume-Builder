import React from 'react';
import { Target, Users, Award } from 'lucide-react';

const AboutPage = () => {
  const stats = [
    { value: '100K+', label: 'Users Worldwide', icon: Users },
    { value: '500K+', label: 'Resumes Created', icon: Target },
    { value: '98%', label: 'Satisfaction Rate', icon: Award }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">About Us</h1>
          <p className="text-gray-400 text-lg">Empowering job seekers with cutting-edge technology</p>
        </div>

        {/* Main Content */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 md:p-12 mb-12">
          <div className="prose prose-invert max-w-none">
            <p className="text-xl text-gray-300 leading-relaxed mb-6">
              We're on a mission to revolutionize the way people create and manage their professional resumes. 
              Our AI-powered platform combines beautiful design with intelligent automation to help you land your dream job.
            </p>
            <p className="text-lg text-gray-400 leading-relaxed mb-6">
              Founded in 2024, our team consists of career experts, designers, and engineers who understand the 
              challenges of job hunting in the modern world. We've helped over 100,000 professionals create 
              resumes that get results.
            </p>
            <p className="text-lg text-gray-400 leading-relaxed">
              Our platform leverages the latest in artificial intelligence and design technology to provide 
              personalized recommendations, ensuring every resume we help create is optimized for both human 
              recruiters and applicant tracking systems.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl border border-white/10 p-8 text-center hover:border-cyan-500/50 transition-all">
                <Icon className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Mission Section */}
        <div className="mt-12 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-xl rounded-2xl border border-cyan-500/30 p-8 md:p-12">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">Our Mission</h2>
          <p className="text-gray-300 text-lg leading-relaxed text-center max-w-3xl mx-auto">
            To democratize access to professional resume building tools and empower every job seeker 
            with the resources they need to succeed in their career journey.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;