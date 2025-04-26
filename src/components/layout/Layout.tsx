import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { motion } from 'framer-motion';

export const Layout: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <motion.main 
        className="flex-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Outlet />
      </motion.main>
      <footer className="border-t border-gray-200 py-6 text-center text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400">
        <div className="container mx-auto px-4">
          <p>© {new Date().getFullYear()} SecureScribe. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};