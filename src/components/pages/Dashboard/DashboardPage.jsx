import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Download,
  Star,
  Zap,
  Eye,
  Edit3,
  Trash2,
  Plus,
} from "lucide-react";
import { BUILDER } from "../../../utils/RouteList";
import { useSelector } from "react-redux";

const DashboardPage = () => {
  const { downloadPdfCount, resumeForDashboard } = useSelector(
    (state) => state.resume
  );

  console.log("downloadPdfCount",downloadPdfCount)
  const navigate = useNavigate();

  const [resumes, setResumes] = useState([
    {
      id: 1,
      name: "Software Engineer Resume",
      template: "modern",
      lastEdited: "2 days ago",
    },
    {
      id: 2,
      name: "Product Manager CV",
      template: "minimal",
      lastEdited: "1 week ago",
    },
    {
      id: 3,
      name: "UI/UX Designer Resume",
      template: "creative",
      lastEdited: "3 weeks ago",
    },
  ]);

  const handleEdit = (resumeId) => {
    navigate(BUILDER, { state: { resumeId } });
  };

  useEffect(()=>{
  window.scroll(0,0);
  },[])
  const handleDelete = (resumeId) => {
    if (window.confirm("Are you sure you want to delete this resume?")) {
      setResumes(resumes.filter((r) => r.id !== resumeId));
    }
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
            { label: "Total Resumes", value: "12", icon: FileText },
            { label: "Downloads", value: downloadPdfCount , icon: Download },
            { label: "Templates Used", value: "5", icon: Star },
            { label: "Applications", value: "32", icon: Zap },
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
              onClick={() => navigate(BUILDER)}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2"
            >
              <Plus size={20} /> New Resume
            </button>
          </div>
          <div className="space-y-4">
            {resumeForDashboard?.map((resume, idx) => (
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
                      {resume?.personalInfo?.fullName}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Last edited {resume?.lastEdited}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <button className="p-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors">
                    <Eye size={20} />
                  </button>
                  <button
                    onClick={() => handleEdit(resume?.idx)}
                    className="p-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors"
                  >
                    <Edit3 size={20} />
                  </button>
                  <button className="p-2 bg-pink-500/20 text-pink-400 rounded-lg hover:bg-pink-500/30 transition-colors">
                    <Download size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(resume?.idx)}
                    className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
