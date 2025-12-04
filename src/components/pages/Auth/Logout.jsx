import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, CheckCircle, Sparkles } from 'lucide-react';
import { HOME, SIGNIN } from '../../../utils/RouteList';

const Logout = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);
  const [isLoggingOut, setIsLoggingOut] = useState(true);

  useEffect(() => {
    // Simulate logout process
    const logoutTimer = setTimeout(() => {
      // Clear user session
      localStorage.clear();
      sessionStorage.clear()
      setIsLoggingOut(false);
    }, 2000);

    return () => clearTimeout(logoutTimer);
  }, []);

  useEffect(() => {
    if (!isLoggingOut && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      navigate(HOME);
    }
  }, [countdown, isLoggingOut, navigate]);

  // const handleSignInAgain = () => {
  //   navigate(SIGNIN);
  // };

  const handleGoHome = () => {
    navigate(HOME);
  };  

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4 py-12">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 blur-3xl"></div>
      
      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to={HOME} className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center">
              <Sparkles className="text-white" size={28} />
            </div>
          </Link>
        </div>

        {/* Logout Status Card */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-12 shadow-2xl text-center">
          {isLoggingOut ? (
            <>
              {/* Logging Out Animation */}
              <div className="mb-6">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse">
                  <LogOut className="text-white" size={40} />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-white mb-3">Logging Out...</h2>
              <p className="text-gray-400 mb-6">Please wait while we securely log you out</p>
              <div className="w-12 h-12 mx-auto border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
            </>
          ) : (
            <>
              {/* Success State */}
              <div className="mb-6">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="text-white" size={40} />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-white mb-3">Successfully Logged Out</h2>
              <p className="text-gray-400 mb-6">
                You have been securely logged out of your account
              </p>

              {/* Redirect Countdown */}
              <div className="mb-8 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                <p className="text-cyan-400 text-sm">
                  Redirecting to signin page in{' '}
                  <span className="text-2xl font-bold">{countdown}</span> seconds
                </p>
              </div>

              {/* Action Buttons */}
              {/* <div className="space-y-3">
                <button
                  onClick={handleSignInAgain}
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2"
                >
                  <LogOut size={20} className="rotate-180" />
                  Sign In Again
                </button>                
              </div> */}
            </>
          )}
        </div>

        {/* Additional Info */}
        {!isLoggingOut && (
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Thanks for using Resume Builder! We hope to see you again soon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Logout;