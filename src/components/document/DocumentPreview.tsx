import React from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, AlertTriangle, Download } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useDocuments } from '../../context/DocumentContext';
import { PIIDetection } from '../../types';

export const DocumentPreview: React.FC = () => {
  const { currentDocument, toggleMasking, maskAllDetections, unmaskAllDetections } = useDocuments();
  
  if (!currentDocument) {
    return (
      <div className="flex h-96 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12 dark:border-gray-700 dark:bg-gray-800/50">
        <div className="text-center">
          <AlertTriangle className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">No document selected</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Upload or select a document to preview it here.</p>
        </div>
      </div>
    );
  }
  
  // Count all PII detections and masked ones
  const totalDetections = currentDocument.detections.length;
  const maskedDetections = currentDocument.detections.filter(d => d.masked).length;
  
  // Function to get badge variant based on PII type
  const getBadgeVariant = (type: PIIDetection['type']) => {
    switch (type) {
      case 'aadhaar':
      case 'pan':
        return 'danger';
      case 'name':
      case 'phone':
      case 'email':
        return 'warning';
      case 'address':
      case 'account':
        return 'secondary';
      default:
        return 'default';
    }
  };
  
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{currentDocument.name}</h3>
          <div className="mt-1 flex items-center gap-2">
            <Badge variant={maskedDetections === totalDetections ? 'success' : 'warning'}>
              {maskedDetections === totalDetections ? 'All PII masked' : `${maskedDetections}/${totalDetections} masked`}
            </Badge>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {Math.round(currentDocument.size / 1024)} KB
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant="outline" 
            icon={<Eye size={16} />}
            onClick={unmaskAllDetections}
          >
            Show All
          </Button>
          <Button 
            size="sm" 
            variant="primary" 
            icon={<EyeOff size={16} />}
            onClick={maskAllDetections}
          >
            Mask All
          </Button>
          <Button 
            size="sm" 
            variant="secondary" 
            icon={<Download size={16} />}
          >
            Download
          </Button>
        </div>
      </div>
      
      <div className="relative rounded-md border border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-800">
        {/* Simulated document display */}
        <div className="relative aspect-[3/4] min-h-[400px] overflow-hidden">
          <img 
            src="https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg" 
            alt="Document preview" 
            className="h-full w-full object-cover opacity-20" 
          />
          
          {/* Overlay with the PII highlights */}
          <div className="absolute inset-0 p-4">
            {currentDocument.detections.map((detection) => (
              <motion.div 
                key={detection.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute cursor-pointer"
                style={{
                  left: `${detection.position.x}%`,
                  top: `${detection.position.y}%`,
                  width: `${detection.position.width}%`,
                  height: `${detection.position.height}%`,
                }}
                onClick={() => toggleMasking(detection.id)}
              >
                <div 
                  className={`relative rounded px-2 py-1 text-xs font-medium ${
                    detection.masked 
                      ? 'bg-gray-800 text-gray-200 dark:bg-gray-700' 
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}
                >
                  {detection.masked ? (
                    <>
                      <span className="blur-sm">
                        {detection.text}
                      </span>
                      <span className="absolute inset-0 flex items-center justify-center text-gray-200 dark:text-gray-300">
                        [REDACTED]
                      </span>
                    </>
                  ) : (
                    <>
                      {detection.text}
                      <Badge 
                        variant={getBadgeVariant(detection.type)} 
                        className="ml-1"
                      >
                        {detection.type}
                      </Badge>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <h4 className="font-medium text-gray-900 dark:text-white">Detected PII</h4>
        <div className="mt-2 space-y-2">
          {currentDocument.detections.map((detection) => (
            <div 
              key={detection.id} 
              className="flex items-center justify-between rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="flex items-center gap-2">
                <Badge variant={getBadgeVariant(detection.type)}>
                  {detection.type}
                </Badge>
                <span className={detection.masked ? "blur-sm" : ""}>
                  {detection.text}
                </span>
                {detection.masked && (
                  <Badge variant="success">Masked</Badge>
                )}
              </div>
              <Button 
                size="sm" 
                variant={detection.masked ? "outline" : "primary"}
                onClick={() => toggleMasking(detection.id)}
              >
                {detection.masked ? "Unmask" : "Mask"}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};