// src/pages/Auth/SignIn.jsx - Updated with Forgot Password Modal

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, LogIn, Sparkles, X, Send } from "lucide-react";
import { HOME, DASHBOARD } from "../../../utils/RouteList";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { app } from "./FirebaseAuth/Firebase";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../../common/Loader";

const SignIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetEmailError, setResetEmailError] = useState("");
  const [isResetting, setIsResetting] = useState(false);
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const auth = getAuth(app);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((user) => {
        console.log("SignedInuser", user);
        sessionStorage.setItem("isAuthenticated", "true");
        sessionStorage.setItem("userEmail", user?.user?.email);
        sessionStorage.setItem("token", user?.user?.accessToken);
        setIsLoading(false);
        toast.success("User Signed in...");
        setTimeout(() => {
          navigate(HOME);
        }, 1500);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("errorSignIn", errorCode);
        if (errorCode === "auth/invalid-credential") {
          toast.error("Please enter correct credentials...");
        } else {
          toast.error("Something went wrong...");
        }
        setIsLoading(false);
      });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // Forgot Password Handler
  const handleForgotPasswordClick = () => {
    setShowForgotPassword(true);
    setResetEmail("");
    setResetEmailError("");
  };

  const closeForgotPassword = () => {
    setShowForgotPassword(false);
    setResetEmail("");
    setResetEmailError("");
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    // Validate email
    if (!resetEmail) {
      setResetEmailError("Email is required");
      return;
    } else if (!/\S+@\S+\.\S+/.test(resetEmail)) {
      setResetEmailError("Email is invalid");
      return;
    }

    setIsResetting(true);
    
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      toast.success("Password reset email sent! Check your inbox.");
      setIsResetting(false);
      closeForgotPassword();
    } catch (error) {
      console.log("Reset error:", error.code);
      if (error.code === "auth/user-not-found") {
        toast.error("No account found with this email.");
      } else {
        toast.error("Failed to send reset email. Please try again.");
      }
      setIsResetting(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4 py-12"
          style={{ position: "relative", top: "40px" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 blur-3xl"></div>

          <div className="relative w-full max-w-md">
            {/* Logo/Brand */}
            <div className="text-center mb-8">
              <Link to={HOME} className="inline-flex items-center gap-2 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="text-white" size={28} />
                </div>
              </Link>
              <h1 className="text-4xl font-bold text-white mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-400">
                Sign in to continue building your resume
              </p>
            </div>

            {/* Sign In Form */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-white mb-2"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full pl-11 pr-4 py-3 bg-white/10 border ${
                        errors.email ? "border-red-500" : "border-white/20"
                      } rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none transition-colors`}
                      placeholder="you@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-white mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full pl-11 pr-12 py-3 bg-white/10 border ${
                        errors.password ? "border-red-500" : "border-white/20"
                      } rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none transition-colors`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="w-4 h-4 rounded border-white/20 bg-white/10 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0"
                    />
                    <span className="text-sm text-gray-300">Remember me</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleForgotPasswordClick}
                    className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-lg
                   hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center justify-center
                    gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <LogIn size={20} />
                  Sign In
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-slate-900/50 text-gray-400">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Social Sign In */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="px-4 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </button>
                <button
                  type="button"
                  className="px-4 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                  GitHub
                </button>
              </div>

              {/* Sign Up Link */}
              <p className="mt-6 text-center text-sm text-gray-400">
                Don't have an account?{" "}
                <button className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
                  Sign up
                </button>
              </p>
            </div>

            {/* Back to Home */}
            <div className="mt-6 text-center">
              <Link
                to={HOME}
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                ← Back to Home
              </Link>
            </div>
          </div>

          {/* Forgot Password Modal */}
          {showForgotPassword && (
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
              onClick={closeForgotPassword}
            >
              <div 
                className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-white/10 shadow-2xl max-w-md w-full mx-4 animate-fade-in"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <h3 className="text-2xl font-bold text-white">Reset Password</h3>
                  <button
                    onClick={closeForgotPassword}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Body */}
                <form onSubmit={handleResetPassword} className="p-6">
                  <p className="text-gray-300 mb-6">
                    Enter your email address and we'll send you a link to reset your password.
                  </p>
                  
                  <div className="mb-6">
                    <label
                      htmlFor="resetEmail"
                      className="block text-sm font-semibold text-white mb-2"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <input
                        type="email"
                        id="resetEmail"
                        value={resetEmail}
                        onChange={(e) => {
                          setResetEmail(e.target.value);
                          setResetEmailError("");
                        }}
                        className={`w-full pl-11 pr-4 py-3 bg-white/10 border ${
                          resetEmailError ? "border-red-500" : "border-white/20"
                        } rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none transition-colors`}
                        placeholder="you@example.com"
                        autoFocus
                      />
                    </div>
                    {resetEmailError && (
                      <p className="mt-1 text-sm text-red-400">{resetEmailError}</p>
                    )}
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={closeForgotPassword}
                      className="flex-1 px-6 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isResetting}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isResetting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={20} />
                          Reset Password
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default SignIn;