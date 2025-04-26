import React from 'react';
import { motion } from 'framer-motion';
import { Shield, FileWarning, Upload, Lock } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-100 px-4 py-20 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                <Shield className="h-10 w-10 text-blue-600 dark:text-blue-400" />
              </div>
              <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                Secure Your Documents with <span className="text-blue-600 dark:text-blue-500">SecureScribe</span>
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
                Automatically detect and protect sensitive information in your documents before sharing them. 
                Keep your personal data safe with our advanced AI-powered PII protection tool.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <Button 
                size="lg" 
                onClick={() => navigate('/upload')}
                icon={<Upload size={20} />}
              >
                Start Scanning
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate('/about')}
              >
                Learn More
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="bg-white px-4 py-16 dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">How SecureScribe Works</h2>
            <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-300">
              Our powerful PII protection tool ensures your documents are shared securely, protecting your sensitive information.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-800"
            >
              <div className="mb-4 rounded-full bg-blue-100 p-3 dark:bg-blue-900/30">
                <FileWarning className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">Smart PII Detection</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Automatically scans your documents to identify personal information like Aadhaar numbers, PAN cards, addresses, and more.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-800"
            >
              <div className="mb-4 rounded-full bg-red-100 p-3 dark:bg-red-900/30">
                <Shield className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">Real-time Alerts</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get immediate notifications about sensitive information found in your documents before sharing them with others.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-800"
            >
              <div className="mb-4 rounded-full bg-green-100 p-3 dark:bg-green-900/30">
                <Lock className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">Secure Redaction</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Mask, blur, or completely redact sensitive information with just a click before sharing your documents.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-blue-600 px-4 py-16 text-white dark:bg-blue-900">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="max-w-lg">
              <h2 className="mb-4 text-3xl font-bold">Ready to secure your documents?</h2>
              <p className="mb-6 text-blue-50">
                Stop worrying about exposing sensitive information. Start using SecureScribe today and share your documents with confidence.
              </p>
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => navigate('/upload')}
              >
                Try it Now
              </Button>
            </div>
            <div className="w-full max-w-md">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800"
              >
                <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">How It Helps</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <svg className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">Prevents identity theft by protecting your personal information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">Ensures compliance with data protection regulations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">Gives you complete control over what information is shared</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};