import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  User,
  Briefcase,
  Plus,
  Save,
  Download,
  Eye,
  Trash2,
  GraduationCap,
  Award,
  RotateCcw,
  FolderGit2,
  Palette,
  X,
  Check,
  Sparkles,
} from "lucide-react";
import { DASHBOARD } from "../../../utils/RouteList";
import {
  updatePersonalInfo,
  updateExperiences,
  updateEducation,
  updateSkills,
  clearResumeData,
  saveResumesForDashboard,
  saveDownloadPdfCount,
  updateProjects,
} from "../../../Redux/slice/userSlice";
import Modal from "../../common/Modal";
import { pdf } from "@react-pdf/renderer";
import ResumePDF from "../../../components/pages/Builder/ResumePdf/ResumePdf";

const validateResumeData = (personalInfo, experiences, education, projects, skills) => {
  const errors = [];

  // Personal Info validation - all fields required
  if (!personalInfo.fullName?.trim()) errors.push("Full Name is required");
  if (!personalInfo.email?.trim()) errors.push("Email is required");
  if (!personalInfo.phone?.trim()) errors.push("Phone is required");
  if (!personalInfo.location?.trim()) errors.push("Location is required");

  // Experience validation
  if (!experiences || experiences.length === 0) {
    errors.push("At least one work experience is required");
  }

  // Education validation
  if (!education || education.length === 0) {
    errors.push("At least one education entry is required");
  }

  // Projects validation
  if (!projects || projects.length === 0) {
    errors.push("At least one project is required");
  }

  // Skills validation - minimum 3
  if (!skills || skills.length < 3) {
    errors.push(`At least 3 skills are required (currently ${skills?.length || 0})`);
  }

  return errors;
};

// Template Switcher Component (inline)
const TemplateSwitcher = ({ currentTemplateId, onTemplateChange, onClose }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(currentTemplateId);

  const templates = [
    {
      id: 1,
      name: "Professional Classic",
      color: "from-blue-500 to-cyan-500",
      borderColor: "border-blue-500",
      preview: {
        header: "bg-blue-50",
        border: "border-l-4 border-blue-500",
      }
    },
    {
      id: 2,
      name: "Modern Minimalist",
      color: "from-purple-500 to-pink-500",
      borderColor: "border-purple-500",
      preview: {
        header: "bg-gradient-to-r from-purple-50 to-pink-50",
        border: "border-l-4 border-purple-500",
      }
    },
    {
      id: 3,
      name: "Creative Designer",
      color: "from-orange-500 to-red-500",
      borderColor: "border-orange-500",
      preview: {
        header: "bg-gradient-to-br from-orange-50 to-red-50",
        border: "border-l-4 border-orange-500",
      }
    },
    {
      id: 4,
      name: "Tech Developer",
      color: "from-green-500 to-emerald-500",
      borderColor: "border-green-500",
      preview: {
        header: "bg-green-50",
        border: "border-l-4 border-green-500",
      }
    },
    {
      id: 5,
      name: "Academic Scholar",
      color: "from-indigo-500 to-blue-600",
      borderColor: "border-indigo-500",
      preview: {
        header: "bg-indigo-50",
        border: "border-l-4 border-indigo-500",
      }
    },
    {
      id: 6,
      name: "Executive Premium",
      color: "from-amber-500 to-yellow-600",
      borderColor: "border-amber-500",
      preview: {
        header: "bg-gradient-to-r from-amber-50 to-yellow-50",
        border: "border-l-4 border-amber-500",
      }
    }
  ];

  const handleApply = () => {
    onTemplateChange(selectedTemplate);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-2xl border border-white/20 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="text-cyan-400" size={24} />
            <h2 className="text-2xl font-bold text-white">Switch Template</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="text-gray-400 hover:text-white" size={24} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((template) => {
              const isSelected = selectedTemplate === template.id;
              const isCurrent = currentTemplateId === template.id;

              return (
                <div
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`
                    relative cursor-pointer group transition-all duration-300
                    ${isSelected ? 'scale-105' : 'scale-100 hover:scale-102'}
                  `}
                >
                  <div
                    className={`
                      relative bg-white/5 backdrop-blur-xl rounded-xl border-2 p-4
                      transition-all duration-300
                      ${isSelected 
                        ? `${template.borderColor} shadow-lg` 
                        : 'border-white/10 hover:border-white/30'
                      }
                    `}
                  >
                    {isSelected && (
                      <div className={`absolute -top-2 -right-2 bg-gradient-to-r ${template.color} rounded-full p-1.5 shadow-lg z-10`}>
                        <Check className="text-white" size={16} />
                      </div>
                    )}

                    {isCurrent && (
                      <div className="absolute top-2 left-2 bg-cyan-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                        CURRENT
                      </div>
                    )}

                    <div className="bg-white rounded-lg p-3 mb-3 h-32 overflow-hidden">
                      <div className={`${template.preview.header} rounded p-2 mb-2`}>
                        <div className="h-2 bg-gray-800 rounded w-2/3 mb-1"></div>
                        <div className="h-1 bg-gray-600 rounded w-1/2"></div>
                      </div>
                      <div className={`${template.preview.border} pl-2 mb-2`}>
                        <div className="h-1 bg-gray-300 rounded w-full mb-1"></div>
                        <div className="h-1 bg-gray-200 rounded w-4/5"></div>
                      </div>
                      <div className={`${template.preview.border} pl-2`}>
                        <div className="h-1 bg-gray-300 rounded w-3/4"></div>
                      </div>
                    </div>

                    <h3 className="text-white font-semibold text-sm text-center">
                      {template.name}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-6 border-t border-white/10 flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            disabled={selectedTemplate === currentTemplateId}
            className={`
              px-6 py-2.5 rounded-lg font-medium transition-all
              ${selectedTemplate === currentTemplateId
                ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                : 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:shadow-lg hover:shadow-purple-500/50'
              }
            `}
          >
            Apply Template
          </button>
        </div>
      </div>
    </div>
  );
};

// Template styles helper
const getTemplateStyles = (templateId) => {
  const configs = {
    1: {
      header: "bg-blue-50 border-b-4 border-blue-500",
      sectionTitle: "text-blue-600 border-b-2 border-blue-500 uppercase tracking-wide",
      sectionBorder: "border-l-4 border-blue-500 pl-4",
      skillBadge: "bg-blue-100 text-blue-700 border border-blue-300"
    },
    2: {
      header: "bg-gradient-to-r from-purple-50 to-pink-50 border-b-4 border-purple-500",
      sectionTitle: "text-purple-600 border-b-2 border-purple-500 uppercase font-black tracking-wider",
      sectionBorder: "border-l-4 border-purple-500 pl-4",
      skillBadge: "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border border-purple-300"
    },
    3: {
      header: "bg-gradient-to-br from-orange-50 to-red-50 border-b-4 border-orange-500",
      sectionTitle: "text-orange-600 border-b-2 border-orange-500 uppercase font-bold tracking-wide",
      sectionBorder: "border-l-4 border-orange-500 pl-4 bg-orange-50/30",
      skillBadge: "bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 border border-orange-300"
    },
    4: {
      header: "bg-green-50 border-b-4 border-green-500",
      sectionTitle: "text-green-600 border-b-2 border-green-500 uppercase font-mono tracking-wider",
      sectionBorder: "border-l-4 border-green-500 pl-4",
      skillBadge: "bg-green-100 text-green-800 border border-green-400 font-mono"
    },
    5: {
      header: "bg-indigo-50 border-b-4 border-indigo-500",
      sectionTitle: "text-indigo-700 border-b-2 border-indigo-500 uppercase tracking-wide font-serif",
      sectionBorder: "border-l-4 border-indigo-500 pl-4",
      skillBadge: "bg-indigo-100 text-indigo-700 border border-indigo-300"
    },
    6: {
      header: "bg-gradient-to-r from-amber-50 to-yellow-50 border-b-4 border-amber-500",
      sectionTitle: "text-amber-700 border-b-2 border-amber-500 uppercase tracking-widest font-bold",
      sectionBorder: "border-l-4 border-amber-500 pl-4 bg-amber-50/20",
      skillBadge: "bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border border-amber-400"
    }
  };
  return configs[templateId] || configs[1];
};

const BuilderPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const templateId = location.state?.templateId;

  const resumeData = useSelector((state) => state.resume.resumeData);
  const { personalInfo, experiences, education, skills, projects } = resumeData;

  const [showTemplateSwitcher, setShowTemplateSwitcher] = useState(false);
  const [currentTemplateId, setCurrentTemplateId] = useState(templateId || 1);

  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    type: "info",
    title: "",
    message: "",
    onConfirm: null,
    inputValue: "",
  });

  // Check if download button should be enabled
  const isDownloadEnabled = () => {
    return (
      personalInfo.fullName?.trim() &&
      personalInfo.email?.trim() &&
      personalInfo.phone?.trim() &&
      personalInfo.location?.trim() &&
      experiences?.length > 0 &&
      education?.length > 0 &&
      projects?.length > 0 &&
      skills?.length >= 3
    );
  };

  const closeModal = () => {
    setModalConfig({ ...modalConfig, isOpen: false, inputValue: "" });
  };

  const showSuccessModal = (message) => {
    setModalConfig({
      isOpen: true,
      type: "success",
      title: "Success!",
      message,
      onConfirm: closeModal,
    });
  };

  const showErrorModal = (message) => {
    setModalConfig({
      isOpen: true,
      type: "error",
      title: "Validation Failed",
      message,
      onConfirm: closeModal,
    });
  };

  const showConfirmModal = (message, onConfirm) => {
    setModalConfig({
      isOpen: true,
      type: "confirm",
      title: "Confirm Action",
      message,
      onConfirm: () => {
        onConfirm();
        closeModal();
      },
      onCancel: closeModal,
      confirmText: "Yes, Delete",
      cancelText: "Cancel",
    });
  };

  const showInputModal = (title, placeholder, onConfirm) => {
    setModalConfig({
      isOpen: true,
      type: "input",
      title,
      message: "",
      inputValue: "",
      inputPlaceholder: placeholder,
      onConfirm: () => {
        setModalConfig((prev) => {
          const value = prev.inputValue.trim();
          if (value) {
            onConfirm(value);
            closeModal();
          }
          return prev;
        });
      },
      onCancel: closeModal,
      confirmText: "Add",
      cancelText: "Cancel",
    });
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const handleTemplateChange = (newTemplateId) => {
    setCurrentTemplateId(newTemplateId);
    navigate(location.pathname, { 
      state: { templateId: newTemplateId },
      replace: true 
    });
  };

  const handlePersonalInfoChange = (field, value) => {
    dispatch(updatePersonalInfo({ [field]: value }));
  };

  const addExperience = () => {
    const newExperience = {
      id: Date.now(),
      title: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
    };
    dispatch(updateExperiences([...experiences, newExperience]));
  };

  const removeExperience = (id) => {
    showConfirmModal(
      "Are you sure you want to delete this experience entry?",
      () => {
        dispatch(updateExperiences(experiences.filter((exp) => exp.id !== id)));
        showSuccessModal("Experience deleted successfully!");
      }
    );
  };

  const updateExperience = (id, field, value) => {
    const updatedExperiences = experiences.map((exp) =>
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    dispatch(updateExperiences(updatedExperiences));
  };

  const addEducation = () => {
    const newEducation = {
      id: Date.now(),
      degree: "",
      school: "",
      year: "",
      description: "",
    };
    dispatch(updateEducation([...education, newEducation]));
  };

  const removeEducation = (id) => {
    showConfirmModal(
      "Are you sure you want to delete this education entry?",
      () => {
        dispatch(updateEducation(education.filter((edu) => edu.id !== id)));
        showSuccessModal("Education deleted successfully!");
      }
    );
  };

  const updateEducationEntry = (id, field, value) => {
    const updatedEducation = education.map((edu) =>
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    dispatch(updateEducation(updatedEducation));
  };

  const addSkill = () => {
    showInputModal(
      "Add Skill",
      "Enter skill name (e.g., JavaScript, React, etc.)",
      (skillName) => {
        dispatch(
          updateSkills([...skills, { id: Date.now(), name: skillName }])
        );
        showSuccessModal(`Skill "${skillName}" added successfully!`);
      }
    );
  };

  const removeSkill = (id) => {
    const skill = skills.find((s) => s.id === id);
    showConfirmModal(
      `Are you sure you want to remove "${skill.name}" from skills?`,
      () => {
        dispatch(updateSkills(skills.filter((skill) => skill.id !== id)));
        showSuccessModal("Skill removed successfully!");
      }
    );
  };

  const updateProject = (id, field, value) => {
    const updatedProjects = projects?.map((proj) =>
      proj.id === id ? { ...proj, [field]: value } : proj
    );
    dispatch(updateProjects(updatedProjects));
  };

  const removeProject = (id) => {
    showConfirmModal(
      "Are you sure you want to delete this project?",
      () => {
        dispatch(updateProjects(projects?.filter((proj) => proj.id !== id)));
        showSuccessModal("Project deleted successfully!");
      }
    );
  };

  const addProject = () => {
    const newProject = {
      id: Date.now(),
      name: "",
      technologies: "",
      link: "",
      description: "",
    };
    dispatch(updateProjects([...(projects || []), newProject]));
  };

  const hasAnyData = () => {
  return (
    personalInfo.fullName?.trim() ||
    personalInfo.email?.trim() ||
    personalInfo.phone?.trim() ||
    personalInfo.location?.trim() ||
    personalInfo.summary?.trim() ||
    experiences?.length > 0 ||
    education?.length > 0 ||
    projects?.length > 0 ||
    skills?.length > 0
  );
};

  const handleClearAll = () => {
    showConfirmModal(
      "Are you sure you want to clear all data? This action cannot be undone.",
      () => {
        dispatch(clearResumeData());
        showSuccessModal("All data cleared successfully!");
      }
    );
  };

  const handleSave = () => {
    console.log("Resume saved to Redux:", resumeData);
    
    dispatch(saveResumesForDashboard({ 
      resumeData, 
      templateId: currentTemplateId || 1 
    }));
    
    showSuccessModal("Resume saved successfully!");
    setTimeout(() => {
      navigate(DASHBOARD);
    }, 2000);
  };

  const handleDownload = async () => {
    // Validate resume data before download
    const errors = validateResumeData(personalInfo, experiences, education, projects, skills);
    
    if (errors.length > 0) {
      const errorMessage = "Please complete the following requirements:\n\n• " + errors.join("\n• ");
      showErrorModal(errorMessage);
      return;
    }

    try {
      const blob = await pdf(
        <ResumePDF
          personalInfo={personalInfo}
          experiences={experiences}
          education={education}
          skills={skills}
          projects={projects}
          templateId={currentTemplateId || 1}
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${personalInfo.fullName || "resume"}_Template${currentTemplateId || 1}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
      dispatch(saveDownloadPdfCount(1));
      showSuccessModal("Resume downloaded successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      showErrorModal("Failed to download resume. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Resume Builder
            </h1>
            <p className="text-gray-400">
              Fill in your details to create your professional resume
            </p>
            {currentTemplateId && (
              <div className="flex items-center gap-2 mt-2">
                <span className="text-cyan-400 text-sm">
                  Using Template #{currentTemplateId}
                </span>
                <button
                  onClick={() => setShowTemplateSwitcher(true)}
                  className="px-3 py-1 bg-cyan-500/20 border border-cyan-500 text-cyan-400 text-xs font-semibold rounded-lg hover:bg-cyan-500/30 transition-all flex items-center gap-1"
                >
                  <Palette size={14} />
                  Switch
                </button>
              </div>
            )}
          </div>
          <button
            onClick={handleClearAll}
            disabled={!hasAnyData()}
            className={`px-6 py-3 font-semibold rounded-lg transition-all flex items-center gap-2 ${
              hasAnyData()
                ? 'bg-red-500/20 border border-red-500 text-red-400 hover:bg-red-500/30 cursor-pointer'
                : 'bg-gray-500/20 border border-gray-500 text-gray-500 cursor-not-allowed opacity-50'
            }`}
            >
            <RotateCcw size={20} /> Clear All
            </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section - Keep all your existing form code */}
          <div className="space-y-6">
            {/* Personal Information */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
              <div className="flex items-center gap-3 mb-6">
                <User className="text-cyan-400" size={24} />
                <h2 className="text-2xl font-bold text-white">
                  Personal Information
                </h2>
              </div>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={personalInfo.fullName}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
                  onChange={(e) =>
                    handlePersonalInfoChange("fullName", e.target.value)
                  }
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={personalInfo.email}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
                  onChange={(e) =>
                    handlePersonalInfoChange("email", e.target.value)
                  }
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={personalInfo.phone}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
                  onChange={(e) =>
                    handlePersonalInfoChange("phone", e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={personalInfo.location}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
                  onChange={(e) =>
                    handlePersonalInfoChange("location", e.target.value)
                  }
                />
                <textarea
                  placeholder="Professional Summary"
                  rows="4"
                  value={personalInfo.summary}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
                  onChange={(e) =>
                    handlePersonalInfoChange("summary", e.target.value)
                  }
                ></textarea>
              </div>
            </div>

            {/* Experience Section */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Briefcase className="text-purple-400" size={24} />
                  <h2 className="text-2xl font-bold text-white">Experience</h2>
                </div>
                <button
                  onClick={addExperience}
                  className="p-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>

              {experiences.length === 0 ? (
                <div className="text-gray-400 text-center py-8">
                  Click + to add your work experience
                </div>
              ) : (
                <div className="space-y-4">
                  {experiences.map((exp) => (
                    <div
                      key={exp.id}
                      className="p-4 bg-white/5 rounded-lg border border-white/10 space-y-3"
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="text-white font-semibold">
                          Experience Entry
                        </h3>
                        <button
                          onClick={() => removeExperience(exp.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <input
                        type="text"
                        placeholder="Job Title"
                        value={exp.title}
                        onChange={(e) =>
                          updateExperience(exp.id, "title", e.target.value)
                        }
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 text-sm focus:border-cyan-500 focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Company Name"
                        value={exp.company}
                        onChange={(e) =>
                          updateExperience(exp.id, "company", e.target.value)
                        }
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 text-sm focus:border-cyan-500 focus:outline-none"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Start Date"
                          value={exp.startDate}
                          onChange={(e) =>
                            updateExperience(
                              exp.id,
                              "startDate",
                              e.target.value
                            )
                          }
                          className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 text-sm focus:border-cyan-500 focus:outline-none"
                        />
                        <input
                          type="text"
                          placeholder="End Date"
                          value={exp.endDate}
                          onChange={(e) =>
                            updateExperience(exp.id, "endDate", e.target.value)
                          }
                          className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 text-sm focus:border-cyan-500 focus:outline-none"
                        />
                      </div>
                      <textarea
                        placeholder="Description"
                        rows="3"
                        value={exp.description}
                        onChange={(e) =>
                          updateExperience(
                            exp.id,
                            "description",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 text-sm focus:border-cyan-500 focus:outline-none"
                      ></textarea>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Education Section */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <GraduationCap className="text-green-400" size={24} />
                  <h2 className="text-2xl font-bold text-white">Education</h2>
                </div>
                <button
                  onClick={addEducation}
                  className="p-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>

              {education.length === 0 ? (
                <div className="text-gray-400 text-center py-8">
                  Click + to add your education
                </div>
              ) : (
                <div className="space-y-4">
                  {education.map((edu) => (
                    <div
                      key={edu.id}
                      className="p-4 bg-white/5 rounded-lg border border-white/10 space-y-3"
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="text-white font-semibold">
                          Education Entry
                        </h3>
                        <button
                          onClick={() => removeEducation(edu.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <input
                        type="text"
                        placeholder="Degree"
                        value={edu.degree}
                        onChange={(e) =>
                          updateEducationEntry(edu.id, "degree", e.target.value)
                        }
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 text-sm focus:border-cyan-500 focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="School/University"
                        value={edu.school}
                        onChange={(e) =>
                          updateEducationEntry(edu.id, "school", e.target.value)
                        }
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 text-sm focus:border-cyan-500 focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Year"
                        value={edu.year}
                        onChange={(e) =>
                          updateEducationEntry(edu.id, "year", e.target.value)
                        }
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 text-sm focus:border-cyan-500 focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Projects Section - NEW */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <FolderGit2 className="text-pink-400" size={24} />
                  <h2 className="text-2xl font-bold text-white">Projects</h2>
                </div>
                <button
                  onClick={addProject}
                  className="p-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>

              {projects?.length === 0 ? (
                <div className="text-gray-400 text-center py-8">
                  Click + to add your projects
                </div>
              ) : (
                <div className="space-y-4">
                  {projects?.map((proj) => (
                    <div
                      key={proj.id}
                      className="p-4 bg-white/5 rounded-lg border border-white/10 space-y-3"
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="text-white font-semibold">
                          Project Entry
                        </h3>
                        <button
                          onClick={() => removeProject(proj.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <input
                        type="text"
                        placeholder="Project Name"
                        value={proj.name}
                        onChange={(e) =>
                          updateProject(proj.id, "name", e.target.value)
                        }
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 text-sm focus:border-cyan-500 focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Technologies Used (e.g., React, Node.js, MongoDB)"
                        value={proj.technologies}
                        onChange={(e) =>
                          updateProject(proj.id, "technologies", e.target.value)
                        }
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 text-sm focus:border-cyan-500 focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Project Link (GitHub, Live Demo, etc.)"
                        value={proj.link}
                        onChange={(e) =>
                          updateProject(proj.id, "link", e.target.value)
                        }
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 text-sm focus:border-cyan-500 focus:outline-none"
                      />
                      <textarea
                        placeholder="Project Description"
                        rows="3"
                        value={proj.description}
                        onChange={(e) =>
                          updateProject(proj.id, "description", e.target.value)
                        }
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 text-sm focus:border-cyan-500 focus:outline-none"
                      ></textarea>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Skills Section */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Award className="text-yellow-400" size={24} />
                  <h2 className="text-2xl font-bold text-white">Skills</h2>
                </div>
                <button
                  onClick={addSkill}
                  className="p-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>

              {skills.length === 0 ? (
                <div className="text-gray-400 text-center py-8">
                  Click + to add your skills
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <div
                      key={skill.id}
                      className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/50 rounded-full text-cyan-400 text-sm flex items-center gap-2"
                    >
                      {skill.name}
                      <button
                        onClick={() => removeSkill(skill.id)}
                        className="hover:text-red-400 font-bold"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleSave}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2"
              >
                <Save size={20} /> Save Draft
              </button>
              <button
                onClick={handleDownload}
                className="flex-1 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2"
              >
                <Download size={20} /> Download PDF
              </button>
            </div>
          </div>

          {/* Preview Section - Use currentTemplateId */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Live Preview</h2>
                <div className="flex items-center gap-3">
                  {currentTemplateId && (
                    <span className="text-cyan-400 text-sm font-semibold px-3 py-1 bg-cyan-500/10 rounded-full border border-cyan-500/30">
                      Template #{currentTemplateId}
                    </span>
                  )}
                  <Eye className="text-cyan-400" size={24} />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-2xl overflow-auto max-h-[800px] custom-scrollbar">
                {(() => {
                  const template = getTemplateStyles(currentTemplateId || 1);

                  return (
                    <>
                     <div className="lg:sticky lg:top-24 h-fit">
                       <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
                         <div className="flex items-center justify-between mb-6">
                           <h2 className="text-2xl font-bold text-white">Live Preview</h2>
                           <div className="flex items-center gap-3">
                             {templateId && (
                               <span className="text-cyan-400 text-sm font-semibold px-3 py-1 bg-cyan-500/10 rounded-full border border-cyan-500/30">
                                 Template #{templateId}
                               </span>
                             )}
                             <Eye className="text-cyan-400" size={24} />
                           </div>
                         </div>
                         <div className="bg-white rounded-lg shadow-2xl overflow-auto max-h-[800px] custom-scrollbar">
                           {(() => {
                             const template = getTemplateStyles(templateId || 1);
                     
                             return (
                               <>
                                 {/* Header */}
                                 <div className={`${template.header} p-10 text-center`}>
                                   <h3 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                                     {personalInfo.fullName || "Your Name"}
                                   </h3>
                                   <div className="flex items-center justify-center gap-3 text-gray-600 text-base flex-wrap">
                                     <span className="flex items-center gap-1">
                                       📧 {personalInfo.email || "email@example.com"}
                                     </span>
                                     <span className="text-gray-400">•</span>
                                     <span className="flex items-center gap-1">
                                       📱 {personalInfo.phone || "+1234567890"}
                                     </span>
                                     {personalInfo.location && (
                                       <>
                                         <span className="text-gray-400">•</span>
                                         <span className="flex items-center gap-1">
                                           📍 {personalInfo.location}
                                         </span>
                                       </>
                                     )}
                                   </div>
                                 </div>
                     
                                 <div className="p-10 space-y-8">
                                   {/* Summary */}
                                   {personalInfo.summary && (
                                     <div>
                                       <h4 className={`${template.sectionTitle} text-xl font-extrabold mb-4 pb-2`}>
                                         Professional Summary
                                       </h4>
                                       <p className="text-gray-700 text-base leading-relaxed">
                                         {personalInfo.summary}
                                       </p>
                                     </div>
                                   )}
                     
                                   {/* Experience */}
                                   {experiences.length > 0 && (
                                     <div>
                                       <h4 className={`${template.sectionTitle} text-xl font-extrabold mb-4 pb-2`}>
                                         Work Experience
                                       </h4>
                                       <div className="space-y-5">
                                         {experiences.map((exp) => (
                                           <div key={exp.id} className={`${template.sectionBorder} py-2 relative`}>
                                             <div className="flex justify-between items-start mb-2">
                                               <h5 className="font-bold text-gray-900 text-lg">
                                                 {exp.title || "Job Title"}
                                               </h5>
                                               <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded whitespace-nowrap ml-2">
                                                 {exp.startDate && exp.endDate ? `${exp.startDate} - ${exp.endDate}` : "Duration"}
                                               </span>
                                             </div>
                                             <p className="text-base font-semibold text-gray-700 mb-2">
                                               {exp.company || "Company"}
                                             </p>
                                             {exp.description && (
                                               <p className="text-sm text-gray-600 leading-relaxed">
                                                 {exp.description}
                                               </p>
                                             )}
                                           </div>
                                         ))}
                                       </div>
                                     </div>
                                   )}
                     
                                   {/* Education */}
                                   {education.length > 0 && (
                                     <div>
                                       <h4 className={`${template.sectionTitle} text-xl font-extrabold mb-4 pb-2`}>
                                         Education
                                       </h4>
                                       <div className="space-y-4">
                                         {education.map((edu) => (
                                           <div key={edu.id} className={`${template.sectionBorder} py-2`}>
                                             <div className="flex justify-between items-start mb-1">
                                               <h5 className="font-bold text-gray-900 text-base">
                                                 {edu.degree || "Degree"}
                                               </h5>
                                               {edu.year && (
                                                 <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded ml-2">
                                                   {edu.year}
                                                 </span>
                                               )}
                                             </div>
                                             <p className="text-sm font-medium text-gray-700">
                                               {edu.school || "School"}
                                             </p>
                                           </div>
                                         ))}
                                       </div>
                                     </div>
                                   )}
                     
                                   {/* Projects */}
                                   {projects?.length > 0 && (
                                     <div>
                                       <h4 className={`${template.sectionTitle} text-xl font-extrabold mb-4 pb-2`}>
                                         Projects
                                       </h4>
                                       <div className="space-y-5">
                                         {projects.map((proj) => (
                                           <div key={proj.id} className={`${template.sectionBorder} py-2 relative`}>
                                             <div className="flex justify-between items-start mb-2">
                                               <h5 className="font-bold text-gray-900 text-lg">
                                                 {proj.name || "Project Name"}
                                               </h5>
                                               {proj.link && (
                                                 <a 
                                                   href={proj.link} 
                                                   target="_blank" 
                                                   rel="noopener noreferrer"
                                                   className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200 hover:bg-blue-100 hover:border-blue-300 hover:scale-105 transition-all shadow-sm ml-2 whitespace-nowrap"
                                                 >
                                                   <span>🔗</span>
                                                   <span>VIEW</span>
                                                 </a>
                                               )}
                                             </div>
                                             
                                             {proj.technologies && (
                                               <div className="mb-2">
                                                 <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Tech Stack:</span>
                                                 <p className="text-sm font-medium text-gray-700 mt-0.5">
                                                   {proj.technologies}
                                                 </p>
                                               </div>
                                             )}
                     
                                             {proj.description && (
                                               <p className="text-sm text-gray-600 leading-relaxed mt-2">
                                                 {proj.description}
                                               </p>
                                             )}
                                           </div>
                                         ))}
                                       </div>
                                     </div>
                                   )}
                     
                                   {/* Skills */}
                                   {skills.length > 0 && (
                                     <div>
                                       <h4 className={`${template.sectionTitle} text-xl font-extrabold mb-4 pb-2`}>
                                         Skills & Technologies
                                       </h4>
                                       <div className="flex flex-wrap gap-2.5">
                                         {skills.map((skill) => (
                                           <span
                                             key={skill.id}
                                             className={`${template.skillBadge} px-4 py-2 rounded-lg text-sm font-semibold shadow-sm hover:shadow-md transition-shadow`}
                                           >
                                             {skill.name}
                                           </span>
                                         ))}
                                       </div>
                                     </div>
                                   )}
                     
                                   {!personalInfo.fullName &&
                                     experiences.length === 0 &&
                                     education.length === 0 &&
                                     skills.length === 0 &&
                                     projects?.length === 0 && (
                                       <div className="text-gray-400 text-center py-16">
                                         <div className="text-6xl mb-4">📝</div>
                                         <p className="text-lg font-medium">Your resume preview will appear here</p>
                                         <p className="text-sm mt-2">Start filling in the form to see your resume come to life</p>
                                       </div>
                                     )}
                                 </div>
                               </>
                             );
                           })()}
                         </div>
                       </div>
                     </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Component */}
      <Modal
        isOpen={modalConfig.isOpen}
        onClose={closeModal}
        title={modalConfig.title}
        message={modalConfig.message}
        type={modalConfig.type}
        onConfirm={modalConfig.onConfirm}
        onCancel={modalConfig.onCancel}
        confirmText={modalConfig.confirmText}
        cancelText={modalConfig.cancelText}
        inputValue={modalConfig.inputValue}
        onInputChange={(e) =>
          setModalConfig({ ...modalConfig, inputValue: e.target.value })
        }
        inputPlaceholder={modalConfig.inputPlaceholder}
      />

      {/* Template Switcher Modal */}
      {showTemplateSwitcher && (
        <TemplateSwitcher
          currentTemplateId={currentTemplateId}
          onTemplateChange={handleTemplateChange}
          onClose={() => setShowTemplateSwitcher(false)}
        />
      )}
    </div>
  );
};

export default BuilderPage;