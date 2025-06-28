import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import Logoutbtns from './Logoutbtns';
import Logo from '../Logo';

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const UserAuth = useSelector((state) => state.Auth.status);

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'About us', path: '/about-us' },
    { label: 'Create-Blog', path: '/add-posts' },
  ];

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      setShowHeader(currentScrollY < lastScrollY || currentScrollY < 50);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenuAndNavigate = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-transform duration-300 ${
        showHeader ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="backdrop-blur-md bg-white/90 dark:bg-[#0f0c29]/80 text-black dark:text-white rounded-full px-6 py-4 shadow-2xl border border-violet-800/40 flex items-center justify-between gap-4 w-[95vw] max-w-4xl relative">
        <h6
          onClick={() => navigate('/')}
          className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent cursor-pointer"
        >
          <Logo />
        </h6>

        {/* Desktop Nav */}
        <ul className="hidden sm:flex gap-6 font-medium text-sm tracking-wide">
          {menuItems.map(({ label, path }) => (
            <li
              key={label}
              onClick={() => navigate(path)}
              className={`cursor-pointer transition-all duration-300 ${
                location.pathname === path
                  ? 'text-green-400 border-b-2 border-purple-500'
                  : 'text-gray-500 dark:text-gray-300 hover:text-purple-400'
              }`}
            >
              {label}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {UserAuth ? (
            <Logoutbtns />
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="hidden sm:block px-4 py-1.5 text-sm font-semibold text-cyan-400 border border-cyan-600 rounded-md hover:bg-cyan-600 hover:text-black transition duration-300"
            >
              Sign in
            </button>
          )}

          <button
            onClick={toggleMobileMenu}
            className="sm:hidden text-white text-2xl focus:outline-none"
          >
            {isMobileMenuOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="absolute top-full right-0 mt-2 w-full sm:hidden bg-[#1f1b3a] rounded-xl p-4 shadow-lg z-50">
            <ul className="flex flex-col gap-4 text-sm font-medium">
              {menuItems.map(({ label, path }) => (
                <li
                  key={label}
                  onClick={() => closeMenuAndNavigate(path)}
                  className={`cursor-pointer px-2 py-1 rounded-md ${
                    location.pathname === path
                      ? 'bg-purple-700 text-white'
                      : 'text-gray-200 hover:bg-violet-600 hover:text-white'
                  }`}
                >
                  {label}
                </li>
              ))}
              {!UserAuth && (
                <li>
                  <button
                    onClick={() => closeMenuAndNavigate('/login')}
                    className="w-full text-left px-2 py-1 rounded-md bg-cyan-600 text-black font-semibold hover:bg-cyan-500"
                  >
                    Sign in
                  </button>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
