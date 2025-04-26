import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileX } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { useDocuments } from '../../context/DocumentContext';

export const FileUploader: React.FC = () => {
  const { addDocument } = useDocuments();
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      addDocument(acceptedFiles[0]);
    }
  }, [addDocument]);
  
  const { 
    getRootProps, 
    getInputProps, 
    isDragActive,
    isDragAccept,
    isDragReject,
    fileRejections
  } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
    maxFiles: 1,
    multiple: false
  });
  
  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-200 ${
          isDragActive ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 
          isDragReject ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 
          'border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600'
        }`}
      >
        <input {...getInputProps()} />
        
        <motion.div
          className="flex flex-col items-center justify-center gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {isDragReject ? (
            <div className="rounded-full bg-red-100 p-3 text-red-600 dark:bg-red-900/30">
              <FileX size={32} />
            </div>
          ) : (
            <div className="rounded-full bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/30">
              <Upload size={32} />
            </div>
          )}
          
          <div className="space-y-1">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {isDragActive 
                ? isDragAccept ? "Drop to upload" : "This file type is not supported"
                : "Drag & drop your document here"
              }
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Supports PDF, JPG, JPEG, PNG
            </p>
          </div>
          
          <Button 
            variant="outline" 
            type="button" 
            onClick={(e) => e.stopPropagation()}
          >
            Select File
          </Button>
        </motion.div>
      </div>
      
      {fileRejections.length > 0 && (
        <div className="mt-3 text-sm text-red-500">
          <p>Invalid file type. Please upload a PDF or image file.</p>
        </div>
      )}
    </div>
  );
};