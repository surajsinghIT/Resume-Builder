import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  resumeData: {
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      summary: "",
    },
    experiences: [],
    education: [],
    skills: [],
    projects: [],
  },
  resumeForDashboard: [],
  downloadPdfCount: 0,
  currentEditingResumeId: null, // NEW: Track which resume is being edited
};

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    saveResumeData: (state, action) => {
      state.resumeData = action.payload;
    },
    updatePersonalInfo: (state, action) => {
      state.resumeData.personalInfo = {
        ...state.resumeData.personalInfo,
        ...action.payload,
      };
    },
    updateExperiences: (state, action) => {
      state.resumeData.experiences = action.payload;
    },
    updateEducation: (state, action) => {
      state.resumeData.education = action.payload;
    },
    updateSkills: (state, action) => {
      state.resumeData.skills = action.payload;
    },
    updateProjects: (state, action) => {
      state.resumeData.projects = action.payload;
    },
    clearResumeData: (state) => {
      state.resumeData = {
        personalInfo: {
          fullName: "",
          email: "",
          phone: "",
          location: "",
          summary: "",
        },
        experiences: [],
        education: [],
        skills: [],
        projects: [],
      };
      state.currentEditingResumeId = null;
    },
    // NEW: Set which resume is being edited
    setCurrentEditingResume: (state, action) => {
      state.currentEditingResumeId = action.payload;
    },
    // UPDATED: Save or update resume
    saveResumesForDashboard: (state, action) => {
      const { resumeData, templateId } = action.payload; // Get resume data and templateId
      
      if (state.currentEditingResumeId !== null) {
        // UPDATE existing resume
        const index = state.resumeForDashboard.findIndex(
          resume => resume.id === state.currentEditingResumeId
        );
        
        if (index !== -1) {
          state.resumeForDashboard[index] = {
            ...resumeData,
            id: state.currentEditingResumeId,
            templateId: templateId || state.resumeForDashboard[index].templateId || 1,
            lastEdited: new Date().toLocaleDateString(),
          };
        }
      } else {
        // ADD new resume
        const newResume = {
          ...resumeData,
          id: Date.now(),
          templateId: templateId || 1,
          lastEdited: new Date().toLocaleDateString(),
        };
        state.resumeForDashboard.push(newResume);
      }
      
      // Reset editing state
      state.currentEditingResumeId = null;
    },
    // NEW: Delete resume
    deleteResume: (state, action) => {
      state.resumeForDashboard = state.resumeForDashboard.filter(
        resume => resume.id !== action.payload
      );
    },
    saveDownloadPdfCount: (state, action) => {
      state.downloadPdfCount += action.payload;
    },
  },
});

export const {
  saveResumeData,
  updatePersonalInfo,
  updateExperiences,
  updateEducation,
  updateSkills,
  saveResumesForDashboard,
  clearResumeData,
  saveDownloadPdfCount,
  updateProjects,
  setCurrentEditingResume,
  deleteResume,
} = resumeSlice.actions;

export default resumeSlice.reducer;