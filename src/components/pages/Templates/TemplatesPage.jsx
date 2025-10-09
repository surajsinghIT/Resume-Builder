import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { BUILDER } from '../../../utils/RouteList';

const TemplatesPage = () => {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const templates = [
    { id: 1, name: 'Modern Pro', style: 'modern', color: 'from-cyan-500 to-blue-500' },
    { id: 2, name: 'Minimal Elite', style: 'minimal', color: 'from-purple-500 to-pink-500' },
    { id: 3, name: 'Creative Bold', style: 'creative', color: 'from-orange-500 to-red-500' },
    { id: 4, name: 'Tech Savvy', style: 'tech', color: 'from-green-500 to-teal-500' },
    { id: 5, name: 'Executive', style: 'executive', color: 'from-indigo-500 to-purple-500' },
    { id: 6, name: 'Startup', style: 'startup', color: 'from-yellow-500 to-orange-500' }
  ];

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
    navigate(BUILDER, { state: { templateId } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">Choose Your Template</h1>
          <p className="text-gray-400 text-lg">Professional designs crafted for success</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <div 
              key={template.id} 
              className="group cursor-pointer" 
              onClick={() => handleTemplateSelect(template.id)}
            >
              <div className="relative overflow-hidden rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all">
                <div className={`h-96 bg-gradient-to-br ${template.color} opacity-20 group-hover:opacity-30 transition-opacity`}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{template.name}</h3>
                  <button className="px-6 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm hover:bg-white/30 transition-all flex items-center gap-2">
                    Use Template <ArrowRight size={16} />
                  </button>
                </div>
                <div className="absolute top-4 right-4 px-3 py-1 bg-cyan-500 text-white text-xs font-semibold rounded-full">
                  Popular
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplatesPage;