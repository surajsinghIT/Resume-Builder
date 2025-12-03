import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Download,
  Eye,
  Edit3,
  Trash2,
  Plus,
  X,
} from "lucide-react";
import { BUILDER } from "../../../utils/RouteList";
import { useDispatch, useSelector } from "react-redux";
import { 
  updateEducation, 
  updateExperiences, 
  updatePersonalInfo, 
  updateProjects, 
  updateSkills,
  setCurrentEditingResume,
  deleteResume,
  clearResumeData,
  saveDownloadPdfCount
} from "../../../Redux/slice/userSlice";
import { pdf } from "@react-pdf/renderer";
import ResumePDF from "../../../components/pages/Builder/ResumePdf/ResumePdf";
import Modal from "../../common/Modal";

// Template styles helper (same as BuilderPage)
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

// Preview Modal Component
const PreviewModal = ({ resume, onClose }) => {
  if (!resume) return null;

  const template = getTemplateStyles(resume?.templateId || 1);
  const { personalInfo, experiences, education, skills, projects } = resume;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-2xl border border-white/20 shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Resume Preview</h2>
            <p className="text-gray-400 text-sm mt-1">
              {personalInfo?.fullName || "Untitled Resume"} - Template #{resume?.templateId || 1}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="text-gray-400 hover:text-white" size={24} />
          </button>
        </div>

        {/* Preview Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
          <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
            {/* Header */}
            <div className={`${template.header} p-10 text-center`}>
              <h3 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                {personalInfo?.fullName || "Your Name"}
              </h3>
              <div className="flex items-center justify-center gap-3 text-gray-600 text-base flex-wrap">
                <span className="flex items-center gap-1">
                  📧 {personalInfo?.email || "email@example.com"}
                </span>
                <span className="text-gray-400">•</span>
                <span className="flex items-center gap-1">
                  📱 {personalInfo?.phone || "+1234567890"}
                </span>
                {personalInfo?.location && (
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
              {personalInfo?.summary && (
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
              {experiences?.length > 0 && (
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
              {education?.length > 0 && (
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
              {skills?.length > 0 && (
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

              {!personalInfo?.fullName &&
                (!experiences || experiences.length === 0) &&
                (!education || education.length === 0) &&
                (!skills || skills.length === 0) &&
                (!projects || projects.length === 0) && (
                  <div className="text-gray-400 text-center py-16">
                    <div className="text-6xl mb-4">📝</div>
                    <p className="text-lg font-medium">No content available</p>
                    <p className="text-sm mt-2">This resume appears to be empty</p>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardPage = () => {
  const { downloadPdfCount, resumeForDashboard } = useSelector(
    (state) => state.resume
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    type: "info",
    title: "",
    message: "",
    onConfirm: null,
  });

  const [previewResume, setPreviewResume] = useState(null);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const closeModal = () => {
    setModalConfig({ ...modalConfig, isOpen: false });
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

  const handleEdit = (resume) => {
    console.log("Editing resume:", resume);
    
    // Set the ID of the resume being edited
    dispatch(setCurrentEditingResume(resume.id));
    
    // Load resume data into the builder
    dispatch(updatePersonalInfo(resume?.personalInfo));
    dispatch(updateExperiences(resume?.experiences || []));
    dispatch(updateEducation(resume?.education || []));
    dispatch(updateProjects(resume?.projects || []));
    dispatch(updateSkills(resume?.skills || []));
    
    // Navigate with template ID
    navigate(BUILDER, { 
      state: { templateId: resume?.templateId || 1 } 
    });
  };

  const handleDelete = (resume) => {
    showConfirmModal(
      `Are you sure you want to delete "${resume?.personalInfo?.fullName || 'Untitled Resume'}"? This action cannot be undone.`,
      () => {
        dispatch(deleteResume(resume.id));
        showSuccessModal("Resume deleted successfully!");
      }
    );
  };

  const handleDownload = async (resume) => {
    try {
      // Generate PDF with the resume's original template
      const blob = await pdf(
        <ResumePDF
          personalInfo={resume?.personalInfo}
          experiences={resume?.experiences || []}
          education={resume?.education || []}
          skills={resume?.skills || []}
          projects={resume?.projects || []}
          templateId={resume?.templateId || 1}
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${resume?.personalInfo?.fullName || "resume"}_Template${resume?.templateId || 1}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
      
      dispatch(saveDownloadPdfCount(1));
      showSuccessModal("Resume downloaded successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      showSuccessModal("Failed to download resume. Please try again.");
    }
  };

  const handleCreateNew = () => {
    // Clear editing state and resume data for a fresh start
    dispatch(setCurrentEditingResume(null));
    dispatch(clearResumeData());
    navigate(BUILDER);
  };

  const handlePreview = (resume) => {
    setPreviewResume(resume);
  };

  const closePreview = () => {
    setPreviewResume(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">My Dashboard</h1>
          <p className="text-gray-400">
            Manage your resumes and track your progress
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Total Resumes", value: resumeForDashboard?.length || 0, icon: FileText },
            { label: "Downloads", value: downloadPdfCount, icon: Download },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:border-cyan-500/50 transition-all"
              >
                <Icon className="text-cyan-400 mb-4" size={32} />
                <div className="text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Resumes List */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">Drafts</h2>
            <button
              onClick={handleCreateNew}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2"
            >
              <Plus size={20} /> New Resume
            </button>
          </div>
          <div className="space-y-4">
            {resumeForDashboard?.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📄</div>
                <p className="text-gray-400 text-lg mb-2">No resumes yet</p>
                <p className="text-gray-500 text-sm">Click "New Resume" to create your first resume</p>
              </div>
            ) : (
              resumeForDashboard?.map((resume) => (
                <div
                  key={resume.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-white/5 rounded-xl border border-white/10 hover:border-cyan-500/50 transition-all group gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">
                        {resume?.personalInfo?.fullName || "Untitled Resume"}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-gray-400 text-sm">
                          Last edited {resume?.lastEdited || "recently"}
                        </p>
                        {resume?.templateId && (
                          <>
                            <span className="text-gray-500">•</span>
                            <span className="text-cyan-400 text-xs font-semibold bg-cyan-500/10 px-2 py-0.5 rounded">
                              Template #{resume.templateId}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <button 
                      onClick={() => handlePreview(resume)}
                      className="p-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors"
                      title="Preview"
                    >
                      <Eye size={20} />
                    </button>
                    <button
                      onClick={() => handleEdit(resume)}
                      className="p-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors"
                      title="Edit"
                    >
                      <Edit3 size={20} />
                    </button>
                    <button 
                      onClick={() => handleDownload(resume)}
                      className="p-2 bg-pink-500/20 text-pink-400 rounded-lg hover:bg-pink-500/30 transition-colors"
                      title="Download"
                    >
                      <Download size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(resume)}
                      className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))
            )}
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
      />

      {/* Preview Modal */}
      {previewResume && (
        <PreviewModal 
          resume={previewResume} 
          onClose={closePreview} 
        />
      )}
    </div>
  );
};

export default DashboardPage;