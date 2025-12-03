import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Sparkles, Briefcase, GraduationCap, Code, Palette, Zap, Crown } from 'lucide-react';

const TemplateSelector = () => {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [hoveredTemplate, setHoveredTemplate] = useState(null);

  const templates = [
    {
      id: 1,
      name: "Professional Classic",
      description: "Clean and traditional design perfect for corporate roles",
      icon: Briefcase,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
      textColor: "text-blue-400",
      features: ["ATS-Friendly", "Clean Layout", "Professional"],
      preview: {
        header: "bg-blue-50",
        sections: "border-l-4 border-blue-500",
        accent: "bg-blue-500"
      }
    },
    {
      id: 2,
      name: "Modern Minimalist",
      description: "Sleek and contemporary with bold typography",
      icon: Zap,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
      textColor: "text-purple-400",
      features: ["Modern Design", "Bold Headers", "Minimalist"],
      preview: {
        header: "bg-gradient-to-r from-purple-50 to-pink-50",
        sections: "border-l-4 border-purple-500",
        accent: "bg-purple-500"
      }
    },
    {
      id: 3,
      name: "Creative Designer",
      description: "Vibrant and artistic layout for creative professionals",
      icon: Palette,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/30",
      textColor: "text-orange-400",
      features: ["Creative Layout", "Colorful", "Eye-catching"],
      preview: {
        header: "bg-gradient-to-br from-orange-50 to-red-50",
        sections: "border-l-4 border-orange-500",
        accent: "bg-gradient-to-r from-orange-500 to-red-500"
      }
    },
    {
      id: 4,
      name: "Tech Developer",
      description: "Code-inspired design for software engineers and developers",
      icon: Code,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
      textColor: "text-green-400",
      features: ["Tech-Focused", "Dark Accents", "Modern"],
      preview: {
        header: "bg-green-50",
        sections: "border-l-4 border-green-500",
        accent: "bg-green-500"
      }
    },
    {
      id: 5,
      name: "Academic Scholar",
      description: "Formal and detailed layout ideal for academic positions",
      icon: GraduationCap,
      color: "from-indigo-500 to-blue-600",
      bgColor: "bg-indigo-500/10",
      borderColor: "border-indigo-500/30",
      textColor: "text-indigo-400",
      features: ["Detailed", "Academic", "Traditional"],
      preview: {
        header: "bg-indigo-50",
        sections: "border-l-4 border-indigo-500",
        accent: "bg-indigo-500"
      }
    },
    {
      id: 6,
      name: "Executive Premium",
      description: "Sophisticated design for senior-level positions",
      icon: Crown,
      color: "from-amber-500 to-yellow-600",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/30",
      textColor: "text-amber-400",
      features: ["Premium", "Executive", "Sophisticated"],
      preview: {
        header: "bg-gradient-to-r from-amber-50 to-yellow-50",
        sections: "border-l-4 border-amber-500",
        accent: "bg-gradient-to-r from-amber-500 to-yellow-600"
      }
    }
  ];

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
  };

  const handleContinue = () => {
    if (selectedTemplate) {
      // Navigate to builder with selected template
      navigate('/builder', { state: { templateId: selectedTemplate } });
    }
  };

  const MiniPreview = ({ template }) => (
    <div className="bg-white rounded-lg p-3 h-48 overflow-hidden shadow-inner">
      <div className={`${template.preview.header} rounded p-2 mb-2`}>
        <div className="h-2 bg-gray-800 rounded w-2/3 mb-1"></div>
        <div className="h-1 bg-gray-600 rounded w-1/2"></div>
      </div>
      
      <div className="space-y-2">
        <div className={`${template.preview.sections} pl-2`}>
          <div className="h-1.5 bg-gray-300 rounded w-1/4 mb-1"></div>
          <div className="h-1 bg-gray-200 rounded w-full mb-0.5"></div>
          <div className="h-1 bg-gray-200 rounded w-4/5"></div>
        </div>
        
        <div className={`${template.preview.sections} pl-2`}>
          <div className="h-1.5 bg-gray-300 rounded w-1/3 mb-1"></div>
          <div className="h-1 bg-gray-200 rounded w-full mb-0.5"></div>
          <div className="h-1 bg-gray-200 rounded w-3/4"></div>
        </div>
        
        <div className={`${template.preview.sections} pl-2`}>
          <div className="h-1.5 bg-gray-300 rounded w-1/4 mb-1"></div>
          <div className="flex gap-1 mt-1">
            <div className="h-4 w-12 bg-gray-200 rounded-full"></div>
            <div className="h-4 w-12 bg-gray-200 rounded-full"></div>
            <div className="h-4 w-12 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4">
      <div className="max-w-7xl mx-auto" style={{marginTop:"60px"}}>
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="text-cyan-400 animate-pulse" size={32} />
            <h1 className="text-5xl font-bold text-white">Choose Your Template</h1>
            <Sparkles className="text-purple-400 animate-pulse" size={32} />
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Select a professionally designed template that matches your style and industry.
            All templates are ATS-friendly and fully customizable.
          </p>
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => {
            const Icon = template.icon;
            const isSelected = selectedTemplate === template.id;
            const isHovered = hoveredTemplate === template.id;

            return (
              <div
                key={template.id}
                onMouseEnter={() => setHoveredTemplate(template.id)}
                onMouseLeave={() => setHoveredTemplate(null)}
                onClick={() => handleTemplateSelect(template.id)}
                className={`
                  relative group cursor-pointer transition-all duration-300 transform
                  ${isHovered ? 'scale-105' : 'scale-100'}
                  ${isSelected ? 'scale-105' : ''}
                `}
              >
                <div
                  className={`
                    relative bg-white/5 backdrop-blur-xl rounded-2xl border-2 
                    p-6 transition-all duration-300 overflow-hidden
                    ${isSelected 
                      ? `${template.borderColor} border-opacity-100 shadow-2xl` 
                      : 'border-white/10 hover:border-white/30'
                    }
                  `}
                >
                  {/* Selection Indicator */}
                  {isSelected && (
                    <div className={`absolute top-4 right-4 bg-gradient-to-r ${template.color} rounded-full p-2 shadow-lg animate-bounce`}>
                      <Check className="text-white" size={20} />
                    </div>
                  )}

                  {/* Glow Effect on Hover */}
                  {(isHovered || isSelected) && (
                    <div className={`absolute inset-0 bg-gradient-to-r ${template.color} opacity-10 rounded-2xl`}></div>
                  )}

                  {/* Icon Header */}
                  <div className="flex items-center gap-3 mb-4 relative z-10">
                    <div className={`p-3 ${template.bgColor} rounded-xl`}>
                      <Icon className={template.textColor} size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white">{template.name}</h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-sm mb-4 relative z-10">
                    {template.description}
                  </p>

                  {/* Mini Preview */}
                  <div className="mb-4 relative z-10">
                    <MiniPreview template={template} />
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4 relative z-10">
                    {template.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className={`px-3 py-1 ${template.bgColor} ${template.borderColor} border rounded-full text-xs ${template.textColor} font-medium`}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Select Button */}
                  <button
                    className={`
                      w-full py-3 rounded-lg font-semibold transition-all duration-300 relative z-10
                      ${isSelected
                        ? `bg-gradient-to-r ${template.color} text-white shadow-lg`
                        : 'bg-white/10 text-white hover:bg-white/20'
                      }
                    `}
                  >
                    {isSelected ? 'Selected' : 'Use This Template'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Continue Button */}
        {selectedTemplate && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
            <button 
              onClick={handleContinue}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all flex items-center gap-3 text-lg"
            >
              Continue with Selected Template
              <Sparkles size={20} />
            </button>
          </div>
        )}

        {/* Info Banner */}
        <div className="mt-12 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 text-center">
          <p className="text-gray-300">
            <span className="font-semibold text-cyan-400">Pro Tip:</span> All templates are fully customizable. 
            You can change colors, fonts, and layouts after selection.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;