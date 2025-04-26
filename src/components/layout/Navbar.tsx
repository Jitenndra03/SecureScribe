import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Moon, Sun, Menu, ChevronDown, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useClerk, useUser } from '@clerk/clerk-react';
import { Button } from '../ui/Button';
import { useTheme } from '../../context/ThemeContext';

export const Navbar: React.FC = () => {
  const { theme, setTheme, isDark } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const { signOut } = useClerk();
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <NavLink 
            to="/" 
            className="flex items-center text-xl font-bold text-gray-900 dark:text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="mr-2 rounded-md bg-blue-600 p-1 text-white">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 8H20C20.5523 8 21 8.44772 21 9V19C21 19.5523 20.5523 20 20 20H4C3.44772 20 3 19.5523 3 19V9C3 8.44772 3.44772 8 4 8H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M12 4V15M12 15L15 12M12 15L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            SecureScribe
          </NavLink>
        </div>

        <div className="flex items-center gap-4">
          <Button 
            variant="ghost"
            size="sm"
            className="rounded-full p-2"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </Button>

          {isLoaded && user ? (
            <div className="relative">
              <Button
                variant="ghost"
                className="flex items-center gap-2"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <img
                  src={user.imageUrl}
                  alt={user.fullName || 'User'}
                  className="h-8 w-8 rounded-full"
                />
                <ChevronDown size={16} />
              </Button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
                  >
                    <div className="p-2">
                      <NavLink
                        to="/upload"
                        className="block rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Upload
                      </NavLink>
                      <NavLink
                        to="/dashboard"
                        className="block rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Dashboard
                      </NavLink>
                      <NavLink
                        to="/about"
                        className="block rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        About
                      </NavLink>
                      <hr className="my-2 border-gray-200 dark:border-gray-700" />
                      <button
                        onClick={handleSignOut}
                        className="flex w-full items-center rounded-md px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-700"
                      >
                        <LogOut size={16} className="mr-2" />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Button
              variant="primary"
              onClick={() => navigate('/sign-in')}
            >
              Sign In
            </Button>
          )}
          
          <div className="lg:hidden">
            <Button 
              variant="ghost"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              className="p-1"
            >
              <Menu size={24} />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && isLoaded && user && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden"
          >
            <nav className="flex flex-col space-y-3 bg-white px-4 py-4 dark:bg-gray-950">
              <NavLink 
                to="/upload" 
                className={({ isActive }) => 
                  `font-medium ${isActive ? 'text-blue-600 dark:text-blue-500' : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-500'}`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Upload
              </NavLink>
              <NavLink 
                to="/dashboard" 
                className={({ isActive }) => 
                  `font-medium ${isActive ? 'text-blue-600 dark:text-blue-500' : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-500'}`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </NavLink>
              <NavLink 
                to="/about" 
                className={({ isActive }) => 
                  `font-medium ${isActive ? 'text-blue-600 dark:text-blue-500' : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-500'}`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </NavLink>
              <button
                onClick={handleSignOut}
                className="flex items-center font-medium text-red-600 dark:text-red-400"
              >
                <LogOut size={16} className="mr-2" />
                Sign Out
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};