import React from 'react';
import { File, FileText, FileImage, AlertCircle } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { useDocuments } from '../../context/DocumentContext';
import { motion } from 'framer-motion';

export const DocumentList: React.FC = () => {
  const { documents, currentDocument, setCurrentDocument } = useDocuments();
  
  if (documents.length === 0) {
    return (
      <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center dark:border-gray-700 dark:bg-gray-800/50">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
          <AlertCircle className="h-6 w-6 text-gray-400" />
        </div>
        <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No documents</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Upload documents to see them here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="font-medium text-gray-900 dark:text-white">Your Documents</h3>
      <div className="space-y-2">
        {documents.map((doc) => {
          // Count all PII detections and masked ones
          const totalDetections = doc.detections.length;
          const maskedDetections = doc.detections.filter(d => d.masked).length;
          
          // Determine document icon based on type
          let DocIcon = FileText;
          if (doc.type.includes('image')) {
            DocIcon = FileImage;
          } else if (!doc.type.includes('pdf')) {
            DocIcon = File;
          }
          
          return (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Card 
                hoverable 
                className={`cursor-pointer p-3 transition-colors duration-200 ${
                  currentDocument?.id === doc.id 
                    ? 'border-blue-300 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20' 
                    : ''
                }`}
                onClick={() => setCurrentDocument(doc.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-md bg-gray-100 p-2 dark:bg-gray-800">
                    <DocIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="truncate text-sm font-medium text-gray-900 dark:text-white">
                        {doc.name}
                      </h4>
                      <Badge variant={maskedDetections === totalDetections ? 'success' : 'warning'}>
                        {maskedDetections}/{totalDetections}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {Math.round(doc.size / 1024)} KB • {new Date(doc.lastModified).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};