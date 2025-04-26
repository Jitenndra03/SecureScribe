import React from 'react';
import { Shield, Lock, AlertTriangle, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export const AboutPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col">
      {/* About Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-100 px-4 py-16 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
              <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              About SecureScribe
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              SecureScribe is a powerful PII protection tool designed to help individuals and organizations 
              securely share documents without exposing sensitive personal information.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Mission Section */}
      <section className="bg-white px-4 py-16 dark:bg-gray-900">
        <div className="container mx-auto max-w-4xl">
          <div className="grid gap-8 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Our Mission</h2>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                In today's digital world, personal information is constantly at risk of exposure. 
                Our mission is to create a secure environment where individuals and businesses can 
                confidently share documents without worrying about data breaches or identity theft.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                We believe privacy is a fundamental right, and our PII protection tool is designed 
                to empower users with the ability to control what personal information they share.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex items-center justify-center"
            >
              <div className="rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900/30">
                    <Lock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Protecting Privacy</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Our AI-powered technology identifies and secures sensitive information across 
                  multiple document formats, ensuring your data remains in your control.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Why It Matters Section */}
      <section className="bg-gray-50 px-4 py-16 dark:bg-gray-800">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Why PII Protection Matters</h2>
            <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-300">
              Personal Identifiable Information (PII) includes any data that could potentially identify a specific individual. 
              Protecting this information is crucial in today's digital world.
            </p>
          </motion.div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900"
            >
              <div className="mb-4 rounded-full bg-red-100 p-3 dark:bg-red-900/30">
                <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">Risks of PII Exposure</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-red-500">•</span>
                  <span>Identity theft leading to financial losses</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-red-500">•</span>
                  <span>Fraud and unauthorized account access</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-red-500">•</span>
                  <span>Privacy violations and personal harm</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-red-500">•</span>
                  <span>Legal and regulatory compliance issues</span>
                </li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900"
            >
              <div className="mb-4 rounded-full bg-green-100 p-3 dark:bg-green-900/30">
                <AlertCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">Benefits of PII Protection</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-green-500">•</span>
                  <span>Enhanced personal security and privacy</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-green-500">•</span>
                  <span>Reduced risk of identity theft and fraud</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-green-500">•</span>
                  <span>Compliance with data protection regulations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-green-500">•</span>
                  <span>Greater control over personal information</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-blue-600 px-4 py-12 text-white dark:bg-blue-900">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col items-center justify-center gap-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-2 text-2xl font-bold">Start protecting your sensitive information today</h2>
              <p className="mb-6 text-blue-100">
                Try SecureScribe and experience secure document sharing with confidence.
              </p>
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => navigate('/upload')}
              >
                Get Started
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};