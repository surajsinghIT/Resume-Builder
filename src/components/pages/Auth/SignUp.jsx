import React, { use, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { HOME, SIGNIN, DASHBOARD } from "../../../utils/RouteList";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { app } from "./FirebaseAuth/Firebase";
import { toast, ToastContainer } from "react-toastify";
import HomePage from "../Home/HomePage";
import Loader from "../../common/Loader";

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    // fullName: '',
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const validateForm = () => {
    const newErrors = {};

    // Full Name validation
    // if (!formData.fullName.trim()) {
    //   newErrors.fullName = 'Full name is required';
    // } else if (formData.fullName.trim().length < 2) {
    //   newErrors.fullName = 'Name must be at least 2 characters';
    // }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain uppercase, lowercase, and number";
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Terms agreement validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    createUserWithEmailAndPassword(auth, formData?.email, formData?.password)
      .then((user) => {
        console.log("userDetails", user);
        setIsLoading(false);
        toast.success("Account created successfully...");
        setTimeout(() => {
          navigate(SIGNIN);
        }, 1500);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error", errorCode, errorMessage);
        toast.error("Something went wrong...");
        setIsLoading(false);
      });

    // Simulate API call
    // setTimeout(() => {
    //   console.log('Sign up with:', formData);
    //   // Store user session
    //   localStorage.setItem('isAuthenticated', 'true');
    //   localStorage.setItem('userEmail', formData.email);
    //   // localStorage.setItem('userName', formData.fullName);
    //   setIsLoading(false);
    //   navigate(DASHBOARD);
    // }, 2000);
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

  const passwordStrength = () => {
    const password = formData.password;
    if (!password) return { strength: 0, label: "", color: "" };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[@$!%*?&#]/.test(password)) strength++;

    const levels = [
      { strength: 1, label: "Weak", color: "bg-red-500" },
      { strength: 2, label: "Fair", color: "bg-yellow-500" },
      { strength: 3, label: "Good", color: "bg-blue-500" },
      { strength: 4, label: "Strong", color: "bg-green-500" },
    ];

    return levels[strength - 1] || { strength: 0, label: "", color: "" };
  };

  const strengthInfo = passwordStrength();

  // google sign up
  const handleGoogleSignUp = () => {
    setIsLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("resultGoogle", result);
        const user = result?.user;
        sessionStorage.setItem("isAuthenticated", "true");
        sessionStorage.setItem("userEmail", user?.email);
        sessionStorage.setItem("name", user?.displayName);
        const token = user?.accessToken;
        sessionStorage.setItem("token", token);
        setIsLoading(false);
        toast.success("User signed up successsfully.");
        navigate(HOME);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(
          `Google authentication failed with errorCode: ${errorCode} and errormessage: ${errorMessage}`
        );
        toast.error("Something went wrong.");
      });
  };

  return (
    <>
      {isLoading ? (
        <Loader text={"Signing up with google...."} />
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
                Create Account
              </h1>
              <p className="text-gray-400">
                Start building your professional resume today
              </p>
            </div>

            {/* Sign Up Form */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name Field */}
                {/* <div>
              <label htmlFor="fullName" className="block text-sm font-semibold text-white mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full pl-11 pr-4 py-3 bg-white/10 border ${
                    errors.fullName ? 'border-red-500' : 'border-white/20'
                  } rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none transition-colors`}
                  placeholder="John Doe"
                />
              </div>
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-400">{errors.fullName}</p>
              )}
            </div> */}

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

                  {/* Password Strength Indicator */}
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex gap-1 mb-1">
                        {[1, 2, 3, 4].map((level) => (
                          <div
                            key={level}
                            className={`h-1 flex-1 rounded ${
                              level <= strengthInfo.strength
                                ? strengthInfo.color
                                : "bg-gray-600"
                            }`}
                          ></div>
                        ))}
                      </div>
                      {strengthInfo.label && (
                        <p className="text-xs text-gray-400">
                          Password strength:{" "}
                          <span className="font-semibold">
                            {strengthInfo.label}
                          </span>
                        </p>
                      )}
                    </div>
                  )}

                  {errors.password && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-semibold text-white mb-2"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`w-full pl-11 pr-12 py-3 bg-white/10 border ${
                        errors.confirmPassword
                          ? "border-red-500"
                          : "border-white/20"
                      } rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none transition-colors`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                  {formData.confirmPassword &&
                    formData.password === formData.confirmPassword && (
                      <div className="mt-1 flex items-center gap-1 text-green-400 text-sm">
                        <CheckCircle size={16} />
                        <span>Passwords match</span>
                      </div>
                    )}
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Terms & Conditions */}
                <div>
                  <label className="flex items-start gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      className={`mt-1 w-4 h-4 rounded border-white/20 bg-white/10 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0 ${
                        errors.agreeToTerms ? "border-red-500" : ""
                      }`}
                    />
                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                      I agree to the{" "}
                      <button
                        type="button"
                        className="text-cyan-400 hover:text-cyan-300 font-semibold"
                      >
                        Terms and Conditions
                      </button>{" "}
                      and{" "}
                      <button
                        type="button"
                        className="text-cyan-400 hover:text-cyan-300 font-semibold"
                      >
                        Privacy Policy
                      </button>
                    </span>
                  </label>
                  {errors.agreeToTerms && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.agreeToTerms}
                    </p>
                  )}
                </div>

                {/* Sign Up Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Creating account...
                    </>
                  ) : (
                    <>
                      <User size={20} />
                      Create Account
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-slate-900/50 text-gray-400">
                    Or sign up with
                  </span>
                </div>
              </div>

              {/* Social Sign Up */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="px-4 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                  onClick={handleGoogleSignUp}
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

              {/* Sign In Link */}
              <p className="mt-6 text-center text-sm text-gray-400">
                Already have an account?{" "}
                <Link
                  to={SIGNIN}
                  className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
                >
                  Sign in
                </Link>
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
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default SignUp;
