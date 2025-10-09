import React from 'react';
import { Sparkles } from 'lucide-react';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center animate-pulse">
          <Sparkles className="text-white" size={40} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-2xl blur-xl opacity-50 animate-ping"></div>
      </div>
      <p className="text-white text-lg font-semibold">Loading...</p>
    </div>
  );
};

export default Loader;
