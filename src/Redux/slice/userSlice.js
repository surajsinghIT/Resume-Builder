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
      };
    },
    saveResumesForDashboard: (state, action) => {
      state.resumeForDashboard = [
        ...state.resumeForDashboard,
        ...action.payload,
      ];
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
  updateProjects
} = resumeSlice.actions;

export default resumeSlice.reducer;
