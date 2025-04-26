import React from 'react';
import { FileUploader } from '../components/document/FileUploader';
import { DocumentPreview } from '../components/document/DocumentPreview';
import { DocumentList } from '../components/document/DocumentList';
import { motion } from 'framer-motion';

export const UploadPage: React.FC = () => {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Upload & Protect Your Documents</h1>
        
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <div>
                <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Upload Document</h2>
                <FileUploader />
              </div>
              
              <div>
                <DocumentList />
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Document Preview & PII Detection</h2>
            <DocumentPreview />
          </div>
        </div>
      </motion.div>
    </div>
  );
};