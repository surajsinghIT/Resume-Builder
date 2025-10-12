// src/components/Common/Navbar.jsx

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles, LogIn, LogOut, UserPlus, User } from 'lucide-react';
import { HOME, BUILDER, DASHBOARD, ABOUT, CONTACT, SIGNIN, SIGNUP, LOGOUT } from '../../utils/RouteList';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const location = useLocation();

  // Check authentication status
  useEffect(() => {
    const checkAuth = () => {
      const authStatus = sessionStorage.getItem('isAuthenticated') === 'true';
      const name = sessionStorage.getItem('name');
      setIsAuthenticated(authStatus);
      setUserName(name);
    };

    checkAuth();
    
    // Listen for storage changes (when user logs in/out in another tab)
    window.addEventListener('storage', checkAuth);
    
    return () => window.removeEventListener('storage', checkAuth);
  }, [location]);

  const navigation = [
    { name: 'Home', path: HOME },
    { name: 'Builder', path: BUILDER },
    { name: 'Dashboard', path: DASHBOARD },
    { name: 'About', path: ABOUT },
    { name: 'Contact', path: CONTACT }
  ];

  console.log("sess",sessionStorage.getItem("token"));

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to={HOME} className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Sparkles className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold text-white">Resume Builder</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'text-cyan-400'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Auth Buttons - Desktop */}
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                {/* User Info */}
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20">
                  <User size={18} className="text-cyan-400" />
                  <span className="text-sm text-white font-medium">
                    {userName.split(' ')[0] || userName.split('@')[0]}
                  </span>
                </div>
                
                {/* Logout Button */}
                <Link
                  to={LOGOUT}
                  className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-red-500/50 transition-all flex items-center gap-2"
                >
                  <LogOut size={18} />
                  Logout
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                {/* Sign In Button */}
                <Link
                  to={SIGNIN}
                  className="px-6 py-2 bg-white/10 border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 transition-all flex items-center gap-2"
                >
                  <LogIn size={18} />
                  Sign In
                </Link>
                
                {/* Sign Up Button */}
                <Link
                  to={SIGNUP}
                  className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2"
                >
                  <UserPlus size={18} />
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden bg-black/40 backdrop-blur-xl border-t border-white/10">
          <div className="px-4 py-6 space-y-4">
            {/* Navigation Links */}
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-cyan-500/20 text-cyan-400'
                    : 'text-gray-300 hover:bg-white/10'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Divider */}
            <div className="border-t border-white/10 my-4"></div>
            
            {/* Auth Buttons - Mobile */}
            {isAuthenticated ? (
              <div className="space-y-3">
                {/* User Info */}
                <div className="flex items-center gap-2 px-4 py-3 bg-white/10 rounded-lg border border-white/20">
                  <User size={20} className="text-cyan-400" />
                  <span className="text-white font-medium">
                    {userName}
                  </span>
                </div>
                
                {/* Logout Button */}
                <Link
                  to={LOGOUT}
                  onClick={() => setMenuOpen(false)}
                  className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-lg flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                >
                  <LogOut size={20} />
                  Logout
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {/* Sign In Button */}
                <Link
                  to={SIGNIN}
                  onClick={() => setMenuOpen(false)}
                  className="w-full px-6 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-white/20 transition-all"
                >
                  <LogIn size={20} />
                  Sign In
                </Link>
                
                {/* Sign Up Button */}
                <Link
                  to={SIGNUP}
                  onClick={() => setMenuOpen(false)}
                  className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-lg flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                >
                  <UserPlus size={20} />
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;