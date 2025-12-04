import React from 'react';
import { Sparkles } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black/40 backdrop-blur-xl border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Sparkles className="text-white" size={20} />
            </div>
            <span className="text-xl font-bold text-white">Resume Builder</span>
          </div>
          <p className="text-gray-400 text-sm max-w-md">
            Create professional resumes with ease
          </p>
          <div className="pt-4 text-gray-400 text-sm">
            © 2025 Resume Builder. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;