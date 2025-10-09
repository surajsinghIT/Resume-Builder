import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { User, Briefcase, Plus, Save, Download, Eye, Trash2, GraduationCap, Award, RotateCcw } from 'lucide-react';
import { DASHBOARD } from '../../../utils/RouteList';
import { 
  updatePersonalInfo, 
  updateExperiences, 
  updateEducation, 
  updateSkills,
  clearResumeData,
  saveResumesForDashboard,
  saveDownloadPdfCount
} from '../../../Redux/slice/userSlice';
import Modal from "../../common/Modal";
import { pdf } from '@react-pdf/renderer';
import ResumePDF from '../../../components/pages/Builder/ResumePdf/ResumePdf';

const BuilderPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const templateId = location.state?.templateId;

  // Get data from Redux store
  const resumeData = useSelector((state) => state.resume.resumeData);
  const { personalInfo, experiences, education, skills } = resumeData;

  // Modal state
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    type: 'info',
    title: '',
    message: '',
    onConfirm: null,
    inputValue: ''
  });

  // Close modal
  const closeModal = () => {
    setModalConfig({ ...modalConfig, isOpen: false, inputValue: '' });
  };

  // Show success modal
  const showSuccessModal = (message) => {
    setModalConfig({
      isOpen: true,
      type: 'success',
      title: 'Success!',
      message,
      onConfirm: closeModal
    });
  };

  // Show confirm modal
  const showConfirmModal = (message, onConfirm) => {
    setModalConfig({
      isOpen: true,
      type: 'confirm',
      title: 'Confirm Action',
      message,
      onConfirm: () => {
        onConfirm();
        closeModal();
      },
      onCancel: closeModal,
      confirmText: 'Yes, Delete',
      cancelText: 'Cancel'
    });
  };

  // Show input modal
  // ✅ FIXED version
const showInputModal = (title, placeholder, onConfirm) => {
  setModalConfig({
    isOpen: true,
    type: 'input',
    title,
    message: '',
    inputValue: '',
    inputPlaceholder: placeholder,
    onConfirm: () => {
      // use the current state at confirm time
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
    confirmText: 'Add',
    cancelText: 'Cancel'
  });
};


  // Personal Info handlers
  const handlePersonalInfoChange = (field, value) => {
    dispatch(updatePersonalInfo({ [field]: value }));
  };

  // Experience handlers
  const addExperience = () => {
    const newExperience = {
      id: Date.now(),
      title: '',
      company: '',
      startDate: '',
      endDate: '',
      description: ''
    };
    dispatch(updateExperiences([...experiences, newExperience]));
    // showSuccessModal('Experience entry added successfully!');
  };

  const removeExperience = (id) => {
    showConfirmModal(
      'Are you sure you want to delete this experience entry?',
      () => {
        dispatch(updateExperiences(experiences.filter(exp => exp.id !== id)));
        showSuccessModal('Experience deleted successfully!');
      }
    );
  };

  const updateExperience = (id, field, value) => {
    const updatedExperiences = experiences.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    dispatch(updateExperiences(updatedExperiences));
  };

  // Education handlers
  const addEducation = () => {
    const newEducation = {
      id: Date.now(),
      degree: '',
      school: '',
      year: '',
      description: ''
    };
    dispatch(updateEducation([...education, newEducation]));
    // showSuccessModal('Education entry added successfully!');
  };

  const removeEducation = (id) => {
    showConfirmModal(
      'Are you sure you want to delete this education entry?',
      () => {
        dispatch(updateEducation(education.filter(edu => edu.id !== id)));
        showSuccessModal('Education deleted successfully!');
      }
    );
  };

  const updateEducationEntry = (id, field, value) => {
    const updatedEducation = education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    dispatch(updateEducation(updatedEducation));
  };

  // Skills handlers
  const addSkill = () => {
    showInputModal(
      'Add Skill',
      'Enter skill name (e.g., JavaScript, React, etc.)',
      (skillName) => {
        dispatch(updateSkills([...skills, { id: Date.now(), name: skillName }]));
        showSuccessModal(`Skill "${skillName}" added successfully!`);
      }
    );
  };

  const removeSkill = (id) => {
    const skill = skills.find(s => s.id === id);
    showConfirmModal(
      `Are you sure you want to remove "${skill.name}" from skills?`,
      () => {
        dispatch(updateSkills(skills.filter(skill => skill.id !== id)));
        showSuccessModal('Skill removed successfully!');
      }
    );
  };

  // Clear all data
  const handleClearAll = () => {
    showConfirmModal(
      'Are you sure you want to clear all data? This action cannot be undone.',
      () => {
        dispatch(clearResumeData());
        showSuccessModal('All data cleared successfully!');
      }
    );
  };

  // Save handler
  const handleSave = () => {
    console.log('Resume saved to Redux:', resumeData);
    dispatch(saveResumesForDashboard([resumeData]))
    showSuccessModal('Resume saved successfully to your browser!');
    setTimeout(()=>{
    navigate(DASHBOARD);
    },2000)
  };

  // Download handler
  const handleDownload = async () => {
  try {
    let count = 0;
    const blob = await pdf(
      <ResumePDF 
        personalInfo={personalInfo} 
        experiences={experiences} 
        education={education} 
        skills={skills} 
      />
    ).toBlob();

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${personalInfo.fullName || 'resume'}.pdf`;
    link.click();
    URL.revokeObjectURL(url);
    dispatch(saveDownloadPdfCount(count = count + 1))
    showSuccessModal('Resume downloaded successfully!');
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Resume Builder</h1>
            <p className="text-gray-400">Fill in your details to create your professional resume</p>
            {templateId && <p className="text-cyan-400 text-sm mt-2">Using Template #{templateId}</p>}
          </div>
          <button
            onClick={handleClearAll}
            className="px-6 py-3 bg-red-500/20 border border-red-500 text-red-400 font-semibold rounded-lg hover:bg-red-500/30 transition-all flex items-center gap-2"
          >
            <RotateCcw size={20} /> Clear All
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            {/* Personal Information */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
              <div className="flex items-center gap-3 mb-6">
                <User className="text-cyan-400" size={24} />
                <h2 className="text-2xl font-bold text-white">Personal Information</h2>
              </div>
              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  value={personalInfo.fullName}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none" 
                  onChange={(e) => handlePersonalInfoChange('fullName', e.target.value)} 
                />
                <input 
                  type="email" 
                  placeholder="Email" 
                  value={personalInfo.email}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none" 
                  onChange={(e) => handlePersonalInfoChange('email', e.target.value)} 
                />
                <input 
                  type="tel" 
                  placeholder="Phone" 
                  value={personalInfo.phone}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none" 
                  onChange={(e) => handlePersonalInfoChange('phone', e.target.value)} 
                />
                <input 
                  type="text" 
                  placeholder="Location" 
                  value={personalInfo.location}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none" 
                  onChange={(e) => handlePersonalInfoChange('location', e.target.value)} 
                />
                <textarea 
                  placeholder="Professional Summary" 
                  rows="4" 
                  value={personalInfo.summary}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none" 
                  onChange={(e) => handlePersonalInfoChange('summary', e.target.value)}
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
                    <div key={exp.id} className="p-4 bg-white/5 rounded-lg border border-white/10 space-y-3">
                      <div className="flex justify-between items-start">
                        <h3 className="text-white font-semibold">Experience Entry</h3>
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
                        onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 text-sm focus:border-cyan-500 focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Company Name"
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 text-sm focus:border-cyan-500 focus:outline-none"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Start Date"
                          value={exp.startDate}
                          onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                          className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 text-sm focus:border-cyan-500 focus:outline-none"
                        />
                        <input
                          type="text"
                          placeholder="End Date"
                          value={exp.endDate}
                          onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                          className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 text-sm focus:border-cyan-500 focus:outline-none"
                        />
                      </div>
                      <textarea
                        placeholder="Description"
                        rows="3"
                        value={exp.description}
                        onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
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
                    <div key={edu.id} className="p-4 bg-white/5 rounded-lg border border-white/10 space-y-3">
                      <div className="flex justify-between items-start">
                        <h3 className="text-white font-semibold">Education Entry</h3>
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
                        onChange={(e) => updateEducationEntry(edu.id, 'degree', e.target.value)}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 text-sm focus:border-cyan-500 focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="School/University"
                        value={edu.school}
                        onChange={(e) => updateEducationEntry(edu.id, 'school', e.target.value)}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 text-sm focus:border-cyan-500 focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Year"
                        value={edu.year}
                        onChange={(e) => updateEducationEntry(edu.id, 'year', e.target.value)}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 text-sm focus:border-cyan-500 focus:outline-none"
                      />
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

          {/* Preview Section */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Live Preview</h2>
                <Eye className="text-cyan-400" size={24} />
              </div>
              <div className="bg-white rounded-lg p-8 min-h-[600px] shadow-2xl overflow-auto max-h-[800px]">
                {/* Header */}
                <div className="text-center mb-6 pb-6 border-b-2 border-gray-200">
                  <h3 className="text-3xl font-bold text-gray-900">{personalInfo.fullName || 'Your Name'}</h3>
                  <p className="text-gray-600 mt-2">{personalInfo.email || 'email@example.com'} | {personalInfo.phone || '+1234567890'}</p>
                  <p className="text-gray-600">{personalInfo.location || 'Your Location'}</p>
                </div>

                {/* Summary */}
                {personalInfo.summary && (
                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-2 pb-2 border-b-2 border-cyan-500">SUMMARY</h4>
                    <p className="text-gray-700 text-sm">{personalInfo.summary}</p>
                  </div>
                )}

                {/* Experience */}
                {experiences.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-3 pb-2 border-b-2 border-cyan-500">EXPERIENCE</h4>
                    {experiences.map((exp) => (
                      <div key={exp.id} className="mb-4">
                        <h5 className="font-bold text-gray-900">{exp.title || 'Job Title'}</h5>
                        <p className="text-sm text-gray-600">{exp.company || 'Company'} | {exp.startDate} - {exp.endDate}</p>
                        <p className="text-sm text-gray-700 mt-1">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Education */}
                {education.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-3 pb-2 border-b-2 border-cyan-500">EDUCATION</h4>
                    {education.map((edu) => (
                      <div key={edu.id} className="mb-3">
                        <h5 className="font-bold text-gray-900">{edu.degree || 'Degree'}</h5>
                        <p className="text-sm text-gray-600">{edu.school || 'School'} | {edu.year}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Skills */}
                {skills.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-3 pb-2 border-b-2 border-cyan-500">SKILLS</h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <span key={skill.id} className="px-3 py-1 bg-gray-200 rounded-full text-sm text-gray-700">
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {!personalInfo.fullName && experiences.length === 0 && education.length === 0 && skills.length === 0 && (
                  <div className="text-gray-400 text-center py-12">
                    Your resume preview will appear here as you fill in the form
                  </div>
                )}
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
        onInputChange={(e) => setModalConfig({ ...modalConfig, inputValue: e.target.value })}
        inputPlaceholder={modalConfig.inputPlaceholder}
      />
    </div>
  );
};

export default BuilderPage;